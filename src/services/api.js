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
    updatePlaylist(playlistId, data) {
        return caller().post(`/playlist/${playlistId}/update`, data);
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
    playlistRemoveFile(playlistId, data) {
        return caller().post(`/playlist/${playlistId}/remove_file`, data);
    },
};

export default API;
