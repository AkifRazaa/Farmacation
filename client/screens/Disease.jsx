import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../constant/theme";


const Disease = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log("Location: ", loc);
  };

  return (
    // <View className="flex-1 relative">
    //   <StatusBar style="light" />

    //   <Image
    //     blurRadius={70}
    //     source={require("../assets/images/bg.png")}
    //     className="absolute h-full w-full"
    //   />

    //   <SafeAreaView className="flex flex-1">
    //     {/* search section  */}
    //     <View style={{ height: "7%" }} className="mx-4 relative z-50">
    //       <View
    //         className="flex-row justify-end items-center rounded-full"
    //         style={{
    //           backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
    //         }}
    //       >
    //         {showSearch ? (
    //           <TextInput
    //             placeholder="Search city"
    //             placeholderTextColor={"lightgrey"}
    //             className="pl-6 h-10 pb-1 flex-1 text-base text-white"
    //           />
    //         ) : null}

    //         <TouchableOpacity
    //           onPress={() => toggleSearch(!showSearch)}
    //           style={{ backgroundColor: theme.bgWhite(0.3) }}
    //           className="rounded-full p-3 m-1"
    //         >
    //           <Text>Import Magnifying Icon with size 25 and color white</Text>
    //         </TouchableOpacity>
    //       </View>

    //       {locations.length > 0 && showSearch
    //         ? Disease(
    //             <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
    //               {locations.map((loc, index) => {
    //                 let showBorder = index + 1 != locations.length;
    //                 let borderClass = showBorder
    //                   ? "border-b-2 border-b-gray-400"
    //                   : "";

    //                 return (
    //                   <TouchableOpacity
    //                     onPress={() => handleLocation(loc)}
    //                     key={index}
    //                     className={
    //                       "flex-row items-center border-0 p-3 px-4 mb-1 " +
    //                       borderClass
    //                     }
    //                   >
    //                     {/* import a mappinicon size 20 color gray  */}
    //                     <Text className="text-black text-lg ml-2">
    //                       London, United Kingdom
    //                     </Text>
    //                   </TouchableOpacity>
    //                 );
    //               })}
    //             </View>
    //           )
    //         : null}
    //     </View>

    //     {/* Forcast section */}
    //   </SafeAreaView>
    // </View>

     <Text> Disease</Text> 
  );
};

export default Disease;


