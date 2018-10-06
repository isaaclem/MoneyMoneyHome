import { combineReducers } from 'redux';
import SummaryReducer from './SummaryReducer';
import AccountReducer from './AccountReducer';
import AccountDetails from './AccountDetailsReducer';

export default combineReducers({
  main: SummaryReducer,
  account: AccountReducer,
  accountDetails: AccountDetails
});
