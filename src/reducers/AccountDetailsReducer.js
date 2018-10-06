import moment from 'moment';
import uuidv4 from 'uuid/v4';

import { KEY_ACTIVE } from '../Globals';
import { 
  ACCOUNT_DETAIL_FORM_UPDATE, 
  ACCOUNT_DETAIL_ADD
} from '../actions/types';

const INITIAL_STATE = {
  id: uuidv4(),
  accountName: '',
  accountCurrency: '',
  displayImage: '',
  startDate: moment().format('DD/MM/YYYY'),
  endDate: moment().format('DD/MM/YYYY'),
  status: KEY_ACTIVE
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_ADD:
      return INITIAL_STATE;
    case ACCOUNT_DETAIL_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
