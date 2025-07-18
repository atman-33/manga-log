interface FormHeaderProps {
  isEditing: boolean;
}

export function FormHeader({ isEditing }: FormHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
        {isEditing ? 'Edit Manga' : 'Add New Manga'}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        {isEditing ? 'Update your manga details' : 'Add a new manga to your collection'}
      </p>
    </div>
  );
}