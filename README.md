react-native-signalr

Only tested on iOS. Early POC.

```
import signalr from 'react-native-signalr';

class ChatService{
	constructor(){
		this.connectToChatHub();
	}

	connectToChatHub(){
		var connection = signalr.hubConnection('http://<your-signalr-server-url>');
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


#Awesome-project:

```
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var signalr = require('react-native-signalr');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var AwesomeProject = React.createClass({

  componentDidMount : function(){
    var connection = signalr.hubConnection('http://<your-signalr-server-url>');
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
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```
