import useScrollProgress from '@/hooks/useScrollProgress/useScrollProgress';
import { motion } from 'motion/react';
import React, { RefObject, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Carousel } from '../Carousel/Carousel';
import { Tags } from '../Tags';
import { Tag } from '../Tags/Tag';

export type TimelineEntry = {
  title: React.ReactNode;
  years?: string;
  logo?: string;
  highlights?: string[];
  positions?: string[];
  organizations?: string[];
  tags?: string[];
  images?: string[];
};

const TimelineItem = ({
  item: {
    logo,
    years,
    title,
    organizations,
    positions,
    highlights,
    images,
    tags,
  },
}: {
  item: TimelineEntry;
}) => {
  const header = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          {logo ? (
            <div
              className="min-w-[8vmin] max-w-[8vmin] min-h-[8vmin] max-h-[8vmin] bg-cover bg-no-repeat overflow-hidden rounded-full"
              style={{
                backgroundImage: `url(${logo})`,
                border: '0.5vmin solid var(--primary-text)',
              }}
            />
          ) : null}
          <div className="tracking-tighter flex justify-center text-center">
            {title}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {years ? (
            <div className="tracking-tighter font-bold text-[2vmin] leading-[2.5vmin] uppercase opacity-[.6]">
              {years}
            </div>
          ) : null}
          {positions ? (
            <div className="flex lowercase font-bold text-[2.5vmin] leading-[3vmin] opacity-[.9] tracking-tighter">
              {positions.join(' ← ')}
            </div>
          ) : null}
          {organizations?.length ? (
            <div className="tracking-tight font-bold text-[2.5vmin] leading-[3vmin] uppercase opacity-[.6] pt-2">
              <div className="flex flex-wrap gap-2">
                {organizations.map(organization => (
                  <Tag
                    key={organization}
                    background={'var(--slate-700)'}
                    color={'var(--slate-300)'}
                  >
                    {organization}
                  </Tag>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }, [logo, years, title, organizations, positions]);

  return (
    <div
      className={`flex justify-start md:pt-20 md:gap-10 ${!images?.length ? 'pb-10' : ''}`}
      style={{ contentVisibility: 'auto' }}
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-[var(--volt)] p-2" />
        </div>
        <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-foreground">
          {header}
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:ml-4 w-full">
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground">
          {header}
        </h3>
        <div className="flex flex-col gap-8">
          <Tags tags={tags} />
          <div
            className="rounded-[22px] p-6 bg-[var(--bg-primary)] flex flex-col gap-2 w-full"
            style={{ border: '1px solid #1e1e1e' }}
          >
            <div className="light-text text-foreground font-normal flex flex-col">
              {highlights?.map((highlight, idx) => (
                <div key={`highlight-${idx}`}>{highlight}</div>
              ))}
            </div>
          </div>
          {images?.length ? (
            <div className="rounded-3xl overflow-x-hidden w-full flex items-center justify-center">
              <Carousel slides={images.map(image => ({ src: image }))} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export type TimelineProps = {
  scrollContainerRef?: RefObject<HTMLDivElement | HTMLBodyElement>;
  data: TimelineEntry[];
};

export const Timeline = ({ data, scrollContainerRef }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { height, ref } = useResizeDetector({
    handleHeight: true,
    refreshMode: 'debounce',
    refreshRate: 1000,
  });

  const { progress } = useScrollProgress({
    scrollContainerRef,
    containerRef,
  });

  return (
    <div className="relative w-full md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10"></div>

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto flex flex-col gap-10"
      >
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden min-w-[.125rem] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: `${(Math.max(5, progress) / 100) * (height || 0)}px`,
              opacity: `${(Math.max(5, progress) / 100) * (height || 0)}`,
              transition: 'all .1s ease',
            }}
            className="absolute inset-x-0 top-0  min-w-[.125rem] bg-gradient-to-t from-[var(--cyan)] via-[var(--volt)] to-transparent from-[10%] via-[20%] rounded-full"
          />
        </div>
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
