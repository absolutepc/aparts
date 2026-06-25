import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { PropertyType } from "../src/generated/prisma/client";

async function main() {
  await prisma.property.deleteMany();

  await prisma.property.createMany({
    data: [
      {
        title: "2-комнатная квартира на Арбате",
        description:
          "Светлая квартира в историческом центре с высокими потолками и видом на двор.",
        type: PropertyType.APARTMENT,
        area: 68,
        rooms: 2,
        price: 18500000,
        address: "ул. Арбат, 12",
        imageUrl:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        published: true,
      },
      {
        title: "Студия у метро Сокольники",
        description:
          "Компактная студия с современным ремонтом, идеально для одного или пары.",
        type: PropertyType.STUDIO,
        area: 28,
        rooms: 1,
        price: 7200000,
        address: "ул. Стромынка, 18",
        imageUrl:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        published: true,
      },
      {
        title: "Офисное помещение в БЦ",
        description:
          "Открытая планировка, отдельный вход, подходит под офис или шоурум.",
        type: PropertyType.COMMERCIAL,
        area: 120,
        rooms: null,
        price: 25000000,
        address: "Ленинградский пр., 39",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        published: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
