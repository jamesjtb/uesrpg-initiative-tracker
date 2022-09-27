#!/usr/bin/env node

const DataStore = require('nedb');

const args = require('minimist')(process.argv.slice(2), {
    alias: {
        f: 'databasefile',
        k: 'key',
        v: 'defaultvalue',
    }
});

const db = new DataStore({
    filename: args.databasefile,
    autoload: true,
});

const parseToPrimitive = (input) => {
    try {
        return JSON.parse(input);
    } catch (e) {
        return input;
    }
};

const update = (data) => {
    return new Promise((resolve, reject) => {
        db.update({ _id: data._id }, data, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        })
    });
};

const readAll = () => {
    return new Promise((resolve, reject) => {
        db.find({}, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

(async () => {
    const docs = await readAll();
    for (const doc of docs) {
        await update({
            ...doc,
            [args.key]: parseToPrimitive(args.defaultvalue)
        });
        console.log(`Doc ID ${doc._id} updated.`);
    }
})();

