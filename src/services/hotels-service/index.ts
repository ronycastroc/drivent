import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel.repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel } from "@prisma/client";

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) throw requestError(400, "BAD_REQUEST");

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(!ticket || ticket.status !== "PAID" || ticket.TicketType.includesHotel !== true) throw requestError(400, "BAD_REQUEST");
  
  const hotels = await hotelRepository.findHotels();

  return hotels;
}

const hotelsService = {
  getHotels
};

export default hotelsService;

