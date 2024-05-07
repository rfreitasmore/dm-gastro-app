import { StyleSheet } from 'react-native';

const colors = {
    primary: '#FFA000', 
    secondary: '#ad1126',
    background: '#FFFFFF',
    text: '#212121',
    subtitle: '#757575',
    border: '#BDBDBD',
    button: '#FFC107',
    buttonText: '#FFFFFF',
    cardBackground: '#FFFFFF',
};

const fonts = {
    title: 24,
    subTitle: 18,
    body: 14,
    caption: 12,
};

const cardShadow = {
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
};

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',   
        color: colors.text,
    },
    title: {
        fontSize: fonts.title,
        color: colors.primary,
        fontWeight: 'bold',
        padding: 10,
    },
    subTitle: {
        fontSize: fonts.subTitle,
        color: colors.subtitle,
        padding: 10,
    },
    text: {
        fontSize: fonts.body,
        color: colors.text,
    },
    caption: {
        fontSize: fonts.caption,
        color: colors.subtitle,
    },
    buttons: {
        backgroundColor: "red",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.button,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      homeButton: {
        backgroundColor: "white",
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,        
        width: 220,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    buttonText: {
        fontSize: fonts.body,
        color: colors.buttonText,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        padding: 16,
        margin: 10,
        ...cardShadow,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        padding: 10,
        borderRadius: 5,
        color: colors.text,
        backgroundColor: '#F7F7F7', 
    },
    buttonStyle: {
        backgroundColor: "red",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.button,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },

});

export { globalStyles, colors, fonts };
