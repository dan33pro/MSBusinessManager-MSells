const TABLA = {
    name: 'DetallesPedido',
    pkOne: 'id_producto',
    pkTwo: 'id_pedido',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(idOne, idTwo) {
        return store.getCompose(TABLA, idOne, idTwo);
    }

    async function upsert(body) {
        const detailOrder = {
            id_producto: body.id_producto,
            id_pedido: body.id_pedido,
            cantidad: body.cantidad,
            total: body.total,
        };

        if (!detailOrder.id_producto || !detailOrder.id_pedido || !detailOrder.cantidad || !detailOrder.total) {
            return Promise.reject('No se indico la información necesaria');
        }

        const response = await store.upsert(TABLA, detailOrder, body.accion);
        return response;
    }

    function remove(idOne, idTwo) {
        if(!idOne || !idTwo) {
            return Promise.reject('Deben indicarse id del producto y id del pedido');
        }
        return store.removeCompose(TABLA, idOne, idTwo);
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