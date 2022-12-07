/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import LoadingOverlay from './src/components/atoms/LoadingOverlay';
import Navigation from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Provider store={store}>
            <SafeAreaView style={{flex: 1}}>
                <Navigation />
            </SafeAreaView>
        </Provider>
    );
};

export default App;
