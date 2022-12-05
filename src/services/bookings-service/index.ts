import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import { notFoundError, forbiddenError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const booking = await bookingRepository.findBookingByUserId(userId);

  if(!booking || !enrollment) {
    throw notFoundError();
  }

  return booking;
}

async function createBooking(roomId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const room = await hotelRepository.findRoomById(roomId);

  if(!room || !enrollment) {
    throw notFoundError();
  }
  
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.findBookingByUserId(userId);
  const capacity = await bookingRepository.findBookingCountByRoomId(roomId);

  if (capacity[0]?._count.roomId === room.capacity || booking) {
    throw forbiddenError();
  }

  await bookingRepository.create(roomId, userId);
  
  const result = await bookingRepository.findBookingByUserId(userId);

  return result; 
}

const bookingService = {
  getBooking,
  createBooking,
};

export default bookingService;
