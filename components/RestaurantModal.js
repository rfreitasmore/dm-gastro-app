import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const RestaurantModal = ({ navigation, visible, onClose, restaurant }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{restaurant?.name}</Text>
            <Text style={styles.cardSubtitle}>{restaurant?.category}</Text>
          </View>
          <Image
            style={styles.cardImage}
            source={{ uri: restaurant?.imageUrl }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardDescription}>
              {restaurant?.description}
            </Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                onClose();
                navigation.navigate("RestaurantDetails", {
                  restaurantId: restaurant.id,
                });
              }}
            >
              <Text style={styles.actionButtonText}>More Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => {
                navigator.navigate("");
              }}
            >
              <Text style={styles.infoButtonText}>Contact Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    margin: 16,
    opacity: 0.95,
    width: "90%",
    height: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500",
  },
  cardSubtitle: {
    fontSize: 18,
    color: "#555",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  cardContent: {
    marginTop: 16,
    justifyContent: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
    justifyContent: "center",
  },
  infoButton: {
    padding: 10,
    backgroundColor: "#FFA500",
    borderRadius: 10,
    width: "50%",
  },
  infoButtonText: {
    textAlign: "center",
    color: "white",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    position: "absolute",
    bottom: 20,
    gap: 30,
  },
  actionButton: {
    padding: 10,
    backgroundColor: "#43806c",
    borderRadius: 20,
    flexGrow: 1,
    marginHorizontal: 4,
    borderRadius: 10,
    width: "50%",
  },
  actionButtonText: {
    textAlign: "center",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    display: "flex",
    top: 20,
    right: 20,
    backgroundColor: "red",
    borderRadius: 100,
    height: 30,
    width: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "normal",
  },
});

export default RestaurantModal;
