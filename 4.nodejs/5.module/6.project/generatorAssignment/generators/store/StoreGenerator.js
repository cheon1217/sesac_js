const Store = require("../variables/Store");
const AddressGenerator = require("../common/addressGenerator");
const Generator = require("../common/Generator");
const StorenameGenerator = require("./StorenameGenerator");
const uuid = require("uuid");

class StoreGenerator extends Generator {
    constructor() {
        super();
        this.storeNameGenerator = new StorenameGenerator();
        this.addressGenerator = new AddressGenerator();
    }

    generate() {
        const storeId = uuid.v4();
        const storeType = this.storeNameGenerator.generateType();
        const name = this.storeNameGenerator.generateStoreName(storeType);
        const address = this.addressGenerator.generate();

        return new Store(storeId, name, storeType, address);
    }

    generateStores(count) {
        const stores = [];

        for (let i = 0; i < count; i++) {
            const store = this.generate();
            stores.push(store);
        }

        return stores;
    }
}

module.exports = StoreGenerator;