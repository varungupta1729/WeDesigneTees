import React, { useEffect, useState, useRef } from "react";
import "./Chatting.css";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { MdLocationPin } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import axios from "axios";
import logo from '../../../Assets/images/black logo.png'
// const ENDPOINT = "https://socket-ecommerce-tu68.onrender.com/";
const ENDPOINT = "https://wedesignetees-socket-server.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [conversationLength, setConversationLength] = useState(0);
 
  const navigate = useNavigate();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
        setConversationLength(resonse.data.conversations.length);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user?._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        // console.log(error);
      });
  };


  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: e,
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
          }
        )
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);
  return (
    <div id="chatting-page">
      <div className="app-container overflow-x-auto">
        <div className="app-left">
        <Link to={'/'}>
        <div className="app-left-header">
            <div className="app-logo">
            <img className="w-[50px]" src={logo} alt="go to home page"/>
            </div>
            <h1>WeDesigneTeesChat</h1>
          </div>
        </Link>
        
          {/* Profle Box */}
          <div className="app-profile-box">
            <img src={`${user?.avatar}`} alt="profile" />
            <div className="app-profile-box-name">
              {user?.name}
              <button className="app-setting">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="feather feather-settings"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <circle cx={12} cy={12} r={3} />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </button>
            </div>
            <p className="app-profile-box-title">{user?.email}</p>
          </div>

          {/* Active Conversations */}
          <div className="chat-list-wrapper">
            <div className="chat-list-header">
              Conversations{" "}
              <span className="c-number">{conversationLength}</span>
            </div>

            <ul className="chat-list active">
              {/* All messages list */}
              {conversations &&
                conversations.map((item, index) => (
                  <MessageList
                    data={item}
                    key={index}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={user?._id}
                    setUserData={setUserData}
                    userData={userData}
                    online={onlineCheck(item)}
                    setActiveStatus={setActiveStatus}
                  />
                ))}
            </ul>
          </div>
        </div>

        {/* Chatting Area Middle One */}

        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />

        {/* right*/}
        <div className="app-right">

        {
          userData && (
            <div className="app-profile-box">
            <span className="relative">
            <img
            src={`${userData?.avatar?.url}`} alt=""/>
              {activeStatus ? (
                <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[0px] left-[0px]" />
              ) : (
                <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[0px] left-[0px]" />
              )}
            </span>
            <p className="app-profile-box-title name  flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              {userData?.name}
            </p>
            <p className="app-profile-box-title mail   flex justify-center items-cente">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {userData?.email}
            </p>

            <p className="app-profile-box-title mail mt-2  flex justify-center items-center">
              <MdLocationPin size={27} />
              {userData?.address}
            </p>

            <p className="my-7  font-light text-lg flex justify-center items-cente">
              {activeStatus ? <p>Active Now</p> : null  }
            </p>

          
              <Link to={`/shop/preview/${userData?._id}`}
               
                className="archive-btn px-4"
              >
                Shop Details
              </Link>

         
          </div>
          )
        }
       
        </div>
      </div>
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    // setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (

    <li
      className={`relative chat-list-item ${active === index && "active"}`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data?._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <img src={`${user?.avatar?.url}`} alt="chat" />
      {online ? (
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[7px] left-[10px]" />
      ) : (
        <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[7px] left-[10px]" />
      )}
      <div>
        <span className="chat-list-name">{user?.name}</span>
        <p className=" text-[#000c] truncate ">
          {data?.lastMessageId !== userData?._id
            ? "You:"
            : userData?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </li>
  );
};

const SellerInbox = ({
  online,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
 
  return (
    <>
      <div className="app-main">
        <div className="chat-wrapper">
          {messages &&
            messages.map((item, index) => (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item.images && (
                  <img
                     src={`${item.images?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                    alt=""
                  />
                )}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${
                        item.sender === sellerId
                          ? "bg-[#000] text-[#fff]"
                          : "bg-[#ffffff] text-[#000]"
                      }  h-min`}
                    >
                      <p className="message-box">{item.text}</p>
                    </div>

                    <span>{format(item.createdAt)}</span>
                  </div>
                )}
              </div>
            ))}
        </div>

        <form className="chat-input-wrapper " onSubmit={sendMessageHandler}>
          <div className="chat-attachment-btn ">
            <input
              type="file"
              name=""
              id="image"
              className="hidden "
              onChange={handleImageUpload}
            />
            <label htmlFor="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="feather feather-paperclip cursor-pointer"
                viewBox="0 0 24 24"
              >
                <defs />
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Enter your message here"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="emoji-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="feather feather-smile"
                viewBox="0 0 24 24"
              >
                <defs />
                <circle cx={12} cy={12} r={10} />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
              </svg>
            </button>
          </div>
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            {" "}
            <button className="chat-send-btn">Send</button>
          </label>
        </form>
      </div>

      {/* partial */}
    </>
  );
};

export default UserInbox;
