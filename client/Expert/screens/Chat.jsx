import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import io from "socket.io-client";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ipAddress } from "../../utils/ipAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = () => {
  const route = useRoute();
  const { recipientId, senderId, recipientName } = route.params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // State for userId

  // Initialize Socket.IO connection
  useEffect(() => {
    const socket = io(`http://${ipAddress}`);

    const room = [senderId, recipientId].sort().join("_");

    socket.emit("join_room", room);

    socket.on("private_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
    });

    return () => {
      socket.close();
    };
  }, [senderId, recipientId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true);
    const socket = io(`http://${ipAddress}`);
    const room = [senderId, recipientId].sort().join("_");

    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append("image", {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });

        const response = await axios.post(`http://${ipAddress}/upload-image`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        socket.emit("private_message", {
          sender: loggedInUserId,
          recipient: recipientId,
          imageUrl: response.data.imageUrl,
          room: room,
        });

        setSelectedImage(null);
        setImagePreview("");
        setNewMessage("");
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false);
      }
    } else {
      socket.emit("private_message", {
        sender: loggedInUserId,
        recipient: recipientId,
        content: newMessage,
        room: room,
      });
      setNewMessage("");
      setIsLoading(false);
    }
  };

  const handleImageChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
      setImagePreview(result.uri);
    }
  };

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // Await AsyncStorage call
        setLoggedInUserId(userId); // Set userId state
        const response = await axios.get(`http://${ipAddress}/api/chat-list/${userId}`);
        console.log("Chat list data:", response.data);
        setChatList(response.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, []);

  useEffect(() => {
    if (!recipientId && !senderId && !recipientName) {
      return;
    }

    const fetchChatHistory = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // Await AsyncStorage call
        setLoggedInUserId(userId); // Set userId state
        const response = await axios.get(`http://${ipAddress}/api/messages/${userId}/${recipientId}`);
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [recipientId]);

  const handleChatParticipantClick = async (participantId) => {
    try {
      const userId = await AsyncStorage.getItem("userId"); // Await AsyncStorage call
      const response = await axios.get(`http://${ipAddress}/api/messages/${userId}/${participantId}`);
      console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatListContainer}>
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatParticipantClick(item.id)} style={styles.chatListItem}>
              <Image source={profilePic} style={styles.profileImage} />
              <Text style={styles.chatListText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.chatContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{recipientName}</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === loggedInUserId ? styles.messageRight : styles.messageLeft,
              ]}
            >
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.messageImage} />
              ) : (
                <Text style={styles.messageText}>{item.content}</Text>
              )}
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
          />
          <TouchableOpacity onPress={handleImageChange}>
            <Ionicons name="image-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendMessage} disabled={isLoading}>
            <MaterialIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {imagePreview ? <Image source={{ uri: imagePreview }} style={styles.imagePreview} /> : null}
        {isLoading && <ActivityIndicator size="large" color="blue" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  chatListContainer: {
    width: "30%",
    backgroundColor: "#f2f2f2",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    padding: 10,
  },
  chatContainer: {
    width: "70%",
    padding: 10,
  },
  header: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  messageLeft: {
    backgroundColor: "#f2f2f2",
    alignSelf: "flex-start",
  },
  messageRight: {
    backgroundColor: "#0078fe",
    alignSelf: "flex-end",
    color: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  chatListText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default Chat;
