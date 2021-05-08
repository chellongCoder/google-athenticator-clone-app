import otp from 'otplib/otplib-browser';

import {
    DELETE_QR_DATA,
    SAVE_QR_DATA,
    UPDATE_QR_DATA
  } from '../types/otp.type';
  
  const initialState = {
    list: []
  };
  
  export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
      case SAVE_QR_DATA: {
        let isNew = true;
        const list = state.list.map((v: any) => {
          if (v.secret === payload.secret) {
            isNew = false;
            return { ...v, ...payload };
          }
          return v;
        });
        if (isNew) {
          list.push({
            ...payload,
            otp: otp.authenticator.generate(payload.secret)
          });
        }
        return { ...state, list };
      }
      case DELETE_QR_DATA: {
        const list = state.list.filter((v: any) => v.secret !== payload.secret);
        return { ...state, list };
      }
      case UPDATE_QR_DATA: {
        const list = state.list.map((item: any) => ({
            ...item,
            otp: otp.authenticator.generate(item.secret)
          }));
          return { ...state, list };
      }
      default:
        return state;
    }
  }
  