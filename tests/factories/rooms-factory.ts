import { prisma } from "@/config";
import { Room } from "@prisma/client";
import faker from "@faker-js/faker";

export async function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1, max: 9 }),
      hotelId,
    }
  });
}
