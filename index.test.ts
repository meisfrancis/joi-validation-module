import { removeDuplicate } from './src';

describe('Duplicate array item', () => {
  it('should remove duplicate item', () => {
    const _fun = removeDuplicate();
    expect(_fun([1, 2, 2, 3], {} as any)).toEqual([1, 2, 3]);
  });
});

describe('Duplicate array object item', () => {
  it('should remote duplicate item', () => {
    const _fun = removeDuplicate('id');
    const dummy = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];
    const expected = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];

    expect(_fun(dummy, {} as any)).toEqual(expected);
  });
});
