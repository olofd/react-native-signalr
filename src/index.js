let signalRHubConnectionFunc;

if (!window.addEventListener) {
  window.addEventListener = window.addEventListener = () => { };
}
window.navigator.userAgent = 'react-native';
window.jQuery = require('./signalr-jquery-polyfill.js').default;

export default {
  setLogger: (logger) => {
    if (window.console && window.console.debug) {
      window.console.debug('OVERWRITING CONSOLE.DEBUG in react-native-signalr');
    } else if (!window.console) {
      window.console = {};
    }
    window.console.debug = logger;
  },
  hubConnection: (serverUrl, options) => {
    window.document = window.document || { readyState: 'complete' };
    if (!signalRHubConnectionFunc) {
      require('ms-signalr-client');
      signalRHubConnectionFunc = window.jQuery.hubConnection;
    }
    const [protocol, host] = serverUrl.split(/\/\/|\//);
    if (options && options.headers) {
      window.jQuery.defaultAjaxHeaders = options.headers;
    }

    const hubConnectionFunc = signalRHubConnectionFunc(serverUrl, options);
    const originalStart = hubConnectionFunc.start;
    hubConnectionFunc.start = (...args) => {
      window.document = window.document || { readyState: 'complete' };
      window.document.createElement = () => {
        return {
          protocol,
          host
        };
      };
      window.location = {
        protocol,
        host
      };
      const returnValue = originalStart.apply(hubConnectionFunc, args);
      window.document = undefined;
      return returnValue;
    };

    return hubConnectionFunc;
  }
};
