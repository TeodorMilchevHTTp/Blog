const WebsiteLinks = () => {
  const links = [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "Personal Blog", url: "https://yourwebsite.com" },
  ];

  return (
    <section className="bg-gray-50 dark:bg-white/10 backdrop-blur rounded-xl shadow-soft p-8 transition-colors duration-500">
      <h2 className="text-2xl font-semibold dark:text-primary-100 text-center mb-6">Find Me Online</h2>
      <ul className="space-y-4 max-w-sm mx-auto">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-gray-900 dark:text-white transition-colors duration-200 rounded font-semibold"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WebsiteLinks;
