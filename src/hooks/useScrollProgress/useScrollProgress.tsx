import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { RefObject, useEffect, useRef, useState } from 'react';

const getWindowScrollHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
};

export type UseScrollProgressParams = {
  isFullPageScroll?: boolean;
  onBottomReach?: () => void;
  containerRef?: RefObject<HTMLDivElement | HTMLBodyElement>;
  scrollContainerRef?: RefObject<HTMLDivElement | HTMLBodyElement>;
  offset?: number;
};

const useScrollProgress = ({
  isFullPageScroll,
  containerRef,
  scrollContainerRef,
  onBottomReach,
}: UseScrollProgressParams) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    if (
      !isFullPageScroll &&
      !containerRef?.current &&
      !scrollContainerRef?.current
    ) {
      return;
    }

    const scrollElement = isFullPageScroll
      ? window
      : scrollContainerRef?.current || containerRef!.current;

    let lastScrollTop = lastScrollTopRef.current;

    const triggerBottomReach = debounce(() => {
      onBottomReach?.();
      setIsAtBottom(true);
    }, 25);

    const calculateScrollDistance = () => {
      const scrollTop = isFullPageScroll
        ? window.pageYOffset
        : (scrollContainerRef?.current || containerRef!.current)!.scrollTop;

      const scrollHeight = isFullPageScroll
        ? getWindowScrollHeight()
        : (scrollContainerRef?.current || containerRef!.current)!.scrollHeight;

      const clientHeight = isFullPageScroll
        ? document.documentElement.clientHeight
        : containerRef!.current!.clientHeight;

      const totalDocScrollLength = scrollHeight - clientHeight;

      const scrollPosition = Math.floor(
        (scrollTop / totalDocScrollLength) * 100
      );

      setScrollPosition(scrollPosition);

      const isScrollingDown = scrollTop > lastScrollTop;
      const isAlmostReachBottom = totalDocScrollLength - scrollTop <= 15;

      if (onBottomReach && isScrollingDown && isAlmostReachBottom) {
        triggerBottomReach();
      }

      const isScrollingUp = scrollTop < lastScrollTop;

      if (isScrollingUp && !isAlmostReachBottom && isAtBottom) {
        setIsAtBottom(false);
      }

      lastScrollTopRef.current = scrollTop;
    };

    const handleScrollChange = () => {
      requestAnimationFrame(calculateScrollDistance);
    };

    const throttleScroll = throttle(handleScrollChange, 25);

    scrollElement!.addEventListener('scroll', throttleScroll);

    return () => {
      scrollElement!.removeEventListener('scroll', throttleScroll);
    };
  }, [
    isAtBottom,
    isFullPageScroll,
    containerRef,
    onBottomReach,
    scrollContainerRef,
  ]);

  return {
    progress: scrollPosition,
    isAtBottom,
  };
};

export default useScrollProgress;
