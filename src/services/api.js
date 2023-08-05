import axios from 'axios';

const caller = (url = '/api') => {
    return axios.create({
        baseURL: url,
    });
};

const API = {
    logout() {
        return caller().post('/auth/logout');
    },
    login(data) {
        return caller().post('/auth/login', data);
    },
    listPlaylists(data) {
        return caller().get('/playlist', data);
    },
    createPlaylist(data) {
        return caller().post('/playlist', data);
    },
    updatePlaylist(playlistId, data) {
        return caller().post(`/playlist/${playlistId}/update`, data);
    },
    activate(playlistId) {
        return caller().post(`/playlist/${playlistId}/activate`);
    },
    disactivate(playlistId) {
        return caller().post(`/playlist/${playlistId}/disactivate`);
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
    addFileToPlaylist(playlistId, file) {
        return caller().post(`/playlist/${playlistId}`, file);
    },
    playlistChangeOrder(playlistId, data) {
        return caller().post(`/playlist/${playlistId}/order`, data);
    },
    playlistChangeSeconds(playlistId, data) {
        return caller().post(`/playlist/${playlistId}/seconds`, data);
    },
    playlistRemoveFile(playlistId, data) {
        return caller().post(`/playlist/${playlistId}/remove_file`, data);
    },
};

export default API;
