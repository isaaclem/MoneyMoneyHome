import moment from 'moment';
import uuidv4 from 'uuid/v4';

import Strings from '../Strings';
import { KEY_ACTIVE } from '../Globals';
import { ACCOUNT_DETAIL_ADD } from '../actions/types';

const INITIAL_STATE = {
  accountList: [{
    id: uuidv4(),
    accountName: Strings.labelMainAccount,
    accountCurrency: 'SGD',
    displayImage: '',
    startDate: moment().format('DD/MM/YYYY'),
    endDate: moment().format('DD/MM/YYYY'),
    status: KEY_ACTIVE
  }]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_ADD: 
      return { ...state, accountList: [...state.accountList, action.payload] };
    default:
      return state;
  }
};
