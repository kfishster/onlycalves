export enum CardType {
  Left,
  Right,
}

export interface CardProps {
  cardType: CardType;
  title: string;
  subtitle: string;
}

export function CalfCard({ cardType, title, subtitle }: CardProps) {
  const transformClasses =
    cardType === CardType.Left
      ? "animate-cardleft -rotate-12"
      : "animate-cardright rotate-12";

  return (
    <div
      className={`flex flex-col ${transformClasses} hover:scale-110 transition-transform duration-500 h-full aspect-3/4`}
    >
      <div className="flex rounded-t-xl border-t border-x border-zinc-700 dark:border-zinc-100 overflow-clip h-full">
        <img
          src="https://thumbs.dreamstime.com/b/fitness-healthy-leg-muscle-leg-muscleillustration-design-vector-isolated-white-background-122386596.jpg"
          alt="logo"
          className="w-full object-cover"
        />
      </div>
      <div className="transition-color bg-zinc-200 dark:bg-zinc-600 p-3 rounded-b-xl border-x border-b border-zinc-700 dark:border-zinc-100">
        <p className="text-sm text-center font-semibold">{title}</p>
        <p className="text-xs text-center">{subtitle}</p>
      </div>
    </div>
  );
}
