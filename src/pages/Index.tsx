
import { ServerStatus } from '@/components/ServerStatus';
import { FactionCard } from '@/components/FactionCard';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { 
  Castle, 
  Sword, 
  Shield, 
  Users, 
  Zap, 
  Crown,
  Pickaxe,
  Map,
  Target,
  Heart,
  ExternalLink,
  MessageCircle,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const Index = () => {
  const [addressCopied, setAddressCopied] = useState(false);
  const { toast } = useToast();

  const copyServerAddress = async () => {
    try {
      await navigator.clipboard.writeText('play.golden-smp.xyz:25777');
      setAddressCopied(true);
      toast({
        title: "Server Address Copied!",
        description: "Paste it in Minecraft to join the server!",
      });
      setTimeout(() => setAddressCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy server address.",
        variant: "destructive",
      });
    }
  };

  const factions = [
    {
      name: "The Dawnseekers",
      status: "active" as const,
      members: 12,
      leader: "SunKnight_47",
      description: "Elite warriors who fight for honor and glory in the golden dawn.",
      power: 85,
      color: "gold" as const,
    },
    {
      name: "Shadow Collective",
      status: "recruiting" as const,
      members: 8,
      leader: "DarkBlade_X",
      description: "Masters of stealth and strategy, operating from the shadows.",
      power: 72,
      color: "purple" as const,
    },
    {
      name: "Iron Legion",
      status: "active" as const,
      members: 15,
      leader: "IronCommander",
      description: "Heavily fortified faction known for their impenetrable defenses.",
      power: 91,
      color: "blue" as const,
    },
    {
      name: "Phoenix Rising",
      status: "inactive" as const,
      members: 5,
      leader: "FireBird_99",
      description: "Once mighty faction, now seeking to rise from the ashes.",
      power: 45,
      color: "red" as const,
    },
  ];

  const features = [
    {
      icon: Sword,
      title: "Epic PvP Combat",
      description: "Engage in intense faction warfare with custom weapons and armor. Master the art of combat to dominate the battlefield.",
      color: "primary" as const,
    },
    {
      icon: Castle,
      title: "Base Building",
      description: "Construct massive fortresses and defensive structures. Protect your faction's resources and territory from invaders.",
      color: "secondary" as const,
    },
    {
      icon: Crown,
      title: "Faction Leadership",
      description: "Rise through the ranks to become a faction leader. Command armies and forge alliances to expand your empire.",
      color: "accent" as const,
    },
    {
      icon: Pickaxe,
      title: "Resource Mining",
      description: "Discover rare ores and materials deep underground. Use these resources to craft powerful equipment and structures.",
      color: "primary" as const,
    },
    {
      icon: Map,
      title: "Territory Control",
      description: "Claim and defend strategic locations across the vast world. Control key resources and trade routes.",
      color: "secondary" as const,
    },
    {
      icon: Heart,
      title: "Community Events",
      description: "Participate in server-wide events, competitions, and special challenges. Win exclusive rewards and recognition.",
      color: "accent" as const,
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient animate-fade-in">
            Golden SMP
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Premium Minecraft Faction Warfare
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>
            Golden SMP is a premium Minecraft Bedrock server focused on faction warfare and strategic gameplay.
            Build your empire, forge alliances, and dominate the battlefield in an immersive survival experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              className="gold-glow hover:scale-105 transition-all duration-300"
              onClick={copyServerAddress}
            >
              {addressCopied ? <Target className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
              {addressCopied ? 'Address Copied!' : 'Join the Battle'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://discord.gg/zaPtmuRcsT', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Server Status Section - Now integrated into the main content */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-3">
                  <Castle className="w-8 h-8 text-primary" />
                  About Golden SMP
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Experience the ultimate faction warfare server where strategy, skill, and teamwork determine victory.
                  Join epic battles, build massive fortresses, and become a legend in the world of Golden SMP.
                </p>
              </div>
            </div>
            
            <div className="lg:sticky lg:top-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <ServerStatus />
            </div>
          </div>
        </div>
      </section>

      {/* Factions Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Active Factions
            </h2>
            <p className="text-lg text-muted-foreground">
              Join the most powerful factions or start your own legacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {factions.map((faction, index) => (
              <div key={faction.name} className="animate-fade-in hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 150}ms` }}>
                <FactionCard {...faction} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              Server Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover what makes Golden SMP the ultimate faction warfare experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="animate-fade-in hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gradient mb-2">Golden SMP</h3>
            <p className="text-muted-foreground">
              The ultimate Minecraft Bedrock faction warfare experience
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              variant="outline"
              className="hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://discord.gg/zaPtmuRcsT', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discord Community
            </Button>
            <Button 
              variant="outline"
              className="hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Server Rules
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 Golden SMP. All rights reserved. | Created by Mashiyatt
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
