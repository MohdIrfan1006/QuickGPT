import axios from "axios";
import Chat from "../models/Chat.model.js";
import User from "../models/User.model.js";
import imagekit from "../configs/imagekit.js";
import openai from "../configs/openai.js";

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

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    res.json({ success: true, reply });
  } catch (error) {
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

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // 1. Clean & Enhance Prompt for HD Quality Output
    const enhancedPrompt = `${prompt}, 8k resolution, highly detailed, photorealistic, sharp focus, clean lighting, masterpiece, cinematic shot`;
    const cleanPrompt = encodeURIComponent(enhancedPrompt);

    // 2. Direct Reliable Image Endpoint with 1024x1024 HD Resolution
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&nologo=true&model=flux`;

    // 3. Fetch Image Buffer safely
    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0", // Block avoid karne ke liye
      },
    });

    // 4. Convert Buffer to Base64
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data).toString("base64")}`;

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
    console.error("ImageKit Error Details:", error);
    res.json({ success: false, message: error.message });
  }
};
