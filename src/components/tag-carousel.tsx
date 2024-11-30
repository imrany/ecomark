import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { tagType } from "@/app/types";
import { MoveLeft, MoveRight } from 'lucide-react';

export default function TagCarousel({ tags }:{ tags:tagType[] }) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [transformValue, setTransformValue] = useState(0);

  const updateTransformValue = () => {
    const screenWidth = window.innerWidth;
    const newTransformValue = screenWidth < 640 && screenWidth>0? -currentPosition * 80 : screenWidth>640&&screenWidth<1300 ? -currentPosition * 60: -currentPosition * 15;
    setTransformValue(newTransformValue);
  };

  const moveLeft = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const moveRight = () => {
    if (currentPosition < tags.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  useEffect(() => {
    updateTransformValue();
    window.addEventListener('resize', updateTransformValue);
    return () => window.removeEventListener('resize', updateTransformValue);
  }, [currentPosition]);

  return (
    <div className="flex items-center max-sm:w-full lg:w-full flex-grow">
      <Button onClick={moveLeft} className="rounded-[50px] flex items-center justify-center h-8 w-5 text-[var(--primary-04)] bg-gray-300 hover:text-white hover:bg-gray-500 active:bg-gray-500">
        <MoveLeft/>
      </Button>
      <div className="sm:w-[50vw] mx-1 overflow-hidden">
        <div style={{ transform: `translateX(${transformValue}px)`, transition: 'transform 0.3s ease-in-out' }} className="flex items-center gap-2 flex-grow">
          {tags.map((btn) => (
            <Button key={btn.label} variant={btn.variant} className={btn.className}>
                <p>{btn.label}</p>
            </Button>
          ))}
        </div>
      </div>
      <Button onClick={moveRight} className="rounded-[50px] flex items-center justify-center h-8 w-5 text-[var(--primary-04)] bg-gray-300 hover:text-white hover:bg-gray-500 active:bg-gray-500">
        <MoveRight/>
      </Button>
    </div>
  );
}
