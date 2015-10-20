//Arrange new state
let oldDocument = window.document;
let oldReadyState = window.document && window.document.readyState;
window.document = {
  readyState : 'complete'
};

//Act
window.jQuery = require('./lib/signalr-jquery-polyfill.js');
require('ms-signalr-client');

//Restore old state
let hubConnection = window.jQuery.hubConnection;
window.jQuery = undefined;
window.document = oldDocument;

if(oldReadyState){
  window.document.readyState = oldReadyState;
}

module.exports = {
	hubConnection : (serverUrl) => {
		window.document = {
   			createElement : function(){
        	 return {
           		 protocol : serverUrl.split('//')[0],
           		 host : serverUrl.split('//')[1]
          		}
       		 }
		};
		return hubConnection(serverUrl);
	}
};  