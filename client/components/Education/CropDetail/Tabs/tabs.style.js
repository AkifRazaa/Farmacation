import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12 / 2,
  },
  btn: (name, activeTab) => ({
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: name === activeTab ? "#312651" : "#F3F4F8",
    borderRadius: 16,
    marginLeft: 2,
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
    shadowColor: "#F3F4F8",
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: 12,
    color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
  }),
});

export default styles;
