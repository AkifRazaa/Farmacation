import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { ipAddress } from "../utils/ipAddress";

const CommentPage = () => {
  const route = useRoute();
  const { postId, userId, isAdmin } = route.params;
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [editingReply, setEditingReply] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);

  useEffect(() => {
    fetchReplies();
  }, []);

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}/api/get-replies/${postId}`
      );
      setReplies(response.data.replies);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const handleAddReply = async () => {
    try {
      if (editingReply) {
        await axios.put(
          `http://${ipAddress}/api/edit-replies/${editingReply._id}`,
          {
            content: replyContent,
            userId,
            isAdmin,
          }
        );
        setEditingReply(null);
      } else {
        console.log(userId)
        await axios.post(`http://${ipAddress}/api/add-replies/${postId}`, {
          userId,
          content: replyContent,
          isAdmin,
        });
      }
      setReplyContent("");
      fetchReplies();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleEditReply = (reply) => {
    setEditingReply(reply);
    setReplyContent(reply.content);
  };

  const handleDeleteReply = async (replyId) => {
    try {
      console.log(replyId);

      await axios.delete(`http://${ipAddress}/api/delete-replies/${replyId}`);

      console.log("Deleting Reply");
      fetchReplies();
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const openMenu = (replyId) => {
    setSelectedReplyId(replyId);
    setModalVisible(true);
  };

  const closeMenu = () => {
    setModalVisible(false);
    setSelectedReplyId(null);
  };

  const handleMenuOption = (option) => {
    const selectedReply = replies.find(
      (reply) => reply._id === selectedReplyId
    );
    closeMenu();
    if (option === "edit") {
      handleEditReply(selectedReply);
    } else if (option === "delete") {
      Alert.alert(
        "Delete Comment",
        "Are you sure you want to delete this comment?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => handleDeleteReply(selectedReplyId) },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={replies}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.replyContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
              }}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.replyUser}>{item.user.name}</Text>
              <Text style={styles.replyContent}>{item.content}</Text>
              <Text style={styles.replyTime}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>

            {(item.user._id === userId || isAdmin) && (
              <TouchableOpacity onPress={() => openMenu(item._id)}>
                <Text style={styles.menuButton}>⋮</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type comment here..."
          value={replyContent}
          onChangeText={setReplyContent}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddReply}>
          <Text style={styles.sendButtonText}>
            {editingReply ? "Edit" : "Comment"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {(selectedReplyId &&
              replies.find((reply) => reply._id === selectedReplyId).user
                ._id === userId) ||
            isAdmin ? (
              <>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleMenuOption("edit")}
                >
                  <Text>Edit Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleMenuOption("delete")}
                >
                  <Text>Delete Comment</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleMenuOption("delete")}
              >
                <Text>Delete Comment</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  replyContainer: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  replyUser: {
    fontWeight: "bold",
  },
  replyContent: {
    marginTop: 2,
  },
  replyTime: {
    marginTop: 5,
    color: "gray",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#5F9EA0",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
  },
  menuButton: {
    fontSize: 24,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalOption: {
    paddingVertical: 10,
  },
});

export default CommentPage;
