import {KeyboardTypeOptions, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/styles';

type PROPS = {
    isInvalid: boolean;
    keyboardType?: KeyboardTypeOptions;
    onUpdateValue: (name: string) => void;
    value: string;
    secure?: boolean
};

const CustomInput: React.FC<PROPS> = ({
    isInvalid,
    keyboardType,
    onUpdateValue,
    value,
    secure
}) => {
    return (
        <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            autoCapitalize={undefined}
            keyboardType={keyboardType}
            secureTextEntry={secure ? secure : false}
            onChangeText={onUpdateValue}
            value={value}
        />
    );
};

CustomInput.defaultProps = {
    keyboardType: "default"
}

const styles = StyleSheet.create({
    input: {
      paddingVertical: 8,
      paddingHorizontal: 6,
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      fontSize: 16,
    },
    inputInvalid: {
      backgroundColor: Colors.error100,
    },
  });

export default CustomInput;
