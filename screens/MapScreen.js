import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { globalStyles, colors } from "../styles/global";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../components/Map";
import { fetchRestaurants } from "../api/restaurants.js";

import restaurantData from "../data/restaurantData.js";
import { RestaurantModal } from "../components/RestaurantModal.js";

//console.log(filterCategories);

const restauranteCategories = ["Todos", "Churrasqueira", "Petiscos"];

export default function MapScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const filteredRestaurants = data.filter((restaurant) => {
    return restaurant.category === selectedFilter || selectedFilter === "Todos";
  });
  //console.log(filteredRestaurants);

  const filterCategories = [
    "Todos",
    ...new Set(data?.map((restaurante) => restaurante.category)),
  ];

  const convertFilterIcon = (filter) => {
    switch (filter) {
      case "Todos":
        return <MaterialIcons name="restaurant" size={20} />;
      case "Churrasqueira":
        return <MaterialIcons name="outdoor-grill" size={20} />;
      case "Petiscos":
        return <MaterialCommunityIcons name="food-hot-dog" size={20} />;
      default:
        return <MaterialIcons name="restaurant" size={20} />;
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const fetchRestaurantData = async () => {
    console.log("fetching data");
    try{
      const restaurantResponse = await fetchRestaurants();
      console.log("dados do fetch", restaurantResponse)
    } catch (error){
      console.log("erro no fetch restaurants")
    }

    setData(restaurantData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <Map restaurantes={filteredRestaurants} />
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
              style={[
                styles.buttonStyle,
                selectedFilter === filter
                  ? { backgroundColor: colors.secondary }
                  : null,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <View
                style={[
                  styles.filterText,
                  selectedFilter === filter ? { color: "white" } : null,
                ]}
              >
                <Text
                  style={[
                    { marginRight: 10 },
                    selectedFilter === filter ? { color: "white" } : null,
                  ]}
                >
                  {convertFilterIcon(filter)}
                </Text>
                <Text
                  style={[
                    selectedFilter === filter ? { color: "white" } : {color: colors.secondary},
                  ]}
                >
                  {filter}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedRestaurant(item);
                setModalVisible(true);
              }}
              style={[
                globalStyles.card,
                {
                  backgroundColor: colors.primary,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text style={[colors.secondary, { fontSize: 18 }]}>
                {item?.name}
              </Text>
              <Text style={{ color: "white" }}>
                {item?.rating}{" "}
                <AntDesign name="star" size={16} color={colors.secondary} />
              </Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>

      <RestaurantModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedRestaurant={selectedRestaurant}
        navigation={navigation}
      />

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
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    width: 150,
  },
  containerMap: {
    flex: 0.6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFilters: {
    flex: 0.1,
    width: "100%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
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
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.9,
    width: "90%",
    height: "70%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#43806c",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position: "absolute",
    bottom: 35,
    justifyContent: "center",
    backgroundColor: "#FFA500",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  filterText: {
    fontSize: 16,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
});
