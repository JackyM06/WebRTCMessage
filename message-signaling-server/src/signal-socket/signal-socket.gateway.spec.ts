import { Test, TestingModule } from '@nestjs/testing';
import { SignalSocketGateway } from './signal-socket.gateway';
import { SignalSocketService } from './signal-socket.service';

describe('SignalSocketGateway', () => {
  let gateway: SignalSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalSocketGateway, SignalSocketService],
    }).compile();

    gateway = module.get<SignalSocketGateway>(SignalSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
