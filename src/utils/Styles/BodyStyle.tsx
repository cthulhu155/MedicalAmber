// stylesbody.ts
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 375; // ancho base para escalado

// Estilos para iOS
const iosStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20 * scale,
    paddingVertical: 16 * scale,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    marginBottom: 20 * scale,
    paddingTop: height * 0.02,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 24 * scale,
    textAlign: "center",
    marginBottom: 10 * scale,
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20 * scale,
  },
  viewToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 8 * scale,
    borderRadius: 25,
    marginTop: 0 * scale,
  },
  viewToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
  },
  viewToggleButtonActive: {
    backgroundColor: "#582A72",
  },
  viewToggleText: {
    marginLeft: 8,
    color: "#582A72",
    fontWeight: "600",
    fontSize: 16 * scale,
  },
  viewToggleTextActive: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#582A72",
    paddingVertical: 15 * scale,
    paddingHorizontal: 30 * scale,
    borderRadius: 25,
    marginTop: 20 * scale,
    width: width * 0.8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18 * scale,
  },
});

// Estilos para Android
const androidStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
    textAlign: "center",
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 25,
    marginTop: 16,
  },
  viewToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
  },
  viewToggleButtonActive: {
    backgroundColor: "#582A72",
  },
  viewToggleText: {
    marginLeft: 8,
    color: "#582A72",
    fontWeight: "600",
  },
  viewToggleTextActive: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#582A72",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

// Exporta el estilo adecuado según la plataforma
export const stylesbody = Platform.OS === "ios" ? iosStyles : androidStyles;
