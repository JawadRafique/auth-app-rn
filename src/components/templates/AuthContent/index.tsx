import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AuthForm, {FORM} from '../../organism/AuthForm';
import {Colors} from '../../../constants/styles';
import Button from '../../atoms/Button';

export type AUTH = {
    email: string;
    password: string;
};

type PROPS = {
    isLogin: boolean;
    onAuthenticate: ({email, password}: AUTH) => void;
};

const AuthContent: React.FC<PROPS> = ({isLogin, onAuthenticate}) => {
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        // Todo
    }

    function submitHandler(credentials: FORM) {
        let {email, confirmEmail, password, confirmPassword} = credentials;
        email = email.trim();
        password = password.trim();
        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert(
                'Invalid input',
                'Please check your entered credentials.',
            );
            setCredentialsInvalid({
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        onAuthenticate({email, password});
    }
    return (
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
                <Button onPress={switchAuthModeHandler}>
                    {isLogin ? 'Create a new user' : 'Log in instead'}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});

export default AuthContent;
