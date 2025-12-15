import { Skeleton } from "@/components/Skeleton";

export default function CategoriesLoading() {
  return (
    <main className="py-6">
      {/* Category Header Skeleton */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-4 w-64 mb-6" />
      </section>

      {/* Categories Grid Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-end">
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
