export default function(options, data) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200 && !request._hasError) {
      options.success && options.success(JSON.parse(request.responseText));
    } else {
      options.error && options.error(request, request._response);
    }
  };

  request.open(options.type, options.url);
  request.setRequestHeader('content-type', options.contentType);

  request.send(options.data.data && `data=${options.data.data}`);

//  request.abort("__Negotiate Aborted__");
  
  return {
    abort: function(reason) {
      return request.abort(reason);
    }
  };
}
