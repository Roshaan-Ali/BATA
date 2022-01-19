import * as types from './actionType';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import {apiUrl} from '../../config/config';

export const completeEvent =
  (id, token, _onSuccessCompleteEvent) => async dispatch => {
    try {
      const response = await axios.put(
        `${apiUrl}/bookingInterpreter/completed/${id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      );
      _onSuccessCompleteEvent(response?.data?.data.booking);
      dispatch({
        type: types.COMPLETE_BOOKING,
        payload: response?.data?.data,
      });
    } catch (err) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'Something went wrong on completing booking.',
          status: true,
        },
      });
      console.log(err);
    }
  };

export const submitReviewsAndRatings =
  (data, token, _onSucessSubmitReview) => async dispatch => {
    try {
      const response = await axios.post(
        `${apiUrl}/commentAndRating/create`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      );
      _onSucessSubmitReview();
    } catch (err) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'SUBMISSION ERROR',
          status: true,
        },
      });
      console.log(err);
    }
  };

export const createCustomPackage =
  (data, token, _onSuccess) => async dispatch => {
    try {
      const response = await axios.post(
        `${apiUrl}/subscription/customSubcribe`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      );
      dispatch({
        type: types.PACKAGE_MODIFIED,
        payload: response.data.data,
      });

      if (response.status) {
        _onSuccess();
      } else {
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            msg: 'SUBMISSION ERROR',
            status: true,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'SUBMISSION ERROR',
          status: true,
        },
      });
      console.log('Failed To Create Package', err);
    }
  };

export const getBookingHistory = token => async dispatch => {
  try {
    const response = await axios.get(
      `${apiUrl}/bookingInterpreter/clientBooking`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    );
    dispatch({
      type: types.GET_BOOKING_HISTORY,
      payload: response.data.data,
    });
  } catch (err) {
    console.log('Failed to fetch current booking!', err);
  }
};

export const getCurrentBooking = token => async dispatch => {
  try {
    const response = await axios.get(
      `${apiUrl}/bookingInterpreter/currentBooking`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    );
    if (response.data.success) {
      dispatch({
        type: types.GET_CURRENT_BOOKING,
        payload: response.data.data,
      });
    }
  } catch (err) {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: 'Failed Fetching Current Booking.',
        status: true,
      },
    });
    console.log('Failed to fetch current booking!', err);
  }
};

export const cancelSubscription =
  (id, token, _openSuccessCancellationAlert) => async dispatch => {
    try {
      const response = await axios.delete(
        `${apiUrl}/subscription/cancel/${id}`,

        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      );
      dispatch({
        type: types.CANCEL_SUBSCRIPTION,
        payload: response.data.data,
      });
      if (response.data.success) {
        _openSuccessCancellationAlert();
      }
    } catch (err) {
      console.log('Failed To Cancel', err.response);
    }
  };

export const updatePackage =
  (data, token, _closeStripeModal) => async dispatch => {
    try {
      const response = await axios.put(`${apiUrl}/subscription/update`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      });
      dispatch({
        type: types.PACKAGE_MODIFIED,
        payload: response.data.data,
      });
      _closeStripeModal();
    } catch (err) {
      console.log('PACKAGE Updating FAILED:', err);
    }
  };

export const buyPackage =
  (data, token, _closeStripeModal) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/subscription/create`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      });
      dispatch({
        type: types.PACKAGE_MODIFIED,
        payload: response.data.data,
      });
      _closeStripeModal();
    } catch (err) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'Something went wrong.',
          status: true,
        },
      });
      console.log('PACKAGE BUYING FAILED:', err);
    }
  };

export const user_login = data => async dispatch => {
  try {
    const response = await axios.post(`${apiUrl}/users/signin`, {
      email: data?.email,
      password: data?.password,
    });
    if (response.data.success) {
      dispatch({
        type: types.USER_LOGIN,
        payload: {
          isUserLogin: true,
          userData: response?.data?.data,
          accessToken: response.data?.data.token,
        },
      });
    } else {
      dispatch({
        type: types.ERROR_MODAL,
        payload: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: 'Network Error',
        status: true,
      },
    });
    console.log('Network Error', JSON.stringify(error.response, null, 2));
  }
};

export const requestNewOtp = data => async dispatch => {
  try {
    const response = await axios.post(`${apiUrl}/users/register`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      language: data.language,
      service_type: data.service_type,
    });
    if (response?.data?.success) {
      dispatch({
        type: types.USER_SIGNUP,
        payload: {
          userData: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            language: data.language,
            service_type: data.service_type,
          },
        },
      });
    }
  } catch (err) {
    console.log('Network Error ', err);
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: 'Network Error',
        status: true,
      },
    });
  }
};

export const user_signup = (data, _onSuccess) => async dispatch => {
  try {
    const response = await axios.post(`${apiUrl}/users/register`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      language: data.language,
      service_type: data.service_type,
    });

    if (response?.data?.success) {
      dispatch({
        type: types.USER_SIGNUP,
        payload: {
          userData: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            language: data.language,
            service_type: data.service_type,
          },
        },
      });

      _onSuccess();
    } else {
      // dispatch({
      //   type: types.ERROR_MODAL,
      //   payload: {
      //     msg: response?.data?.msg,
      //     status: true,
      //   },
      // });
    }
  } catch (error) {
    console.log('CATCH ERROR RESPONSE STATUS: ', error.response.data.msg);
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: error.response.data.msg,
        status: true,
      },
    });
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

