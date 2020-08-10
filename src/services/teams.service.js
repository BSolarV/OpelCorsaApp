import { api } from '../helpers';

const basePath = 'v1/equipo';

function getAll() {
    return api.get(`${basePath}/equipos`);
}

function show(teamId) {
    return api.get(`${basePath}/?id=${teamId}`)
}

function create(data) {
    return api.post(`${basePath}/`, data);
}

const teamsService = {
    getAll,
    show,
    create,
};

export default teamsService;