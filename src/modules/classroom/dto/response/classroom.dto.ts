import { ReservationDto } from 'src/modules/reservation/dto/response/reservation.dto';
import { prepareClassroomScheduleTimeSlots } from 'src/helpers/helpers';

export class ClassroomDto {
  readonly id: number;
  readonly name: string;
  readonly floorNo: string;
  readonly building: string;
  readonly hasProjector: boolean;
  readonly capacity: number;
  readonly reservations: ReservationDto[];
  readonly timeSlots;

  constructor(classroom) {
    this.id = classroom.id;
    this.name = classroom.name;
    this.floorNo = classroom.floorNo;
    this.building = classroom.building;
    this.hasProjector = classroom.hasProjector;
    this.capacity = classroom.capacity;
    if (classroom.reservations) {
      this.reservations = classroom.reservations.map(
        (reservation) => new ReservationDto(reservation),
      );
      this.timeSlots = prepareClassroomScheduleTimeSlots(
        classroom.reservations,
      );
    }
  }
}
