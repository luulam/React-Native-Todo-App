import { Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const colors = {
    primary: '#edbbd0',
    secondary: '#B3D9CE',
    bg_app: 'white',
    access: '#00897b',
    text: '#191919',
    text_light: 'white',
    disable: '#cccccc',
    border: '#d3d3d3',
    error: '#db2828',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828',
    white: '#ffffff',
    black: '#0f0f0f'
};

const constants = {
    appWidth: width < height ? width : height,
    appHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 48 : 48,
    statusBarHeight: Platform.OS === 'ios' ? 20 : 20,
    padHor: 8,
    padVer: 4,
    pad: 4,
    opacity: 0.6,
    border: 0.7,
    borderRadius: 6,
    font: {
        sub: 14,
        nomal: 16,
        dialog: 22,
        header: 26,
        icon: 32,
    },
    fab: 42,
    icon: 38,
    btnHeight: 38,
};

const styleApp = {
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
    colors,
    constants,
    styleApp
};
