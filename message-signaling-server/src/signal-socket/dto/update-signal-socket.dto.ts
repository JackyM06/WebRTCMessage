import { PartialType } from '@nestjs/mapped-types';
import { CreateSignalSocketDto } from './create-signal-socket.dto';

export class UpdateSignalSocketDto extends PartialType(CreateSignalSocketDto) {
  id: number;
}
