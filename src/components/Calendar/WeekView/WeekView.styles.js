import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollViewContent: {
    flexDirection: "row"
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  timeLabel: {
    flex: -1,
    height: 40
  },
  timeText: {
    fontSize: 12,
    textAlign: "center"
  },
  timeColumn: {
    paddingTop: 10,
    width: 60
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ee6e73",
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    elevation: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4
  },
  addButtonText: {
    fontSize: 30,
    color: "white"
  }
});

export default styles;
