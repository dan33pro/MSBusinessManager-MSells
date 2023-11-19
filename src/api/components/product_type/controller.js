const TABLA = {
    name: 'TiposProducto',
    pk: 'id_tipo_producto',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const product_type = {
            id_tipo_producto: body.id_tipo_producto,
            detalle: body.detalle,
        };

        if (body.accion == 'insert' && (!product_type.detalle)) {
            return Promise.reject('No se indico la información necesaria');
        }

        const response = await store.upsert(TABLA, product_type, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del tipo producto');
        }
        return store.remove(TABLA, id);
    }

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};