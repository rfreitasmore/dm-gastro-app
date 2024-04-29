import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { colors, fonts, globalStyles, card } from "../styles/global";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Map = ({ navigation, restaurantes }) => {
  const renderCategoryIcons = (category) => {
    switch (category) {
      case "Todos":
        return (
          <MaterialIcons name="food-bank" size={24} color={colors.background} />
        );

      case "Tradicional":
        return (
          <MaterialIcons
            name="local-dining"
            size={24}
            color={colors.background}
          />
        );
      case "Churrasqueira":
        return (
          <MaterialIcons
            name="outdoor-grill"
            size={24}
            color={colors.background}
          />
        );
      case "Petiscos":
        return (
          <MaterialIcons
            name="restaurant"
            size={24}
            color={colors.background}
          />
        );
      default:
        return null;
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
            {renderCategoryIcons(restaurante.category)}
          </View>
          <Callout
            tooltip
            onPress={() =>
              navigation.navigate("RestaurantDetails", {
                restaurantId: restaurante.id,
              })
            }
          >
            <View style={styles.calloutView}>
              <Text style={styles.calloutTitle}>{restaurante.name}</Text>
              <Text>
                <Image
                  source={{ uri: restaurante.imageUrl }}
                  style={{ width: 280, height: 150, resizeMode: "cover" }}
                />
              </Text>
              <Text
                style={styles.calloutRating}
              >{`Rating: ${restaurante.rating} ⭐`}</Text>
              <Button
                title="Details"
                onPress={() =>
                  navigation.navigate("RestaurantDetails", {
                    restaurantId: restaurante.id,
                  })
                }
              />
            </View>
          </Callout>
        </Marker>
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
  calloutView: {
    width: 300,
    height: 300,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  calloutImage: {
    width: 280,
    height: 150,
    resizeMode: "cover",
  },
  calloutRating: {
    fontSize: 12,
  },
  marker: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 10,
    ...card,
    borderRadius: 50,
  },
});
