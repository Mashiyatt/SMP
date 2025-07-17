import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'primary' | 'secondary' | 'accent';
}

const colorClasses = {
  primary: 'text-primary bg-primary/10 border-primary/20',
  secondary: 'text-secondary bg-secondary/10 border-secondary/20',
  accent: 'text-accent bg-accent/10 border-accent/20',
};

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color = 'primary' 
}: FeatureCardProps) => {
  return (
    <Card className="group hover:scale-105 transition-all duration-300 card-glow">
      <CardContent className="p-6 space-y-4">
        <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};