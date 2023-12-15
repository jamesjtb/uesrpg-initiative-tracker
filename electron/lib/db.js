const { app } = require('electron');

const Datastore = require('@seald-io/nedb');

class DbRepository {
    #db;

    constructor(dataType) {
        this.#db = new Datastore({
            filename: `${app.getPath('userData')}/${dataType}.db`,
            autoload: true,
        });
    }

    // this is somehow writing duplicate data on each write
    async write(data) {
        console.log(data._id);
        return await (this.#db.updateAsync({ _id: data._id }, data, { upsert: true }))
    }

    read(filter, sort) {
        return new Promise((resolve, reject) => {
            this.#db
                .find(filter)
                .sort(sort)
                .exec((error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
        });
    }

    delete(_id) {
        return new Promise((resolve, reject) => {
            this.#db.remove({ _id }, {}, (error, countRemoved) => {
                if (error) return reject(error);
                return resolve(countRemoved);
            });
        });
    }

    ensureIndex(indexOptions) {
        return new Promise((resolve, reject) => {
            this.#db.ensureIndex(indexOptions, e => {
                if (e) {
                    return reject(e)
                }
                return resolve();
            });
        });
    }
}
module.exports = DbRepository;
