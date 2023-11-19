const TABLA = {
    name: 'Pedidos',
    pk: 'id_pedido',
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
        const order = {
            id_pedido: body.id_pedido,
            notas: body.notas,
            id_estado: body.id_estado,
            id_cliente: body.id_cliente,
            fecha: body.fecha,
            total: body.total,
        };
        if (!order.notas || !order.id_estado || !order.id_cliente ||  !order.fecha || !order.total) {
            return Promise.reject('No se indico la información necesaria');
        }
        const response = await store.upsert(TABLA, order, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del pedido');
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