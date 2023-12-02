import {
  Body,
  Query,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ClassroomReservationsFilterDto } from './dto/request/classroom-reservations-filter.dto';
import { ReserveClassroomDto } from './dto/request/reserve-classroom.dto';
import { ReservationDto } from './dto/response/reservation.dto';

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('classrooms/:classroomId/reservations')
  async reserveClassroom(
    @Param('classroomId', ParseIntPipe) classroomId: number,
    @Body() reserveClassroomDto: ReserveClassroomDto,
  ): Promise<{ message: string; data: ReservationDto }> {
    return await this.reservationService.reserveClassroom(
      classroomId,
      reserveClassroomDto,
    );
  }

  @Get('classrooms/:classroomId/availability')
  async checkClassroomAvailability(
    @Param('classroomId', ParseIntPipe) classroomId: number,
    @Query() reserveClassroomDto: ReserveClassroomDto,
  ): Promise<{ valid: boolean; message: string }> {
    return await this.reservationService.checkClassroomAvailability(
      classroomId,
      reserveClassroomDto,
    );
  }

  @Get('reservations')
  async listReservations(
    @Query() classroomReservationsFilterDto: ClassroomReservationsFilterDto,
  ): Promise<{ data: ReservationDto[] }> {
    return await this.reservationService.listReservations(
      classroomReservationsFilterDto,
    );
  }

  @Get('time-slots')
  listSystemTimeSlots(): {
    data: {
      label: string;
      value: number;
      reserved: boolean;
    }[];
    slotScaleValue: number;
    slotScaleInMinutes: number;
  } {
    return this.reservationService.listTimeSlots();
  }
}
