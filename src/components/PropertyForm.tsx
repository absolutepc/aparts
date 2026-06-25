"use client";

import { PropertyType } from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type PropertyFormData = {
  title: string;
  description: string;
  type: PropertyType;
  area: string;
  rooms: string;
  price: string;
  address: string;
  imageUrl: string;
  published: boolean;
};

type PropertyFormProps = {
  initialData?: Partial<PropertyFormData>;
  submitLabel: string;
  action: (data: PropertyFormData) => Promise<{ error?: string }>;
};

const defaultData: PropertyFormData = {
  title: "",
  description: "",
  type: PropertyType.APARTMENT,
  area: "",
  rooms: "",
  price: "",
  address: "",
  imageUrl: "",
  published: true,
};

export default function PropertyForm({
  initialData,
  submitLabel,
  action,
}: PropertyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<PropertyFormData>({
    ...defaultData,
    ...initialData,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isCommercial = form.type === PropertyType.COMMERCIAL;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await action(form);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Название</span>
          <input
            required
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Описание</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Тип</span>
          <select
            value={form.type}
            onChange={(event) =>
              setForm({
                ...form,
                type: event.target.value as PropertyType,
              })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          >
            <option value={PropertyType.APARTMENT}>Квартира</option>
            <option value={PropertyType.STUDIO}>Студия</option>
            <option value={PropertyType.COMMERCIAL}>Коммерческое</option>
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">
            Площадь, м²
          </span>
          <input
            required
            type="number"
            min="1"
            step="0.1"
            value={form.area}
            onChange={(event) => setForm({ ...form, area: event.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>

        {!isCommercial && (
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Количество комнат
            </span>
            <input
              required
              type="number"
              min="1"
              value={form.rooms}
              onChange={(event) =>
                setForm({ ...form, rooms: event.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
          </label>
        )}

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Цена, ₽</span>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(event) =>
              setForm({ ...form, price: event.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Адрес</span>
          <input
            value={form.address}
            onChange={(event) =>
              setForm({ ...form, address: event.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            URL изображения
          </span>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(event) =>
              setForm({ ...form, imageUrl: event.target.value })
            }
            placeholder="https://..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>

        <label className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) =>
              setForm({ ...form, published: event.target.checked })
            }
            className="h-4 w-4 rounded border-slate-300"
          />
          <span className="text-sm text-slate-700">Опубликовать на сайте</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
        >
          {loading ? "Сохранение..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
