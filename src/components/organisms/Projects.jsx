import SectionHead from '../molecules/SectionHead'
import ProjectCard from '../molecules/ProjectCard'
import { projects } from '../../data/projects'

export default function Projects() {
  return (
    <section className="section work" id="projects">
      <div className="container">
        <SectionHead dark index="03" label="Projects" title="Selected work." />
        <div className="work__stack">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} position={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
