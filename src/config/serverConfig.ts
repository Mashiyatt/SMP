
export const serverConfig = {
  // Server Information
  server: {
    name: "Golden SMP",
    description: "Premium Minecraft Faction Warfare",
    tagline: "Experience the ultimate faction warfare server where strategy, skill, and teamwork determine victory. Join epic battles, build massive fortresses, and become a legend in the world of Golden SMP.",
    address: "play.golden-smp.xyz",
    port: "25777",
    maxPlayers: 0,
  },

  // Theme Configuration
  theme: {
    current: "golden", // "golden" or "war"
    
    // Hero Background Configuration
    // To change hero background: Replace URLs below with your desired images
    // Recommended: 1920x1080 or higher resolution images
    // Format: Direct image URLs (Unsplash, your own hosting, etc.)
    // Example: "https://your-domain.com/hero-image.jpg"
    heroBackground: {
      golden: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1920&q=80", // blue starry night
      war: "/src/assets/war-battlefield-landscape.jpg", // epic battlefield landscape
    },
    // Theme customization options
    colors: {
      golden: {
        primary: "42 100% 70%",
        primaryGlow: "42 100% 80%", 
        accent: "210 40% 98%",
        background: "223 47% 11%"
      },
      war: {
        primary: "120 100% 45%",
        primaryGlow: "120 100% 55%",
        accent: "35 100% 50%", 
        background: "0 0% 5%"
      }
    }
  },

  // Social Links
  social: {
    discord: "https://discord.gg/zaPtmuRcsT",
  },

  // Factions Configuration
  factions: [
    {
      name: "Excaliver",
      status: "active" as const,
      members: 5,
      leader: "Nishat10x",
      description: "Elite warriors who dominate the battlefield with precision and tactical superiority.",
      power: 88,
      color: "gold" as const,
      founded: "2025-06-23",
      territory: "Northern Highlands",
      specialty: "Strategic Warfare"
    },
    {
      name: "Team Cyanide",
      status: "active" as const,
      members: 5,
      leader: "Masiat8291",
      description: "Deadly faction known for their strategic warfare and unbreakable brotherhood.",
      power: 80,
      color: "gold" as const,
      founded: "2025-06-25",
      territory: "Eastern Plains",
      specialty: "Tactical Operations"
    },
  ],

  // News Configuration
  news: [
    {
      id: 2, 
      title: "WAR BREAKS OUT",
      date: "2025-06-20",
      category: "Update",
      content: "A violent assult from the exceliver triggered a all out war amongst the server, both teams are setting up their bases to adapt to these new circumstances",
      featured: true,
    },
    {
      id: 1,
      title: "Server Launch Event",
      date: "2025-05-31",
      category: "Event",
      content: "Golden SMP is officially launching! Join us for epic battles and exclusive rewards for early players.",
      featured: true,
    },
  ],

  // Features Configuration
  features: [
    {
      title: "Epic PvP Combat",
      description: "Engage in intense faction warfare with custom weapons and armor. Master the art of combat to dominate the battlefield.",
      icon: "Sword",
      color: "primary" as const,
    },
    {
      title: "Base Building",
      description: "Construct massive fortresses and defensive structures. Protect your faction's resources and territory from invaders.",
      icon: "Castle",
      color: "secondary" as const,
    },
    {
      title: "Faction Leadership",
      description: "Rise through the ranks to become a faction leader. Command armies and forge alliances to expand your empire.",
      icon: "Crown",
      color: "accent" as const,
    },
    {
      title: "Resource Mining",
      description: "Discover rare ores and materials deep underground. Use these resources to craft powerful equipment and structures.",
      icon: "Pickaxe",
      color: "primary" as const,
    },
    {
      title: "Territory Control",
      description: "Claim and defend strategic locations across the vast world. Control key resources and trade routes.",
      icon: "Map",
      color: "secondary" as const,
    },
    {
      title: "Community Events",
      description: "Participate in server-wide events, competitions, and special challenges. Win exclusive rewards and recognition.",
      icon: "Heart",
      color: "accent" as const,
    },
  ],
};
