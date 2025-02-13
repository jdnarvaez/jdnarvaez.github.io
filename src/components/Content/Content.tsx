import { motion } from 'framer-motion';
import { BackgroundGradient } from '../BackgroundGradient/BackgroundGradient';
import { ContentAnchor } from '../ContentAnchor/ContentAnchor';
import { Disciplines } from '../Disciplines';
import { Name } from '../Name';
import { SummaryBox } from '../SummaryBox';

import anedotLogo from '../../assets/anedot.png';
import appleLogo from '../../assets/apple.jpg';
import avatar from '../../assets/avatar.png';
import betaReports from '../../assets/beta-reports.png';
import cerner_cardio from '../../assets/cerner_cardio.png';
import flexible1 from '../../assets/flexible1.png';
import hudlLogo from '../../assets/hudl.jpg';
import insights_module from '../../assets/insights_module.png';
import oracleLogo from '../../assets/oracle.jpg';
import patentedLogo from '../../assets/patented.jpg';
import skyvue_1 from '../../assets/skyvue_1.png';
import vannevar_logo from '../../assets/vannevar_logo.png';
import washULogo from '../../assets/washu.png';

type Props = {
  onShow?: (id: string) => void;
};

export const Content = ({ onShow }: Props) => {
  return (
    <div className="ml-[110px] overflow-y-auto flex flex-col overflow-x-hidden z-10">
      <ContentAnchor id={'intro'} onShow={onShow} />
      <div className="flex items-center justify-center pt-16 px-16 mt-[15%]">
        <Name />
      </div>
      <motion.div style={{ x: '75%', width: '60%' }} className="mt-[-5%]">
        <motion.div
          className="flex w-full mb-[25%]"
          style={{
            filter: 'drop-shadow(5px 5px 4px var(--bg-primary))',
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
            <p className="light-text text-right text-[2vmin]">
              I'm Juan Narváez, and I enjoy desiging and writing software
              (amongst other things). I've spent most of my career working on
              frontend applications in the realm of visualization and image
              processing (mostly medical imaging). I've also written a variety
              of backend services for processing and stroeaming image data, as
              well as the corresponding frontend components to take advantage of
              those services.
            </p>
          </BackgroundGradient>
        </div>
      </motion.div>

      <div className="flex w-full items-center justify-center py-[7vmin]">
        <ContentAnchor id={'experience'} onShow={onShow}>
          experience
        </ContentAnchor>
      </div>

      <div className="flex flex-col gap-24 px-24 pb-24 w-full items-center">
        <SummaryBox
          title={'intellectual property'}
          logo={patentedLogo}
          highlights={[
            'Patent on Remote Desktop Visualization / Compression / Delivery to a Browser',
            'Provisional Patent on Image Caching for High Frame Rates',
            'Provisional Patent on Modeling of Relationships of 2D/3D Images for Linked Display + Navigation',
          ]}
        />

        <SummaryBox
          title={'individual work'}
          logo={avatar}
          highlights={[
            'COVID 19 data visualization',
            'Exterior / Interior Home Design',
            'Consulting for cornerstoneJS Tooling',
            'Holeshot BMX iOS/Android App',
            'Race Day BMX iOS/Android App',
            'Sprint Training iOS App',
          ]}
          tags={[
            'dicom',
            'computational measurements',
            'gis',
            'svg',
            'vector processing',
            '3d rendering',
            'bluetooth',
            'mobile',
            'hardware control',
            'location services',
            'data visualization',
            'data aggregation + registration',
          ]}
        />

        <SummaryBox
          title={'vannevar labs'}
          years={`Sept . 2023  -  present`}
          logo={vannevar_logo}
          positions={['Senior Staff Engineer']}
          organizations={[
            'hardware',
            'sensors',
            'platform',
            'information environment',
          ]}
          highlights={[
            'Realtime FFT visualization system from remote devices',
            'Software provisioning system for remote sensors',
            'ADS-B / AIS / RF sweep signal collection + visualization',
            'Real-time remote spectrum analyzer',
            'Spectrogram viewer + visualization tools',
            'Data visualization',
            'Authentication + authorization services / web components based on OpenID + OpenFGA',
            'Designed + developed reusable platform components for scaffolding full stack applications',
            'App launcher framework + UI',
            'Integrated OpenTelemetry into full stack',
            'Helped take multiple applications from MVP to Product',
            'Frontend OAuth + instrumentation interceptors',
            'Backend OAuth filters',
            'Created shared UI libraries + design system',
            'Designed + devleoped shared geospatial libraries + layer services based on leaflet / mapbox',
            'Designed + devleoped Variety of visualizations and filtering for data modeling and analysis',
            'Reusable GH workflows',
          ]}
          tags={[
            'react',
            'typescript',
            'git',
            'asana',
            'lean',
            'hero-ui',
            'tailwind',
            'node',
            'vite',
            'express',
            'rest',
            'oauth',
            'web performance',
            'uma',
            'uhd',
            'visx',
            'signals',
            'sdr',
            'ais',
            'ads-b',
            'python',
            'iot',
            'rf',
          ]}
        />

        <SummaryBox
          title={'anedot'}
          years={`feb . 2022  -  sept . 2023`}
          logo={anedotLogo}
          positions={[
            'Director of Engineering',
            'Lead Software Engineer',
            'sr. Software Engineer',
          ]}
          organizations={['Engineering', 'Action Pages', 'Infrastructure']}
          highlights={[
            'Led teams implementing Anedot X feature uplift + rollout',
            'Worked to create pixel - perfect replications of visual designs and interactions',
            'Developed next iteration of page builder',
            'Oversaw contributions to newest frontend',
            'Mentored junior engineers on team',
            'Various custom UI components',
            'Context aware multi-monitor React components',
          ]}
          tags={[
            'react',
            'typescript',
            'jest',
            'git',
            'clickup',
            'lean',
            'chakra-ui',
            'npm',
            'yarn',
            'vite',
            'ruby',
            'rails',
          ]}
        />

        <SummaryBox
          title={'hudl'}
          years={'oct . 2021  -  feb . 2022'}
          logo={hudlLogo}
          positions={['Lead Engineer']}
          organizations={['Hudl Beta']}
          highlights={[
            'Implemented cacets of new Insights Module',
            'Overview stats report',
            'Various visualization modules',
            'Dynamic layout system',
            'Multi-monitor layout manager',
          ]}
          tags={[
            'react',
            'video processing',
            'dot net',
            'webdriver.io',
            'jest',
            'git',
            'jira',
            'microservices',
            'micro frontends',
            'rest',
            'webpack',
            'automated testing',
            'npm',
          ]}
          images={[insights_module, betaReports, flexible1]}
        />

        <SummaryBox
          title={'cerner (oracle health)'}
          years={'oct . 2017  -  oct . 2021'}
          logo={oracleLogo}
          positions={[
            'Associate Principal Engineer',
            'Senior Software Architect',
          ]}
          organizations={['Clinical Imaging']}
          highlights={[
            'Designed / developed Cerner ImageViewer as a successor to Cerner SkyVue',
            'IHE Compliant web app for biewing / evaluating / manipulating / measuring clinical image datasets',
            'Developed an image cache / layered strategy to support high FPS rendering in the browser of ultrasound + other clinical images',
            'Multi-monitor React components',
            'Automated testing framework',
            'Reusable dashboard for aggregating automated test data + regulatory reporting',
            'Dashboard for the Presentation + Management of Imaging Archive Data',
            'XZ Decoder in JavaScript',
            'Snappy Framed Decoder in JavaScript',
          ]}
          tags={[
            'react',
            '3d rendering',
            'svg',
            'vector processing',
            'image processing',
            'parallel algorithms',
            'ruby',
            'computational measurements',
            'rails',
            'jwt',
            'oauth',
            'openid',
            'webdriver.io',
            'jest',
            'dicom',
            'git',
            'jira',
            'microservices',
            'micro frontends',
            'rest',
            'webpack',
            'automated testing',
            'npm',
            'kubernetes',
            'containerized deployments',
            'data visualization',
            'data aggregation + registration',
          ]}
          images={[cerner_cardio, skyvue_1]}
        />

        <SummaryBox
          title={'apple'}
          years={'jan . 2014  -  oct . 2017'}
          logo={appleLogo}
          positions={['POI Engineer']}
          organizations={['Maps']}
          highlights={[
            'Worked on internal web app for processing POI data for the Maps platform',
            'Visualization and editing of Transit Shape Data',
            'Designed / Developed features for real time reporting + management of transit incidents',
            'Apple Pay data ingest',
            'Developed visualizations for managing vendor data mapping + normalization',
          ]}
          tags={[
            'sbt',
            'maven',
            'angular',
            'play',
            'visualizations',
            'd3',
            'svg',
            'geojson',
            'leaflet',
            'gis',
            'radar',
            'git',
            'data visualization',
            'data aggregation + registration',
          ]}
        />

        <SummaryBox
          title={'cerner (oracle health)'}
          years={'june . 2007  -  jan . 2014'}
          logo={oracleLogo}
          positions={[
            'Software Architect',
            'Senior Software Engineer',
            'Entry Level Engineer',
          ]}
          organizations={['Clinical Imaging']}
          highlights={[
            'Designed + developed the Cerner SkyVue Imaging Platform',
            'Java / C++ based desktop application for diagnostic + distribution imaging',
            'Zero footprint imaging application',
            'Custom SWT UI components',
            'Developed a multi-monitor SWT Workbench',
            'Real-time application monitoring services + visualizations',
            'Web application for workflow assessments',
            'High availability distributed disk cache',
            'Java HTTP libaries',
            'DICOM WADO web services',
            'WMI library to bridge into Java',
            'OAuth utilities + configuration management framework',
            'HTTP streaming libraries for desktop mirroring via AirPlay 1',
            'Parallel JPEG encoder',
          ]}
          tags={[
            'Java',
            'SWT',
            'RCP',
            'osgi',
            'dicom',
            'compression',
            'hl7',
            'ihe',
            'JavaScipt',
            'spring',
            'java ee',
            'servlets',
            'maven',
            'svn',
            'git',
            'jira',
            'oauth',
            'parallel processing',
            'data visualization',
            'data aggregation + registration',
          ]}
        />

        <ContentAnchor
          id={'education'}
          style={{ marginBottom: '6vmin' }}
          onShow={onShow}
        >
          education
        </ContentAnchor>

        <SummaryBox
          title={'m.s.e.e'}
          years={'sept . 2005  -  may . 2007'}
          logo={washULogo}
          highlights={[
            `Master's of Electrical Engineering`,
            'Focus on radiological imaging + mathematics',
          ]}
        />

        <SummaryBox
          title={'b.s.e.e'}
          years={'sept . 2002  -  may . 2006'}
          logo={washULogo}
          highlights={[
            `Bachelor's of Electrical Engineering`,
            'Minor in Mathematics',
            'Worked in human genetics research within the Washington University in St. Louis Medical School',
            'Worked in microbiology research within the St. Louis University Medical School',
            'Published papers in both positions',
          ]}
        />

        <BackgroundGradient className="rounded-[22px] p-8 bg-[var(--bg-primary)] text-[var(--primary-text)] flex flex-col gap-2 w-full">
          <div className="font-bold tracking-tight flex items-center text-[2vmin]">
            This site was created with react, tailwind, aceternity, and framer
            motion.
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );
};
