import { Injectable } from '@nestjs/common';
import { CreateSignalSocketDto } from './dto/create-signal-socket.dto';
import { UpdateSignalSocketDto } from './dto/update-signal-socket.dto';

@Injectable()
export class SignalSocketService {
  create(createSignalSocketDto: CreateSignalSocketDto) {
    return 'This action adds a new signalSocket';
  }

  findAll() {
    return `This action returns all signalSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signalSocket`;
  }

  update(id: number, updateSignalSocketDto: UpdateSignalSocketDto) {
    return `This action updates a #${id} signalSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} signalSocket`;
  }
}
