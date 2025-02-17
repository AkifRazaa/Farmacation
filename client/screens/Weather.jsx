// import {
//   View,
//   Text,
//   StatusBar,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
// } from "react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import { debounce } from "lodash";
// import * as Progress from "react-native-progress";

// import { theme } from "../constant/theme";
// import { weatherImages } from "../constant/weatherImages";

// import { FontAwesome6 } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

// import { fetchLocations, fetchWeatherForecast } from "../api/WeatherApi";
// import { getData, storeData } from "../utils/asyncStorage";

// const Weather = () => {
//   const [showSearch, toggleSearch] = useState(false);
//   const [locations, setLocations] = useState([]);
//   const [weather, setWeather] = useState({});
//   const [loading, setLoading] = useState(true);

//   const handleLocation = (loc) => {
//     // console.log("Location: ", loc);
//     setLocations([]);
//     toggleSearch(false);
//     setLoading(true);
//     fetchWeatherForecast({
//       cityName: loc.name,
//       days: "7",
//     }).then((data) => {
//       setWeather(data);
//       setLoading(false);
//       storeData("city", loc.name);

//       // console.log("got forcast", data);
//     });
//   };

//   const handleSearch = (value) => {
//     //fetch location
//     if (value.length > 2) {
//       fetchLocations({ cityName: value }).then((data) => {
//         setLocations(data);
//       });
//     }
//   };

//   useEffect(() => {
//     fetchMyWeatherData();
//   }, []);

//   const fetchMyWeatherData = async () => {
//     let myCity = await getData("city");
//     let cityName = "Multan";
//     if (myCity) cityName = myCity;

//     fetchWeatherForecast({
//       cityName,
//       days: "7",
//     }).then((data) => {
//       setWeather(data);
//       setLoading(false);
//     });
//   };

//   const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

//   const { current, location } = weather;

//   return (
//     <View className="flex-1 relative">
//       <StatusBar style="light" />

//       <Text>Test</Text>

//       <Image
//         blurRadius={70}
//         source={require("../assets/images/bg.png")}
//         className="absolute h-full w-full"
//       />

//       {loading ? (
//         <View className="flex-1 flex-row justify-center items-center">
//           {/* <ProgressEvent.CircleSnail  /> */}
//           <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
//         </View>
//       ) : (
//         <SafeAreaView className=" flex-1">
//           {/* search section  */}
//           <View style={{ height: "10%" }} className="mx-4 relative z-50">
//             <View
//               className="flex-row justify-end items-center rounded-full mt-3"
//               style={{
//                 backgroundColor: showSearch
//                   ? theme.bgWhite(0.2)
//                   : "transparent",
//               }}
//             >
//               {showSearch ? (
//                 <TextInput
//                   onChangeText={handleTextDebounce}
//                   placeholder="Search city"
//                   placeholderTextColor={"lightgrey"}
//                   className="pl-6 h-10 pb-1 flex-1 text-base text-white"
//                 />
//               ) : null}

//               <TouchableOpacity
//                 onPress={() => toggleSearch(!showSearch)}
//                 // style={{ backgroundColor: theme.bgWhite(0.3) }}
//                 className="rounded-full p-1 m-1"
//               >
//                 <FontAwesome6 name="magnifying-glass" size={25} color="white" />
//               </TouchableOpacity>
//             </View>

//             {locations.length > 0 && showSearch ? (
//               <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
//                 {locations.map((loc, index) => {
//                   let showBorder = index + 1 != locations.length;
//                   let borderClass = showBorder
//                     ? "border-b-2 border-b-gray-400"
//                     : "";

//                   return (
//                     <TouchableOpacity
//                       onPress={() => handleLocation(loc)}
//                       key={index}
//                       className={
//                         "flex-row items-center border-0 p-3 px-4 mb-1 " +
//                         borderClass
//                       }
//                     >
//                       <Feather name="map-pin" size={15} color="gray" />
//                       <Text className="text-black text-lg ml-2">
//                         {loc?.name} {loc?.country}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>
//             ) : null}
//           </View>

//           {/* Forcast section */}

//           <View className="mx-4 flex justify-around flex-1 mb-2">
//             {/* location  */}
//             <Text className="text-white text-center text-2xl font-bold">
//               {location?.name}
//               <Text className="text-lg font-semibold text-gray-300">
//                 {" " + location?.country}
//               </Text>
//             </Text>
//             {/* Weather Image  */}
//             <View className="flex-row justify-center">
//               <Image
//                 source={weatherImages[current?.condition?.text]}
//                 className="w-52 h-52"
//               />
//             </View>

