import { CHANGE_MONTH } from './types';

const changeMonth = ({ month }) => {
  return {
    type: CHANGE_MONTH,
    payload: month
  };
};

export {
  changeMonth
};
