import { api } from 'boot/axios';

export const getRevotes = async () => {
    try {
        const token = localStorage.getItem('token');
    
        const { data } = await api.get('/revotes', { headers: { Authorization: `Bearer ${token}` }, params: { filter: 'top-weekly' } });
        return data;
    } catch (error) {
        // Handle error
    }    
};

export const addRevote = async (title, description) => {
    try {
        const token = localStorage.getItem('token');

        const { data } = await api.post('/revotes', { title, description }, { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        // Handle error
    }
};

export const getVotes = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const { data } = await api.get('/revotes/vote', { headers : { Authorization: `Bearer ${token}` }, params: { revoteId: id } });
        return data;
    } catch (error) {
        // Handle error
    }    
};

export const doVote = async (id, upOrDown) => {
    try {
        const token = localStorage.getItem('token');

        const { data } = await api.post('/revotes/vote', { revoteId: id, upOrDown }, { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        // Handle error
    }
};

export const login = async (email, password) => {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    } catch (error) {
        // Handle error
    }
}

export const register = async (email, username, password) => {
    try {
        const { data } = await api.post('/auth/register', { email, username, password });
        return data;
    } catch (error) {
        // Handle error
    }
}

export const getMe = async () => {
    try {
        const token = localStorage.getItem('token');

        const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        // Handle error
    }
}

export const deleteRevote = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const { data } = await api.delete(`/revotes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        // Handle error
    }
}