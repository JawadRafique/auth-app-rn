import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../../atoms/Button';
import {useAppDispatch} from '../../../hooks/reduxHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../../redux/slices/authSlice';
import { useGetDataMutation } from '../../../redux/slices/dataApiSlice';

const WelcomeScreen = () => {
    const [getData, {isLoading}] = useGetDataMutation()
    // const authState = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const getApiData = async () => {
        try {
            const value = await getData({}).unwrap()
            if (value !== null) {
                // value previously stored
                console.log('value', value);
            }
        } catch (e) {
            // error reading value
            console.log('error', e);
        }
    };

    const logoutHandler = () => {
        dispatch(logout())
        AsyncStorage.removeItem("token")
    }

    return (
        <View style={styles.container}>
            <View>
                <Button onPress={() => getApiData()}>Click Me</Button>
            </View>
            <Button onPress={() => logoutHandler()}>Log out</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
    },
});

export default WelcomeScreen;
