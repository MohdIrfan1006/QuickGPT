import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Server URL with fallback
const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

// Axios configuration
const axiosInstance = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 1. Fetch User Data (Updated to refresh credits)
  const fetchUser = async () => {
    if (!token) return;
    try {
      const { data } = await axiosInstance.get("/api/user/data", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  // 2. Create New Chat (Fixed Infinite Loop)
  const createNewChat = async () => {
    try {
      if (!user) return toast("Login to create a new chat");
      navigate("/");

      const { data } = await axiosInstance.post(
        "/api/chat/create",
        {},
        {
          headers: { Authorization: token },
        },
      );

      if (data.success) {
        fetchUsersChats();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 3. Fetch User Chats
  const fetchUsersChats = async () => {
    try {
      const { data } = await axiosInstance.get("/api/chat/get", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setChats(data.chats);
        if (data.chats.length > 0) {
          setSelectedChat(data.chats[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Theme Effect
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Chats Sync Effect
  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // Token & Payment Return Handler Effect
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("success") === "true") {
      toast.success("Payment Successful! Credits added.");
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    fetchUsersChats,
    token,
    setToken,
    axios: axiosInstance,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
