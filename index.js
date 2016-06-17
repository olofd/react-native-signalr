let signalRHubConenctionFunc;
let oldLogger = window.console.debug;
window.document = {
  readyState: 'complete'
};
if (!window.addEventListener) {
  window.addEventListener = window.addEventListener = () => {};
}
window.navigator.userAgent = "react-native";
window.jQuery = require('./lib/signalr-jquery-polyfill.js');

module.exports = {
  setLogger: (logger) => {
    if (window.console && window.console.debug) {
      window.console.debug("OVERWRITING CONSOLE.DEBUG in react-native-signalr");
    } else {
      if (!window.console) {
        window.console = {};
      }
    }
    window.console.debug = logger;
  },
  hubConnection: (serverUrl, options) => {
    if (!signalRHubConenctionFunc) {
      require('ms-signalr-client');
      signalRHubConenctionFunc = window.jQuery.hubConnection;
    }
    const protocol = serverUrl.split('//')[0];
    const host = serverUrl.split('//')[1];
    window.location = {
      protocol: protocol,
      host: host
    };
    window.document = {
      createElement: function() {
        return {
          protocol: protocol,
          host: host
        }
      }
    };

    if (options && options.headers) {
      window.jQuery.defaultAjaxHeaders = options.headers;
    }

    return signalRHubConenctionFunc(serverUrl, options);
  }
};
