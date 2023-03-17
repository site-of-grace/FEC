import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

// const fetcher = (url) => fetch(url, {credentials: 'include'}).then((res) => res.json());
const fetcher = async (url, params) => axios.get(url, { params });

const postRequest = async (url, { arg }) => {
  return await axios.post(url, { withCredentials: true, arg });
};

export const swr = (path, successCallback, options) => {
  const _options = {...options};

  if (successCallback) {
    _options.onSuccess = successCallback;
  }

  return useSWR(path, fetcher, _options);
};

export default function manualSWR({ path, params, type, onSuccess} ) {
  const options = {};

  if (onSuccess) {
    options.onSuccess = onSuccess;
  }

  const fetchFunction = type === 'get' ? _.partialRight(fetcher, params) : postRequest;
  return useSWRMutation(path, fetchFunction, options);
}
