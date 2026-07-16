import { cn } from "@/lib/utils";
import { statusMeta, type CarStatus } from "@/lib/data";

const toneClasses: Record<string, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  progress: "bg-foreground/5 text-foreground",
  ready: "bg-accent text-accent-foreground",
  done: "bg-muted text-muted-foreground line-through",
};

export function StatusBadge({
  status,
  className,
}: {
  status: CarStatus;
  className?: string;
}) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[meta.tone],
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          meta.tone === "ready" ? "bg-accent-foreground" : "bg-current",
        )}
        aria-hidden
      />
      {meta.label}
    </span>
  );
}
