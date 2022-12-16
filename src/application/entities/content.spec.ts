import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a content', () => {
    const content = new Content('Content >= 5 length');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a content with less than 5 characters', () => {
    expect(() => new Content('Test')).toThrowError('Content length error.');
  });

  it('should not be able to create a content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrowError(
      'Content length error.',
    );
  });
});
