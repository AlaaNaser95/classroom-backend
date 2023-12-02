import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment';

export class ClassroomScheduleFilterDto {
  @Transform((value) => {
    const date = new Date(value.value);
    return moment(date).format('YYYY-MM-DD');
  })
  @IsNotEmpty()
  @IsString()
  date: string;
}
