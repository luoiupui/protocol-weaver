import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface InfoTooltipProps {
  content: string;
  formula?: string;
  className?: string;
}

export function InfoTooltip({ content, formula, className }: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`inline-flex cursor-help text-muted-foreground hover:text-foreground transition-colors ${className ?? ''}`}>
            <Info className="h-4 w-4" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm" side="top">
          <p>{content}</p>
          {formula && (
            <p className="mt-1 font-mono text-xs text-muted-foreground border-t border-border pt-1">
              {formula}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
