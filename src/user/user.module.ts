import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ Register User Entity
  controllers: [UserController],
  providers: [UserService, UserRepository], // ✅ Register Repository & Service
  exports: [UserService, UserRepository], // ✅ Export for use in other modules if needed
})
export class UserModule {}
