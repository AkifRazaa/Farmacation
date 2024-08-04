// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//     content: { type: String },

//     images: {
//         type: [String], // Array of strings representing image URLs
//     },

//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     likes: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//         },
//     ],

//     replies: [
//         {
//             user: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User",
//             },
//             content: {
//                 type: String,
//                 required: true,
//             },
//             createdAt: {
//                 type: Date,
//                 default: Date.now,
//             },
//         },
//     ],

//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },

//     adminApproved: {
//         type: Boolean,
//         default: false,
//     },

//     adminDisplay: {
//         type: Boolean,
//         default: true,
//     },
// });

// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;




const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: { type: String },
  images: {
    type: [String], // Array of strings representing image URLs
  },
  user: { type: mongoose.Schema.Types.ObjectId, refPath: 'userType', required: true },
  userType: {
    type: String,
    enum: ['User', 'Admin'],
  },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, refPath: 'likes.userType' },
      userType: {
        type: String,
        enum: ['User', 'Admin'],
      },
    },
  ],
  replies: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, refPath: 'replies.userType' },
      userType: {
        type: String,
        enum: ['User', 'Admin'],
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  adminDisplay: {
    type: Boolean,
    default: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
