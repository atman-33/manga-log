import { Link, Outlet, useNavigate, useRouteLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { getAuthClient } from "~/lib/auth/auth-client";

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
    });
  };

  const signOut = async () => {
    await signOutAuth();
    navigate("/");
  };

  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MangaLog
        </Link>
        <div>
          {rootData?.user ? (
            <div className="flex items-center gap-4">
              <span>{rootData.user.name}</span>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          ) : (
            <Button onClick={signInGoogle}>Login with Google</Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
