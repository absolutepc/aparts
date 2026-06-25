import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { isAuthenticated } from "@/lib/auth";
import { formatPrice, getAllProperties, propertyTypeLabels } from "@/lib/properties";

export default async function AdminPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const properties = await getAllProperties();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Админ-панель</h1>
          <p className="mt-1 text-slate-600">
            Управление объектами недвижимости
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/property/new"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Добавить объект
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Выйти
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Объект
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Тип
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                м²
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Комнат
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Цена
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Статус
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {properties.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-slate-500"
                >
                  Объектов пока нет
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">
                      {property.title}
                    </div>
                    {property.address && (
                      <div className="text-sm text-slate-500">
                        {property.address}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {propertyTypeLabels[property.type]}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {property.area}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {property.rooms ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {formatPrice(property.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        property.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {property.published ? "Опубликован" : "Черновик"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/property/${property.id}/edit`}
                      className="text-sm font-medium text-slate-900 hover:underline"
                    >
                      Редактировать
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
