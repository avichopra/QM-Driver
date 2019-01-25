import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  f8: {
    flex: 8
  },
  f1: {
    flexGrow: 1
  },
  f2: {
    flex: 1
  },
  f10: {
    textAlign: "center",
    marginTop: 13,
    fontSize: 14,
    color: "#2948ff",
    letterSpacing: 0
  },
  f3: {
    flex: 6
  },
  d6: {
    width: 40,
    height: 20
  },
  d1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  d2: {
    width: 120,
    height: 120
  },
  a9: {
    justifyContent: "flex-end",

    flexGrow: 1,
    marginVertical: 30,
    flexDirection: "row"
  },
  a1: {
    alignSelf: "center"
  },
  d3: {
    marginVertical: 25
  },
  d4: {
    flexDirection: "row",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    width: width - 30,
    height: 60
  },
  a10: {
    backgroundColor: "white",
    borderRadius: 1,
    width: Dimensions.get("window").width / 2 - 30,
    height: 45,
    margin: 10
  },
  a11: {
    borderRadius: 1,
    width: Dimensions.get("window").width / 2 - 30,
    height: 45,
    margin: 10
  },
  d5: {
    width: 20,
    height: 16,
    marginVertical: 30,
    marginHorizontal: 10
  },
  b1: {
    borderWidth: 0
  },
  i1: {
    fontSize: 16,
    color: "white",
    fontFamily: "Nunito Regular",
    letterSpacing: 0
  },
  c1: {
    color: "red"
  },
  j1: {
    justifyContent: "flex-end"
  },
  d7: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  c2: {
    backgroundColor: "white",
    borderRadius: 1,
    width: Dimensions.get("window").width - 30,
    height: 45,
    marginVertical: 15
  }
});
