import { getAuth } from '~/lib/auth/auth.server';
import type { Route } from "./+types/route";

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (!user) {
    return { mangaLogs: [] };
  }

  const mangaLogs = await context.db.query.mangaLogs.findMany({
    where: (mangaLogs, { eq }) => eq(mangaLogs.user_id, user.id),
  });

  return { mangaLogs };
};

const App = ({ loaderData }: Route.ComponentProps) => {
  const { mangaLogs } = loaderData;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manga Log</h1>
      {mangaLogs.length === 0 ? (
        <p>No manga logs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mangaLogs.map((log) => (
            <div key={log.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{log.title}</h2>
              <p>Score: {log.score}</p>
              <p>Status: {log.is_completed ? "Completed" : "In Progress"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
