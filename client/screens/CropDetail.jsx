import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import Crop from "../components/Education/CropDetail/Crop/Crop";
import Tabs from "../components/Education/CropDetail/Tabs/Tabs";
import PreSowingStage from "../test/PreSowingStage";
import SowingStage from "../test/SowingStage";
import VegetativeStage from "../test/VegetativeStage";
import FloweringStage from "../test/FloweringStage";
import HarvestingStage from "../test/HarvestingStage";

// const tabs = [
//   "Pre-Sowing Stage",
//   "Sowing Stage",
//   "Vegetative Stage",
//   "Flowering/Fruiting Stage",
//   "Harvesting Stage",
// ];

const tabs = [
  "پھول اور پھل بنانے کا مرحلہ",
  // "جھاڑ بنانے کا مرحلہ",
  "بوائی کا مرحلہ",
  "زمین کی تیاری",
  "بوائی سے پہلے کا مرحلہ",
];

const CropDetail = ({ route }) => {
  const { cropTitle, cropImage } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // refetch() // GET THIS VALUE FROM useFetch HOOK WHEN IMPLEMNENTED
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "بوائی سے پہلے کا مرحلہ":
        return (
          //   <Specifics
          //     title='Qualifications'
          //     points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          //   />
          <PreSowingStage />
        );

      case "زمین کی تیاری":
        return (
          //   <JobAbout info={data[0].job_description ?? "No data provided"} />
          <SowingStage />
        );

      // case "جھاڑ بنانے کا مرحلہ":
      //   return (
      //     //   <Specifics
      //     //     title='Responsibilities'
      //     //     points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
      //     //   />
      //     <VegetativeStage />
      //   );

      case "پھول اور پھل بنانے کا مرحلہ":
        return (
          //   <Specifics
          //     title='Responsibilities'
          //     points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          //   />
          <FloweringStage />
        );

      case "بوائی کا مرحلہ":
        return (
          //   <Specifics
          //     title='Responsibilities'
          //     points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          //   />
          <HarvestingStage />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ padding: 16, paddingBottom: 100 }}>
          <Crop cropTitle={cropTitle} cropImage={cropImage} />

          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {displayTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CropDetail;
