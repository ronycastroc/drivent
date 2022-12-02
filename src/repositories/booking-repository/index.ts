import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },    
    select: {
      id: true,
      userId: false,
      Room: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const bookingRepository = {
  findBookingByUserId,
};

export default bookingRepository;
