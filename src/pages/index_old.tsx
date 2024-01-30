// import { motion } from 'framer-motion'
// import { css } from '@/design/css'
// import useSWR from 'swr'

// import SlideLink from '@/components/slide_link'
// import Meta from '@/components/layout/meta'
// import { Spacer } from '@/components/primitives/spacer'
// import Project from '@/components/project'
// import HeroHeader from '@/components/hero_header'
// import Experience from '@/components/experience'
// import FluidStudy from '@/components/fluid_study'
// import InfiniteScroll from '@/components/infinite_scroll'
// import { useRef } from 'react'
// import ScrollSection from '@/components/infinite_scroll/scroll_section'

// const fetcher = (url) => fetch(url).then((res) => res.json())

// const SHOWCASE_GRID_POSITIONS = ['1 / 1 / span 1 / span 6', '1 / 7 / span 1 / -1', '2 / 1 / span 1 / span 4']

// const ease = [0.33, 1, 0.68, 1]

// const motionProps = {
//   initial: 'initial',
//   animate: 'visible',
// }

// const useData = () => {
//   const { data: projectsData, error: projectsError } = useSWR('/api/projects', fetcher)
//   const { data: experiencesData, error: experiencesError } = useSWR('/api/experiences', fetcher)
//   const { data: writingData, error: writingError } = useSWR('/api/writing', fetcher)

//   const projects = projectsData ? JSON.parse(projectsData) : []
//   const experiences = experiencesData ? JSON.parse(experiencesData) : []
//   const writing = writingData ? JSON.parse(writingData) : []

//   return {
//     projects,
//     experiences,
//     writing,
//   }
// }

// const Index = ({ ...props }) => {
//   const { projects, experiences, writing } = useData()
//   const containerRef = useRef<HTMLDivElement>()

//   return (
//     <>
//       <Meta />

//       <div
//         className={css({
//           width: '100%',
//           position: 'absolute',
//           left: 0,
//           top: 0,
//           right: 0,
//           transform: 'translateY(0px)',
//           willChange: 'transform',
//           display: 'grid',
//           gridTemplateColumns: 'subgrid',
//           gridAutoRows: '1fr',
//           gridRowGap: '$8',
//           gridColumn: '1 / -1',
//         })}
//         ref={containerRef}
//       >
//         <InfiniteScroll containerRef={containerRef}>
//           <ScrollSection className={sectionStyles}>
//             <HeroHeader>
//               <span>I&apos;m&nbsp;</span>
//               <span>
//                 <SlideLink href='/about'>Ben</SlideLink>
//               </span>
//               <span>, a&nbsp;</span>
//               <span
//                 className={css({
//                   color: '$purple10',
//                 })}
//               >
//                 developer&nbsp;
//               </span>
//               <span>&&nbsp;</span>
//               <span
//                 className={css({
//                   color: '$purple10',
//                 })}
//               >
//                 designer&nbsp;
//               </span>
//               <span>based in Perth&nbsp;</span>
//             </HeroHeader>
//           </ScrollSection>

//           {writing.map(({ key, ...s }, index) => {
//             return (
//               <ScrollSection key={key} className={sectionStyles}>
//                 <FluidStudy {...s} />
//               </ScrollSection>
//             )
//           })}

//           {experiences && (
//             <ScrollSection className={sectionStyles}>
//               <motion.section
//                 className={css({
//                   width: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignSelf: 'center',
//                   alignItems: 'flex-start',
//                   gap: {
//                     base: '$6',
//                     md: '$9',
//                   },
//                   gridColumn: '1 / -1',
//                 })}
//               >
//                 {experiences.map(({ key, ...e }) => (
//                   <span key={key}>
//                     <Experience {...e} />
//                     <Spacer />
//                   </span>
//                 ))}
//               </motion.section>
//             </ScrollSection>
//           )}

//           {projects && (
//             <ScrollSection className={sectionStyles}>
//               <motion.section
//                 className={css({
//                   width: '100%',
//                   display: 'grid',
//                   gridTemplateColumns: {
//                     base: '1fr',
//                     md: 'repeat(2, 1fr)',
//                   },
//                   gridAutoRows: 'auto',
//                   alignSelf: 'center',
//                   gridGap: '$6',
//                   gridColumn: '1 / -1',
//                 })}
//               >
//                 {projects.map((p) => (
//                   <Project key={p.name} project={p} />
//                 ))}
//               </motion.section>
//             </ScrollSection>
//           )}
//         </InfiniteScroll>
//       </div>
//     </>
//   )
// }

// const sectionStyles = css({
//   position: 'relative',
//   height: '100dvh',
//   width: '100%',
//   display: 'grid',
//   gridTemplateColumns: 'subgrid',
//   gridTemplateRows: 'subgrid',
//   gridColumn: '1 / -1',
// })

// export default Index

const Index = () => {
  return <div>old</div>
}
export default Index
