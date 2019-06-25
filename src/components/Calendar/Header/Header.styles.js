import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    width: 60
  },
  columns: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5
  },
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#bbb"
  }
});

export default styles;
