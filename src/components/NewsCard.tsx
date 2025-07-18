
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';

interface NewsCardProps {
  title: string;
  date: string;
  category: string;
  content: string;
  featured?: boolean;
}

export const NewsCard = ({ title, date, category, content, featured }: NewsCardProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`group transition-all duration-500 card-glow hover:shadow-2xl hover:-translate-y-1 ${
      featured ? 'border-primary/50 bg-primary/5' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary transition-colors duration-300">
            {featured && <Star className="w-4 h-4 text-primary fill-primary animate-pulse-soft" />}
            {title}
          </CardTitle>
          <Badge variant="secondary" className="whitespace-nowrap">
            {category}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {formatDate(date)}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};
