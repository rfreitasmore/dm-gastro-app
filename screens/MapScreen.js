import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList
} from "react-native";
import { globalStyles, colors } from "../styles/global";
import Map from "../components/Map";

const data = [
  {
    id: 1,
    name: "Restaurante 1",
    latitude: 41.805827,
    longitude: -6.757289,
    description: "Aqui vai uma descrição do restaurante",
    category: "Tradicional",
  },
  {
    id: 2,
    name: "Churrasqueira 1",
    latitude: 41.815817,
    longitude: -6.757189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Churrasqueira",
  },
  {
    id: 3,
    name: "Churrasqueira 3",
    latitude: 41.814817,
    longitude: -6.777189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Churrasqueira",
  },
  {
    id: 4,
    name: "Tasca do Zé",
    latitude: 41.815817,
    longitude: -6.787189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Petiscos",
  },
  {
    id: 5,
    name: "Sabor na brasa",
    latitude: 41.795817,
    longitude: -6.737189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Churrasqueira",
  },
];

const filterCategories = [
  ...new Set(data.map((restaurante) => restaurante.category))
];

console.log(filterCategories);

const restauranteCategories = ["Todos", "Churrasqueira", "Petiscos"];

export default function MapScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  console.log(selectedFilter);
  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <Map restaurantes={data} />
        </View>
        <View style={styles.containerFilters}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {filterCategories.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={styles.buttonStyle}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        {/* <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonTextStyle}>Home</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    width: 200,
  },
  containerMap: {
    flex: 0.6,
    width: "100%",
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  containerFilters: {
    flex: 0.1,
    width: "100%",
  },
  filtersContentContainer: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "white",
  },
  containerList: {
    flex: 0.3,
    width: "100%",
  },
  scrollView: {
    padding:10
  }
});
