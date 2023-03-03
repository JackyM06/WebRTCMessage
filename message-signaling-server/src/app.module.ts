import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalSocketModule } from './signal-socket/signal-socket.module';

@Module({
  imports: [SignalSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
