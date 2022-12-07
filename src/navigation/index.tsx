import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import LoginScreen from '../components/screens/LoginScreen';
import {Colors} from '../constants/styles';
import SignUpScreen from '../components/screens/SignUpScreen';
import WelcomeScreen from '../components/screens/WelcomeScreen';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/atoms/LoadingOverlay';
import { setToken } from '../redux/slices/authSlice';

const Stack = createStackNavigator<RootStackParamList>();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
                //   contentStyle: { backgroundColor: Colors.primary100 },
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
            }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
    );
}


const Navigation = () => {
    const [loading, setLoading]= useState(true)
    const authToken = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch()

    const initialize = async () => {
        const token = await AsyncStorage.getItem("token")
        await dispatch(setToken(token || ""))
        setLoading(false)
    }

    useEffect(() => {
        initialize()
        return () => {};
    }, []);

    if(loading) {
        return <LoadingOverlay message='Loading ...' />
    }

    return (
        <NavigationContainer>
            {!authToken && <AuthStack />}
            {authToken && <AuthenticatedStack />}
        </NavigationContainer>
    );
};
4;

export default Navigation;
