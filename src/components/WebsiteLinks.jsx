import React from 'react';

const WebsiteLinks = () => {
  const links = [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "Personal Blog", url: "https://yourwebsite.com" },
  ];

  return (
    <section className="bg-white/10 backdrop-blur rounded-xl shadow-soft p-8">
      <h2 className="text-2xl font-semibold text-primary-100 text-center mb-6">Find Me Online</h2>
      <ul className="space-y-4 max-w-sm mx-auto">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 bg-primary-600 hover:bg-primary-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-soft hover:shadow-medium"
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
