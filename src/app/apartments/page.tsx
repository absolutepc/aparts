import { PropertyType } from "@/generated/prisma/client";
import PropertyCard from "@/components/PropertyCard";
import { getPublishedProperties } from "@/lib/properties";

export const metadata = {
  title: "Квартиры и студии",
};

export default async function ApartmentsPage() {
  const properties = await getPublishedProperties([
    PropertyType.APARTMENT,
    PropertyType.STUDIO,
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Квартиры и студии
        </h1>
        <p className="mt-2 text-slate-600">
          Жилая недвижимость с указанием площади и количества комнат.
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          Пока нет опубликованных объектов в этом разделе.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
