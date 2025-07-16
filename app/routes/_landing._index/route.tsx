import { useRouteLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { getAuthClient } from "~/lib/auth/auth-client";

export default function LandingIndex() {
  const rootData = useRouteLoaderData("root") as { baseURL: string; } | undefined;
  const { signIn: signInAuth } = getAuthClient({ baseURL: rootData?.baseURL || "" });

  const signInGoogle = async () => {
    await signInAuth.social({
      provider: "google",
      callbackURL: '/manga'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to MangaLog</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Your personal manga tracking companion. Log, score, and organize your reading journey.
      </p>
      <Button size="lg" onClick={signInGoogle}>
        Get Started - Login with Google
      </Button>
    </div>
  );
}
