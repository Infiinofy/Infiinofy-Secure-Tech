import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollDownAnimation, setShowScrollDownAnimation] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if footer is in view
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isFooterInView = footerRect.top < window.innerHeight;
        setShowScrollDownAnimation(!isFooterInView);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToNextSection = () => {
    const sections = document.querySelectorAll('section, footer');
    let currentSectionIndex = -1;
    let maxVisibleArea = 0;

    // Find the currently visible section
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const visibleArea = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      
      if (visibleArea > maxVisibleArea && visibleArea > 0) {
        maxVisibleArea = visibleArea;
        currentSectionIndex = index;
      }
    });

    // Scroll to the next section
    if (currentSectionIndex !== -1 && currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = () => {
    if (showScrollDownAnimation) {
      scrollToNextSection();
    } else {
      scrollToTop();
    }
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-black hover:bg-gray/90"
          aria-label="Scroll to top"
        >
          {showScrollDownAnimation ? (
            <DotLottieReact
              src="https://lottie.host/e016829a-5dd9-49d4-be5f-2a2d1801e998/fO8gAso7bl.json"
              className="w-10 h-10 cursor-pointer"
              loop
              autoplay
            />
          ) : (
            <DotLottieReact
              src="https://lottie.host/24945973-9c03-4e71-b798-e9423ecc0b68/hs6n3rcWka.json"
              className="w-20 h-20"
              loop
              autoplay
            />
          )}
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;
