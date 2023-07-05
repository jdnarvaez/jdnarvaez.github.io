import { useEffect } from 'react';
import { useWindowSize } from '@/hooks';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ContentAnchor } from '../ContentAnchor';
import { Disciplines, FloatingBox, Name, SummaryBox } from '..';
import styles from './Content.module.css';
import avatar from '../../assets/avatar.png';
import anedotLogo from '../../assets/anedot.png';
import hudlLogo from '../../assets/hudl.jpg';
import appleLogo from '../../assets/apple.jpg';
import copyrightLogo from '../../assets/copyright.jpg';
import patentedLogo from '../../assets/patented.jpg';
import cernerLogo from '../../assets/cerner.jpg';
import oracleLogo from '../../assets/oracle.jpg';
import washULogo from '../../assets/washu.png';
import betaReports from '../../assets/beta-reports.png';
import flexible1 from '../../assets/flexible1.png';
import insights_module from '../../assets/insights_module.png';

import skyvue_1 from '../../assets/skyvue_1.png';
import cerner_cardio from '../../assets/cerner_cardio.png';

const bodyHeight = 100;

type Props = {
  onShow?: (id: string) => void;
};

export const Content = ({ onShow }: Props) => {
  const { height } = useWindowSize();
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, bodyHeight], [0, 250]);
  const y2 = useTransform(scrollY, [0, bodyHeight], [0, -100]);
  const y3 = useTransform(scrollY, [0, bodyHeight], [0, -200]);
  const y4 = useTransform(scrollY, [0, bodyHeight], [0, -300]);

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      onShow?.('intro');
    }
  }, [inView]);

  return (
    <div className={styles.content}>
      <div className={styles.shadow} />
      <div className={styles.panels}>
        <div style={{ height: height / 8 }} ref={ref} id="intro" />
        <motion.div
          style={{
            y: y1,
            x: '30%',
            width: '70%',
            filter: 'drop-shadow(5px 5px 4px var(--bg-primary))',
          }}
        >
          <Name />
        </motion.div>
        <motion.div style={{ y: y2, x: '75%', width: '60%' }}>
          <motion.div
            style={{
              display: 'flex',
              width: '100%',
              filter: 'drop-shadow(5px 5px 4px var(--bg-primary))',
            }}
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ delay: 1 }}
          >
            <Disciplines />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: y3, x: 0, width: '100%' }}>
          <FloatingBox
            style={{
              marginRight: '10%',
              paddingRight: '25px',
              paddingTop: '25px',
              paddingLeft: '25px',
              marginLeft: '20%',
              marginTop: '100px',
            }}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                fontSize: '20px',
                lineHeight: '1.3',
                flexDirection: 'column',
              }}
            >
              <div
                className="extra-bold-text"
                style={{ justifySelf: 'flex-start', fontSize: '30' }}
              >
                hello!
              </div>
              <p
                className="light-text"
                style={{
                  textAlign: 'right',
                }}
              >
                I'm Juan Narváez, and I enjoy desiging and writing software (amongst other things).
                I've spent most of my career working on frontend applications in the realm of
                visualization and image processing (mostly medical imaging). I've also written a
                variety of backend services for processing and streaming image data, as well as the
                corresponding frontend components to take advantage of those services.
              </p>
            </div>
          </FloatingBox>
        </motion.div>

        <motion.div style={{ height: height / 3 }} />

        <ContentAnchor y={y4} id={'experience'} onShow={onShow}>
          experience
        </ContentAnchor>

        <motion.div style={{ height: 50 }} />

        <SummaryBox
          title={'intellectual property'}
          logo={patentedLogo}
          highlights={[
            'Patent on Remote Desktop Visualization / Compression / Delivery to a Browser',
            'Provisional Patent on Image Caching for High Frame Rates',
            'Provisional Patent on Modeling of Relationships of 2D/3D Images for Linked Display & Navigation',
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
            'data aggregation & registration',
          ]}
        />

        <SummaryBox
          title={'anedot'}
          years={`feb . 2022  -  present`}
          logo={anedotLogo}
          positions={['Lead Software Engineer', 'Director of Engineering', 'sr. Software Engineer']}
          organization="Engineering, Action Pages, Infrastructure"
          highlights={[
            'Led teams implementing Anedot X feature uplift & rollout',
            'Worked to create pixel - perfect replications of visual designs and interactions',
            'Developed next iteration of page builder',
            'Oversaw contributions to newest frontend',
            'Mentored junior engineers on team',
            'Various Custom UI Components',
            'Context Aware Multi Monitor React Components',
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
            'clickup',
            'vite',
            'ruby',
            'rails'
          ]}
        />

        <SummaryBox
          title={'hudl'}
          years={'oct . 2021  -  feb . 2022'}
          logo={hudlLogo}
          positions={['Lead Engineer']}
          organization="Hudl Beta"
          highlights={[
            'Implemented Facets of New Insights Module',
            'Overview Stats Report',
            'Various Visualization Modules',
            'Dynamic Layout System',
            'Multi Monitor Layout Manager',
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
          images={[
            insights_module,
            betaReports,
            flexible1
          ]}
        />

        <SummaryBox
          title={'cerner (oracle)'}
          years={'oct . 2017  -  oct . 2021'}
          logo={oracleLogo}
          positions={['Associate Principal Engineer', 'Senior Software Architect']}
          organization="Clinical Imaging"
          highlights={[
            'Designed / Developed Cerner ImageViewer as a successor to Cerner SkyVue',
            'IHE Compliant Web App for Viewing / Evaluating / Manipulating / Measuring Clinical Images',
            'Developed an Image Cache / layered strategy to support high FPS rendering in the browser of Ultrasound & other clinical images',
            'Multi Monitor React Components',
            'Automated Testing Framework',
            'Reusable Dashboard for Aggregating Automated Test Data & Regulatory Reporting',
            'Dashboard for the Presentation & Management of Imaging Archive Data',
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
            'data aggregation & registration',
          ]}
          images={[
            cerner_cardio,
            skyvue_1
          ]}
        />

        <SummaryBox
          title={'apple'}
          years={'jan . 2014  -  oct . 2017'}
          logo={appleLogo}
          positions={['POI Engineer']}
          organization="Maps"
          highlights={[
            'Worked on internal web app for processing POI data for the Maps platform',
            'Visualization and editing of Transit Shape Data',
            'Designed / Developed features for real time reporting & management of transit incidents',
            'Apple Pay data ingest',
            'Developed visualizations for managing vendor data mapping & normalization',
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
            'data aggregation & registration',
          ]}
        />

        <SummaryBox
          title={'cerner (oracle)'}
          years={'june . 2007  -  jan . 2014'}
          logo={oracleLogo}
          positions={['Software Architect', 'Senior Software Engineer', 'Entry Level Engineer']}
          organization="Clinical Imaging"
          highlights={[
            'Designed & Developer the Cerner SkyVue Imaging Platform',
            'Java / C++ based Desktop Application for Diagnostic & Distribution Imaging',
            'Zero Footprint Imaging Application',
            'Custom SWT UI Components',
            'Developed a Multi Monitor SWT Workbench',
            'Real-time Apoplication Monitoring Services & Visualizations',
            'Web Application for Workflow Assessments',
            'High Availability Distributed Disk Cache',
            'Java HTTP Libraries',
            'DICOM WADO Web Services',
            'WMI Library to bridge into Java',
            'OAuth Utilities & Configuration Management Framework',
            'HTTP Streaming Libraries for Desktop Mirroring via AirPlay 1',
            'Parallel JPEG Encoder',
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
            'data aggregation & registration',
          ]}
        />

        <ContentAnchor id={'education'} style={{ marginBottom: '6vmin' }} onShow={onShow}>
          education
        </ContentAnchor>

        <SummaryBox
          title={'m.s.e.e'}
          years={'sept . 2005  -  may . 2007'}
          logo={washULogo}
          highlights={[
            `Master's of Electrical Engineering`,
            'Focus on Radiological Imaging & Mathematics',
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

        <FloatingBox
          style={{
            marginRight: '30%',
            marginLeft: '30%',
            padding: '3vmin',
            marginBottom: '6vmin',
          }}
        >
          <div className="light-text" style={{ textAlign: 'center', fontSize: '4vmin' }}>
            This site was created with reactJS, threeJS, and framer motion.
          </div>
        </FloatingBox>
      </div>
    </div>
  );
};
