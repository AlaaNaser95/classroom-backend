import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment';

export class ReserveClassroomDto {
  @Transform((value) => {
    const date = new Date(value.value);
    return moment(date).format('YYYY-MM-DD');
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @Transform((value) => {
    return parseFloat(value.value);
  })
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @Transform((value) => {
    return parseFloat(value.value);
  })
  @IsNotEmpty()
  @IsNumber()
  to: number;
}
