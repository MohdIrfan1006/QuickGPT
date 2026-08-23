import logo from "./logo.svg";
import logo_full from "./logo_full.svg";
import logo_full_dark from "./logo_full_dark.svg";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import theme_icon from "./theme_icon.svg";
import send_icon from "./send_icon.svg";
import stop_icon from "./stop_icon.svg";
import mountain_img from "./mountain_img.jpg";
import menu_icon from "./menu_icon.svg";
import close_icon from "./close_icon.svg";
import bin_icon from "./bin_icon.svg";
import logout_icon from "./logout_icon.svg";
import diamond_icon from "./diamond_icon.svg";
import gallery_icon from "./gallery_icon.svg";

import ai_image1 from "./ai_image1.jpg";
import ai_image2 from "./ai_image2.jpg";
import ai_image3 from "./ai_image3.jpg";
import ai_image4 from "./ai_image4.jpg";
import ai_image5 from "./ai_image5.jpg";
import ai_image6 from "./ai_image6.jpg";
import ai_image7 from "./ai_image7.jpg";
import ai_image8 from "./ai_image8.jpg";
import ai_image9 from "./ai_image9.jpg";
import ai_image10 from "./ai_image10.jpg";
import ai_image11 from "./ai_image11.jpg";
import ai_image12 from "./ai_image12.jpg";

export const assets = {
  logo,
  logo_full,
  search_icon,
  user_icon,
  theme_icon,
  send_icon,
  stop_icon,
  mountain_img,
  menu_icon,
  close_icon,
  bin_icon,
  logout_icon,
  logo_full_dark,
  diamond_icon,
  gallery_icon,
  ai_image1,
  ai_image2,
  ai_image3,
  ai_image4,
  ai_image5,
  ai_image6,
  ai_image7,
  ai_image8,
  ai_image9,
  ai_image10,
  ai_image11,
  ai_image12,
};

export const dummyUserData = {
  _id: "689c6deed410acddc0d95a0e",
  name: "GreatStack",
  email: "admin@example.com",
  password: "$2b$10$VESVdPDjL5LF.KCU6jKyqeXNSLASAAfpR2kkIJExtMO.PJvZJAudy",
  credits: 200,
};

export const dummyPlans = [
  {
    _id: "basic",
    name: "Basic",
    price: 10,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic models",
    ],
  },
  {
    _id: "pro",
    name: "Pro",
    price: 20,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time",
    ],
  },
  {
    _id: "premium",
    name: "Premium",
    price: 30,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access to premium models",
      "Dedicated account manager",
    ],
  },
];

export const dummyChats = [
  {
    _id: "689de4bbaa932dc3a8ef6cd7",
    userId: "689c6deed410acddc0d95a0e",
    userName: "GreatStack",
    name: "New Chat",
    messages: [
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "a boy running on water",
        timestamp: 1755178179612,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image11,
        timestamp: 1755178194747,
      },
    ],
    createdAt: "2025-08-14T13:29:31.398Z",
    updatedAt: "2025-08-14T13:29:54.753Z",
  },
  {
    _id: "689ccb9016a922dd57a23fce",
    userId: "689c6deed410acddc0d95a0e",
    name: "New Chat",
    messages: [
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "hello ",
        timestamp: 1755106415912,
      },
      {
        isImage: false,
        isPublished: false,
        role: "assistant",
        content: "Hello! 😊 How can I assist you today?",
        timestamp: 1755106420723,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "Generate a image of boy talking with others",
        timestamp: 1755107475040,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image1,
        timestamp: 1755107486680,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content:
          "i have to create a realistic image of jungle with wild animals so create a prompt for it",
        timestamp: 1755158982894,
      },
      {
        isImage: false,
        isPublished: false,
        role: "assistant",
        content:
          "Here's a detailed and structured prompt to generate a highly realistic jungle scene with wild animals...",
        timestamp: 1755158995829,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "Ultra-realistic, hyper-detailed photorealistic jungle...",
        timestamp: 1755159013677,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image2,
        timestamp: 1755159034238,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "top web technologies to learn in 2025",
        timestamp: 1755159074583,
      },
      {
        isImage: false,
        isPublished: false,
        role: "assistant",
        content: "Here are the top web technologies...",
        timestamp: 1755159100513,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "write a code for basic express app ",
        timestamp: 1755159129597,
      },
      {
        isImage: false,
        isPublished: false,
        role: "assistant",
        content: "# Basic Express.js Application...",
        timestamp: 1755159145294,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content:
          "generate a image of gaming pc setup in a room in realistic style",
        timestamp: 1755159264109,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image3,
        timestamp: 1755159273878,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "what are web3",
        timestamp: 1755159666525,
      },
      {
        isImage: false,
        isPublished: false,
        role: "assistant",
        content: "**Web3** (or **Web 3.0**)...",
        timestamp: 1755159683847,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "Generate a image nature with trees in realistic style",
        timestamp: 1755160243315,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image4,
        timestamp: 1755160254161,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "a gaming pc setup ",
        timestamp: 1755163772103,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image6,
        timestamp: 1755163783470,
      },
      {
        isImage: false,
        isPublished: false,
        role: "user",
        content: "a streaming setup with mic and accessory's ",
        timestamp: 1755163990514,
      },
      {
        isImage: true,
        isPublished: true,
        role: "assistant",
        content: ai_image7,
        timestamp: 1755164001928,
      },
    ],
    createdAt: "2025-08-13T17:29:52.421Z",
    updatedAt: "2025-08-14T09:39:19.046Z",
    userName: "GreatStack",
  },
  {
    _id: Date.now(),
    userId: "gs123456789",
    name: "New Chat",
    userName: "GreatStack",
    messages: [],
    createdAt: "2025-08-13T17:29:52.421Z",
    updatedAt: "2025-08-14T09:39:19.046Z",
  },
];

export const dummyPublishedImages = [
  { imageUrl: ai_image11, userName: "GreatStack" },
  { imageUrl: ai_image10, userName: "GreatStack" },
  { imageUrl: ai_image9, userName: "GreatStack" },
  { imageUrl: ai_image8, userName: "GreatStack" },
  { imageUrl: ai_image7, userName: "GreatStack" },
  { imageUrl: ai_image6, userName: "GreatStack" },
  { imageUrl: ai_image5, userName: "GreatStack" },
  { imageUrl: ai_image4, userName: "GreatStack" },
  { imageUrl: ai_image3, userName: "GreatStack" },
  { imageUrl: ai_image2, userName: "GreatStack" },
  { imageUrl: ai_image1, userName: "GreatStack" },
];
