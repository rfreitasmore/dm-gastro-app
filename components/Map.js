import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles, colors } from '../styles/global';

const Map = ({ restaurantes }) => {
  const convertFilterIcon = (category) => {
    switch (category) {
      case "Todos":
        return <MaterialIcons name="restaurant" size={20} color={colors.background} />;
      case "Churrasqueira":
        return <MaterialIcons name="outdoor-grill" size={20} color={colors.background} />;
      case "Petiscos":
        return <MaterialCommunityIcons name="food-hot-dog" size={20} color={colors.background} />;
      default:
        return <MaterialIcons name="restaurant" size={20} color={colors.background} />;
    }
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 41.805817,
        longitude: -6.757189,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {restaurantes.map((restaurante) => (
        <Marker
          key={restaurante.id}
          coordinate={{
            latitude: restaurante.latitude,
            longitude: restaurante.longitude,
          }}
          title={restaurante.name}
          description={restaurante.description}
        >
          <View style={styles.marker}>
            {convertFilterIcon(restaurante.category)}
          </View>
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  marker: {
    display: 'flex',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: colors.primary,
    borderWidth: 4,
  }
});

export default Map;
