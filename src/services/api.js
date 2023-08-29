import axios from 'axios';

const caller = (url = '/api') => {
    return axios.create({
        baseURL: url,
    });
};

const API = {
    playlists: {
        create(data) {
            return caller().post('/playlists', data);
        },
        get(id) {
            return caller().get(`/playlists/${id}`);
        },
        list(data) {
            return caller().get('/playlists', data);
        },
        update(playlistId, data) {
            return caller().put(`/playlists/${playlistId}/update`, data);
        },
        activate(playlistId) {
            return caller().post(`/playlists/${playlistId}/activate`);
        },
        disactivate(playlistId) {
            return caller().post(`/playlists/${playlistId}/disactivate`);
        },
        addFile(playlistId, file) {
            return caller().post(`/playlists/${playlistId}`, file);
        },
        removeFile(playlistId, data) {
            return caller().post(`/playlists/${playlistId}/remove_file`, data);
        },
        changeOrder(playlistId, data) {
            return caller().post(`/playlists/${playlistId}/order`, data);
        },
        changeSeconds(playlistId, data) {
            return caller().post(`/playlists/${playlistId}/seconds`, data);
        },
    },
    roles: {
        list(data) {
            return caller().get('/roles', data);
        },
        search(search) {
            if (search === "") {
                return API.roles.list()
            } else {
                return caller().get(`/roles/${search}`);
            }
        },
    },
    users: {
        create(data) {
            return caller().post('/users', data);
        },
        delete(userId) {
            return caller().delete(`/users/${userId}`);
        },
        list(data) {
            return caller().get('/users', data);
        },
    },
    files: {
        upload(data) {
            return caller().post('/files', data);
        },
        list() {
            return caller().get('/files');
        },
    },
    profile() {
        return caller().get('/auth/profile');
    },
    logout() {
        return caller().post('/auth/logout');
    },
    login(data) {
        return caller().post('/auth/login', data);
    },
};

export default API;
