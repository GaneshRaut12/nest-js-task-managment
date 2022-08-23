import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status-enum.model';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
//controller decorator has the path
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getAllTask(): Promise<Task[]> {
    return this.taskService.getAllTask();
  }
  // @Get('/:id')
  // getTaskByid(@Param('id') id: string): Task {
  //   return this.taskService.getTaskByid(id);
  // }

  @Get('/:id')
  getTaskByid(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  // @Post()
  // createTask(@Body() createTaskdtop: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskdtop);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   return this.taskService.deleteTask(id);
  // }
  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    // console.log(status);
    return this.taskService.updateTaskStatus(id, status);
  }
}
