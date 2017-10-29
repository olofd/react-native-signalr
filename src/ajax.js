const qs = data => {
  let results = [];
  for (const name in data) results.push(`${name}=${encodeURIComponent(data[name])}`);
  return results.join("&");
};

export default (headers, options) => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200 && !request._hasError && options.success) {
      options.success(JSON.parse(request.responseText));
    } else if (options.error) {
      options.error(request, request._response);
    }
  };

  request.open(options.type, options.url);
  request.setRequestHeader("content-type", options.contentType);

  if (options.xhrFields) {
    Object.keys(options.xhrFields).forEach(key => {
      const value = options.xhrFields[key];
      request[key] = value;
    });
  }

  if (headers) {
    Object.keys(headers).forEach(key => {
      const value = headers[key];
      request.setRequestHeader(key, value);
    });
  }
  request.send(options.data && qs(options.data));

  return {
    abort: reason => {
      return request.abort(reason);
    },
  };
};
