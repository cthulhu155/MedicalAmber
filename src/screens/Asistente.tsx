import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  useWindowDimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AddMedicineScreen from "../components/AddMedicine"; 
import styles from "../utils/Styles/MedicalRemindersStyleSheet";

export default function MedicalReminders() {
  // Obtén el ancho actual de la pantalla
  const { width } = useWindowDimensions();
  // Define un ancho base (por ejemplo, 375)
  const BASE_WIDTH = 375;
  // Calcula un factor de escala
  const scaleFactor = width / BASE_WIDTH;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#f5f5f5", "#e0e0e0"]} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontSize: 24 * scaleFactor }]}>
            Medical Reminders
          </Text>
          <Ionicons style={styles.icon} name="medical-outline" size={24 * scaleFactor} color="#333" />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Ionicons
              name="notifications-off-outline"
              size={50 * scaleFactor}
              color="#ccc"
            />
            <Text style={[styles.cardTitle, { fontSize: 20 * scaleFactor }]}>
              No Reminders
            </Text>
            <Text style={[styles.cardText, { fontSize: 16 * scaleFactor }]}>
              You don't have any medical reminders. Click the "+" button to add one!
            </Text>
          </View>
        </ScrollView>

        {/* Botón para abrir el modal */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Add a new medicine reminder"
        >
          <Ionicons name="add-circle" size={60 * scaleFactor} color="#333" />
        </TouchableOpacity>

        {/* Modal con la pantalla de agregar medicina */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <AddMedicineScreen />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
                accessibilityLabel="Close medicine addition modal"
              >
                <Text style={[styles.closeButtonText, { fontSize: 18 * scaleFactor }]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}
