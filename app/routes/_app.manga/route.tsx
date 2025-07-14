import { Form, useNavigation } from "react-router"; // Keep Form and useNavigation from react-router-dom
import { z } from "zod";
import { MangaLogSchema } from "~/lib/schemas"; // Import MangaLogSchema
import type { Route } from './+types/route';
import { MangaForm } from "./components/manga-form";

type MangaFormErrors = {
  title?: string[];
  score?: string[];
  status?: string[];
  volume_progress?: string[];
  chapter_progress?: string[];
  note?: string[];
  general?: string[]; // For general errors not tied to a specific field
};

export async function loader({ request }: Route.LoaderArgs) {
  // In a real application, you would fetch existing manga log data here
  // if the route supported editing (e.g., /manga/:id/edit).
  // For now, we just return an empty object.
  return { status: 200, headers: { 'Content-Type': 'application/json' }} ;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  try {
    const validatedData = MangaLogSchema.parse(data);

    const response = await fetch("/api/manga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json() as { error?: string; errors?: MangaFormErrors };
      // Return a Response object with errors
      return {
        errors: errorData.errors || { general: [errorData.error || "Failed to save manga log"] },
        status: response.status,
      };
    }

    // Redirect using a Response object
    return new Response(null, { status: 302, headers: { Location: "/app" } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: MangaFormErrors = error.flatten().fieldErrors;
      return new Response(JSON.stringify({ errors }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    return {
      errors: { general: ["An unexpected error occurred"] },
      status: 500,
    };
  }
}

export default function MangaRoute({ actionData, loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Cast actionData.errors to MangaFormErrors to match the prop type
  const formErrors: MangaFormErrors | undefined = actionData?.errors;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Manga Log</h1>
      <Form method="post">
        <MangaForm
          errors={formErrors}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  );
}
