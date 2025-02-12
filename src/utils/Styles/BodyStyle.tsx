import { StyleSheet } from "react-native";

export const stylesbody = StyleSheet.create({
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