import { api } from '../helpers';

const basePath = '/quimioterapia/sillon';

function assign(data) {
    return api.post(`${basePath}/`, data);
}

function remove(data) {
    return api.post(`${basePath}/`, data);
}

const quimioSillonService = {
    assign,
    remove,
};

export default quimioSillonService;