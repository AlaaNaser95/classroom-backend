import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomListFilterDto } from './dto/request/classroom-list-filter.dto';
import { ClassroomScheduleFilterDto } from './dto/request/classroom-schedule-filter.dto';
import { ClassroomDto } from './dto/response/classroom.dto';

@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Get()
  async listClassrooms(
    @Query() classroomListFilterDto: ClassroomListFilterDto,
  ): Promise<{ data: ClassroomDto[] }> {
    return await this.classroomService.listClassrooms(classroomListFilterDto);
  }

  @Get(':classroomId/schedule')
  async iewClassRoomSchedule(
    @Param('classroomId', ParseIntPipe) classroomId: number,
    @Query() classroomScheduleFilterDto: ClassroomScheduleFilterDto,
  ): Promise<{ data: ClassroomDto }> {
    return await this.classroomService.viewClassroom(
      classroomId,
      classroomScheduleFilterDto,
      true,
    );
  }

  @Get(':classroomId')
  async viewClassRoom(
    @Param('classroomId', ParseIntPipe) classroomId: number,
  ): Promise<{ data: ClassroomDto }> {
    return await this.classroomService.viewClassroom(classroomId);
  }
}
