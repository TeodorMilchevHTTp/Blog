import { motion } from "framer-motion";

const AboutMe = () => (
  <motion.section
    className="relative w-full rounded-2xl bg-gradient-to-br from-black/70 to-[#041022] border border-cyan-700/20 p-6 shadow-[0_12px_40px_rgba(0,255,255,0.05)] backdrop-blur-md"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-200 to-white text-center mb-4">
      About Me
    </h2>
    <p className="text-slate-300 text-sm sm:text-base text-center">
      Hi, I'm a passionate developer who loves building full-stack apps,
      experimenting with new tech, and creating immersive digital experiences.
      "This is just the beginning of the end.  (2003)"
    </p>
  </motion.section>
);

export default AboutMe;
