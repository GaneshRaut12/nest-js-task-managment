import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';

@Module({
  //App module is the important module
  //All module, controller are stored here
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      entities: [Task],
      synchronize: true,
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {}
