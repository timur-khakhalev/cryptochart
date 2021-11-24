import { Test, TestingModule } from '@nestjs/testing';
import { GetCmcController } from './get-cmc.controller';

describe('GetCmcController', () => {
  let controller: GetCmcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCmcController],
    }).compile();

    controller = module.get<GetCmcController>(GetCmcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
