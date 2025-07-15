import { useMemo, useState } from 'react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { getAuth } from '~/lib/auth/auth.server';
import type { Route } from './+types/route';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const filteredMangaLogs = useMemo(() => {
    let logs = [...mangaLogs];

    if (searchTerm) {
      logs = logs.filter((log) =>
        log.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    logs.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return (b.score ?? 0) - (a.score ?? 0);
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return logs;
  }, [mangaLogs, searchTerm, sortBy]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manga Log</h1>
        <Form action="/manga/new" method="post">
          <Button variant="default" type="submit" name="_action" value="new">
            New
          </Button>
        </Form>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="score">Score</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredMangaLogs.length === 0 ? (
        <p>No manga logs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMangaLogs.map((log) => (
            <div key={log.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{log.title}</h2>
              <p>Score: {log.score}</p>
              <p>Status: {log.is_completed ? 'Completed' : 'In Progress'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
