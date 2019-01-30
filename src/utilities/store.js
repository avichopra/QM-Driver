/**
 * Store.getInstance().setUserID("")
 */
export default class Store {
    static myInstance = null;
  
    _store = {};
  
    /**
     * @returns {Store}
     */
    static getInstance() {
      if (Store.myInstance == null) {
        Store.myInstance = new Store();
      }
  
      return Store.myInstance;
    }
  
    //   getUserID() {
    //     return this._userID;
    //   }
  
    //   setUserID(id) {
    //     this._userID = id;
    //   }
    getKey(key) {
      return this._store[key];
    }
  
    setKey(key, data, cb) {
      this._store = { ...this._store, [key]: { ...data } };
      if (cb) cb();
    }
  
    setKeyWithRef(key, data) {
      this._store = { ...this._store, [key]: data };
    }
  
    removeAllKeys() {
      this._store = {};
    }
  }
  