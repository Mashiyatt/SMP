import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Crown, Sword } from 'lucide-react';

interface FactionCardProps {
  name: string;
  status: 'active' | 'recruiting' | 'inactive';
  members: number;
  leader: string;
  description: string;
  power: number;
  color: 'emerald' | 'red' | 'blue' | 'purple' | 'gold';
}

const colorClasses = {
  emerald: 'border-minecraft-green/50 bg-minecraft-green/5',
  red: 'border-minecraft-red/50 bg-minecraft-red/5',
  blue: 'border-minecraft-blue/50 bg-minecraft-blue/5',
  purple: 'border-secondary/50 bg-secondary/5',
  gold: 'border-primary/50 bg-primary/5',
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
  color 
}: FactionCardProps) => {
  return (
    <Card className={`group hover:scale-105 transition-all duration-300 card-glow ${colorClasses[color]}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-primary" />
            {name}
          </CardTitle>
          <Badge className={statusColors[status]} variant="secondary">
            {status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" />
            <div>
              <div className="text-muted-foreground">Leader</div>
              <div className="font-medium">{leader}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <div>
              <div className="text-muted-foreground">Members</div>
              <div className="font-medium">{members}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 col-span-2">
            <Sword className="w-4 h-4 text-destructive" />
            <div>
              <div className="text-muted-foreground">Power Level</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(power, 100)}%` }}
                  />
                </div>
                <span className="font-medium text-xs">{power}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};