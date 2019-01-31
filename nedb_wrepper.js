const Datastore = require('nedb');

let collections = {};

function collection(dbname) {
    if (!(dbname in collections))
        add_collection(dbname);
    method = {
        find: function (option) {
            if (option == null || option == undefined)
                option = {}
            return new Promise((resolve, reject) => {
                collections[dbname].find(option, (err, doc) => {
                    if (err)
                        reject(err)
                    resolve(doc)
                })
            })
        },
        insertMany: async function (documents) {
            for (document of documents) {
                await this.insert(document)
            }
        },
        insert: function (document) {
            return new Promise((resolve, reject) => {
                collections[dbname].insert(document, (err) => {
                    if (err)
                        reject(err)
                    resolve()
                })
            })
        },
        update: function (document, condition) {
            return new Promise((resolve, reject) => {
                collections[dbname].update(condition, {$set: document}, {upsert: true}, (err, count) => {
                    if (err)
                        reject(err)
                    resolve(count)
                })
            })
        },
        remove: function (condition) {
            return new Promise((resolve, reject) => {
                collections[dbname].remove(condition, (err, numRemoved) => {
                    if (err)
                        reject(err)
                    resolve(numRemoved)
                })
            })
        },
    }
    return method
}


function add_collection(name_collection) {
    collections[name_collection] = new Datastore({
        filename: 'db/' + name_collection + '.db',
        autoload: true
    });
}

module.exports = {collection, collections}