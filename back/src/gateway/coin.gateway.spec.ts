import { Test, TestingModule } from '@nestjs/testing';
import { CoinGateway } from './coin.gateway';

describe('CoinGateway', () => {
  let gateway: CoinGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinGateway],
    }).compile();

    gateway = module.get<CoinGateway>(CoinGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
