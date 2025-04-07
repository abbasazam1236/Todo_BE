import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        database: ConfigService.get('DATABASE_NAME'),
        host: ConfigService.get('DATABASE_HOST'),
        port: ConfigService.get<number>('DATABASE_PORT'),
        username: ConfigService.get('DATABASE_USERNAME'),
        password: ConfigService.get('DATABASE_PASSWORD'),
        synchronize: ConfigService.get<boolean>('DATABASE_SYNC'),
        logging: ConfigService.get<boolean>('DATABASE_LOGGING'),
        autoLoadEntities: ConfigService.get<boolean>('LOAD_ENTITIES'),
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
