import { api } from '../helpers';

const basePath = '/quimioterapia/sillon';

function assign(data) {
    return api.post(`${basePath}`, data);
}

function remove(data) {
    alert("AAA "+data.idSala+" - "+data.idSillon);
    return api.delete(`${basePath}`, data);
}

const quimioSillonService = {
    assign,
    remove,
};

export default quimioSillonService;