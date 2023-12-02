import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment';

export class ClassroomListFilterDto {
  @Transform((value) => {
    const date = new Date(value.value);
    return moment(date).format('YYYY-MM-DD');
  })
  @IsOptional()
  @IsString()
  date: string;

  @Transform((value) => {
    return parseFloat(value.value);
  })
  @IsOptional()
  @IsNumber()
  from: number;

  @Transform((value) => {
    return parseFloat(value.value);
  })
  @IsOptional()
  @IsNumber()
  to: number;
}
