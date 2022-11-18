import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findTicketById(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true
    }
  });
}

async function create(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
  });
} 

const ticketRepository = {
  findMany,
  findTicketById,
  create
};

export default ticketRepository;

