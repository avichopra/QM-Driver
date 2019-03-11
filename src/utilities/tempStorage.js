export default class TempStorage {
    static _instance = null;
    _keys = {};
    static getInstance = () => {
        if (TempStorage._instance == null) {
            TempStorage._instance = new TempStorage();
        }
        return TempStorage._instance;
    }
    setKey = (key, value) => {
        this._keys[key] = value;
    }
    getKey = (key) => {
        return this._keys[key];
    }

}