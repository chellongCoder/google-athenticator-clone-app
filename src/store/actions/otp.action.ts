import { createAction } from 'redux-actions';
import { DELETE_QR_DATA, SAVE_QR_DATA, UPDATE_QR_DATA } from '../types/otp.type';

export const otpActionsCreator = {
  createOtp: createAction(SAVE_QR_DATA),
  updateOtp: createAction(UPDATE_QR_DATA),
  deleteOtp: createAction(DELETE_QR_DATA),
};
