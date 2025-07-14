import { Form, redirect, useNavigation } from "react-router"; // Keep json and redirect from react-router if available
import { z } from "zod";
// import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"; // Temporarily remove Remix specific types
import type { Route } from './+types/route';
import { MangaForm } from "./components/manga-form";

// Define the schema for Manga Log data for validation
const MangaLogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  score: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(1).max(5).optional()
  ),
  status: z.enum(["Reading", "Completed", "On-Hold", "Dropped", "Plan to Read"]).optional(),
  volume_progress: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0).optional()
  ),
  chapter_progress: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0).optional()
  ),
  note: z.string().optional(),
});

// Use any for types to bypass immediate TS errors
export async function loader({ request }: Route.LoaderArgs) {
  // In a real application, you would fetch existing manga log data here
  // if the route supported editing (e.g., /manga/:id/edit).
  // For now, we just return an empty object.
  return {};
}

// Use any for types to bypass immediate TS errors
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  try {
    // Validate form data using Zod schema
    const validatedData = MangaLogSchema.parse(data);

    // Send data to the API endpoint
    const response = await fetch("/api/manga", { // Use relative path for API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json() as { error?: string }; // Cast errorData to a known type
      return { errors: errorData.error || "Failed to save manga log" , status: response.status };
    }

    return redirect("/app"); // Redirect to the main page after successful submission
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors;
      return { errors , status: 400 };
    }
    return { errors: "An unexpected error occurred" , status: 500 };
  }
}

export default function MangaRoute({ actionData, loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Manga Log</h1>
      <Form method="post"> {/* Use Form component from react-router-dom */}
        <MangaForm
          errors={actionData?.errors}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  );
}
