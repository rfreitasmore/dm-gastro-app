import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "../styles/global";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SuccessModal = ({ modalVisible, setModalVisible, message, iconName }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialIcons name={iconName} size={80} color={colors.success} />
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 22
  },
  modalView: {
    margin: 0,
    flex: 0.3,
    width: "100%",   
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 20,
    width: "100%",
    elevation: 2,
    marginTop: 15
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
    color: "#333",
    fontSize: 20
  }
});

export default SuccessModal;
