import { Module } from '@nestjs/common';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) =>
        await config.get('databaseConfig'),
      inject: [ConfigService],
    }),
    ClassroomModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
