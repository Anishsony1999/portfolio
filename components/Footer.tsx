import React from 'react';
import { GitHubIcon, LinkedInIcon, DevToIcon, HackerRankIcon, LeetCodeIcon, InstagramIcon, CoffeeIcon } from '../constants';

const socialLinks = [
  { href: "https://github.com/Anishsony1999", icon: <GitHubIcon className="h-6 w-6" />, label: "GitHub" },
  { href: "https://linkedin.com/in/anish-sony", icon: <LinkedInIcon className="h-6 w-6" />, label: "LinkedIn" },
  { href: "https://dev.to/anishsony", icon: <DevToIcon className="h-6 w-6" />, label: "Dev.to" },
  { href: "https://www.hackerrank.com/anishsony1998", icon: <HackerRankIcon className="h-6 w-6" />, label: "HackerRank" },
  { href: "https://www.leetcode.com/anish1999", icon: <LeetCodeIcon className="h-6 w-6" />, label: "LeetCode" },
  { href: "https://instagram.com/anish_sony_", icon: <InstagramIcon className="h-6 w-6" />, label: "Instagram" },
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-8 flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8">
          {socialLinks.map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-slate-400 hover:text-cyan-400 transition-colors">
              {link.icon}
            </a>
          ))}
        </div>
        <div className="mb-8">
            <a href="https://www.buymeacoffee.com/anishsony" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors py-2 px-4 border border-slate-700 rounded-full hover:border-cyan-500/50">
                <CoffeeIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Buy me a coffee</span>
            </a>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Designed & Built by Anish N</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;