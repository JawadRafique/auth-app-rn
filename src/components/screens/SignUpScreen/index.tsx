import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import AuthForm from '../../organism/AuthForm';
import { Colors } from '../../../constants/styles';
import AuthContent from '../../templates/AuthContent';

const SignUpScreen = () => {
    const onAuthenticate = () => {};
    return (
        <View style={styles.authContent}>
            <AuthContent
                isLogin={false}
                onAuthenticate={onAuthenticate}
            />
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
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
    },
    buttons: {
      marginTop: 8,
    },
  });

export default SignUpScreen;
