import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const config = params => ({
  ...offlineConfig,
  persistCallback: params.persistCallback
});

export default params => offline(config(params));
