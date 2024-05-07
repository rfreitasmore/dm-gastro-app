import React from 'react';
import { Modal, View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyles, colors } from '../styles/global';

export const RestaurantModal = ({ navigation, modalVisible, selectedRestaurant, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{selectedRestaurant?.name}</Text>
          <Image
            style={styles.modalImage}
            source={{ uri: selectedRestaurant?.imageUrl }}
          />
          <Text style={styles.modalText}>
            {selectedRestaurant?.description}
          </Text>
          <Text style={styles.modalText}>
            {selectedRestaurant?.rating}
            <AntDesign name="star" size={16} color={colors.primary} />
          </Text>
          <Text style={styles.modalText}>
            {selectedRestaurant?.openingTimes}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate("Detalhes", {
                restaurantId: selectedRestaurant.id,
              });
            }}
          >
            <Text style={styles.textStyle}>Ver detalhes</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.9,
    width: "90%",
    height: "70%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    resizeMode: "cover"
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    position: 'absolute',
    bottom: 35,
    justifyContent: "center",
    backgroundColor: '#FFA500',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

