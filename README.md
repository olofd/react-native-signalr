#react-native-signalr

Connect to your SignalR-server with a active websocket-connection from react-native.
Supports all error-handling and reconnection, including longpolling if needed.

Today the module shims the jQuery-dependency that signalr has.
There is however an ongoing task upstream to remove this dependency.

PS. Does NOT pull in the entire jQuery-library. Only shimes the few methods SignalR needs.
Tested on iOS and Android. No known issues.

#Install:
```
npm i react-native-signalr --save
```

##
There is an example server setup at http://react-native-signalr.azurewebsites.net (no webite, only responds to signalr)
If it's up and running, you can use it to debug against.
You can find the source for that server under examples/server.
The code below uses that server to setup a connection and communicate over websockets using signalr.

#Awesome-project:

~~~~~
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import signalr from 'react-native-signalr';

class AwesomeProject extends Component {

  componentDidMount() {
    //This is the server under /example/server published on azure.
    const connection = signalr.hubConnection('http://react-native-signalr.azurewebsites.net');
    connection.logging = true;

    const proxy = connection.createHubProxy('chatHub');
    //receives broadcast messages from a hub function, called "helloApp"
    proxy.on('helloApp', (argOne, argTwo, argThree, argFour) => {
      console.log('message-from-server', argOne, argTwo, argThree, argFour);
      //Here I could response by calling something else on the server...
    });

    // atempt connection, and handle errors
    connection.start().done(() => {
      console.log('Now connected, connection ID=' + connection.id);
      
      proxy.invoke('helloServer', 'Hello Server, how are you?')
        .done((directResponse) => {
          console.log('direct-response-from-server', directResponse);
        }).fail(() => {
          console.warn('Something went wrong when calling server, it might not be up and running?')
        });

    }).fail(() => {
      console.log('Failed');
    });

    //connection-handling
    connection.connectionSlow(() => {
      console.log('We are currently experiencing difficulties with the connection.')
    });

    connection.error((error) => {
      const errorMessage = error.message;
      let detailedError = '';
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
        console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
      }
      console.debug('SignalR error: ' + errorMessage, detailedError)
    });
  }

  render() {
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
}

const styles = StyleSheet.create({
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
~~~~~~
