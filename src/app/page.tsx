import Link from "next/link";
import { PropertyType } from "@/generated/prisma/client";
import PropertyCard from "@/components/PropertyCard";
import { getPublishedProperties } from "@/lib/properties";

export default async function HomePage() {
  const [residential, commercial] = await Promise.all([
    getPublishedProperties([PropertyType.APARTMENT, PropertyType.STUDIO]),
    getPublishedProperties([PropertyType.COMMERCIAL]),
  ]);

  const featured = [...residential.slice(0, 2), ...commercial.slice(0, 1)];

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Недвижимость для жизни и бизнеса
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-200">
            Квартиры, студии и коммерческие помещения в одном каталоге.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/apartments"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Квартиры и студии
            </Link>
            <Link
              href="/commercial"
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Коммерческая недвижимость
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Избранные объекты
            </h2>
            <p className="mt-1 text-slate-600">
              {residential.length} жилых и {commercial.length} коммерческих
              предложений
            </p>
          </div>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            Объектов пока нет. Добавьте первый через{" "}
            <Link href="/admin" className="font-medium text-slate-900 underline">
              админ-панель
            </Link>
            .
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
