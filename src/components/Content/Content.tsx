import { ScrollShadow } from '@heroui/react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BackgroundGradient } from '../BackgroundGradient/BackgroundGradient';
import { ContentAnchor } from '../ContentAnchor/ContentAnchor';
import { Disciplines } from '../Disciplines';
import { Name } from '../Name';
import { Timeline } from '../Timeline/Timeline';
import { education, experience } from './TimelineEntries';

type Props = {
  onShow?: (id: string) => void;
};

export const Content = ({ onShow }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollShadow
      className="ml-[110px] overflow-y-auto flex flex-col overflow-x-hidden z-10 pb-20 pr-8"
      ref={scrollContainerRef}
    >
      <ContentAnchor id={'intro'} onShow={onShow} />
      <div className="flex items-center justify-center pt-16 px-16 mt-[15%]">
        <Name />
      </div>
      <motion.div style={{ x: '75%', width: '60%' }} className="mt-[-5%]">
        <motion.div
          className="flex w-full mb-[25%]"
          style={{
            filter: 'drop-shadow(5px 5px 4px var(--bg-primary))',
            contentVisibility: 'auto',
          }}
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ delay: 1 }}
        >
          <Disciplines />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.0, y: 40, scale: 0 }}
        animate={{ x: 0 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 2,
          ease: 'easeInOut',
        }}
        className="flex flex-col gap-4 p-12 w-full"
      >
        <div className="flex max-w-[75%] ml-auto">
          <BackgroundGradient className="rounded-[22px] p-8 bg-[var(--bg-primary)] text-[var(--primary-text)] gap-4 flex flex-col">
            <div className="extra-bold-text text-[4vmin] justify-start">
              hello!
            </div>
            <p className="light-text text-right text-[3.25vmin]">
              I'm Juan Narváez, and I enjoy designing and writing software
              (amongst other things). I've spent most of my career working on
              frontend applications in the realm of visualization and image
              processing (mostly medical imaging). I've also written a variety
              of backend services for processing + streaming image data, as well
              as the corresponding frontend components to take advantage of
              those services.
            </p>
          </BackgroundGradient>
        </div>
      </motion.div>

      <div className="flex w-full items-center justify-center py-[3.5vmin]">
        <ContentAnchor id={'experience'} onShow={onShow}>
          experience
        </ContentAnchor>
      </div>

      <Timeline data={experience} scrollContainerRef={scrollContainerRef} />

      <div className="flex w-full items-center justify-center py-[3.5vmin]">
        <ContentAnchor id={'education'} onShow={onShow}>
          education
        </ContentAnchor>
      </div>

      <Timeline data={education} scrollContainerRef={scrollContainerRef} />
    </ScrollShadow>
  );
};