//             {/* degree celcius */}
//             <View className="space-y-2">
//               <Text className="text-center font-bold text-white text-6xl ml-5">
//                 {current?.temp_c}&#176;
//               </Text>

//               <Text className="text-center  text-white text-xl tracking-widest">
//                 {current?.condition?.text}
//               </Text>
//             </View>

//             {/* other stats  */}
//             <View className="flex-row justify-between mx-4">
//               <View className="flex-row space-x-2 items-center">
//                 <Image
//                   source={require("../assets/icons/wind.png")}
//                   className="h-6 w-6"
//                 />
//                 <Text className="text-white font-semibold text-base">
//                   {current?.wind_kph}km
//                 </Text>
//               </View>

//               <View className="flex-row space-x-2 items-center">
//                 <Image
//                   source={require("../assets/icons/drop.png")}
//                   className="h-6 w-6"
//                 />
//                 <Text className="text-white font-semibold text-base">
//                   {current?.humidity}%
//                 </Text>
//               </View>

//               <View className="flex-row space-x-2 items-center">
//                 <Image
//                   source={require("../assets/icons/sun.png")}
//                   className="h-6 w-6"
//                 />
//                 <Text className="text-white font-semibold text-base">
//                   {weather?.forecast?.forecastday[0]?.astro?.sunrise}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* forcast for next day  */}

//           <View className="mb-2 space-y-3">
//             <View className="flex-row items-center mx-5 space-x-2">
//               <AntDesign name="calendar" size={22} color="white" />

//               <Text className="text-white text-base"> Daily forecast</Text>
//             </View>

//             <ScrollView
//               horizontal
//               contentContainerStyle={{ paddingHorizontal: 15 }}
//               showsHorizontalScrollIndicator={false}
//             >
//               {weather?.forecast?.forecastday?.map((item, index) => {
//                 let date = new Date(item.date);
//                 let options = { weekday: "long" };
//                 let dayName = date.toLocaleDateString("en-US", options);

//                 return (
//                   <View
//                     key={index}
//                     className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
//                     style={{ backgroundColor: theme.bgWhite(0.15) }}
//                   >
//                     <Image
//                       source={weatherImages[item?.day?.condition?.text]}
//                       className="h-11 w-11"
//                     />

//                     <Text className="text-white">{dayName}</Text>

//                     <Text className="text-white text-xl font-semibold">
//                       {item?.day?.avgtemp_c}&#176;
//                     </Text>
//                   </View>
//                 );
//               })}
//             </ScrollView>
//           </View>
//         </SafeAreaView>
//       )}
//     </View>
//   );
// };

// export default Weather;

import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import * as Progress from "react-native-progress";

import { theme } from "../constant/theme";
import { weatherImages } from "../constant/weatherImages";

import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { fetchLocations, fetchWeatherForecast } from "../api/WeatherApi";
import { getData, storeData } from "../utils/asyncStorage";

const Weather = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    // console.log("Location: ", loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);

      // console.log("got forcast", data);
    });
  };

  const handleSearch = (value) => {
    //fetch location
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Multan";
    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />

      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          {/* <ProgressEvent.CircleSnail  /> */}
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className=" flex-1">
          {/* search section  */}
          <View style={{ height: "10%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full mt-3"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={"lightgrey"}
                  className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                />
              ) : null}

              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                // style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-1 m-1"
              >
                <FontAwesome6 name="magnifying-glass" size={25} color="white" />
              </TouchableOpacity>
            </View>

            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-b-gray-400"
                    : "";

                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1 " +
                        borderClass
                      }
                    >
                      <Feather name="map-pin" size={15} color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {loc?.name} {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* Forcast section */}

          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* location  */}
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name}
              <Text className="text-lg font-semibold text-gray-300">
                {" " + location?.country}
              </Text>
            </Text>
            {/* Weather Image  */}
            <View className="flex-row justify-center">
              <Image
                source={weatherImages[current?.condition?.text]}
                className="w-52 h-52"
              />
            </View>

            {/* degree celcius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>

              <Text className="text-center  text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats  */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph}km
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.humidity}%
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forcast for next day  */}

          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <AntDesign name="calendar" size={22} color="white" />

              <Text className="text-white text-base"> Daily forecast</Text>
            </View>

            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = { weekday: "long" };
                let dayName = date.toLocaleDateString("en-US", options);

                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      source={weatherImages[item?.day?.condition?.text]}
                      className="h-11 w-11"
                    />

                    <Text className="text-white">{dayName}</Text>

                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Weather;
