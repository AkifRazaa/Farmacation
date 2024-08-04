// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Button,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Pressable,
// } from "react-native";

// import axios from "axios";
// import { ipAddress } from "../../utils/ipAddress";

// const ApprovePost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedPosts, setExpandedPosts] = useState({});

//   const maxLength = 100; // Maximum length before truncating

//   useEffect(() => {
//     fetchPendingPosts();
//   }, []);

//   const fetchPendingPosts = async () => {
//     try {
//       const response = await axios.get(
//         `http://${ipAddress}/api/pending-posts`
//       );
//       setPosts(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching pending posts:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (postId) => {
//     try {
//       const response = await axios.put(
//         `http://${ipAddress}/api/approve-post/${postId}`
//       );
//       if (response.data) {
//         Alert.alert("Post approved successfully");
//         fetchPendingPosts();
//       }
//     } catch (error) {
//       console.error("Error approving post:", error.message);
//       Alert.alert("Error approving post");
//     }
//   };

//   const handleReject = async (postId) => {
//     try {
//       const response = await axios.put(
//         `http://${ipAddress}/api/reject-post/${postId}`
//       );
//       if (response.data) {
//         Alert.alert("Post rejected successfully");
//         fetchPendingPosts();
//       }
//     } catch (error) {
//       console.error("Error rejecting post:", error.message);
//       Alert.alert("Error rejecting post");
//     }
//   };

//   const toggleExpand = (postId) => {
//     setExpandedPosts((prevExpandedPosts) => ({
//       ...prevExpandedPosts,
//       [postId]: !prevExpandedPosts[postId],
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pending Posts</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <ScrollView>
//           {posts.map((post) => (
//             <View key={post._id} style={styles.postContainer}>
//               <View style={styles.header}>
//                 <Image
//                   source={{ uri: post.user.profilePicture }}
//                   style={styles.profilePicture}
//                 />

//                 <Text style={styles.userName}>{post.user.name}</Text>

//                 <Text style={styles.postDate}>
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </Text>
//               </View>

//               <View style={styles.contentContainer}>
//                 <Text style={styles.content}>
//                   {expandedPosts[post._id] || post.content.length <= maxLength
//                     ? post.content
//                     : `${post.content.substring(0, maxLength)}...`}
//                 </Text>

//                 {post.content.length > maxLength && (
//                   <Pressable onPress={() => toggleExpand(post._id)}>
//                     <Text style={styles.showMore}>
//                       {expandedPosts[post._id] ? "Show less" : "Show more"}
//                     </Text>
//                   </Pressable>
//                 )}
//               </View>

//               {post.images.map((image, index) => (
//                 <Image
//                   key={index}
//                   source={{ uri: image }}
//                   style={styles.image}
//                 />
//               ))}
//               <View style={styles.buttonContainer}>
//                 <Button
//                   title="Approve"
//                   onPress={() => handleApprove(post._id)}
//                 />
//                 <Button
//                   title="Reject"
//                   onPress={() => handleReject(post._id)}
//                   color="red"
//                 />
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   postContainer: {
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 10,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   profilePicture: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     flex: 1,
//     marginLeft: 10,
//   },
//   postDate: {
//     fontSize: 14,
//     color: "gray",
//   },
//   contentContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   content: {
//     fontSize: 16,
//     flex: 1, // Allow the text to take available space
//   },
//   showMore: {
//     color: "blue",
//     marginLeft: 10, // Add some space between text and the button
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });

// export default ApprovePost;


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import axios from "axios";
import { ipAddress } from "../../utils/ipAddress";

const ApprovePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});

  const maxLength = 100; // Maximum length before truncating

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}/api/pending-posts`
      );
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pending posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId) => {
    try {
      const response = await axios.put(
        `http://${ipAddress}/api/approve-post/${postId}`
      );
      if (response.data) {
        Alert.alert("Post approved successfully");
        fetchPendingPosts();
      }
    } catch (error) {
      console.error("Error approving post:", error.message);
      Alert.alert("Error approving post");
    }
  };

  const handleReject = async (postId) => {
    try {
      const response = await axios.put(
        `http://${ipAddress}/api/reject-post/${postId}`
      );
      if (response.data) {
        Alert.alert("Post rejected successfully");
        fetchPendingPosts();
      }
    } catch (error) {
      console.error("Error rejecting post:", error.message);
      Alert.alert("Error rejecting post");
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [postId]: !prevExpandedPosts[postId],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Posts</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {posts.map((post) => (
            <View key={post._id} style={styles.postContainer}>
              <View style={styles.header}>
                {post.user && (
                  <>
                    <Image
                      source={{ uri: post.user.profilePicture }}
                      style={styles.profilePicture}
                    />
                    <Text style={styles.userName}>{post.user.name}</Text>
                  </>
                )}
                <Text style={styles.postDate}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.content}>
                  {expandedPosts[post._id] || post.content.length <= maxLength
                    ? post.content
                    : `${post.content.substring(0, maxLength)}...`}
                </Text>

                {post.content.length > maxLength && (
                  <Pressable onPress={() => toggleExpand(post._id)}>
                    <Text style={styles.showMore}>
                      {expandedPosts[post._id] ? "Show less" : "Show more"}
                    </Text>
                  </Pressable>
                )}
              </View>

              {post.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.image}
                />
              ))}
              <View style={styles.buttonContainer}>
                <Button
                  title="Approve"
                  onPress={() => handleApprove(post._id)}
                />
                <Button
                  title="Reject"
                  onPress={() => handleReject(post._id)}
                  color="red"
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  postDate: {
    fontSize: 14,
    color: "gray",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    flex: 1, // Allow the text to take available space
  },
  showMore: {
    color: "blue",
    marginLeft: 10, // Add some space between text and the button
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ApprovePost;
