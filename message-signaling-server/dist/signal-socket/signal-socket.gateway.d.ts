/// <reference types="node" />
import { SignalSocketService } from './signal-socket.service';
import { Socket } from 'dgram';
export declare class SignalSocketGateway {
    private readonly signalSocketService;
    constructor(signalSocketService: SignalSocketService);
    join(username: string): string[];
    peerOffer(data: {
        SPD: any;
    }, clinet: Socket): string;
    peerAnswer(id: number): string;
}
