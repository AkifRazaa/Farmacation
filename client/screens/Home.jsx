import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { UserContext } from "../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Components
import HomeCard from "../components/Home/HomeCard";

// Images
import plant from "../assets/icons/plant.png";
import disease from "../assets/icons/disease_detection.png";
import weather from "../assets/icons/weather.png";
import community from "../assets/icons/community.png";

import { MaterialIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const { userData, setUser } = useContext(UserContext);

  //This will save the userId in UserContext
  useEffect(() => {
    const fetchUsers = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const userName = await AsyncStorage.getItem("userName");

      setUser(userId, userName);
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userName");

    console.log("Logout success");

    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Browse</Text>

      <MaterialIcons
        style={{ marginLeft: "auto", marginBottom: 10 }}
        name="logout"
        size={24}
        color="black"
        onPress={handleLogout}
      />

      <View style={styles.container}>
        <View style={styles.row}>
          <HomeCard
            imageUrl={plant}
            text="Education"
            onPress={() => navigation.navigate("Education")}
          />
          <HomeCard
            imageUrl={weather}
            text="Weather"
            onPress={() => navigation.navigate("Weather")}
          />
        </View>
        <View style={styles.row}>
          <HomeCard
            imageUrl={disease}
            text="Disease"
            onPress={() => navigation.navigate("Disease")}
          />
          <HomeCard
            imageUrl={community}
            text="Community"
            onPress={() => navigation.navigate("Community")}
          />
        </View>

        <View style={styles.row}>
          <HomeCard
            imageUrl={disease}
            text="Expert Consultation"
            onPress={() => navigation.navigate("ExpertConsultation")}
          />
          
        </View>
        
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    padding: 10,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontFamily: "DMBold",
    fontSize: 30,
    marginLeft: 20,
    color: "#312651",
  },
});

export default Home;



// import React, { useContext, useEffect } from "react";
// import { View, Text, StyleSheet, SafeAreaView } from "react-native";
// import { UserContext } from "../Context/UserContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Components
// import HomeCard from "../components/Home/HomeCard";

// // Images
// import plant from "../assets/icons/plant.png";
// import disease from "../assets/icons/disease_detection.png";
// import weather from "../assets/icons/weather.png";
// import community from "../assets/icons/community.png";

// import { MaterialIcons } from "@expo/vector-icons";

// const Home = ({ navigation }) => {
//   const { userData, setUser } = useContext(UserContext);

//   // This will save the userId in UserContext
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const userId = await AsyncStorage.getItem("userId");
//       const userName = await AsyncStorage.getItem("userName");

//       setUser(userId, userName);
//     };

//     fetchUsers();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("userId");
//     await AsyncStorage.removeItem("userName");

//     console.log("Logout success");

//     navigation.navigate("Login");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.text}>Browse</Text>

//       <MaterialIcons
//         style={{ marginLeft: "auto", marginBottom: 10 }}
//         name="logout"
//         size={24}
//         color="black"
//         onPress={handleLogout}
//       />

//       <View style={styles.container}>
//         <View style={styles.row}>
//           <HomeCard
//             imageUrl={plant}
//             text="Education"
//             onPress={() => navigation.navigate("Education")}
//           />
//           <HomeCard
//             imageUrl={weather}
//             text="Weather"
//             onPress={() => navigation.navigate("Weather")}
//           />
//         </View>
//         <View style={styles.row}>
//           <HomeCard
//             imageUrl={disease}
//             text="Disease"
//             onPress={() => navigation.navigate("Disease")}
//           />
//           <HomeCard
//             imageUrl={community}
//             text="Community"
//             onPress={() => navigation.navigate("Community")}
//           />
//         </View>

//         <View style={styles.row}>
//           <HomeCard
//             imageUrl={disease}
//             text="Expert Consultation"
//             onPress={() => navigation.navigate("ExpertConsultation")}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F8",
//     padding: 10,
//     justifyContent: "flex-start",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     marginBottom: 10,
//   },
//   text: {
//     fontFamily: "DMBold",
//     fontSize: 30,
//     marginLeft: 20,
//     color: "#312651",
//   },
// });

// export default Home;
