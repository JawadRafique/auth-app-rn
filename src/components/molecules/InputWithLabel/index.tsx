import {View, Text, StyleSheet, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants/styles';
import CustomInput from '../../atoms/CustomInput';

type PROPS = {
    label: string;
    isInvalid: boolean;
    keyboardType?: KeyboardTypeOptions;
    onUpdateValue: (name: string) => void;
    value: string;
    secure?: boolean;
};

const InputWithLabel: React.FC<PROPS> = ({
    isInvalid,
    keyboardType,
    label,
    onUpdateValue,
    secure,
    value,
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <CustomInput isInvalid keyboardType={keyboardType} onUpdateValue={onUpdateValue} secure={secure} value={value} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    labelInvalid: {
        color: Colors.error500,
    },
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

export default InputWithLabel;
