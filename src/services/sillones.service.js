import { api } from '../helpers';

const basePath = '/quimioterapia/sillones';

function create(data) {
    return api.post(`${basePath}/`, data);
}

function remove(sillonId) {
    return api.delete(`${basePath}/${sillonId}`);
}

function show(sillonId) {
    return api.get(`${basePath}/${sillonId}`);
}

function update(sillonId, data) {
    return api.put(`${basePath}/${sillonId}`, data);
}

function getAll() {
    return api.get(`${basePath}`);
}

const sillonesService = {
    getAll,
    show,
    update,
    create,
    remove,
};

export default sillonesService;