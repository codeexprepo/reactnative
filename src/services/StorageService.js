import AsyncStorage from '@react-native-community/async-storage';

class StorageKeys {
  static PERSON = 'person';
}
/**
 * Use this class to store key,item pair in the mobile local storage
 */
export default class StorageService {
  persons = [];
  modelContext;

  constructor() {
    this.getPersons().then(() => {});
  }

  addPerson(_name, _interest) {
    this.persons.push({name: _name, interest: _interest});
    this.savePersons();
  }

  async savePersons() {
    return this.save(StorageKeys.PERSON, JSON.stringify(this.persons));
  }

  async getPersons() {
    const value = await this.get(StorageKeys.PERSON);
    if (value !== null) {
      this.persons = JSON.parse(value);
    } else {
      this.persons;
    }
  }

  async save(key, item) {
    try {
      await AsyncStorage.setItem(key, item);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
