import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repo/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // ✅ Create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.createUser(user);
  }

  FindUserById(id: number) {
    return this.userRepository.findOneId(id); // ✅ Correct method
  }

  // ✅ Get all users
  async findAll(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email); // ✅ Use the correct method name
  }

  // ✅ Delete user
  async remove(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
