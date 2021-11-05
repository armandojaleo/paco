import { expect } from '@jest/globals'
import Music from './index'

jest.spyOn(console, 'log');

describe('Music module tests', () => {
  test('Music loaded text', () => {
    expect(console.log.mock.calls.length).toBe(0);
    Music.load();
    expect(console.log.mock.calls.length).toBe(1);
    expect(console.log.mock.calls[0][0]).toBe("Music module loaded");
    expect(Music.load()).toBeTruthy()
  })
})

afterEach(() => {
  jest.clearAllMocks();
});