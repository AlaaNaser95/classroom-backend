import { floatToTimeString } from 'src/helpers/helpers';
import { ClassroomDto } from 'src/modules/classroom/dto/response/classroom.dto';

export class ReservationDto {
  readonly id: number;
  readonly date: Date;
  readonly from: { label: string; value: number };
  readonly to: { label: string; value: number };
  readonly classroomId: number;
  readonly classroom: ClassroomDto;
  readonly createdAt: string;

  constructor(reservation) {
    this.id = reservation.id;
    this.date = reservation.date;
    this.from = {
      label: floatToTimeString(reservation.from),
      value: parseFloat(reservation.from),
    };
    this.to = {
      label: floatToTimeString(reservation.to),
      value: parseFloat(reservation.to),
    };
    if (reservation.classroom)
      this.classroom = new ClassroomDto(reservation.classroom);
    this.createdAt = reservation.createdAt;
  }
}
