import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiSecurity('JWT-auth')
  @UseGuards(
    new RoleGuard([Constants.ROLES.ADMIN_ROLE, Constants.ROLES.NORMAL_ROLE]),
  )
  async findAll(@Req() req): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    return this.userService.remove(+id);
  }
}
