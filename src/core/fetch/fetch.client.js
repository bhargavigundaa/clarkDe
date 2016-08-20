import 'whatwg-fetch';

const fetch = self.fetch.bind(self);

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const message = `Status: ${response.status} Url: ${response.url}`;

  window.dataLayer.push({
    event: 'reactAjaxError',
    errorData: message
  });

  return response;
}

export default function wrapper(...options) {
  // options[0] = addExtraParams(options[0]); // eslint-disable-line
  return fetch(...options).then(checkStatus);
}

export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
