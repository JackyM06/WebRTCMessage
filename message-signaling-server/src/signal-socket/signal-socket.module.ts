import { Module } from '@nestjs/common';
import { SignalSocketService } from './signal-socket.service';
import { SignalSocketGateway } from './signal-socket.gateway';

@Module({
  providers: [SignalSocketGateway, SignalSocketService],
})
export class SignalSocketModule {}
