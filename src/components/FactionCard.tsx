
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Crown, Sword, MapPin, Calendar } from 'lucide-react';

interface FactionCardProps {
  name: string;
  status: 'active' | 'recruiting' | 'inactive';
  members: number;
  leader: string;
  description: string;
  power: number;
  color: 'emerald' | 'red' | 'blue' | 'purple' | 'gold';
  founded?: string;
  territory?: string;
  specialty?: string;
}

const colorClasses = {
  emerald: 'border-minecraft-green/50 bg-minecraft-green/5 hover:border-minecraft-green/70',
  red: 'border-minecraft-red/50 bg-minecraft-red/5 hover:border-minecraft-red/70',
  blue: 'border-minecraft-blue/50 bg-minecraft-blue/5 hover:border-minecraft-blue/70',
  purple: 'border-secondary/50 bg-secondary/5 hover:border-secondary/70',
  gold: 'border-primary/50 bg-primary/5 hover:border-primary/70',
};

const statusColors = {
  active: 'bg-success text-success-foreground',
  recruiting: 'bg-warning text-warning-foreground',
  inactive: 'bg-destructive text-destructive-foreground',
};

export const FactionCard = ({ 
  name, 
  status, 
  members, 
  leader, 
  description, 
  power,
  color,
  founded,
  territory,
  specialty
}: FactionCardProps) => {
  return (
    <Card className={`group transition-all duration-500 card-glow ${colorClasses[color]} hover:shadow-2xl hover:-translate-y-1`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary transition-colors duration-300">
            <Shield className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            {name}
          </CardTitle>
          <Badge className={`${statusColors[status]} animate-fade-in`} variant="secondary">
            {status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
            <Crown className="w-4 h-4 text-primary" />
            <div>
              <div className="text-muted-foreground">Leader</div>
              <div className="font-medium">{leader}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
            <Users className="w-4 h-4 text-accent" />
            <div>
              <div className="text-muted-foreground">Members</div>
              <div className="font-medium">{members}</div>
            </div>
          </div>

          {territory && (
            <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
              <MapPin className="w-4 h-4 text-secondary" />
              <div>
                <div className="text-muted-foreground">Territory</div>
                <div className="font-medium text-xs">{territory}</div>
              </div>
            </div>
          )}

          {founded && (
            <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
              <Calendar className="w-4 h-4 text-accent" />
              <div>
                <div className="text-muted-foreground">Founded</div>
                <div className="font-medium text-xs">{new Date(founded).toLocaleDateString()}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 col-span-2 group-hover:scale-105 transition-transform duration-300">
            <Sword className="w-4 h-4 text-destructive" />
            <div className="w-full">
              <div className="text-muted-foreground mb-1">Power Level</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-primary-glow animate-pulse-glow"
                    style={{ 
                      width: `${Math.min(power, 100)}%`,
                      transitionDelay: '200ms'
                    }}
                  />
                </div>
                <span className="font-medium text-xs group-hover:text-primary transition-colors duration-300">{power}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
