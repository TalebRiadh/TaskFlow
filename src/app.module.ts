import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { enValidationSchema } from 'config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: enValidationSchema,
      envFilePath: '.env'

    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
