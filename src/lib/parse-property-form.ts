import { PropertyType } from "@/generated/prisma/client";
import { PropertyFormData } from "@/components/PropertyForm";

export function parsePropertyForm(data: PropertyFormData) {
  const area = Number(data.area);
  if (!data.title.trim()) {
    return { error: "Укажите название объекта" };
  }
  if (!area || area <= 0) {
    return { error: "Укажите корректную площадь" };
  }

  const isCommercial = data.type === PropertyType.COMMERCIAL;
  let rooms: number | null = null;

  if (!isCommercial) {
    const parsedRooms = Number(data.rooms);
    if (!parsedRooms || parsedRooms < 1) {
      return { error: "Укажите количество комнат" };
    }
    rooms = parsedRooms;
  }

  const price = data.price ? Number(data.price) : null;
  if (data.price && (Number.isNaN(price) || price! < 0)) {
    return { error: "Укажите корректную цену" };
  }

  return {
    data: {
      title: data.title.trim(),
      description: data.description.trim() || null,
      type: data.type,
      area,
      rooms,
      price,
      address: data.address.trim() || null,
      imageUrl: data.imageUrl.trim() || null,
      published: data.published,
    },
  };
}
