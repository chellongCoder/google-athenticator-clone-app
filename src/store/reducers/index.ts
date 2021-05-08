
import { combineReducers } from 'redux';
import OtpReducer from './otp.reducer'
const RootReducer = combineReducers({
    OtpReducer
});

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;
