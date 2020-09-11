# Enumitron

![https://img.shields.io/github/license/brybrophy/enumitron?color=blue](https://img.shields.io/github/license/brybrophy/enumitron?color=blue) ![https://img.shields.io/npm/v/enumitron](https://img.shields.io/npm/v/enumitron) ![https://img.shields.io/bundlephobia/minzip/enumitron](https://img.shields.io/bundlephobia/minzip/enumitron) ![https://img.shields.io/librariesio/release/npm/enumitron](https://img.shields.io/librariesio/release/npm/enumitron)

### Generate enumerations in many different forms.

This package can be used to create type-safe enumerations, and retrieve them as a dictionary, as an array of id's, as an array of names, or as an array of objects. You can also lookup a name by id.

## Usage

```javascript
import Enumitron from "enumitron";

const numbers = [
  { id: 1, name: "One" },
  { id: 2, name: "Two" },
];
const numbersEnum = new Enumitron(numbers);
```

## Constraints

All enums are required to have unique names and ids. If there are objects with duplicate names or ids in the array that is passed into the Enumitron constructor, an error will be thrown.

Any additional key/value pairs contained in the objects you pass in will be preserved. The values can be of any type.

## Getters

### asDictionary

```javascript
numbersEnum.asDictionary;
/* returns...
{
  One: { id: 1, name: 'One' },
  Two: { id: 2, name: 'Two' }
}
*/
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

## Additional Properties

You can include more that just `id` and `name` into an enumeration object. Whatever properties you include will be preserved and returned when `enum.asObject` or `enum.asDictionary` is called.

```javascript
import Enumitron from "enumitron";

const numbers = [
  { id: 1, name: "One", translations: { german: "Ein", spanish: "Uno" } },
  { id: 2, name: "Two", translations: { german: "Zwei", spanish: "Dos" } },
];
const numbersEnum = new Enumitron(numbers);

numbersEnum.asObjects;
/* 
returns 
[
  { id: 1, name: "One", translations: { german: "Ein", spanish: "Uno" } },
  { id: 2, name: "Two", translations: { german: "Zwei", spanish: "Dos" } },
]
*/
```

## Iteration

To make retrieval of enumerations more streamlined, the Enumitron class is implemented as a interable class. This allows you to access properties of the class at their indexes, and perform loops on the class.

### For Loop

```javascript
for (let i = 0; i < numbersEnum.length; i++) {
  doThingWithEnum(numbersEnum[i]);
}
```

### For Of Loop

```javascript
for (let item of numbersEnum) {
  doThingWithEnum(item);
}
```

### Index Access

```javascript
numbersEnum[1];
// returns { id: 2, name: 'Two' }
```
