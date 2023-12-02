import { Injectable } from '@nestjs/common';
import { ClassroomListFilterDto } from '../classroom/dto/request/classroom-list-filter.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { ReservationDto } from './dto/response/reservation.dto.js';
import { Reservation } from 'src/database/entities/reservation.entity';
import { HttpException } from '@nestjs/common';
import { listSystemTimeSlots } from 'src/helpers/helpers';
import { ReserveClassroomDto } from './dto/request/reserve-classroom.dto.js';
import { ClassroomReservationsFilterDto } from './dto/request/classroom-reservations-filter.dto.js';
import slotsConstant from 'src/constants/slots.constant';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}
  async checkClassroomAvailability(
    classroomId,
    classroomListFilterDto: ClassroomListFilterDto,
  ): Promise<{ valid: boolean; message: string }> {
    const { date, from, to } = classroomListFilterDto;
    const classroomResevationsCountWithinPeriod =
      await this.reservationRepository
        .createQueryBuilder('reservation')
        .innerJoin(
          'reservation.classroom',
          'classroom',
          'classroom.id = :classroomId',
          { classroomId },
        )
        .andWhere('reservation.date = :date', { date })
        .andWhere(
          new Brackets((qb) => {
            qb.where('reservation.from >= :from and reservation.from < :to', {
              from,
              to,
            }).orWhere('reservation.from < :from && reservation.to > :from', {
              from,
              to,
            });
          }),
        )
        .getCount();
    if (classroomResevationsCountWithinPeriod)
      return {
        valid: false,
        message: 'Classroom is not available during this period',
      };
    return {
      valid: true,
      message: 'Classroom is available during this period',
    };
  }

  async reserveClassroom(
    classroomId,
    reserveClassroomDto: ReserveClassroomDto,
  ): Promise<{ message: string; data: ReservationDto }> {
    const { date, from, to } =
      this.validateReservationData(reserveClassroomDto);
    const { valid } = await this.checkClassroomAvailability(
      classroomId,
      reserveClassroomDto,
    );
    if (!valid)
      throw new HttpException(
        'Sorry, this classroom is fully or partially reserved during this period',
        409,
      );
    const reservation = (
      await this.reservationRepository.save([
        {
          date,
          from,
          to,
          classroomId,
        },
      ])
    )[0];
    return {
      message: 'Classroom has been reserved successfully',
      data: new ReservationDto(reservation),
    };
  }

  private validateReservationData(reserveClassroomDto: ReserveClassroomDto) {
    const { date, from, to } = reserveClassroomDto;
    /////////
    let today = new Date();
    today.setHours(0, 0, 0);
    if (new Date(date) < today) throw new HttpException('Invalid date', 400);
    //new time must be greater than current time
    if (to <= from) throw new HttpException('Invalid duration', 400);
    if (from < 8) throw new HttpException('From is outside working hours', 400);
    if (to > 20) throw new HttpException('to is outside working hours', 400);
    return reserveClassroomDto;
  }

  async listReservations(
    classroomReservationsFilterDto: ClassroomReservationsFilterDto,
  ): Promise<{ data: ReservationDto[] }> {
    const { date } = classroomReservationsFilterDto;
    const query = this.reservationRepository
      .createQueryBuilder('reservation')
      .innerJoinAndSelect(
        'reservation.classroom',
        'classroom',
        'classroom.deletedAt is null',
      );
    if (date) query.andWhere('reservation.date = :date', { date });
    const reservations = await query.orderBy('reservation.from').getMany();
    return {
      data: reservations.map((reservation) => new ReservationDto(reservation)),
    };
  }

  listTimeSlots(): {
    data: {
      label: string;
      value: number;
      reserved: boolean;
    }[];
    slotScaleValue: number;
    slotScaleInMinutes: number;
  } {
    const { timeSlots, slotScaleValue } = listSystemTimeSlots();
    return {
      data: timeSlots,
      slotScaleValue,
      slotScaleInMinutes: slotsConstant.slotScaleInMinutes,
    };
  }
}
