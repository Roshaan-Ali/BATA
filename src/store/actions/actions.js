import * as types from './actionType';
import axios from 'axios';

export const user_login = data => async dispatch => {
  try {
    const res = await axios.patch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {title: data},
    );
    dispatch({
      type: types.USER_LOGIN,
      // payload: {userName: res.data.title},
      payload: {isUserLogin: true},
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

export const get_data = () => async (dispatch) => {
  try {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  dispatch({
    type: types.GET_DATA,
    payload:{
      userData: res.data
    }
  });
} catch(error){
  console.log("Network Error: " + error)
};
};

// export const changeCount = count => dispatch => {
//   console.log('......................aaaaa', count);
//   dispatch({
//     type: types.COUNTER_CHANGE,
//     payload: count,
//   });
// };

// export const logIn = (user) => async dispatch => {
//     console.log("HITTT",user)

//   //   axios.post(`https://jsonplaceholder.typicode.com/posts`,{
//   //     "title": "foo11",
//   //     "body": "bar222",
//   //     "userId": "1",
//   //     "id": 101
//   // }).then((res)=> res.json()).then((json)=>console.log(json))

//   // dispatch({
//   //   type: USER_NAME,
//   //   payload: res.user,
//   // });
// }
