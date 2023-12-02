import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { IsNotEmpty, IsInt, Min, IsBoolean } from 'class-validator';
import { Reservation } from './reservation.entity';

@Entity()
export class Classroom extends BaseEntity {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column('int')
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @Column({ type: 'bool', default: true })
  @IsNotEmpty()
  @IsBoolean()
  hasProjector: boolean;

  @Column()
  @IsNotEmpty()
  building: string;

  @Column()
  @IsNotEmpty()
  floorNo: string;

  @OneToMany(() => Reservation, (reservation) => reservation.classroom)
  reservations?: Reservation[];
}
