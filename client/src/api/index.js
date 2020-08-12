import Api from './ApiWorker'
import {API_ENDPOINTS} from './constants';


export const getForms = data => {
    return Api.send(
        'GET',
        API_ENDPOINTS.getForm + `/${data.formID}`,
        {}
    )
}

export const setForms = data => {
    return Api.send(
        'POST',
        API_ENDPOINTS.getForm,
        {...data}
    )
}

export const getAnswers = data => {
    return Api.send(
        'GET',
        API_ENDPOINTS.getAnswers + `/${data.formID}`,
        {}
    )
}

export const setAnswer = data => {
    return Api.send(
        'POST',
        API_ENDPOINTS.setAnswer,
        {...data}
    )
}
