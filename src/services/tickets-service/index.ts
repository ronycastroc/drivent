import { notFoundError } from "@/errors";
import { TicketAndTicketTypeEntity } from "@/protocols";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
  return await ticketRepository.findMany();
}

async function getTicketById(enrollmentId: number): Promise<TicketAndTicketTypeEntity> {
  const ticketResult = await ticketRepository.findTicketById(enrollmentId);

  if(!ticketResult) throw notFoundError();

  return ticketResult;
}

async function  createTicket(ticketTypeId: number, enrollmentId: number) {
  const createResult = await ticketRepository.create(ticketTypeId, enrollmentId);

  return createResult;
}

const ticketsService = {
  getTicketTypes,
  getTicketById,
  createTicket  
};

export default ticketsService;
