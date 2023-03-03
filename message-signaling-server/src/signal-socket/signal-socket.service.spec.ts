import { Test, TestingModule } from '@nestjs/testing';
import { SignalSocketService } from './signal-socket.service';

describe('SignalSocketService', () => {
  let service: SignalSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalSocketService],
    }).compile();

    service = module.get<SignalSocketService>(SignalSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
