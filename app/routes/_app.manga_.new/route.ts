import { randomUUID } from 'node:crypto';
import { redirect } from 'react-router';
import { generateMeta } from '~/lib/meta';
import type { Route } from './+types/route';

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: 'Add New Manga',
    description:
      'Add a new manga to your collection and start tracking your reading progress.',
    keywords: ['add manga', 'new manga', 'manga tracking'],
    noIndex: true, // Don't index action-only routes
  });
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      const newMangaId = randomUUID();
      return redirect(`/manga/${newMangaId}/edit`);
    }

    default: {
      return null;
    }
  }
};
