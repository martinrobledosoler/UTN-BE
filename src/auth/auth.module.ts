import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './decorator/jwt-auth.strategy';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_VALUE'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
