import moment from 'moment';

import { RECORD_FORM_UPDATE, ADD_NEW_RECORD } from '../actions/types';

const INITIAL_STATE = {
  result: 0,
  date: moment().format('DD MMM YYYY')
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_RECORD:
      return INITIAL_STATE;
    case RECORD_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
