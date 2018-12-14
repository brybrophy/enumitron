# Enumitron

### Generate enumerations in many different forms.

This package can be used to create type-safe enumerations, and retrieve them as a dictionary, as an array of id's, as an array or names, or an array of objects. You can also lookup a name by id.

## Usage

```javascript
import Enumitron from 'enumitron';

const numbers = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
const numbersEnum = new Enumitron(numbers);
```

## Constraints

All enums are required to have unique names and ids. If there are objects with duplicate names or ids in the array that is passed into the Enumitron constructor, a error will be thrown.

## Getters

### asDictionary

```javascript
numbersEnum.asDictionary;
// returns...
// {
//   One: { id: 1, name: 'One' },
//   Two: { id: 2, name: 'Two' }
// }
```

### asIds

```javascript
numbersEnum.asIds;
// returns [1, 2]
```

### asNames

```javascript
numbersEnum.asNames;
// returns ['One', 'Two'];
```

### asObjects

```javascript
numbersEnum.asObjects;
// returns [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
```

## Methods

### getNameById

```javascript
numbersEnum.getNameById(1);
// returns 'One';
```

If a name is not found at the given id, an error will be thrown.
