import { Bone } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BoneLogo({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm', className)}>
      <Bone className="h-[58%] w-[58%] -rotate-45" strokeWidth={2.6} />
    </div>
  );
}
