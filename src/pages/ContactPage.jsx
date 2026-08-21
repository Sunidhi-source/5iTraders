import { motion } from "framer-motion";
import ContactSection from "../components/ContactSection";
import DividerBanner from "../components/DividerBanner";

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-40 pb-8 md:pt-48 md:pb-10">
        <div className="container-xl relative z-10 px-6 text-center md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Contact</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mist md:text-5xl">
              Let&apos;s talk
            </h1>
          </motion.div>
        </div>
      </section>
      <DividerBanner />
      <ContactSection bordered={false} compactTop />
    </div>
  );
}
