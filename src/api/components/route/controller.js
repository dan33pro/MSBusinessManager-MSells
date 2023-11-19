const TABLA = {
    name: 'Rutas',
    pk: 'id_ruta',
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
        const ruta = {
            nombre_ruta: body.nombre_ruta,
            id_admin: body.id_usuario,
            id_vendedor: body.id_vendedor,
            id_entregador: body.id_entregador,
        };

        if (body.accion == 'insert' && (!ruta.nombre_ruta || !ruta.id_admin ||  !ruta.id_vendedor || !ruta.id_entregador)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_ruta) {
            ruta.id_ruta = body.id_ruta;
        }

        const response = await store.upsert(TABLA, ruta, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la ruta');
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