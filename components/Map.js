import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";


const Map = ({restaurantes}) => {
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
        />
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
