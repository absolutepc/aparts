import Link from "next/link";
import { Property, PropertyType } from "@/generated/prisma/client";
import { formatPrice, propertyTypeLabels } from "@/lib/properties";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const showRooms =
    property.type !== PropertyType.COMMERCIAL && property.rooms != null;

  return (
    <Link
      href={`/property/${property.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        {property.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            Нет фото
          </div>
        )}
      </div>
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {propertyTypeLabels[property.type]}
          </span>
          <span className="text-sm font-semibold text-emerald-700">
            {formatPrice(property.price)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <span>{property.area} м²</span>
          {showRooms && <span>{property.rooms} комн.</span>}
          {property.address && <span>{property.address}</span>}
        </div>
      </div>
    </Link>
  );
}
