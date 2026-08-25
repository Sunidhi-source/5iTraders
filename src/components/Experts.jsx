import { motion } from 'framer-motion'
import PlaceholderSlot from './PlaceholderSlot'
import ceoPhoto from '../assets/team/ceo-mayank-goswami.webp'
import ctoPhoto from '../assets/team/cto-anirudh-sharma.webp'
import csoPhoto from '../assets/team/cso-kartik-sharma.webp'
import cooPhoto from '../assets/team/coo-abhishek-yadav.webp'

const EXPERTS = [
  { name: 'Mayank Goswami', role: 'CEO', bio: 'Sets the vision and strategy behind 5i Traders.', photo: ceoPhoto },
  { name: 'Anirudh Sharma', role: 'CTO', bio: 'Builds and maintains the algorithms and platform.', photo: ctoPhoto },
  { name: 'Kartik Sharma', role: 'CSO', bio: 'Drives strategy and market positioning.', photo: csoPhoto },
  { name: 'Abhishek Yadav', role: 'COO', bio: 'Runs day-to-day operations and client delivery.', photo: cooPhoto },
]

export default function Experts() {
  return (
    <section className="section-pad border-t border-mist/10">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">The Team</span>
          <h2 className="mt-4 text-3xl font-semibold text-mist md:text-4xl">Meet our experts</h2>
          <p className="mt-4 text-mist/55">
            The people building, testing, and monitoring every algorithm behind 5i Traders.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTS.map((expert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card flex flex-col items-center p-6 text-center"
            >
              <PlaceholderSlot
                src={expert.photo}
                label={`${expert.name} — ${expert.role}`}
                aspect="aspect-square"
                rounded="rounded-full"
                className="w-28"
                glow
              />
              <h3 className="mt-5 font-display text-sm font-semibold text-mist">{expert.name}</h3>
              <p className="mt-1 font-mono text-xs text-signal/80">{expert.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-mist/45">{expert.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
