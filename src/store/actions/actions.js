import * as types from './actionType';
import axios from 'axios';

export const user_login = data => async dispatch => {
  try {
    dispatch({
      type: types.USER_LOGIN,
      payload: {
        isUserLogin: true,
        userData: {
          username: data.username,
        },
        accessToken: data.accessToken,
      },
    });
  } catch (error) {
    console.log('Network Error', error);
  }
};

export const user_logout = () => async dispatch => {
  console.log('logout');
  try {
    dispatch({
      type: types.USER_LOGOUT,
      payload: {isUserLogin: false},
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const get_data = () => async dispatch => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({
      type: types.GET_DATA,
      payload: {
        userData: res.data,
      },
    });
  } catch (error) {
    console.log('Network Error: ' + error);
  }
};

export const updateUserData = userData => async dispatch => {
  try {
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: {
        userData: userData,
      },
    });
  } catch (error) {
    console.log('Failed to update data.');
  }
};
