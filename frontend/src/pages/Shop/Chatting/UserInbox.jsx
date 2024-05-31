import React, { useEffect, useState, useRef } from "react";
import "./Chatting.css";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { MdLocationPin } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import axios from "axios";
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
  const [active, setActive] = useState(false);
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
      <div className="app-container">
      
        <div className= {`app-left${active?"-hidden":" "}`}>
          <div className="app-left-header">
            <div className="app-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <defs />
                <path
                  className="path-1"
                  fill="#3eb798"
                  d="M448 193.108h-32v80c0 44.176-35.824 80-80 80H192v32c0 35.344 28.656 64 64 64h96l69.76 58.08c6.784 5.648 16.88 4.736 22.528-2.048A16.035 16.035 0 00448 494.868v-45.76c35.344 0 64-28.656 64-64v-128c0-35.344-28.656-64-64-64z"
                  opacity=".4"
                />
                <path
                  className="path-2"
                  fill="#3eb798"
                  d="M320 1.108H64c-35.344 0-64 28.656-64 64v192c0 35.344 28.656 64 64 64v61.28c0 8.832 7.168 16 16 16a16 16 0 0010.4-3.84l85.6-73.44h144c35.344 0 64-28.656 64-64v-192c0-35.344-28.656-64-64-64zm-201.44 182.56a22.555 22.555 0 01-4.8 4 35.515 35.515 0 01-5.44 3.04 42.555 42.555 0 01-6.08 1.76 28.204 28.204 0 01-6.24.64c-17.68 0-32-14.32-32-32-.336-17.664 13.712-32.272 31.376-32.608 2.304-.048 4.608.16 6.864.608a42.555 42.555 0 016.08 1.76c1.936.8 3.76 1.808 5.44 3.04a27.78 27.78 0 014.8 3.84 32.028 32.028 0 019.44 23.36 31.935 31.935 0 01-9.44 22.56zm96 0a31.935 31.935 0 01-22.56 9.44c-2.08.24-4.16.24-6.24 0a42.555 42.555 0 01-6.08-1.76 35.515 35.515 0 01-5.44-3.04 29.053 29.053 0 01-4.96-4 32.006 32.006 0 01-9.28-23.2 27.13 27.13 0 010-6.24 42.555 42.555 0 011.76-6.08c.8-1.936 1.808-3.76 3.04-5.44a37.305 37.305 0 013.84-4.96 37.305 37.305 0 014.96-3.84 25.881 25.881 0 015.44-3.04 42.017 42.017 0 016.72-2.4c17.328-3.456 34.176 7.808 37.632 25.136.448 2.256.656 4.56.608 6.864 0 8.448-3.328 16.56-9.28 22.56h-.16zm96 0a22.555 22.555 0 01-4.8 4 35.515 35.515 0 01-5.44 3.04 42.555 42.555 0 01-6.08 1.76 28.204 28.204 0 01-6.24.64c-17.68 0-32-14.32-32-32-.336-17.664 13.712-32.272 31.376-32.608 2.304-.048 4.608.16 6.864.608a42.555 42.555 0 016.08 1.76c1.936.8 3.76 1.808 5.44 3.04a27.78 27.78 0 014.8 3.84 32.028 32.028 0 019.44 23.36 31.935 31.935 0 01-9.44 22.56z"
                />
              </svg>
            </div>
            <h1>WeDesigneTeesChat</h1>
          </div>
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
          active={active}
          setActive={setActive}
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
  setActive,
  active,
}) => {
 
  return (
    <>
    
      <div className="app-main">
      <div onClick={()=>setActive(!active)} className=" bg-black text-white w-[30px] h-[30px] rounded-full p-1 flex justify-center items-center">
      {
        active ? (<AiOutlineArrowLeft size={24}/>) : (<AiOutlineArrowRight size={24}/>)
      }
    </div>
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
