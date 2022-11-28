import { prisma } from "@/config";
import { Hotel } from "@prisma/client";
import faker from "@faker-js/faker";

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.avatar()
    }
  });
}
