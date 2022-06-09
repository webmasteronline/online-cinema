import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModel } from './../user/user.model'
import { TypegooseModule } from 'nestjs-typegoose'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { getJWTDbConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTDbConfig
		})
  ],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
