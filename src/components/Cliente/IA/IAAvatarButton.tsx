import { useState } from 'react';
import { PromptIA } from './PromptIA';
import IAIcon from '/IAIconTransparente.png';

interface IAAvatarButtonProps {
  onClick?: () => void;
}

export function IAAvatarButton({ onClick }: IAAvatarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    if (onClick) onClick();
  };

  return (
    <>
      {/* Floating Button */}
      <div
        role="button"
        aria-label="Open virtual assistant"
        onClick={handleClick}
        className="group fixed bottom-6 right-6 z-50 flex cursor-pointer flex-col items-center transition-all"
      >
        {/* Speech Bubble */}
        <div className="relative mb-2">
          <div className="absolute -left-4 -top-8 w-max rounded-xl bg-[#D96E30] px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-300 before:absolute before:-bottom-2 before:left-4 before:border-8 before:border-transparent before:border-t-[#D96E30] group-hover:opacity-100">
            Sou a assistente virtual! 🐾
          </div>
        </div>

        {/* Avatar */}
        <div className="rounded-full border-4 border-[#D96E30] bg-white p-1 shadow-lg transition-transform hover:scale-105 dark:bg-zinc-800">
          <img src={IAIcon} alt="Assistente IA" className="h-16 w-16 rounded-full object-contain" />
        </div>
      </div>

      {/* Prompt Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <PromptIA onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
