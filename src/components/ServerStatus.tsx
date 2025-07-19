import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Copy, Check, Users, Wifi, WifiOff, Server, Activity, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { serverConfig } from '@/config/serverConfig';

interface ServerData {
  online: boolean;
  players: number;
  maxPlayers: number;
  version?: string;
  motd?: string;
  ping?: number;
}

export const ServerStatus = () => {
  const [serverData, setServerData] = useState<ServerData>({
    online: false,
    players: 0,
    maxPlayers: serverConfig.server.maxPlayers,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [canRefresh, setCanRefresh] = useState(true);
  const { toast } = useToast();

  const checkServerStatus = async (isManualRefresh = false) => {
    if (isLoading) return;
    
    // Check cooldown for manual refresh (5 seconds)
    if (isManualRefresh && lastRefreshTime) {
      const timeSinceLastRefresh = Date.now() - lastRefreshTime.getTime();
      const cooldownTime = 5000; // 5 seconds
      
      if (timeSinceLastRefresh < cooldownTime) {
        const remainingTime = Math.ceil((cooldownTime - timeSinceLastRefresh) / 1000);
        toast({
          title: "Please wait",
          description: `You can refresh again in ${remainingTime} seconds`,
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsLoading(true);
    if (isManualRefresh) {
      setCanRefresh(false);
      setLastRefreshTime(new Date());
    }
    
    try {
      const startTime = performance.now();
      
      // Add timestamp to prevent caching
      const timestamp = Date.now();
      
      // Try Bedrock API first, then fallback to Java if needed
      let response;
      let data;
      
      try {
        // Bedrock server API endpoint
        response = await fetch(
          `https://api.mcsrvstat.us/bedrock/3/${serverConfig.server.address}:${serverConfig.server.port}?t=${timestamp}`, 
          {
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Bedrock API failed: ${response.status}`);
        }
        
        data = await response.json();
        
        // If Bedrock API doesn't work, try regular API
        if (!data.online && !data.debug?.ping) {
          throw new Error('Bedrock API returned no data');
        }
        
      } catch (bedrockError) {
        console.log('Bedrock API failed, trying Java API:', bedrockError);
        
        // Fallback to regular Java API
        response = await fetch(
          `https://api.mcsrvstat.us/3/${serverConfig.server.address}:${serverConfig.server.port}?t=${timestamp}`, 
          {
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Both APIs failed. HTTP error! status: ${response.status}`);
        }
        
        data = await response.json();
      }
      const apiPing = Math.round(performance.now() - startTime);
      
      setServerData({
        online: data.online || false,
        players: data.players?.online || 0,
        maxPlayers: data.players?.max || serverConfig.server.maxPlayers || 50,
        version: data.version || data.gamemode || 'Unknown',
        motd: data.motd?.clean?.[0] || data.motd?.raw?.[0] || `${serverConfig.server.name} Server`,
        ping: data.online ? apiPing : undefined // Only show ping if server is online
      });
      setLastUpdated(new Date());
      
      if (isManualRefresh) {
        const statusMessage = data.online ? 
          `Server is online with ${data.players?.online || 0} players` : 
          'Server appears to be offline';
        
        toast({
          title: "Status Updated",
          description: statusMessage,
          variant: data.online ? "default" : "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to fetch server status:', error);
      
      // Set offline status on error
      setServerData({
        online: false,
        players: 0,
        maxPlayers: serverConfig.server.maxPlayers || 50,
        ping: undefined
      });
      setLastUpdated(new Date());
      
      if (isManualRefresh) {
        toast({
          title: "Connection Error",
          description: "Unable to connect to server. The server may be offline or unreachable.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      
      // Re-enable refresh after cooldown
      if (isManualRefresh) {
        setTimeout(() => {
          setCanRefresh(true);
        }, 5000); // 5 second cooldown
      }
    }
  };

  const copyToClipboard = async (text: string, type: 'address' | 'port') => {
    try {
      await navigator.clipboard.writeText(text);
      
      if (type === 'address') {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        setCopiedPort(true);
        setTimeout(() => setCopiedPort(false), 2000);
      }
      
      toast({
        title: `${type === 'address' ? 'Server Address' : 'Port'} Copied!`,
        description: `${text} has been copied to your clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: `Could not copy ${type} to clipboard.`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(() => checkServerStatus(false), 30000); // Check every 30 seconds automatically
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-8">
      <Card className="mx-auto max-w-7xl card-glow backdrop-blur-sm bg-card/95 animate-fade-in">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            {/* Server Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {serverData.online ? (
                  <Activity className="w-6 h-6 text-success animate-pulse-soft" />
                ) : (
                  <WifiOff className="w-6 h-6 text-destructive" />
                )}
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  serverData.online 
                    ? 'bg-success animate-pulse-glow' 
                    : 'bg-destructive'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Server Status</h3>
                <p className="text-sm text-muted-foreground">
                  {serverData.online ? 'Online' : 'Offline'}
                  {serverData.online && serverData.ping && (
                    <span className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                      {serverData.ping}ms
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Server Address */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Server className="w-4 h-4" />
                  Address:
                </span>
                <button 
                  onClick={() => copyToClipboard(serverConfig.server.address, 'address')}
                  className="server-ip flex items-center gap-1 hover:scale-105 transition-all duration-200 text-sm font-mono"
                  title="Click to copy address"
                >
                  {serverConfig.server.address}
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-success animate-scale-in" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Port:</span>
                <button 
                  onClick={() => copyToClipboard(serverConfig.server.port, 'port')}
                  className="server-ip flex items-center gap-1 hover:scale-105 transition-all duration-200 text-sm font-mono"
                  title="Click to copy port"
                >
                  {serverConfig.server.port}
                  {copiedPort ? (
                    <Check className="w-4 h-4 text-success animate-scale-in" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Player Count */}
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" />
              <div>
                <h4 className="font-semibold text-lg">
                  {serverData.online ? `${serverData.players}/${serverData.maxPlayers}` : '--/--'}
                </h4>
                <p className="text-sm text-muted-foreground">Players Online</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-semibold text-sm">Last Updated</h4>
                <p className="text-xs text-muted-foreground">
                  {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
                </p>
              </div>
            </div>

            {/* Refresh Button */}
            <div className="flex justify-center lg:justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => checkServerStatus(true)}
                disabled={isLoading || !canRefresh}
                className="hover:scale-105 transition-all duration-200"
                title={!canRefresh ? "Please wait before refreshing again" : "Refresh server status"}
              >
                <RefreshCw className={`w-4 h-4 mr-2 transition-transform duration-300 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};