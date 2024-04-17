import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import { colors, fonts, cardShadow, globalStyles } from '../styles/global';


export default function HomeScreen({navigation}) {
  return (
    <View style={globalStyles.container}>
    <Text style={[globalStyles.subTitle,
    {
        color: colors.text,
        fontWeight: 'bold',
        position: 'absolute',
        top: 100,
    }]}> Home Screen </Text>

    <Image 
    source={require('../assets/_gastro_guide_app.png')}
    style={{width: 300, resizeMode:"contain"}}/>
    
    <Text
    >
      Bem vindo à aplicação de guia de restaurantes
    </Text>
    <StatusBar style="auto" />
    

    <TouchableOpacity 
    style={[globalStyles.buttonStyle, 
      {
        backgroundColor: "white",
        width: 250,
        marginTop:50
      }
    
    ]}
      onPress={() => {  navigation.navigate("Mapa")  }} >
        <Text style={globalStyles.text}>Entrar</Text>
        </TouchableOpacity>
       
  </View>
  );
}


