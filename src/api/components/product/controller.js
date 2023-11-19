const TABLA = {
    name: 'Productos',
    pk: 'id_producto',
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
        const product = {
            id_producto: body.id_producto,
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            empresa: body.empresa,
            id_tipo_producto: body.id_tipo_producto,
            id_admin: body.id_usuario,
            imagen: body.imagen,
        };

        if (body.accion == 'insert' && (!product.nombre || !product.descripcion || !product.precio || !product.empresa || !product.id_tipo_producto || !product.id_admin || !product.imagen)) {
            return Promise.reject('No se indico la información necesaria');
        }

        const response = await store.upsert(TABLA, product, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la parada');
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