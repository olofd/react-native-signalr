export default function(options, data) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      options.success && options.success(JSON.parse(request.responseText));
    } else {
      options.error && options.error(request._bodyText);
    }
  };

  request.setRequestHeader('content-type', options.contentType);
  
  request.open(options.type, options.url);
  request.send(options.data.data && `data=${options.data.data}`);
  
  return {
    abort: function(reason) {
      return request.abort(reason);
    }
  };
}
