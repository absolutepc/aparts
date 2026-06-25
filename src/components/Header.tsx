import Link from "next/link";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/apartments", label: "Квартиры и студии" },
  { href: "/commercial", label: "Коммерческая" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Недвижимость
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Админ
          </Link>
        </nav>
      </div>
    </header>
  );
}
