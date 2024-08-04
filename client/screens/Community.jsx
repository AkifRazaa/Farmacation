import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../Context/UserContext";
import { ipAddress } from "../utils/ipAddress";

const Community = ({ navigation, isAdmin = false }) => {
  const { userData } = useContext(UserContext);
  const { userId, userName } = userData;

  const [posts, setPosts] = useState([]);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  useEffect(() => {
    fetchPosts();
    console.log("Login user: ", userId);

    // Start animations
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}/api/approved-posts`);
      const responseData = response.data;
      setPosts(responseData.posts);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://${ipAddress}/api/delete-post/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const renderImageCarousel = (images) => {
    return (
      <FlatList
        horizontal
        data={images}
        renderItem={({ item }) => (
          <Image style={styles.carouselImage} source={{ uri: item }} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const handleLike = async (postId) => {
    try {
      console.log(userId);
      const response = await axios.put(
        `http://${ipAddress}/api/posts/${postId}/${userId}/like`,
        { userType: isAdmin ? "Admin" : "User" }
      );
      const updatedPost = response.data;
      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://${ipAddress}/api/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleNavigateToComments = (postId) => {
    navigation.navigate("CommentPage", { postId, userId, isAdmin });
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ marginTop: 10 }}>
          {posts?.map((post, index) => (
            <View
              style={{
                padding: 15,
                borderColor: "#D0D0D0",
                borderBottomWidth: 1,
                flexDirection: "row",
                gap: 10,
                marginVertical: 10,
              }}
              key={index}
            >
              {isAdmin && (
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeletePost(post._id)}
                >
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              )}

              <View>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                  }}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
                >
                  {post?.user?.name}
                </Text>

                <Text>{post?.content}</Text>

                {post.images.length > 0 && renderImageCarousel(post.images)}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {post?.likes?.some((like) => like.user === userId) ? (
                    <AntDesign
                      onPress={() => handleDislike(post?._id)}
                      name="heart"
                      size={18}
                      color="red"
                    />
                  ) : (
                    <AntDesign
                      onPress={() => handleLike(post?._id)}
                      name="hearto"
                      size={18}
                      color="black"
                    />
                  )}

                  <FontAwesome
                    name="comment-o"
                    size={18}
                    color="black"
                    onPress={() => handleNavigateToComments(post._id)}
                  />
                </View>

                <Text style={{ marginTop: 7, color: "gray" }}>
                  {post?.likes?.length} likes • {post?.replies?.length} replies
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed "+" button with animation */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { rotate: rotateInterpolation }],
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity style={styles.createPostBtn} onPress={handleCreatePost}>
          <FontAwesome6 name="add" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: 280,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  createPostBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5F9EA0",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default Community;





// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import axios from "axios";
// import React, { useCallback, useContext, useEffect, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
// import { FontAwesome6 } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import { UserContext } from "../Context/UserContext";
// import { ipAddress } from "../utils/ipAddress";

// const Community = ({ navigation, isAdmin = false }) => {
//   const { userData } = useContext(UserContext);
//   const { userId, userName } = userData;

//   const [posts, setPosts] = useState([]);

//   const handleCreatePost = () => {
//     navigation.navigate("CreatePost");
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [])
//   );

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         `http://${ipAddress}/api/approved-posts`
//       );
//       const responseData = response.data;
//       setPosts(responseData.posts); 
//     } catch (error) {
//       console.log("error fetching posts", error);
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       await axios.delete(`http://${ipAddress}/api/delete-post/${postId}`);
//       setPosts(posts.filter((post) => post._id !== postId));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const renderImageCarousel = (images) => {
//     return (
//       <FlatList
//         horizontal
//         data={images}
//         renderItem={({ item }) => (
//           <Image style={styles.carouselImage} source={{ uri: item }} />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     );
//   };

//   const handleLike = async (postId) => {
//     try {
//       const response = await axios.put(
//         `http://${ipAddress}/api/posts/${postId}/${userId}/like`,
//         { userType: isAdmin ? "Admin" : "User" }
//       );
//       const updatedPost = response.data;

//       const updatedPosts = posts.map((post) =>
//         post._id === updatedPost._id ? updatedPost : post
//       );

//       setPosts(updatedPosts);
//     } catch (error) {
//       console.log("Error liking the post", error);
//     }
//   };

//   const handleDislike = async (postId) => {
//     try {
//       const response = await axios.put(
//         `http://${ipAddress}/api/posts/${postId}/${userId}/unlike`,
//         { userType: isAdmin ? "Admin" : "User" }
//       );
//       const updatedPost = response.data;

//       const updatedPosts = posts.map((post) =>
//         post._id === updatedPost._id ? updatedPost : post
//       );

//       setPosts(updatedPosts);
//     } catch (error) {
//       console.error("Error unliking post:", error);
//     }
//   };

//   const handleNavigateToComments = (postId) => {
//     navigation.navigate("CommentPage", { postId, userId, isAdmin });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
//         <View style={{ marginTop: 10 }}>
//           {posts?.map((post, index) => (
//             <View
//               style={{
//                 padding: 15,
//                 borderColor: "#D0D0D0",
//                 borderBottomWidth: 1,
//                 flexDirection: "row",
//                 gap: 10,
//                 marginVertical: 10,
//               }}
//               key={index}
//             >
//               {isAdmin && (
//                 <TouchableOpacity
//                   style={styles.deleteIcon}
//                   onPress={() => handleDeletePost(post._id)}
//                 >
//                   <AntDesign name="delete" size={24} color="red" />
//                 </TouchableOpacity>
//               )}

//               <View>
//                 <Image
//                   style={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: 20,
//                     resizeMode: "contain",
//                   }}
//                   source={{
//                     uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
//                   }}
//                 />
//               </View>

//               <View>
//                 <Text
//                   style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
//                 >
//                   {post?.user?.name || "Anonymous"} {/* Ensure user name is present */}
//                 </Text>

//                 <Text>{post?.content}</Text>

//                 {post.images.length > 0 && renderImageCarousel(post.images)}

//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     gap: 10,
//                   }}
//                 >
//                   {post?.likes?.some((like) => like.user === userId) ? (
//                     <AntDesign
//                       onPress={() => handleDislike(post?._id)}
//                       name="heart"
//                       size={18}
//                       color="red"
//                     />
//                   ) : (
//                     <AntDesign
//                       onPress={() => handleLike(post?._id)}
//                       name="hearto"
//                       size={18}
//                       color="black"
//                     />
//                   )}
//                   <FontAwesome
//                     name="comment-o"
//                     size={18}
//                     color="black"
//                     onPress={() => handleNavigateToComments(post?._id)}
//                   />
//                   <Text>{post?.likes?.length || 0}</Text> {/* Display the number of likes */}
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//       <TouchableOpacity
//         style={styles.createPostButton}
//         onPress={handleCreatePost}
//       >
//         <FontAwesome6 name="pen" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   createPostButton: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: "blue",
//     borderRadius: 50,
//     width: 60,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   carouselImage: {
//     width: 300,
//     height: 200,
//     resizeMode: "contain",
//     marginRight: 10,
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: -5,
//     right: -10,
//     zIndex: 1,
//   },
// });

// export default Community;
