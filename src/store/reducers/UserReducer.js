import {USER_LOGIN, USER_LOGOUT, GET_DATA} from '../actions/actionType';

const initialData = {
  isUserLogin: false,
  userName: '',
  userData: [],
};

export function UserReducer(state = initialData, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, ...action.payload};
    case USER_LOGOUT:
      return {...action.payload};
    case GET_DATA:
      console.log(action.payload,'------------------------>>>>>>>>>>>')
      return {...state,...action.payload}
    default:
      return state;
  }
}
