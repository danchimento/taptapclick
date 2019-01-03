import { AppRegistry } from 'react-native';
import App from './App';
import { Client } from 'bugsnag-react-native';

const bugsnag = new Client("0d95f2767f26d196a3fbe6d93c122b64");

AppRegistry.registerComponent('Locked', () => App);