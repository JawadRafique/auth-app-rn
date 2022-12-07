import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../atoms/CustomInput';
import InputWithLabel from '../../molecules/InputWithLabel';
import Button from '../../atoms/Button';

type PROPS = {
    isLogin: boolean;
    onSubmit: ({...credentials}: FORM) => void;
    credentialsInvalid: any;
};

const initialFormValues = {
    email: 'jawad@test.com',
    confirmEmail: '',
    password: 'Admin@123',
    confirmPassword: '',
};

export type FORM = {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
};

const AuthForm: React.FC<PROPS> = ({credentialsInvalid, isLogin, onSubmit}) => {
    const [formValues, setFormValues] = useState<FORM>(initialFormValues);

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    const updateInputValueHandler = (name: string, value: string) => {
        setFormValues({...formValues, [name]: value});
    };

    
    const submitHandler = () => {
        const {email, password, confirmEmail, confirmPassword} = formValues;
        onSubmit({
            email, password, confirmEmail, confirmPassword
        })
    };

    return (
        <View style={styles.form}>
            <View>
                <InputWithLabel
                    label="Email Address"
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={formValues.email}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <InputWithLabel
                        label="Confirm Email Address"
                        onUpdateValue={updateInputValueHandler.bind(
                            this,
                            'confirmEmail',
                        )}
                        value={formValues.confirmEmail}
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                    />
                )}
                <InputWithLabel
                    label="Password"
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'password',
                    )}
                    // secure
                    value={formValues.password}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <InputWithLabel
                        label="Confirm Password"
                        onUpdateValue={updateInputValueHandler.bind(
                            this,
                            'confirmPassword',
                        )}
                        secure
                        value={formValues.confirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {},
    buttons: {
        marginTop: 12,
    },
});

export default AuthForm;
