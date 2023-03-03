import { CreateSignalSocketDto } from './dto/create-signal-socket.dto';
import { UpdateSignalSocketDto } from './dto/update-signal-socket.dto';
export declare class SignalSocketService {
    create(createSignalSocketDto: CreateSignalSocketDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSignalSocketDto: UpdateSignalSocketDto): string;
    remove(id: number): string;
}
