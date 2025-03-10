import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // Alinea el título a la izquierda y los íconos a la derecha
    alignItems: "center", // Centra verticalmente los elementos
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 5,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  headerIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // Espacio entre íconos
  },
  addButton: {
    padding: 10,
    backgroundColor: "#4A90E2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  reminderItem: {
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 15,
  marginBottom: 0, // Reducir la separación entre elementos
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 }, // Menos sombra para que no parezca flotante
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2, // Menos elevación
  },
  reminderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
    color: "#666",
  },
  warningContainer: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#FFF3CD",
    borderWidth: 1,
    borderColor: "#856404",
  },
  iconButton: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#EDF5FF",
  },
  parent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1, // Permite que el título ocupe el espacio disponible
    alignItems: "center", // Asegura que el título esté centrado
    justifyContent: "center",
  },
  notificationAndAddReminder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});

export default styles;
