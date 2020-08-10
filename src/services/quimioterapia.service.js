import { api } from '../helpers';

const basePath = '/quimioterapia';

function getAll() {
    return api.get(`${basePath}`);
}

function show(quimioId) {
    return api.get(`${basePath}/${quimioId}`)
}

function update(quimioId, data) {
    return api.put(`${basePath}/${quimioId}`, data);
}

function create(data) {
    return api.post(`${basePath}/`, data);
}

function remove(quimioId) {
    return api.post(`${basePath}/${quimioId}`);
}

const quimioterapiaService = {
    getAll,
    show,
    update,
    create,
    remove,
};

export default quimioterapiaService;