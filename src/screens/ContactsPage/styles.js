import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  nav: {
    textAlign: "center",
    flexDirection: "row",
    height: 50,
    backgroundColor: "#a3c2c2",
    width: "100%",
  },
  title: {
    width: "70%",
    fontSize: 30,
    color: "#804000",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  ChatCompstyle: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    backgroundColor: "#ffffcc",
    width: "70%",
    flexDirection: "row",
    width: 300,
    height: 40,
    margin: 8,
    justifyContent: "space-between",
    padding: 7,
  },
});
