import moment from 'moment';

import { CHANGE_MONTH } from '../actions/types';

const INITIAL_STATE = {
  selectedMonth: moment().format('MMM')
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MONTH:
      return { ...state, selectedMonth: action.payload };
    default:
      return state;
  }
};
