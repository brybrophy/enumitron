interface IEnum {
  id: number;
  name: string;
  [key: string]: any;
}

interface IEnumDictionary {
  [key: string]: IEnum;
}

export default class Enumitron {
  private _enumArray: IEnum[] = [];

  constructor(enumArray: IEnum[]) {
    this._enumArray = this._validateUnique(
      'id',
      this._validateUnique('name', enumArray)
    );
  }

  private _throwError(msg: string): never {
    throw new Error(msg);
  }

  private _validateUnique(key: string, enumArray: IEnum[]): IEnum[] {
    const distinct = [...Array.from(new Set(enumArray.map(item => item[key])))];
    if (distinct.length !== enumArray.length) {
      return this._throwError(
        `Enums must have unique ${key}s. ${JSON.stringify(enumArray)}`
      );
    }
    return enumArray;
  }

  public get asDictionary(): IEnumDictionary {
    return this._enumArray.reduce((dict: IEnumDictionary, item: IEnum) => {
      dict[item.name] = item;
      return dict;
    }, {});
  }

  public get asIds(): number[] {
    return this._enumArray.map(item => item.id);
  }

  public get asNames(): string[] {
    return this._enumArray.map(item => item.name);
  }

  public get asObjects(): IEnum[] {
    return this._enumArray;
  }

  public getNameById(id: number): string {
    const result = this._enumArray.find(item => item.id === id);
    if (!result) {
      return this._throwError(`Enumitron with id ${id} does not exist`);
    }
    return result.name;
  }
}
