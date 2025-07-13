import { MangaForm } from "./components/manga-form";

export default function MangaRoute() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Manga Log</h1>
      <MangaForm />
    </div>
  );
}
