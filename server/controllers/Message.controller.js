import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import Chat from "../models/Chat.model.js";
import User from "../models/User.model.js";
import imagekit from "../configs/imagekit.js";
import ai from "../configs/gemini.js";

// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found or unauthorized",
      });
    }

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Active Stable Gemini Model
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const responseText =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    const reply = {
      role: "assistant",
      content: responseText,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Text Chat Error Details:", error);
    res.json({ success: false, message: error.message });
  }
};

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }

    const { prompt, chatId, isPublished } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found or unauthorized",
      });
    }

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // 1. Properly Encode Prompt
    const cleanPrompt = encodeURIComponent(prompt.trim());
    const randomSeed = Math.floor(Math.random() * 1000000);

    // 2. Direct Reliable Standard URL
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    // 3. Fetch Image with standard GET request
    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 30000,
    });

    // 4. Convert to Base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
    ).toString("base64")}`;

    // 5. Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `img_${Date.now()}.png`,
      useUniqueFileName: true,
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };

    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Image Error:", error.message);
    res.json({
      success: false,
      message: "Image generation failed. Please try again.",
    });
  }
};
