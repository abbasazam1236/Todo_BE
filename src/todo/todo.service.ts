// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repo/todo.repositry';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleDateString();
    todo.completed = false;
    todo.user = await this.userService.FindUserById(userId);
    return this.todoRepository.createTodo(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.todoRepository.findAllTodoByUserNotCompleted(userId);
  }

  findAllTodoByUserCompleted(userId: number) {
    return this.todoRepository.findAllTodoByUserCompleted(userId);
  }

  update(todoId: number) {
    return this.todoRepository.updateTodo(todoId, true);
  }

  remove(todoId: number) {
    return this.todoRepository.deleteTodo(todoId);
  }
}