import { loginAction } from "@/app/admin/actions";

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10 sm:px-6">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Вход в админку</h1>
        <p className="mt-2 text-sm text-slate-600">
          Введите пароль администратора для управления объектами.
        </p>

        <form action={loginAction} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Неверный пароль
            </div>
          )}

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Пароль</span>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
