react-native-signalr

```
import signalr from 'react-native-signalr';

class ChatService{
	constructor(){
		this.connectToChatHub();
	}

	connectToChatHub(){
		var connection = signalr.hubConnection('http://192.168.4.20:81');
		connection.logging = true;

		var proxy = connection.createHubProxy('chatHub');
		 
		// receives broadcast messages from a hub function, called "addMessage"
		proxy.on('addMessage', (message) => {
		    console.log(message);
		    proxy.invoke('test', "hej");
		});
		 
		// atempt connection, and handle errors
		connection.start().done(() => { 
			console.log('Now connected, connection ID=' + connection.id); 
		});
	}			
}

module.exports = new ChatService();
```
