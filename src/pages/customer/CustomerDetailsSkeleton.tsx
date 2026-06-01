import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDetailsSkeleton() {
  return (
    <div className="p-6 pt-5 space-y-6 animate-pulse">
      {/* ====================================================== */}
      {/* BREADCRUMB */}
      {/* ====================================================== */}

      <div className="space-y-2">
        <Skeleton className="h-5 w-32 rounded-lg" />
        <Skeleton className="h-9 w-72 rounded-xl" />
      </div>

      {/* ====================================================== */}
      {/* PROFILE HERO */}
      {/* ====================================================== */}

      <Card className="overflow-hidden rounded-[32px] border-0 shadow-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
        <CardContent className="p-10">
          <div className="flex flex-col xl:flex-row gap-10 items-start xl:items-center">
            {/* Avatar */}
            <div className="relative">
              <Skeleton className="h-40 w-40 rounded-[30px]" />
              <Skeleton className="h-8 w-24 rounded-full absolute -bottom-3 left-1/2 -translate-x-1/2" />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 w-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white/10 border border-white/10 p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-xl bg-white/20" />
                    <Skeleton className="h-4 w-28 bg-white/20" />
                  </div>

                  <Skeleton className="h-7 w-full bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====================================================== */}
      {/* TABS CARD */}
      {/* ====================================================== */}

      <Card className="rounded-[32px] border-0 shadow-2xl">
        <CardContent className="p-8 space-y-8">
          {/* Tabs */}
          <div className="flex gap-3 flex-wrap">
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>

          {/* Section Header */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-8 w-56 rounded-xl" />
          </div>

          {/* Shipment Cards */}
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="rounded-3xl border-0 shadow-md"
              >
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-40 rounded-lg" />
                    <Skeleton className="h-4 w-28 rounded-lg" />
                  </div>

                  <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ====================================================== */}
      {/* ADDRESS SECTION */}
      {/* ====================================================== */}

      <Card className="rounded-[32px] border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-8 w-48 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card
                key={i}
                className="rounded-3xl border-0 shadow-lg"
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-2xl" />

                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32 rounded-lg" />
                      <Skeleton className="h-4 w-24 rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-[90%] rounded-lg" />
                    <Skeleton className="h-4 w-[70%] rounded-lg" />
                    <Skeleton className="h-4 w-[40%] rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}