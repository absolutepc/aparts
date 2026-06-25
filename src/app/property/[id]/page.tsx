import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyType } from "@/generated/prisma/client";
import {
  formatPrice,
  getPropertyById,
  propertyTypeLabels,
} from "@/lib/properties";

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(Number(id));

  if (!property || !property.published) {
    return { title: "Объект не найден" };
  }

  return { title: property.title };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(Number(id));

  if (!property || !property.published) {
    notFound();
  }

  const showRooms =
    property.type !== PropertyType.COMMERCIAL && property.rooms != null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href={
          property.type === PropertyType.COMMERCIAL
            ? "/commercial"
            : "/apartments"
        }
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Назад к списку
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          {property.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={property.imageUrl}
              alt={property.title}
              className="aspect-[4/3] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center text-slate-400">
              Нет фото
            </div>
          )}
        </div>

        <div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            {propertyTypeLabels[property.type]}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            {property.title}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-emerald-700">
            {formatPrice(property.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-5">
            <div>
              <dt className="text-sm text-slate-500">Площадь</dt>
              <dd className="text-lg font-semibold">{property.area} м²</dd>
            </div>
            {showRooms && (
              <div>
                <dt className="text-sm text-slate-500">Комнат</dt>
                <dd className="text-lg font-semibold">{property.rooms}</dd>
              </div>
            )}
            {property.address && (
              <div className="col-span-2">
                <dt className="text-sm text-slate-500">Адрес</dt>
                <dd className="text-lg font-semibold">{property.address}</dd>
              </div>
            )}
          </dl>

          {property.description && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">Описание</h2>
              <p className="mt-2 leading-7 text-slate-600">
                {property.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
