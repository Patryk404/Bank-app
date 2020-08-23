import * as actionTypes from './actionTypes';

export const setAdmin = () =>{
    return {
        type: actionTypes.SET_ADMIN
    }
};

export const unsetAdmin = () =>{
    return {
        type: actionTypes.UNSET_ADMIN
    }
};