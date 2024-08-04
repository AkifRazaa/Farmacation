import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  cropTitleBox: {
    marginTop: 12,
  },
  cropTitle: {
    fontSize: 20,
    color: "#312651",
    fontFamily: "DMBold",
    textAlign: "center",
  },
  companyInfoBox: {
    marginTop: 12 / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
