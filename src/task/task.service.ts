import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
// import { TaskRepository } from './task.repository';
import { Repository } from 'typeorm';
//service ts file has all the business logic
// console.log(typeof Task);

@Injectable()
export class TaskService {
  task: Task[];
  //   beacuse result will be array of task
  // getAllTask(): Task[] {
  //   return this.task;
  // }
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // getTaskByid(id: string): Task {
  //   const found = this.task.find((task) => task.id == id);
  //   if (!found) {
  //     throw new NotFoundException(`Task With this ID ${id} Not found`);
  //   } else {
  //     return found;
  //   }
  // }

  async getAllTask(): Promise<Task[]> {
    return this.tasksRepository.find();
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task With this ID ${id} Not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  // createTask(createTaskdtop: CreateTaskDto) {
  //   // console.log(CreateTaskDto);
  //   const { title, description } = createTaskdtop;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.DONE,
  //   };
  //   this.task.push(task);
  //   return task;
  // }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  // deleteTask(id: string) {
  //   const found = this.getTaskByid(id);
  //   this.task.filter((singleTask) => singleTask.id != found.id);
  // }
  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.getTaskById(id);
    // console.log(task);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}

// $ docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
