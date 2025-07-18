import * as schema from "~/database/schema";
import { generateMeta } from '~/lib/meta';
import type { Route } from './+types/route';
import { Welcome } from "./components/welcome";

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: "Home Demo",
    description: "Welcome to React Router demo with Cloudflare Workers and D1 database",
    keywords: ["react router", "cloudflare workers", "demo"],
    noIndex: true, // Don't index demo pages
  });
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  if (typeof name !== "string" || typeof email !== "string") {
    return { guestBookError: "Name and email are required" };
  }

  name = name.trim();
  email = email.trim();
  if (!name || !email) {
    return { guestBookError: "Name and email are required" };
  }

  try {
    await context.db.insert(schema.guestBook).values({ name, email });
  } catch (error) {
    return { guestBookError: "Error adding to guest book" };
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  const guestBook = await context.db.query.guestBook.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return {
    guestBook,
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <Welcome
      guestBook={loaderData.guestBook}
      guestBookError={actionData?.guestBookError}
      message={loaderData.message}
    />
  );
}
