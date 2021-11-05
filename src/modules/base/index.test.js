import { expect } from '@jest/globals'
import Base from './index'

jest.spyOn(console, 'log');

describe('Base module tests', () => {
  test('Base loaded text', () => {
    expect(console.log.mock.calls.length).toBe(0);
    Base.load();
    expect(console.log.mock.calls.length).toBe(1);
    expect(console.log.mock.calls[0][0]).toBe("Base module loaded");
    expect(Base.load()).toBeTruthy()
  })
})

afterEach(() => {
  jest.clearAllMocks();
});