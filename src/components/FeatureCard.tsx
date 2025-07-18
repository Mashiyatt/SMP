
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'primary' | 'secondary' | 'accent';
}

const colorClasses = {
  primary: 'text-primary bg-primary/10 border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40',
  secondary: 'text-secondary bg-secondary/10 border-secondary/20 group-hover:bg-secondary/20 group-hover:border-secondary/40',
  accent: 'text-accent bg-accent/10 border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40',
};

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color = 'primary' 
}: FeatureCardProps) => {
  return (
    <Card className="group transition-all duration-500 card-glow hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
      <CardContent className="p-6 space-y-4">
        <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
