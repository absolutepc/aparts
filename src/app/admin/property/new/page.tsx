import Link from "next/link";
import { redirect } from "next/navigation";
import { createPropertyAction } from "@/app/admin/actions";
import PropertyForm from "@/components/PropertyForm";
import { isAuthenticated } from "@/lib/auth";

export default async function NewPropertyPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/admin"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Назад в админку
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Добавить объект
      </h1>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <PropertyForm
          submitLabel="Создать объект"
          action={createPropertyAction}
        />
      </div>
    </div>
  );
}
