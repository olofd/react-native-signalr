//Arrange new state
const oldDocument = window.document;
const oldReadyState = window.document && window.document.readyState;

window.document = {
  readyState: 'complete'
};
window.addEventListener = () => {};
window.navigator.userAgent = 'react-native';

//Act
window.jQuery = require('./signalr-jquery-polyfill.js');
require('ms-signalr-client');

//Restore old state
const hubConnection = window.jQuery.hubConnection;
window.jQuery = undefined;
window.document = oldDocument;

if (oldReadyState) {
  window.document.readyState = oldReadyState;
}

export default {
  hubConnection: (serverUrl) => {
    const protocol = serverUrl.split('//')[0];
    const host = serverUrl.split('//')[1];
    window.location = {
      protocol,
      host
    };
    window.document = {
      createElement: () => {
        return {
          protocol,
          host
        };
      }
    };
    return hubConnection(serverUrl);
  }
};
