export default function RecipeDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow animate-pulse space-y-4">
      <div className="bg-gray-300 h-64 w-full rounded-lg" />
      <div className="h-8 bg-gray-300 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-14 bg-amber-100 rounded" />
        <div className="h-6 w-16 bg-amber-100 rounded" />
      </div>
      <div className="space-y-2 mt-6">
        <div className="h-5 bg-gray-300 w-1/2 rounded" />
        <div className="h-4 bg-gray-200 w-full rounded" />
        <div className="h-4 bg-gray-200 w-11/12 rounded" />
        <div className="h-4 bg-gray-200 w-3/4 rounded" />
      </div>
      <div className="space-y-2 mt-6">
        <div className="h-5 bg-gray-300 w-1/2 rounded" />
        <div className="h-4 bg-gray-200 w-full rounded" />
        <div className="h-4 bg-gray-200 w-5/6 rounded" />
      </div>
    </div>
  );
}
