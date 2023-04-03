import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

// const fetcher = (url) => fetch(url, {credentials: 'include'}).then((res) => res.json());
// const fetcher = async (url, params) => axios.get(url, { params });
export const fetcher = async (url, params, onSuccessCallback) => {
  try {
    const response = await axios.get(url, { params });
    if (onSuccessCallback) { 
      onSuccessCallback(response.data);
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

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
