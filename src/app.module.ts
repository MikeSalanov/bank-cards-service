import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({
  imports: [],
  controllers: [],
  providers: [],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 490ec6d (add project bank cards)
})
export class AppModule {}
