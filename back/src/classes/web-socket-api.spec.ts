import { WebSocketAPI } from './web-socket-api';

describe('WebSocketApi', () => {
  it('should be defined', () => {
    expect(new WebSocketAPI()).toBeDefined();
  });
});
