import keytar from 'keytar';
import path from 'path';
import fs from 'fs-extra';
import Platform from './platform';
import localStorage from 'localStorage';

class TokenStore {
  static setItem(key, login, value) {
    return keytar.setPassword(key, login, value);
  }

  static getItem(key, login) {
    return keytar.getPassword(key, login);
  }

  static deleteItem(key, login) {
    return keytar.deletePassword(key, login);
  }

  static getUserName() {
    let dataFilePath = path.join(Platform.localAppData(), 'settings.json');
    let username = '';
    if (fs.existsSync(dataFilePath)) {
      let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
      if (data.username) {
        username = data.username;
      }
    }
    return username;
  }

  static getStatus() {
    return JSON.parse(localStorage.getItem('rememberMe'));
  }
}

export default TokenStore;
