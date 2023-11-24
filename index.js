/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { ThemeProvider } from 'styled-components';
import App from './src/components/App';
import {name as appName} from './app.json';

import theme from './src/assets/styles/default';

export default function Main() {
    return (
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main)
