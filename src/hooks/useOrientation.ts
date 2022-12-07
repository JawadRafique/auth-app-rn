import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
    const [screenInfo, setScreenInfo] = useState(Dimensions.get('window'));

    useEffect(() => {
        const onChange = (result: any) => {
            setScreenInfo(result.screen);
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        return () => subscription?.remove();
    }, []);

    return {
        ...screenInfo,
        isPortrait: screenInfo.height > screenInfo.width,
    };
};

export default useOrientation;
