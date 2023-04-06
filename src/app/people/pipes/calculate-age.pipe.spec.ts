import { CalculateAgePipe } from './calculate-age.pipe';

describe('CalculateAgePipe', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('create an instance', () => {
    const pipe = new CalculateAgePipe();
    expect(pipe).toBeTruthy();
  });

  it('return correct age', () => {
    jasmine.clock().mockDate(new Date('2020-01-01'));
    const pipe = new CalculateAgePipe();
    const age = pipe.transform(new Date('2000-01-01'));
    expect(age).toEqual(20);
  });
});
