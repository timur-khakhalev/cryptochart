import { Test, TestingModule } from '@nestjs/testing';
import { WsapigatewayService } from './wsapigateway.service';

describe('WsapigatewayService', () => {
  let service: WsapigatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsapigatewayService],
    }).compile();

    service = module.get<WsapigatewayService>(WsapigatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
