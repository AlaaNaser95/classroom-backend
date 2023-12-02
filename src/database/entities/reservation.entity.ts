import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import {
  IsInt,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Classroom } from './classroom.entity';
import { DecimalColumnTransformer } from 'src/helpers/helpers';

// class DecimalColumnTransformer {
//   to(data: number): number {
//     return data;
//   }
//   from(data: string): number {
//     return parseFloat(data);
//   }
// }

@Entity()
export class Reservation extends BaseEntity {
  @Column('date')
  @IsNotEmpty()
  date: Date;

  @Column('decimal', {
    precision: 4,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  @IsNumber()
  from: number;

  @Column('decimal', {
    precision: 4,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  @IsNumber()
  to: number;

  @Column('int')
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  classroomId: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.reservations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  classroom: Classroom;
}
