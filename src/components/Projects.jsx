import {motion} from 'framer-motion';

// Individual Project Card Component
const ProjectCard = ({ title, description, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{scale: 1.1, rotate: -1}}
    whileTap={{scale : 0.95, rotate: 0}}
    className="block bg-gray-50 dark:bg-white/10 ... transition-colors duration-300"

  >
    {/* Optional: Website Thumbnail */}
    <img
      src={`https://image.thum.io/get/width/900/noanimate/${link}`}
      alt={`${title} preview`}
      //fix: image needs to fit in the card
      className="rounded-md mb-4 w-full h-40 object-cover"
      onError={(e) => (e.target.style.display = 'none')}
    />
    <h3 className="text-lg font-semibold text-primary-100">{title}</h3>
    <p className="text-gray-800 dark:text-slate-300 mt-2">{description}</p>

  </motion.a>
);

// Main Projects Component
const Projects = () => {
  const projectList = [
    {
      title: "Tune-Vote",
      description: "A web app to vote for your favorite tunes in real-time.",
      link: "https://tune-vote.pragmatino.xyz",
    },
    {
      title: "Typo.exe",
      description: "A webstore for selling stuff.",
      link: "https://github.com/TeodorMilchevHTTp/Store",
    },
    {
      title: "Task Manager",
      description: "A to-do app with Firebase authentication and Firestore.",
      link: "https://github.com/yourusername/task-manager",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-light-card dark:bg-white/10 backdrop-blur rounded-xl shadow-soft p-8 transition-colors duration-500"
    >
      <h2 className="text-2xl font-semibold text-primary-100 text-center mb-8">My Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projectList.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
