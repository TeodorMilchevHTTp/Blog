import {motion} from 'framer-motion';

const AboutMe = () => (

  <motion.section 
    className="bg-white/10 backdrop-blur rounded-xl shadow-soft p-8 space-y-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    >
    <h2 className="text-2xl font-semibold text-primary-100 text-center">About Me</h2>
    <p className="text-slate-300 text-center">
      Hi, I'm a passionate developer who loves building full-stack apps and experimenting with new tech.
      This site showcases my work and a bit about me!
    </p>
  </motion.section>
);

export default AboutMe;
