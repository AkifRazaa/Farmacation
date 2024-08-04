import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { UserProvider } from "./Context/UserContext";

//Screens
import Home from "./screens/Home";
import Education from "./screens/Education";
import Community from "./screens/Community";
import Weather from "./screens/Weather";
import Disease from "./screens/Disease";
import CropDetail from "./screens/CropDetail";

// Components
import ScreenHeaderBtn from "./components/Header/ScreenHeaderBtn";

// Images
import profilePic from "./assets/images/kemal.jpg";
import Login from "./screens/Login";
import CreatePost from "./screens/CreatePost";
import AddContent from "./Admin/screens/AddContent";
import AdminLogin from "./Admin/screens/AdminLogin";
import Dashboard from "./Admin/screens/Dashboard";
import AddCrop from "./Admin/screens/AddCrop";
import ApprovePost from "./Admin/screens/ApprovePost";
import ExpertConsultation from "./screens/ExpertConsultation";
import AddExpert from "./Admin/screens/AddExpert";
import ConsultationRequests from "./Admin/screens/ConsultationRequests";
import AllPosts from "./Admin/screens/AllPosts";
import CommentPage from "./screens/CommentPage";
import OTPScreen from "./screens/OTPScreen";
import Profile from "./screens/Profile";
import CompleteProfile from "./screens/CompleteProfile";
import ExpertDashboard from "./Expert/screens/ExpertDashboard";
import CheckQuery from "./Expert/screens/CheckQuery";
import Chat from "./Expert/screens/Chat";

const App = () => {
  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <UserProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#FAFAFC" },
                headerRight: () => (
                  <ScreenHeaderBtn iconUrl={profilePic} dimension="60%" />
                ),
                headerTitle: "",
              }}
              >

              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="CompleteProfile" component={CompleteProfile} />


              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Education" component={Education} />
              <Stack.Screen name="CropDetail" component={CropDetail} />

              <Stack.Screen name="Weather" component={Weather} />
              <Stack.Screen name="Disease" component={Disease} />

              <Stack.Screen name="Community" component={Community} />
              <Stack.Screen name="CommentPage" component={CommentPage} />
              <Stack.Screen name="CreatePost" component={CreatePost} />

              <Stack.Screen
                name="ExpertConsultation"
                component={ExpertConsultation}
              />
              
              {/* Admin */}
              <Stack.Screen name="AdminLogin" component={AdminLogin} />

              <Stack.Screen name="OTPScreen" component={OTPScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="AddContent" component={AddContent} />
              <Stack.Screen name="AddCrop" component={AddCrop} />
              <Stack.Screen name="ApprovePost" component={ApprovePost} />
              <Stack.Screen name="AllPosts" component={AllPosts} />
              <Stack.Screen name="AddExpert" component={AddExpert} />
              <Stack.Screen
                name="ConsultationRequests"
                component={ConsultationRequests}
              />


              {/* Expert  */}
              <Stack.Screen name="ExpertDashboard" component={ExpertDashboard} />
              <Stack.Screen name="CheckQuery" component={CheckQuery} />
              <Stack.Screen name="Chat" component={Chat} />




            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>
    </>
  );
};

export default App;

//Charge 1
//4:41 98% charging
//10:14 22%
//Battery timing was ~5.30 hours

// Charge 3
// 2:58 99%     chrome, vscode, hyper, csgo downloading in background, whatsapp(ocassionally)

// Charge 4
// 12:00 88%    chrome, vscode, hyper

//Charger 5
// 7.02 pm  93%   chrome(multiple tabs), vs code, hyper, virtual device, word, whatsapp, file explorer
//


//Working on it
