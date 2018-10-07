import { combineReducers } from 'redux';
import SummaryReducer from './SummaryReducer';
import AccountReducer from './AccountReducer';
import AccountDetails from './AccountDetailsReducer';
import SettingsReducer from './SettingsReducer';
import RecordDetailsReducer from './RecordDetailsReducer';

export default combineReducers({
  main: SummaryReducer,
  account: AccountReducer,
  accountDetails: AccountDetails,
  settings: SettingsReducer,
  recordDetails: RecordDetailsReducer
});
