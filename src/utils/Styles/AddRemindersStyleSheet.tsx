import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2632',
    padding: 20,
  },
modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5,
},
closeButton: {
  marginTop: 20,
  padding: 10,
  backgroundColor: "#333",
  borderRadius: 5,
},
closeButtonText: {
  color: "#fff",
  fontWeight: "bold",
}});

