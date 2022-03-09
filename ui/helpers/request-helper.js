import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

export const request = Axios.create({ baseURL: '/api/v1' });

export const useRequest = makeUseAxios({
  axios: request,
  cache: false,
  defaultOptions: {
    ssr: true,
    useCache: false,
    manual: true,
  },
});
