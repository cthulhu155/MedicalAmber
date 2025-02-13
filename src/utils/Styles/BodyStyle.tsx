import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const scale = width / 375; // Base width for scaling

export const stylesbody = StyleSheet.create({
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
//posteriro frontal
  viewToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 8 * scale,
    borderRadius: 25,
    marginTop: 0 * scale
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
    alignSelf: 'center',
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