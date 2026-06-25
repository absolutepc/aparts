import { PropertyType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const propertyTypeLabels: Record<PropertyType, string> = {
  APARTMENT: "Квартира",
  STUDIO: "Студия",
  COMMERCIAL: "Коммерческое",
};

export function formatPrice(price: number | null | undefined) {
  if (price == null) return "Цена по запросу";

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function getPublishedProperties(types: PropertyType[]) {
  return prisma.property.findMany({
    where: {
      published: true,
      type: { in: types },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPropertyById(id: number) {
  return prisma.property.findUnique({ where: { id } });
}

export async function getAllProperties() {
  return prisma.property.findMany({ orderBy: { createdAt: "desc" } });
}
