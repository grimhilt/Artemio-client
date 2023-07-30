import axios from 'axios';

const caller = (url = '/api') => {
    return axios.create({
        baseURL: url,
    });
};

const API = {
    listPlaylists(data) {
        return caller().get('/playlist', data);
    },
    createPlaylist(data) {
        return caller().put('/playlist', data);
    },
    getPlaylist(id) {
        return caller().get(`/playlist/${id}`);
    },
    upload(data) {
        return caller().post('/file', data);
    },
    getFiles() {
        return caller().get('/file');
    },
};

export default API;
