#react-native-signalr

Only tested on iOS. Works well.

#Install:
```
npm i react-native-signalr
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

		var proxy = connection.createHubProxy('myHub');
		 
		//receives broadcast messages from a hub function, called "messageFromServer"
		proxy.on('messageFromServer', (message) => {
		    console.log(message);

		    //Respond to message, invoke messageToServer on server with arg 'hej'
		    let messagePromise = proxy.invoke('messageToServer', 'hej');

		    //message-status-handling
		    messagePromise.done(() => {
			    console.log ('Invocation of NewContosoChatMessage succeeded');
			}).fail(function (error) {
			    console.log('Invocation of NewContosoChatMessage failed. Error: ' + error);
			});
		});
		 


		// atempt connection, and handle errors
		connection.start().done(() => { 
			console.log('Now connected, connection ID=' + connection.id); 
		}).fail(() => {
	      	console.log('Failed'); 
	    });



	    //connection-handling
	    connection.connectionSlow(function () {
	        console.log('We are currently experiencing difficulties with the connection.')
	    });

	    connection.error(function (error) {
	      console.log('SignalR error: ' + error)
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
