import { Transition } from "@headlessui/react";
import { VotingCard } from "../store/cardsSlice";

export enum CardType {
  Left,
  Right,
}

export interface CardProps {
  cardType: CardType;
  cardContents?: VotingCard;
  isShowing: boolean;
  onSelected: () => void;
}

export function CalfCard({
  cardType,
  cardContents,
  isShowing,
  onSelected,
}: CardProps) {
  // This is needed for tailwind because it scans the source to see which css classes to keep
  // so if it doesn't see -translate-x-32 that we generate programatically, it will not bundle it
  // -translate-x-32 -rotate-12
  const translationClass = `${
    cardType === CardType.Left ? "" : "-"
  }translate-x-32`;

  const translationClassOut = `${
    cardType === CardType.Left ? "-" : ""
  }translate-x-32`;

  const rotationClass = `${cardType === CardType.Left ? "-" : ""}rotate-12`;

  const transitionStart = `rotate-0 ${translationClass} scale-75 opacity-0 h-full`;
  const transitionEnd = `${rotationClass} opacity-100 h-full`;

  const leaveTo = `${translationClassOut} ${rotationClass} opacity-0 scale-125 h-full`;

  return (
    <button
      className={`group hover:scale-110 w-52 h-full transition-transform`}
      onClick={onSelected}
    >
      <Transition
        appear={true}
        show={isShowing}
        enter="transition-all duration-500"
        enterFrom={transitionStart}
        enterTo={transitionEnd}
        leaveTo={leaveTo}
        leaveFrom={transitionEnd}
        leave="transition-all duration-500"
        className={"flex flex-col"}
      >
        {cardContents ? (
          <div className="h-full">
            <div className="flex h-full rounded-t-xl border-t border-x border-zinc-700 dark:border-zinc-100 group-hover:ring-green-500 group-hover:ring-4 overflow-clip">
              <img
                src={cardContents.imgUrl}
                alt="logo"
                className="flex w-full object-cover"
              />
            </div>
            <div className="w-full transition-color bg-zinc-200 dark:bg-zinc-600 p-3 rounded-b-xl border-x border-b border-zinc-700 dark:border-zinc-100 group-hover:ring-green-500 group-hover:ring-4">
              <p className="text-sm text-center font-semibold">
                {cardContents.title}
              </p>
              <p className="text-xs text-center">{cardContents.subtitle}</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Transition>
    </button>
  );
}
