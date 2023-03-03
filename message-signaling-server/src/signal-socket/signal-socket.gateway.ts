import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SignalSocketService } from './signal-socket.service';
import { CreateSignalSocketDto } from './dto/create-signal-socket.dto';
import { UpdateSignalSocketDto } from './dto/update-signal-socket.dto';
import { Socket } from 'dgram';

let onlineUser: string[] = ['Bob', 'John'];

@WebSocketGateway(3001)
export class SignalSocketGateway {
  constructor(private readonly signalSocketService: SignalSocketService) {}

  @SubscribeMessage('join')
  join(@MessageBody() username: string) {
    onlineUser = onlineUser.filter((e) => e !== username);
    onlineUser.unshift(username);
    return onlineUser.filter((e) => e !== username);
  }

  @SubscribeMessage('peerOffer')
  peerOffer(
    @MessageBody() data: { SPD: any },
    @ConnectedSocket() clinet: Socket,
  ) {
    return this.signalSocketService.findAll();
  }

  @SubscribeMessage('peerAnswer')
  peerAnswer(@MessageBody() id: number) {
    return this.signalSocketService.findOne(id);
  }
}
