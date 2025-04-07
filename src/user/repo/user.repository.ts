import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConflictException } from "@nestjs/common";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  // ✅ Create a new user
  async createUser(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { email: userData.email } });
  
    if (existingUser) {
      throw new ConflictException("Email already exists"); 
    }
  
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }
  

  // ✅ Find all users
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role'], // Exclude "password"
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOneOrFail({ where: { email } }); // ✅ Correct syntax
  }

  async findOneId(id: number): Promise<User> {
    return this.userRepo.findOneOrFail({ where: { id } });
  }

  // ✅ Delete a user
  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepo.delete(id);
}

}
