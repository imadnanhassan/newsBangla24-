import { Skeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <main className="py-6">
      {/* Category Header Skeleton */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-full mb-6" />
      </section>

      {/* Featured Article Section Skeleton */}
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <Skeleton className="aspect-video w-full mb-4" />
          </div>
          <div className="lg:col-span-1 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-24 h-24 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Grid Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </section>

      {/* Load More Button Skeleton */}
      <div className="mt-8 text-center">
        <Skeleton className="h-10 w-32 mx-auto" />
      </div>
    </main>
  );
}
