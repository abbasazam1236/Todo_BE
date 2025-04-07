// src/todo/repo/todo.repository.ts
import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "../entities/todo.entity";

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private readonly dataSource: DataSource,
  ) {}

  async createTodo(todoData: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepo.create(todoData);
    return this.todoRepo.save(todo);
  }

  async findAllTodos(): Promise<Todo[]> {
    return this.todoRepo.find({ relations: ['user'] });
  }

  async findAllTodoByUserNotCompleted(userId: number): Promise<Todo[]> {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  async findAllTodoByUserCompleted(userId: number): Promise<Todo[]> {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  async updateTodo(todoId: number, completed: boolean): Promise<void> {
    await this.todoRepo.update(todoId, { completed });
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepo.delete(id);
  }
}