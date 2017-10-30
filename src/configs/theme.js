import { Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const Colors = {
    primary: '#edbbd0',
    secondary: '#B3D9CE',
    bg_app: 'white',
    access: '#1CA5F0',
    text: '#191919',
    text_light: 'white',
    gray: 'gray',
    disable: '#cccccc',
    border: '#d3d3d3',
    error: '#db2828',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828',
    white: '#ffffff',
    black: '#4c4c4c'
};

const Constants = {
    appWidth: width < height ? width : height,
    appHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 56 : 56,
    statusBarHeight: Platform.OS === 'ios' ? 20 : 20,
    padHor: 22,
    padVer: 12,
    pad: 16,
    opacity: 0.6,
    border: 0.7,
    borderRadius: 6,
    font: {
        header: 32,
        dialog: 22,
        nomal: 16,
        sub: 12,
        icon: 32,
        h2: 24
    },
    fab: 42,
    icon: 38,
    btnHeight: 38,
};

const Style = {
    disable_shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 0,
        shadowOpacity: 0,
        shadowColor: '#000000',
        elevation: 0,
    },
    shadow: {
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.2,
        shadowColor: '#000000',
        elevation: 4
    }
};

export {
    Colors,
    Constants,
    Style
};
