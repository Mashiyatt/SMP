import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServerStatusProps {
  className?: string;
}

interface ServerData {
  online: boolean;
  players: number;
  maxPlayers: number;
}

export const ServerStatus = ({ className }: ServerStatusProps) => {
  const [serverData, setServerData] = useState<ServerData>({
    online: false,
    players: 0,
    maxPlayers: 50,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const SERVER_IP = "play.golden-smp.xyz";
  const SERVER_PORT = "25777";

  // Simulate server status check
  const checkServerStatus = async () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setServerData({
        online: Math.random() > 0.2, // 80% chance online
        players: Math.floor(Math.random() * 45) + 5,
        maxPlayers: 50,
      });
      setIsLoading(false);
    }, 1000);
  };

  const copyServerIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      toast({
        title: "Server IP Copied!",
        description: "The server IP has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy server IP to clipboard.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkServerStatus();
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`fixed top-4 right-4 z-50 p-4 w-64 card-glow backdrop-blur-sm bg-card/95 ${className}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Server Status</h3>
          <div className={`w-3 h-3 rounded-full ${
            serverData.online 
              ? 'bg-success animate-pulse-glow' 
              : 'bg-destructive'
          }`} />
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">IP:</span>
            <button 
              onClick={copyServerIP}
              className="server-ip flex items-center gap-1 hover:scale-105 transition-transform"
              title="Click to copy"
            >
              {SERVER_IP}
              {copied ? (
                <Check className="w-3 h-3 text-success" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Port:</span>
            <code className="font-mono text-primary">{SERVER_PORT}</code>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Players:</span>
            <span className={`font-medium ${
              serverData.online ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {serverData.online ? `${serverData.players}/${serverData.maxPlayers}` : '--'}
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={checkServerStatus}
          disabled={isLoading}
          className="w-full"
        >
          <RefreshCw className={`w-3 h-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </Card>
  );
};