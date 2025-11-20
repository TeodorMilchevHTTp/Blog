// Dashboard.jsx — Cyber Dashboard (Cyan Neon Accent)
import AboutMe from "./AboutMe";
import CVRequest from "./CVRequest";
import ThemeToggle from "../subComponents/ThemeToggle";
import Projects from "./Projects";
import {
  FaPowerOff,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaBars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showCVRequest, setShowCVRequest] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#06070c] to-[#07101a] text-slate-100 antialiased px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-600/10 hover:border-cyan-400 transition-all duration-200 shadow-[0_6px_24px_rgba(0,255,255,0.06)]"
            >
              <FaBars size={18} className="text-cyan-300" />
            </button>

            <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-800/30 to-blue-900/20 border border-cyan-600/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="text-xs text-cyan-200">beta</span>
            </div>

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-200 to-white drop-shadow-[0_8px_32px_rgba(0,255,255,0.06)]">
              <span className="inline-block">WebDweebs</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-[0_8px_30px_rgba(0,204,255,0.12)] hover:translate-y-[-1px] transition-transform"
              >
                <FaPowerOff />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            {/* Small theme toggle on mobile */}
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Profile / CTA */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-black/50 to-white/2 border border-cyan-600/10 p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-black font-bold">
                  <span>Y</span>
                </div>
                <div>
                  <div className="text-sm text-slate-200 font-semibold mb-2">
                    Teodor Milchev{user ? `, ${user.name?.split(" ")[0]}` : ""}
                  </div>
                  <div className="text-xs text-slate-400">
                    Graduate FullStack Developer
                  </div>
                  <div className="text-xs text-slate-400">
                    Gamer
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <button
                  onClick={() => setShowCVRequest(true)}
                  className="w-full px-4 py-2 rounded-md bg-black/60 border border-cyan-500/30 text-cyan-100 hover:shadow-[0_8px_30px_rgba(0,255,255,0.08)] transition"
                >
                  Request CV
                </button>
                <button
                  onClick={() => setShowAbout(true)}
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 text-black font-medium hover:scale-[1.02] transition-transform"
                >
                  About Me
                </button>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-2xl p-4 bg-black/40 border border-cyan-600/6 backdrop-blur-md shadow-sm">
              <h3 className="text-sm font-semibold text-cyan-200 mb-3">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/games"
                  className="text-sm text-slate-100 hover:text-cyan-300 transition"
                >
                  Games
                </Link>
                <Link
                  to="/forum"
                  className="text-sm text-slate-100 hover:text-cyan-300 transition"
                >
                  Forum
                </Link>
                <a
                  href="#contact"
                  className="text-sm text-slate-100 hover:text-cyan-300 transition"
                >
                  Contact - no page yet
                </a>
              </nav>
            </div>

            {/* Socials */}
            <div className="rounded-2xl p-4 bg-gradient-to-br from-black/30 to-black/10 border border-cyan-600/6 flex items-center justify-between">
              <div className="text-xs text-slate-400">Social</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/TeodorMilchevHTTp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-cyan-300 transition"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/teodor-milchev-2770a4193/?originalSubdomain=uk"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-cyan-300 transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://instagram.com/teodorchouu"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-cyan-300 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/people/%25D0%25A2%25D0%25B5%25D0%25BE%25D0%25B4%25D0%25BE%25D1%2580-%25D0%259C%25D0%25B8%25D0%25BB%25D1%2587%25D0%25B5%25D0%25B2/pfbid0MHyH8M8VT6yErCNsVphU2VtBfrJL3VtBWcU516wRY5Lu56zyEnAtMuRtPVUvZnJUl/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-cyan-300 transition"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>
          </aside>

          {/* Main column: Projects / Content */}
          <section className="lg:col-span-2 space-y-6">
            {/* Spotlight Card */}
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#021019] to-[#061024] border border-cyan-700/20 p-6 shadow-[0_12px_40px_rgba(0,255,255,0.05)]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Latest Projects
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Aiming to expand with more exciting web
                    applications and projects in the near future.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Projects />
              </div>
            </div>

            {/* Stats & Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl p-4 bg-black/40 border border-cyan-600/8">
                <div className="text-xs text-slate-400">Projects</div>
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-xs text-slate-500">recent & active</div>
              </div>

              <div className="rounded-2xl p-4 bg-black/40 border border-cyan-600/8">
                <div className="text-xs text-slate-400">Games in list</div>
                <div className="text-2xl font-bold text-white">{2}</div>
                <div className="text-xs text-slate-500">
                  tracked across lists
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-black/40 border border-cyan-600/8">
                <div className="text-xs text-slate-400">
                  I need to add something here
                </div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-xs text-slate-500">loading...</div>
              </div>
            </div>

            {/* CTA / News */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-cyan-900/30 to-black/10 border border-cyan-700/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Playtesting Event
                  </h3>
                  <p className="text-sm text-slate-400">
                    Join the weekend session — limited slots.
                  </p>
                </div>
                <div>
                  <button className="px-4 py-2 rounded-md bg-cyan-400 text-black font-semibold hover:shadow-[0_10px_30px_rgba(0,205,255,0.12)] transition">
                    Not implenented
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-cyan-800/30 pt-8 text-center text-slate-400">
          <div className="max-w-3xl mx-auto space-y-2">
            <div>
              &copy; {new Date().getFullYear()} Teodor Milchev. Built with React
              & Tailwind.
            </div>
          </div>
        </footer>
      </div>

      {/* DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside className="relative z-10 w-72 max-w-xs h-full bg-gradient-to-b from-black/80 to-[#041021] border-r border-cyan-700/20 p-6 shadow-2xl animate__animated animate__fadeInRight">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center font-bold text-black">
                Y
              </div>
              <div className="mt-3">
                <div className="text-sm text-slate-200 font-semibold">
                  {user ? user.name : "Guest"}
                </div>
                <div className="text-xs text-slate-400">
                  {user ? user.email : "login to manage"}
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-3 mt-4">
              <Link
                to="/games"
                onClick={() => setDrawerOpen(false)}
                className="text-slate-200 hover:text-cyan-300 transition"
              >
                Games
              </Link>
              
              <button
                onClick={() => {
                  setShowAbout(true);
                  setDrawerOpen(false);
                }}
                className="text-slate-200 text-left hover:text-cyan-300 transition"
              >
                About Me
              </button>
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="text-slate-200 hover:text-cyan-300 transition"
                >
                  Login
                </Link>
              )}
            </nav>

            <div className="mt-auto pt-6 text-slate-400 text-xs">
              <div>Version 1.0</div>
            </div>
          </aside>
        </div>
      )}

      {/* CV Request Modal */}
      {showCVRequest && (
        <div
          onClick={(e) =>
            e.target === e.currentTarget && setShowCVRequest(false)
          }
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-black/70 to-[#041022] border border-cyan-700/20 p-6 shadow-2xl">
            <button
              onClick={() => setShowCVRequest(false)}
              className="absolute top-4 right-4 text-slate-300"
            >
              ✕
            </button>
            <CVRequest />
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowAbout(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-black/70 to-[#041022] border border-cyan-700/20 p-6 shadow-2xl">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-slate-300"
            >
              ✕
            </button>
            <AboutMe />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
