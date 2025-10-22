import {motion} from 'framer-motion';

const ProjectCard = ({ title, description, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white/10 backdrop-blur rounded-lg p-6 shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-[1.02] transform"
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
    <p className="text-slate-300 mt-2">{description}</p>
  </a>
);


const Projects = () => {
  const projectList = [
    {
      title: "Tune-Vote",
      description: "A web app to vote for your favorite tunes in real-time.",
      link: "https://tune-vote.pragmatino.xyz",
    },
    {
      title: "Weather App",
      description: "A weather forecast app using OpenWeatherMap API.",
      link: "https://github.com/yourusername/weather-app",
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
      className="bg-white/10 backdrop-blur rounded-xl shadow-soft p-8"
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
