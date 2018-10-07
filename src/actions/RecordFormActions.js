import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { 
  RECORD_FORM_UPDATE,
  ADD_NEW_RECORD
} from './types';

const update = (year, month, obj, target) => {
  [year, month].reduce((r, e, i, a) => {
    if (!a[i + 1] && r[e]) {
      r[e].records.push(obj);

      if (obj.type === 'expense') r[e].totalExpenses = parseFloat(r[e].totalExpenses) + parseFloat(obj.amount);
      if (obj.type === 'income') r[e].totalIncome = parseFloat(r[e].totalIncome) + parseFloat(obj.amount);
    }
    return r[e] = (r[e] || (a[i + 1] ? {} : {
      records: [obj],
      totalExpenses: obj.type === 'expense' ? parseFloat(obj.amount) : 0,
      totalIncome: obj.type === 'income' ? parseFloat(obj.amount) : 0,
      type: obj.type
    }));
  }, target);
};

const recordFormUpdate = ({ prop, value }) => {
  return {
    type: RECORD_FORM_UPDATE,
    payload: { prop, value }
  };
};

const addNewRecord = ({ recordDetails, records }) => {
  const year = moment(recordDetails.date).year();
  const month = moment(recordDetails.date).format('MMM');

  const newRec = {
    id: uuidv4(),
    account_id: recordDetails.account_id,
    date: recordDetails.date,
    description: recordDetails.description,
    amount: recordDetails.result,
    type: recordDetails.type
  };

  update(year, month, newRec, records);

  return {
    type: ADD_NEW_RECORD,
    payload: records
  };
};

export { recordFormUpdate, addNewRecord };
