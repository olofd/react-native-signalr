var polyfill = require('./react-native-signalr-polyfill.js');
require('ms-signalr-client');

module.exports = {
	hubConnection : (serverUrl) => {
		window.document ={
   			 createElement : function(){
        	 return {
           		 protocol : serverUrl.split('//')[0],
           		 host : serverUrl.split('//')[1]
          		}
       		 }
		};
		return window.jQuery.hubConnection(serverUrl);
	}
}  