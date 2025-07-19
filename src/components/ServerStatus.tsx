import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Copy, Check, Users, Activity, WifiOff, Server, Clock } from 'lucide-react';
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
    maxPlayers: serverConfig.server.maxPlayers || 50,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const { toast } = useToast();

  const fetchServerStatus = async () => {
    if (isLoading || cooldownRemaining > 0) return;

    setIsLoading(true);
    const startTime = performance.now();

    try {
      // Try multiple API endpoints for better reliability
      const endpoints = [
        `https://api.mcsrvstat.us/bedrock/3/${serverConfig.server.address}:${serverConfig.server.port}`,
        `https://api.mcsrvstat.us/3/${serverConfig.server.address}:${serverConfig.server.port}`,
        `https://api.mcstatus.io/v2/status/bedrock/${serverConfig.server.address}:${serverConfig.server.port}`,
        `https://api.mcstatus.io/v2/status/java/${serverConfig.server.address}:${serverConfig.server.port}`
      ];

      let serverInfo = null;
      let apiPing = 0;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            cache: 'no-store'
          });

          if (response.ok) {
            const data = await response.json();
            apiPing = Math.round(performance.now() - startTime);
            
            // Handle different API response formats
            if (data.online || data.status === 'online') {
              serverInfo = {
                online: true,
                players: data.players?.online || data.players_online || 0,
                maxPlayers: data.players?.max || data.players_max || serverConfig.server.maxPlayers || 50,
                version: data.version || data.software?.name || 'Unknown',
                motd: data.motd?.clean?.[0] || data.motd?.raw || data.description || `${serverConfig.server.name} Server`,
                ping: apiPing
              };
              break;
            } else if (data.hostname || data.ip) {
              // Server exists but is offline
              serverInfo = {
                online: false,
                players: 0,
                maxPlayers: serverConfig.server.maxPlayers || 50,
                version: undefined,
                motd: undefined,
                ping: undefined
              };
            }
          }
        } catch (endpointError) {
          console.log(`Endpoint ${endpoint} failed:`, endpointError);
          continue;
        }
      }

      if (serverInfo) {
        setServerData(serverInfo);
        toast({
          title: serverInfo.online ? "Server Online" : "Server Offline",
          description: serverInfo.online 
            ? `${serverInfo.players}/${serverInfo.maxPlayers} players online` 
            : "Server is currently offline",
          variant: serverInfo.online ? "default" : "destructive"
        });
      } else {
        throw new Error('All API endpoints failed');
      }

    } catch (error) {
      console.error('Failed to fetch server status:', error);
      
      setServerData({
        online: false,
        players: 0,
        maxPlayers: serverConfig.server.maxPlayers || 50,
        ping: undefined
      });

      toast({
        title: "Connection Failed",
        description: "Unable to reach the server. It may be offline or unreachable.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLastUpdated(new Date());
    }
  };

  const handleRefresh = () => {
    if (cooldownRemaining > 0) {
      toast({
        title: "Please Wait",
        description: `You can refresh again in ${cooldownRemaining} seconds`,
        variant: "destructive",
      });
      return;
    }

    // Set 5-second cooldown
    setCooldownRemaining(5);
    const cooldownTimer = setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1) {
          clearInterval(cooldownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    fetchServerStatus();
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

  // Auto-fetch on component mount and set up auto-refresh
  useEffect(() => {
    fetchServerStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
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
                onClick={handleRefresh}
                disabled={isLoading || cooldownRemaining > 0}
                className="hover:scale-105 transition-all duration-200"
                title={cooldownRemaining > 0 ? `Wait ${cooldownRemaining}s` : "Refresh server status"}
              >
                <RefreshCw className={`w-4 h-4 mr-2 transition-transform duration-300 ${isLoading ? 'animate-spin' : ''}`} />
                {cooldownRemaining > 0 ? `${cooldownRemaining}s` : isLoading ? 'Checking...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};