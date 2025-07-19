import { BookOpen, Mail } from "lucide-react";
import { Link } from "react-router";
import { GitHubIcon, XIcon } from "~/components/icons";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MangaLog
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              The ultimate platform for tracking and managing your manga reading experience. Keep track of what you've read and discover your next favorite series.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border border-gray-200 dark:border-gray-700"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href="https://x.com"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border border-gray-200 dark:border-gray-700"
                aria-label="X"
              >
                <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href="mailto:contact@mangalog.com"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border border-gray-200 dark:border-gray-700"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#features" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 MangaLog. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Made with ❤️ for manga lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}