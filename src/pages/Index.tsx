
import { ServerStatus } from '@/components/ServerStatus';
import { FactionCard } from '@/components/FactionCard';
import { FeatureCard } from '@/components/FeatureCard';
import { NewsCard } from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Copy,
  Newspaper,
  Palette,
  Swords
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { serverConfig } from '@/config/serverConfig';
import { useTheme } from '@/contexts/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const iconMap = {
  Sword,
  Castle,
  Crown,
  Pickaxe,
  Map,
  Heart,
};

const Index = () => {
  const [addressCopied, setAddressCopied] = useState(false);
  const { toast } = useToast();
  const { theme, heroBackground } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const joinMinecraft = async () => {
    const serverAddress = `${serverConfig.server.address}:${serverConfig.server.port}`;
    
    try {
      // Try to copy to clipboard first
      await navigator.clipboard.writeText(serverAddress);
      setAddressCopied(true);
      
      // Try to open Minecraft URI
      const minecraftUri = `minecraft://?addExternalServer=${encodeURIComponent(serverConfig.server.name)}|${encodeURIComponent(serverAddress)}`;
      window.location.href = minecraftUri;
      
      toast({
        title: "Opening Minecraft...",
        description: "Server address copied to clipboard as backup!",
      });
      
      setTimeout(() => setAddressCopied(false), 3000);
    } catch (err) {
      // Fallback - just copy to clipboard
      try {
        await navigator.clipboard.writeText(serverAddress);
        toast({
          title: "Server Address Copied!",
          description: "Paste it in Minecraft to join the server!",
        });
      } catch (clipboardErr) {
        toast({
          title: "Unable to copy",
          description: `Server: ${serverAddress}`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen relative">

      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 lg:py-32 px-6 text-center overflow-hidden hero-background min-h-[80vh] flex items-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="container mx-auto max-w-7xl hero-content w-full">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-soft" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-hero font-black mb-8 animate-fade-in relative leading-tight">
            <span className="text-gradient animate-bounce-gentle drop-shadow-2xl">
              {serverConfig.server.name}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 animate-fade-in font-medium max-w-4xl mx-auto" style={{ animationDelay: '200ms' }}>
            {serverConfig.server.description}
          </p>
          
          <div className="text-base md:text-lg text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: '400ms' }}>
            <p className="text-center">
              {serverConfig.server.tagline}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in" style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              className="gold-glow hover:scale-105 transition-all duration-300 group text-lg px-10 py-6 shadow-2xl"
              onClick={joinMinecraft}
            >
              {addressCopied ? (
                <>
                  <Target className="w-6 h-6 mr-3 animate-scale-in" />
                  Opening Minecraft!
                </>
              ) : (
                <>
                  <Swords className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Join the Battle
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hover:scale-105 transition-all duration-300 group text-lg px-10 py-6 backdrop-blur-sm border-2 shadow-xl hover:shadow-2xl"
              onClick={() => window.open(serverConfig.social.discord, '_blank')}
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:bounce transition-all duration-300" />
              Join Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Full-width Server Status Section */}
      <section className="w-full bg-muted/20 border-y border-border" data-aos="fade-up">
        <div className="w-full">
          <ServerStatus />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-6" data-aos="fade-up" data-aos-delay="200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Castle className="w-8 h-8 text-primary animate-pulse-soft" />
              About {serverConfig.server.name}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the ultimate faction warfare server where strategy, skill, and teamwork determine victory.
              Join epic battles, build massive fortresses, and become a legend in the world of {serverConfig.server.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8 px-6" data-aos="fade-up" data-aos-delay="400">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="factions" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
              <TabsTrigger value="factions" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Factions</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Features</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span className="hidden sm:inline">News</span>
              </TabsTrigger>
            </TabsList>

            {/* Factions Tab */}
            <TabsContent value="factions" className="space-y-12">
              <div className="text-center" data-aos="fade-up">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  Active Factions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Choose your allegiance and fight for glory
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {serverConfig.factions.map((faction, index) => (
                  <div key={faction.name} className="hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
                    <FactionCard {...faction} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-12">
              <div className="text-center" data-aos="fade-up">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Zap className="w-8 h-8 text-primary" />
                  Server Features
                </h2>
                <p className="text-lg text-muted-foreground">
                  Discover what makes {serverConfig.server.name} the ultimate faction warfare experience
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serverConfig.features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                  return (
                    <div key={feature.title} className="hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
                      <FeatureCard 
                        icon={IconComponent} 
                        title={feature.title}
                        description={feature.description}
                        color={feature.color}
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news" className="space-y-12">
              <div className="text-center" data-aos="fade-up">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Newspaper className="w-8 h-8 text-primary" />
                  Latest News
                </h2>
                <p className="text-lg text-muted-foreground">
                  Stay updated with the latest server announcements and events
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serverConfig.news.map((newsItem, index) => (
                  <div key={newsItem.id} className="hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
                    <NewsCard {...newsItem} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border" data-aos="fade-up">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gradient mb-2">{serverConfig.server.name}</h3>
            <p className="text-muted-foreground">
              The ultimate Minecraft Bedrock faction warfare experience
            </p>
          </div>
          
          <div className="flex justify-center mb-6">
            <Button 
              variant="outline"
              className="hover:scale-105 transition-all duration-300 group"
              onClick={() => window.open(serverConfig.social.discord, '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-2 group-hover:bounce" />
              Discord Community
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 {serverConfig.server.name}. All rights reserved. | Created by Mashiyat
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
