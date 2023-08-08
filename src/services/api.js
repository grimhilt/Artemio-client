import axios from 'axios';

const caller = (url = '/api') => {
    return axios.create({
        baseURL: url,
    });
};

const API = {
    profile() {
        return caller().get('/auth/profile');
    },
    logout() {
        return caller().post('/auth/logout');
    },
    login(data) {
        return caller().post('/auth/login', data);
    },
    listUsers(data) {
        return caller().get('/users', data);
    },
    listRoles(data) {
        return caller().get('/roles', data);
    },
    listPlaylists(data) {
        return caller().get('/playlists', data);
    },
    createPlaylist(data) {
        return caller().post('/playlists', data);
    },
    updatePlaylist(playlistId, data) {
        return caller().put(`/playlists/${playlistId}/update`, data);
    },
    activate(playlistId) {
        return caller().post(`/playlists/${playlistId}/activate`);
    },
    disactivate(playlistId) {
        return caller().post(`/playlists/${playlistId}/disactivate`);
    },
    getPlaylist(id) {
        return caller().get(`/playlists/${id}`);
    },
    upload(data) {
        return caller().post('/file', data);
    },
    getFiles() {
        return caller().get('/file');
    },
    addFileToPlaylist(playlistId, file) {
        return caller().post(`/playlists/${playlistId}`, file);
    },
    playlistChangeOrder(playlistId, data) {
        return caller().post(`/playlists/${playlistId}/order`, data);
    },
    playlistChangeSeconds(playlistId, data) {
        return caller().post(`/playlists/${playlistId}/seconds`, data);
    },
    playlistRemoveFile(playlistId, data) {
        return caller().post(`/playlists/${playlistId}/remove_file`, data);
    },
    createUser(data) {
        return caller().post('/users', data);
    },
};

export default API;
