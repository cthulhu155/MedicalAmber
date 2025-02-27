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
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinea el título a la izquierda y los íconos a la derecha
    alignItems: 'center', // Centra verticalmente los elementos
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
    flex: 1, // Permite que el título ocupe el espacio disponible
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // 1rem de espacio entre íconos
  },
  addButton: {
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
    color: '#666',
  },
  warningContainer: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: '#856404',
  },
  iconButton: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#EDF5FF',
  },
});

export default styles;