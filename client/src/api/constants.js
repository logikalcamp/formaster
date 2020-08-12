const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL = isLocal ? "http://localhost:3000/api" : '/api';


export const API_ENDPOINTS = {
    getForm:BASE_URL+'/forms',
    setForm:BASE_URL+'/forms',
    getAnswers:BASE_URL+'/answers',
    setAnswer:BASE_URL+'/answers'
};

