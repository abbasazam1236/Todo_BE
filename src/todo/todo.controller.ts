import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Patch, // Add Patch decorator
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todos')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: string,
  ) {
    return this.todoService.create(createTodoDto, +userId);
  }

  @Get('not-completed/:userId')
  findNotCompleted(@Param('userId') userId: string) {
    return this.todoService.findAllTodoByUserNotCompleted(+userId);
  }

  @Get('completed/:userId')
  findCompleted(@Param('userId') userId: string) {
    return this.todoService.findAllTodoByUserCompleted(+userId);
  }

  @Patch(':id') // Add PATCH endpoint to mark a TODO as completed
  update(@Param('id') id: string) {
    return this.todoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
