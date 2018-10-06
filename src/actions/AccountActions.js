import { 
  ACCOUNT_DETAIL_FORM_UPDATE,
  ACCOUNT_DETAIL_ADD
} from './types';

const addNewAccount = ({ accountDetails }) => {
  return {
    type: ACCOUNT_DETAIL_ADD,
    payload: accountDetails
  };
};

const accountDetailFormUpdate = ({ prop, value }) => {
  return {
    type: ACCOUNT_DETAIL_FORM_UPDATE,
    payload: { prop, value }
  };
};

export {
  addNewAccount,
  accountDetailFormUpdate
};
