export default function RecipeSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 w-full h-48" />

      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-12 bg-amber-100 rounded" />
          <div className="h-5 w-16 bg-amber-100 rounded" />
        </div>
      </div>
    </div>
  );
}
