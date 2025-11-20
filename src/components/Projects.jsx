import { useState } from "react";
import { motion } from "framer-motion";

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
      link: "https://github.com/TeodorMilchevHTTp?tab=repositories",
    },
    {
      title: "HabitFlow",
      description: "Android/iOS application for habit formation.",
      tech: "Expo, Firebase, JavaScript",
      link: "https://github.com/TeodorMilchevHTTp/HabitFlow",
    },
  ];

  const projectsPerPage = 3;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * projectsPerPage;
  const visibleProjects = projectList.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const hasNextPage = startIndex + projectsPerPage < projectList.length;
  const hasPrevPage = page > 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="space-y-6">
        {visibleProjects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl
                       bg-black/40 border border-cyan-500/30 shadow-[0_8px_30px_rgba(0,255,255,0.1)]
                       backdrop-blur-md hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={`https://image.thum.io/get/width/900/noanimate/${p.link}`}
              alt={p.title}
              className="w-full md:w-48 h-32 object-cover rounded-xl border border-cyan-500/20 shadow-inner"
              onError={(e) => (e.target.style.display = "none")}
            />

            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-cyan-400">{p.title}</h3>
              <p className="text-gray-200 dark:text-slate-300">
                {p.description}
              </p>
              {p.tech && (
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-cyan-400">Tech:</span>{" "}
                  {p.tech}
                </p>
              )}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-[0_8px_30px_rgba(0,204,255,0.2)]
                           hover:translate-y-[-1px] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all"
              >
                Visit Website
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {hasPrevPage && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-6 py-2 bg-cyan-600 text-black rounded hover:bg-cyan-500 shadow-md hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition"
          >
            Back
          </button>
        )}

        {hasNextPage && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 bg-cyan-600 text-black rounded hover:bg-cyan-500 shadow-md hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition"
          >
            Next
          </button>
        )}
      </div>
    </motion.section>
  );
};

export default Projects;
