// import React from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// const HomeCard = ({ imageUrl = "", text, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
//       <View style={styles.imageContainer}>
//         <View style={styles.circle}>
//           <Image source={imageUrl} style={styles.image} />
//         </View>
//         <Text style={styles.text}>{text}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     marginBottom: 2,
//     borderRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//     paddingLeft: 10,
//   },
//   imageContainer: {
//     height: 120,
//     width: 180,
//     alignItems: "flex-start",
//     backgroundColor: "#5F9EA0",
//     borderRadius: 8,
//     padding: 10,
//   },
//   circle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgb(242,242,242)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   image: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   text: {
//     fontSize: 16,
//     textAlign: "left",
//     fontFamily: "DMBold",
//   },
// });

// export default HomeCard;



import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const HomeCard = ({ imageUrl="", text, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <Image source={imageUrl} style={styles.image} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    // width: 120, // Fixed width
    // height: 160, // Fixed height
    // marginBottom: 20
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "#FAFAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FAFAFC",
    padding: 30,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgb(242,242,242)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DMBold",
  },
});

export default HomeCard;
