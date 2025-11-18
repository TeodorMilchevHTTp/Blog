import { motion } from "framer-motion";

const ProjectRow = ({ title, description, tech, link }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 shadow-lg"
  >
    {/* Thumbnail */}
    <img
      src={`https://image.thum.io/get/width/900/noanimate/${link}`}
      alt={title}
      className="w-full md:w-48 h-32 object-cover rounded-lg"
      onError={(e) => (e.target.style.display = "none")}
    />

    {/* Text content */}
    <div className="flex-1 space-y-2">
      <h3 className="text-xl font-bold text-primary-100">{title}</h3>

      <p className="text-gray-800 dark:text-slate-300">{description}</p>

      {tech && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-primary-100">Tech:</span> {tech}
        </p>
      )}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 px-4 py-2 rounded bg-primary-100 text-white hover:bg-primary-200 transition"
      >
        Visit Website
      </a>
    </div>
  </motion.div>
);

const Projects = () => {
  const projectList = [
    {
      title: "Tune-Vote",
      description: "A real-time voting app for music tracks.",
      tech: "React, Express, WebSockets, MongoDB",
      link: "https://tune-vote.pragmatino.xyz",
    },
    {
      title: "Typo.exe Store",
      description: "A custom e-commerce experience with product management.",
      tech: "React, Node.js, REST API, Stripe",
      link: "https://github.com/TeodorMilchevHTTp/Store",
    },
    {
      title: "Task Manager",
      description: "Task manager with Firebase Authentication + Firestore DB.",
      tech: "React, Firebase, Tailwind",
      link: "https://github.com/yourusername/task-manager",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-primary-100 text-center">
        My Projects
      </h2>

      <div className="space-y-6">
        {projectList.map((p, i) => (
          <ProjectRow key={i} {...p} />
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
