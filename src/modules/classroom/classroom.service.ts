import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Classroom } from 'src/database/entities/classroom.entity';
import { ClassroomListFilterDto } from './dto/request/classroom-list-filter.dto.js';
import { ClassroomDto } from './dto/response/classroom.dto';
import { HttpException, NotFoundException } from '@nestjs/common';
import { map } from 'lodash';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  async listClassrooms(
    classroomListFilterDto: ClassroomListFilterDto,
  ): Promise<{ data: ClassroomDto[] }> {
    const query = this.classroomRepository.createQueryBuilder('classroom');
    const { date, from, to } = this.validateClassroomListFilters(
      classroomListFilterDto,
    );
    if (date) {
      const excludedClassrooms = await this.classroomRepository
        .createQueryBuilder('classroom')
        .innerJoin('classroom.reservations', 'reservation')
        .where('reservation.date = :date', {
          date,
        })
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
        .select(['classroom.id'])
        .getMany();
      if (excludedClassrooms.length) {
        query.andWhere('classroom.id not in (:excludedClassroomIds)', {
          excludedClassroomIds: map(excludedClassrooms, 'id'),
        });
      }
    }
    const classrooms = await query.getMany();
    return { data: classrooms.map((classroom) => new ClassroomDto(classroom)) };
  }

  private validateClassroomListFilters(
    classroomListFilterDto: ClassroomListFilterDto,
  ) {
    const { date, from, to } = classroomListFilterDto;
    if ((date || from || to) && !(date && from && to)) {
      throw new HttpException(
        '(Date, from and to) are all required to filter',
        400,
      );
      //date must be in the future
    }
    return classroomListFilterDto;
  }

  async viewClassroom(
    classroomId,
    classroomScheduleFilterDto?,
    withReservations = false,
  ): Promise<{ data: ClassroomDto }> {
    if (
      withReservations &&
      (!classroomScheduleFilterDto || !classroomScheduleFilterDto.date)
    )
      throw new HttpException('Date is required', 400);
    const query = this.classroomRepository
      .createQueryBuilder('classroom')
      .where('classroom.id = :classroomId', { classroomId });
    if (withReservations) {
      query.leftJoinAndSelect(
        'classroom.reservations',
        'reservation',
        'reservation.date = :date || reservation.id is null',
        {
          date: classroomScheduleFilterDto.date,
        },
      );
    }
    const classroom = await query.getOne();
    if (!classroom) throw new NotFoundException('Classroom is not found');
    return {
      data: new ClassroomDto(classroom),
    };
  }
}
