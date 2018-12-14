import { assert } from 'chai';
import Enumitron from './Enumitron';

const enumArray = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
const duplicateIdArray = [{ id: 1, name: 'One' }, { id: 1, name: 'Two' }];
const duplicateNameArray = [{ id: 1, name: 'One' }, { id: 2, name: 'One' }];
const extraKeyValuesArray = [
  { id: 1, name: 'One', translations: { spanish: 'Uno', german: 'Ein' } }
];

describe('Enumitron', () => {
  describe('constructor', () => {
    it('does not throw errors', () => {
      assert.doesNotThrow(() => new Enumitron(enumArray));
    });

    it('throws error when id is not unique', () => {
      const actual = () => new Enumitron(duplicateIdArray);
      const expected = `Enums must have unique ids. ${JSON.stringify(
        duplicateIdArray
      )}`;
      assert.throws(actual, expected);
    });

    it('throws error when name is not unique', () => {
      const actual = () => new Enumitron(duplicateNameArray);
      const expected = `Enums must have unique names. ${JSON.stringify(
        duplicateNameArray
      )}`;
      assert.throws(actual, expected);
    });
  });

  describe('asDictionary', () => {
    it('returns the enum as a dictionary', () => {
      const actual = new Enumitron(enumArray).asDictionary;
      const expected = {
        One: { id: 1, name: 'One' },
        Two: { id: 2, name: 'Two' }
      };
      assert.deepEqual(actual, expected);
    });

    it('returns dictionary with extra key/value pair preserved', () => {
      const actual = new Enumitron(extraKeyValuesArray).asDictionary;
      const expected = {
        One: {
          id: 1,
          name: 'One',
          translations: { spanish: 'Uno', german: 'Ein' }
        }
      };
      assert.deepEqual(actual, expected);
    });
  });

  describe('asIds', () => {
    it('returns the enum ids as an array of integers', () => {
      const actual = new Enumitron(enumArray).asIds;
      const expected = [1, 2];
      assert.deepEqual(actual, expected);
    });
  });

  describe('asNames', () => {
    it('returns the enum names as an array of strings', () => {
      const actual = new Enumitron(enumArray).asNames;
      const expected = ['One', 'Two'];
      assert.deepEqual(actual, expected);
    });
  });

  describe('asObjects', () => {
    it('returns the enum in its original form', () => {
      const actual = new Enumitron(enumArray).asObjects;
      const expected = enumArray;
      assert.deepEqual(actual, expected);
    });

    it('returns objects with extra key/value pair preserved', () => {
      const actual = new Enumitron(extraKeyValuesArray).asObjects;
      const expected = extraKeyValuesArray;
      assert.deepEqual(actual, expected);
    });
  });

  describe('getNameById', () => {
    it('returns the correct name when match is found', () => {
      const actual = new Enumitron(enumArray).getNameById(1);
      const expected = 'One';
      assert.deepEqual(actual, expected);
    });

    it('throws error when match is not found', () => {
      const actual = () => new Enumitron(enumArray).getNameById(3);
      const expected = 'Enum with id 3 does not exist';
      assert.throws(actual, expected);
    });
  });
});
