// import { View, Text, StyleSheet, SafeAreaView } from "react-native";
// import React, { useContext, useEffect } from "react";
// import HomeCard from "../../components/Home/HomeCard";
// import { MaterialIcons } from "@expo/vector-icons";
// import { UserContext } from "../../Context/UserContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Dashboard = ({ navigation }) => {
//   const { userData, setUser } = useContext(UserContext);

//   //This will save the userId in UserContext
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
//             text="Add Crop"
//             onPress={() => navigation.navigate("AddCrop")}
//           />
//           <HomeCard
//             text="Add Content"
//             onPress={() => navigation.navigate("AddContent")}
//           />
//         </View>

//         <View style={styles.row}>
//           <HomeCard
//             text="Approve Posts"
//             onPress={() => navigation.navigate("ApprovePost")}
//           />

//           <HomeCard
//             text="All Posts"
//             onPress={() => navigation.navigate("AllPosts")}
//           />
//         </View>

//         <View style={styles.row}>
//           <HomeCard
//             text="Add Expert"
//             onPress={() => navigation.navigate("AddExpert")}
//           />

//           <HomeCard
//             text="Consultation Requests"
//             onPress={() => navigation.navigate("ConsultationRequests")}
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
//     justifyContent: "center",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   text: {
//     fontFamily: "DMBold",
//     fontSize: 30,
//     marginLeft: 20,
//     color: "#312651",
//   },
// });

// export default Dashboard;



import { View, Text, StyleSheet, SafeAreaView, Animated } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import HomeCard from "../../components/Home/HomeCard";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = ({ navigation }) => {
  const { userData, setUser } = useContext(UserContext);

  // Animated values for each row
  const row1Anim = useRef(new Animated.Value(0)).current;
  const row2Anim = useRef(new Animated.Value(0)).current;
  const row3Anim = useRef(new Animated.Value(0)).current;

  // This will save the userId in UserContext
  useEffect(() => {
    const fetchUsers = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const userName = await AsyncStorage.getItem("userName");

      setUser(userId, userName);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Animate each row sequentially
    Animated.sequence([
      Animated.timing(row1Anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(row2Anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(row3Anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userName");

    console.log("Logout success");

    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Admin Dashboard</Text>

      <MaterialIcons
        style={{ marginLeft: "auto", marginBottom: 10 }}
        name="logout"
        size={24}
        color="black"
        onPress={handleLogout}
      />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.row,
            {
              opacity: row1Anim,
              transform: [
                {
                  translateY: row1Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <HomeCard
            text="Add Crop"
            onPress={() => navigation.navigate("AddCrop")}
          />
          <HomeCard
            text="Add Content"
            onPress={() => navigation.navigate("AddContent")}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.row,
            {
              opacity: row2Anim,
              transform: [
                {
                  translateY: row2Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <HomeCard
            text="Approve Posts"
            onPress={() => navigation.navigate("ApprovePost")}
          />

          <HomeCard
            text="All Posts"
            onPress={() => navigation.navigate("AllPosts")}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.row,
            {
              opacity: row3Anim,
              transform: [
                {
                  translateY: row3Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <HomeCard
            text="Add Expert"
            onPress={() => navigation.navigate("AddExpert")}
          />

          <HomeCard
            text="Consultation Requests"
            onPress={() => navigation.navigate("ConsultationRequests")}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F8",
    padding: 1.5,
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  text: {
    fontFamily: "DMBold",
    fontSize: 30,
    marginLeft: 20,
    color: "#312651",
  },
});

export default Dashboard;
