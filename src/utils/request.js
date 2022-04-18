import fetch from 'dva/fetch';

function parseJSON(response) {
  const ret = {
    headers: {},
  };
  return new Promise(resolve => {
    response.json().then((data) => {
      ret.data = data
      ret.headers['x-total-count'] = response.headers.get('x-total-count')
      resolve(ret)
    })

  })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return { data }
    })
    .catch(err => ({ err }));
}

