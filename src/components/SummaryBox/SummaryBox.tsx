import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a l
import { BackgroundGradient } from '../BackgroundGradient/BackgroundGradient';
import { FloatingBoxProps } from '../FloatingBox';
import { Tags } from '../Tags';

type Props = Omit<FloatingBoxProps, 'children'> & {
  title: string;
  years?: string;
  logo: string;
  highlights: string[];
  positions?: string[];
  organization?: string;
  tags?: string[];
  images?: string[];
};

export const SummaryBox = ({
  title,
  years,
  logo,
  highlights,
  positions,
  organization,
  tags,
  images,
  ...props
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-[60%] min-w-[60%] w-full flex justify-center"
    >
      <BackgroundGradient className="rounded-[22px] p-8 bg-[var(--bg-primary)] text-[var(--primary-text)] flex flex-col gap-2 w-full">
        <div className="flex items-center gap-4">
          <div
            className="min-w-[8vmin] max-w-[8vmin] min-h-[8vmin] max-h-[8vmin] bg-cover bg-no-repeat overflow-hidden rounded-full"
            style={{
              backgroundImage: `url(${logo})`,
              border: '0.5vmin solid var(--primary-text)',
            }}
          />
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 font-bold tracking-tighter text-[7vmin] leading-[7vmin]">
              {title}
            </div>
            {years ? (
              <div className="tracking-tighter font-bold text-[1.5vmin] leading-[2vmin] uppercase opacity-[.6]">
                {years}
              </div>
            ) : null}
            {positions ? (
              <div className="flex lowercase font-bold text-[2vmin] leading-[2.5vmin] opacity-[.9]">
                {positions.join(' ← ')}
              </div>
            ) : null}
            {organization ? (
              <div className="tracking-tighter font-bold text-[2vmin] leading-[2.5vmin] lowercase opacity-[.6]">
                {organization}
              </div>
            ) : null}
          </div>
        </div>
        <Tags tags={tags} />
        <div className="border-b-2 border-[var(--primary-text)] py-1" />
        <div className="flex gap-16 mt-2 flex-col sm:flex-row items-center">
          <div className="light-text tracking-[-0.025vmin] text-[2vmin] flex flex-col">
            {highlights.map((highlight, idx) => (
              <div key={`highlight-${idx}`}>{highlight}</div>
            ))}
          </div>
          {images?.length ? (
            <div className="rounded-3xl overflow-hidden w-full sm:max-w-[50%] ml-auto">
              <Carousel
                showArrows={true}
                showThumbs={false}
                autoPlay
                autoFocus={false}
                infiniteLoop
                stopOnHover
                className="w-full"
              >
                {images.map(src => (
                  <div className="w-full" key={src}>
                    <img src={src} />
                  </div>
                ))}
              </Carousel>
            </div>
          ) : null}
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};
