import * as actionTypes from '../actions/actionTypes';

const initialState = {
    admin: false
};

const setAdmin = (state,action) =>{
    return {
        ...state,
        admin: true
    }
};

const unsetAdmin = (state,action) =>{
    return {
        ...state,
        admin:false
    }
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_ADMIN:{
            return setAdmin(state,action);
        }
        case actionTypes.UNSET_ADMIN:{
            return unsetAdmin(state,action);
        }
        default: {
        return state;
        }
    }
}

export default reducer;