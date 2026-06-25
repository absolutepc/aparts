import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deletePropertyAction, updatePropertyAction } from "@/app/admin/actions";
import PropertyForm from "@/components/PropertyForm";
import { isAuthenticated } from "@/lib/auth";
import { getPropertyById } from "@/lib/properties";

type EditPropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const property = await getPropertyById(Number(id));

  if (!property) {
    notFound();
  }

  const propertyId = property.id;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/admin"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Назад в админку
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Редактировать объект
      </h1>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <PropertyForm
          submitLabel="Сохранить изменения"
          initialData={{
            title: property.title,
            description: property.description ?? "",
            type: property.type,
            area: String(property.area),
            rooms: property.rooms != null ? String(property.rooms) : "",
            price: property.price != null ? String(property.price) : "",
            address: property.address ?? "",
            imageUrl: property.imageUrl ?? "",
            published: property.published,
          }}
          action={(data) => updatePropertyAction(propertyId, data)}
        />
      </div>

      <form action={deletePropertyAction.bind(null, propertyId)} className="mt-6">
        <button
          type="submit"
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
        >
          Удалить объект
        </button>
      </form>
    </div>
  );
}