export const getAllPackages = token => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/packages/gets`, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    });
    dispatch({
      type: types.GET_PACKAGES,
      payload: {
        packages: res.data.data,
      },
    });
  } catch (error) {
    console.log('Network Error: ' + error);
  }
};

export const getAllLanguages = () => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/admin/language/gets`);
    dispatch({
      type: types.GET_LANGUAGES,
      payload: {
        languages: res.data.data,
      },
    });
  } catch (error) {
    console.log('Network Error Cant Fetch Languages: ' + error);
  }
};

export const subscribeToTopic = id => async dispatch => {
  console.log('subs ');
  try {
    messaging()
      .subscribeToTopic('bata_client' + id.toString())
      .then(() => {
        // console.log('TOPIC SUBSCRIBED');
      });

    dispatch({
      type: types.TOGGLE_FCM_NOTIFICATION,
      payload: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const unSubscribeFromTopic = id => async dispatch => {
  console.log('unsubs');

  try {
    messaging()
      .unsubscribeFromTopic('bata_client' + id.toString())
      .then(() => {
        console.log('TOPIC UNSUBSCRIBED');
      });

    dispatch({
      type: types.TOGGLE_FCM_NOTIFICATION,
      payload: false,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOccasions = token => async dispatch => {
  console.log('occasions', token);
  try {
    const response = await axios.get(`${apiUrl}/occation/gets`, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    });
    dispatch({
      type: types.GET_OCCASIONS,
      payload: response?.data?.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePhoto = (photo, token) => async dispatch => {
  try {
    var bodyFormData = new FormData();

    bodyFormData.append('profile_image', {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.type,
    });
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/users/profileImage`,
      data: bodyFormData,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: types.UPDATE_PHOTO,
      payload: response.data.data.image_name,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = (userData, token) => async dispatch => {
  try {
    const response = await axios({
      method: 'put',
      url: `${apiUrl}/users/update`,
      data: userData,
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    });
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error, 'Failed to update data.');
  }
};

export const changePassword = (data, token, navigation) => async dispatch => {
  try {
    const response = await axios.post(`${apiUrl}/users/changePassword`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    });
    if (!response.data.success) {
      console.log('response : ', response.data);
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: response?.data?.msg,
          status: true,
        },
      });
    } else {
      navigation.goBack();
    }
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: err?.msg,
        status: true,
      },
    });
    // console.log(err);
  }
};

export const setErrorModal = () => dispatch => {
  try {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: '',
        status: false,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const bookTranslator =
  (data, token, openConfirmBookModal) => async dispatch => {
    try {
      const response = await axios.post(
        `${apiUrl}/bookingInterpreter/create`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      );
      if (response.data.success) {
        openConfirmBookModal();
      }
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: '',
          status: false,
        },
      });
      if (!response.data.success) {
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            msg: 'SUBMISSION ERROR',
            status: true,
          },
        });
      }
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'SUBMISSION ERROR',
          status: true,
        },
      });
      console.log(err);
    }
  };

export const verifySignUpOtpCode =
  (data, _onSuccess, _onFailure) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/users/verify`, {
        phone: data.phone,
        code: data.code,
      });

      if (response.data.success) {
        dispatch({
          type: types.IS_VALID_SIGNUP_OTP,
          payload: response?.data?.data,
        });
        _onSuccess();
      }
    } catch (err) {
      _onFailure();
      console.log('Failed to verify Otp Code.');
    }
  };

export const skipBuyingPackage = () => dispatch => {
  try {
    dispatch({
      type: types.SKIP_BUY_PACKAGE,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveUserCoords = coords => dispatch => {
  try {
    dispatch({
      type: types.SAVE_USER_COORDS,
      payload: coords,
    });
  } catch (err) {
    console.log(err);
  }
};

export const requestOtpForResetPassword =
  (phone, _onSuccess) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/users/forgetPassword`, {
        phone,
      });

      if (response.data.success) {
        console.log('200------------------------');
        _onSuccess();
      }
      if (!response.data.success) {
        console.log('200------------------------ BUT NOT WORKED');

        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            msg: response.data?.msg,
            status: true,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'Please check your network connection.',
          status: true,
        },
      });
      console.log('Network Error', err);
    }
  };

export const verifyResetPasswordOtpCode =
  (data, _onSuccess, _onFailure) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/users/verifyCode`, {
        phone: data.phone,
        code: data.code,
      });
      if (response.data.success) {
        console.log(
          'DISPATCHED.....................................................................',
        );
        dispatch({
          type: types.IS_VALID_RESET_PASS_OTP,
          payload: response.data,
        });
        _onSuccess();
      }
      if (!response.data.success) {
        console.log(
          'NOT_______DISPATCHED.....................................................................',
        );

        _onFailure();
      }
    } catch (err) {
      console.log('Failed to verify Reset Password Otp Code.');

      // dispatch({
      //   type: types.HAS_NETOWRK_ERROR,
      // });
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'Please check your network connection.',
          status: true,
        },
      });
    }
  };

export const resetPassword =
  (params, _onSuccessPasswordChange) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/users/resetPassword`, {
        userId: params.userId,
        password: params.password,
        confirmPassword: params.confirmPassword,
      });

      if (response.data.success) {
        _onSuccessPasswordChange();
      } else {
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            msg: response.data.msg,
            status: true,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'Please check your network connection.',
          status: true,
        },
      });
      console.log('Error: ', err);
    }
  };

export const getCurrentLocation = () => async dispatch => {
  try {
    const config = {
      enableHighAccuracy: true,
      timeout: 200000,
      maximumAge: 3600000,
    };

    Geolocation.getCurrentPosition(
      info => {
        dispatch({
          type: types.GET_CURRENT_LOC,
          payload: {
            lat: info.coords.latitude,
            lng: info.coords.longitude,
          },
        });
      },
      err => console.log(err),
      config,
    );
  } catch (err) {
    console.log(err);
  }
};
