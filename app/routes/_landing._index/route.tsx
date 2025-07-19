import { BookOpen, Star, TrendingUp, Users } from "lucide-react";
import { useRouteLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { getAuthClient } from "~/lib/auth/auth-client";
import { generateMeta } from "~/lib/meta";
import type { Route } from './+types/route';

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: "MangaLog - Your Personal Manga Companion",
    description: "Transform your manga reading experience with beautiful tracking, intelligent organization, and personal insights. Track your progress, rate series, and build your curated collection.",
    keywords: ["manga tracker", "reading progress", "manga collection", "anime", "japanese comics", "reading log"],
  });
}

export default function LandingIndex() {
  const rootData = useRouteLoaderData("root") as { baseURL: string; } | undefined;
  const { signIn: signInAuth } = getAuthClient({ baseURL: rootData?.baseURL || "" });

  const signInGoogle = async () => {
    await signInAuth.social({
      provider: "google",
      callbackURL: '/manga'
    });
  };

  const features = [
    {
      icon: BookOpen,
      title: "Track Your Reading",
      description: "Keep detailed logs of every manga you read with progress tracking"
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Score your favorite series and add personal notes for future reference"
    },
    {
      icon: TrendingUp,
      title: "Monitor Progress",
      description: "Track volumes and chapters read with visual progress indicators"
    },
    {
      icon: Users,
      title: "Personal Library",
      description: "Build your own curated collection of manga experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-400/5 dark:to-blue-400/5" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-purple-200 dark:border-purple-700">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Your Personal Manga Companion</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              MangaLog
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Transform your manga reading experience with beautiful tracking,
              <br className="hidden sm:block" />
              intelligent organization, and personal insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={signInGoogle}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Start Your Journey
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Free forever • No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to track your manga
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to enhance your reading experience and help you discover new favorites.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">
              Ready to organize your manga collection?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of manga enthusiasts who trust MangaLog to track their reading journey.
            </p>
            <Button
              size="lg"
              onClick={signInGoogle}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
