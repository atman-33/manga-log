import { BookOpen } from "lucide-react";
import { Link, Outlet, useNavigate, useRouteLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { getAuthClient } from "~/lib/auth/auth-client";
import { LandingFooter } from "./components/footer";

function LandingHeader() {
  const navigate = useNavigate();
  // Attempt to get user data from the root loader, if available.
  // This is a fallback and might not always be present on the landing route.
  const rootData = useRouteLoaderData("root") as {
    user: { name: string; };
    baseURL: string;
  } | undefined;

  const { signIn: signInAuth, signOut: signOutAuth } = getAuthClient({ baseURL: rootData?.baseURL || "" });

  const signInGoogle = async () => {
    await signInAuth.social({
      provider: "google",
      callbackURL: '/manga'
    });
  };

  const signOut = async () => {
    await signOutAuth();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MangaLog
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="#features" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Features
            </Link>
            <Link to="#about" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              About
            </Link>
          </nav>

          <div>
            {rootData?.user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">{rootData.user.name}</span>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={signInGoogle}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Login with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function LandingLayout() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
