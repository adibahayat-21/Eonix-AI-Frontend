import React, { useContext, useEffect, useState } from 'react';
import './ChatWindow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from './MyContext'
import { FaArrowLeft, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";   //for changing of the page
import { motion } from "framer-motion";
import { GridLoader, PropagateLoader, PulseLoader, RiseLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { KeyRound, MessageCirclePlus } from "lucide-react";
import { v1 as uuidv1 } from "uuid";
import { FaBars } from "react-icons/fa";

// (Dummy Data) 
// const chatHistory = [
//     { title: "AI Development Discussion", subtitle: "Can you help me understand neural networks?", time: "1h ago", active: true },
//     { title: "Space Technology", subtitle: "Tell me about future space missions", time: "2h ago", active: false },
//     { title: "Quantum Computing", subtitle: "Explain quantum entanglement", time: "Yesterday", active: false },
// ];

// ------------------- CHAT HISTORY ITEM ---------------------

const ChatHistoryItem = ({ title, subtitle, id, active, openChat, deleteChat }) => (
    <div className={`history-card ${active ? 'active-chat' : ''}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="history-title-main">
                <a onClick={() => openChat(id)}>{title}</a>
            </div>

            {active && (
                <div style={{ display: "flex", gap: "0.8rem" }}>
                    <FaExternalLinkAlt onClick={() => openChat(id)} />
                    <FaTrash onClick={(e) => {
                        e.stopPropagation();     //it will remove event bubbling effect , matlab child ke event effect se parent pr bhi effect horha h
                        // for more description of event bubbling in react go to text file 
                        deleteChat(id)
                        }} />
                </div>
            )}
        </div>

        <div className="history-subtitle">{subtitle}</div>
        <div className={`active-dot ${active ? 'visible' : ''}`} style={{ marginTop: "5px" }}></div>
    </div>
);


// ------------------- CHAT HISTORY ITEM ---------------------

const ChatHistory = () => {
    const navigate = useNavigate();
    const { currThreadId, setCurrThreadId, threads, setThreads, newChat, setNewChat, prompt, setPrompt, reply, setReply, msg, setMsg } = useContext(MyContext);
    const [history, setHistory] = useState([]);
    const [searchInput,setSearchInput]=useState("");   //setting the input fieldfor searching

    const openChat = (target_id) => {
        // console.log("opening chat of id:",target_id);    for debugging
        setCurrThreadId(target_id);
    }
    const deleteChat = async (target_id) => {
        try{
            const result = await fetch(`http://localhost:8080/api/thread/${target_id}`, { method: "DELETE" });

            // const data=await result.json();   //for debugging
            // console.log(data);

            setHistory(prev => prev.filter(a => a.threadId !== target_id));
            setThreads(prev => prev.filter(a => a.threadId !== target_id));

            // agar delete wala hi open ho to reset
            if (currThreadId === target_id) {
                setCurrThreadId(null);
                setMsg([]);
            }

        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        if (threads && Array.isArray(threads)) {
            setHistory(threads);
        }
    }, [threads]);
    // Ab jese hi setThreads() call hoga MainChat me (jab new message bheja),
    // ChatHistory automatically re-render hoke latest message subtitle dikha dega.


    useEffect(() => {
        const fetchHistory = async () => {

            try {
                const r = await fetch("http://localhost:8080/api/thread");
                const data = await r.json();

                // agar data array aata hai, toh set kar do
                if (Array.isArray(data)) {
                    setHistory(data);      //jo sara data hume backend se mila h usko humne history m set krdiya 
                    setThreads(data);  // ✅ sync context with history
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchHistory();    //calling the function
    }, [])

    // logic for new chat...

    const handleNewChat = () => {
        setNewChat(true);
        setPrompt("");   //kyuki jo user prompt bhejega wo string format m hi hoga mostly
        setReply(null);    //aaur jo abot se reply aaega wo hume nhi pta kis format mhoga wo mostly object bhi ho skta h that's why there is a difference in the reinitialisation of the reply and prompt
        setCurrThreadId(uuidv1());
        setMsg([]);
    }

    const handleSearch=()=>{
        // user input ko lowercase m lo
        const query=searchInput.toLowerCase();

        // array ko filter Kro
        const filteredItems=threads.filter(t=>t.title.toLowerCase().includes(query));

        setHistory(filteredItems);    //yeh search wali chats ko render krne ka bhi kaam krta h 
    }

    useEffect(() => {
    if (threads && Array.isArray(threads)) {
        setHistory(threads);  // initially show all threads
    }
    }, [threads]);

    return (
        <div className="sidebar-panel">
            <div className="sidebar-header">
                <div className="eonix-logo"><motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00bcd4", fontSize: "20px" }}
                    className="highlight-blue start-btn primary-btn"
                    onClick={() => navigate("/")}
                    style={{
                        padding: "4px 6px",      // smaller padding
                        // minWidth: "auto",        // prevent button from stretching
                        height: "34px",          // smaller height
                        borderRadius: "40px",     // optional, compact look
                        fontSize: "14px",        // smaller icon size
                        marginRight: "20px",
                        width: "50px"
                    }}
                >
                    <FaArrowLeft size={18} />
                </motion.button>EONIX</div>
                <div className="search-box-wrapper">
                    <input type="text" placeholder="Search past conversations..." value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
                </div>
                <button className="new-chat-btn" onClick={handleSearch} style={{color:"white"}}>Search</button>
                <button className="new-chat-btn" onClick={handleNewChat}>
                    <div style={{ display: "flex", textAlign: "center", justifyContent: "center", gap: "0.4rem" }}>
                        <div>
                            <MessageCirclePlus size={24} color='white'/>
                        </div>
                        <div style={{ marginTop: "5px", color: "white" }}>
                            New Chat
                        </div>
                    </div>
                </button>
            </div>
            <div className="history-section-title">
                <span className="emoji">💬</span> CHAT HISTORY
            </div>
            <div className="history-list-scroll">
                {history.length > 0 ? (
                    history.map((i, index) => {
                        const lastMsg = i.message && i.message.length > 0 ? i.message[i.message.length - 1].content : "No msg yet";
                        // for shortening the lastMsg because it will become the subtitle of the chat history of all chats
                        const shortMsg = lastMsg.length > 30 ? lastMsg.slice(0, 30) + "..." : lastMsg;
                        return (
                            <ChatHistoryItem
                                key={index}
                                title={i.title}
                                subtitle={shortMsg}
                                id={i.threadId}
                                active={i.threadId === currThreadId}
                                openChat={openChat}
                                deleteChat={deleteChat}
                            />)
                    })
                ) :
                    (
                        <div className='no-history'>No chats yet</div>
                    )
                }
            </div>
            <div className="sidebar-footer">
                EONIX AI — Beyond Imagination
            </div>
        </div>
    )
}


// ------------------- SINGLE CHAT MESSAGE ---------------------

const ChatMessage = ({ type, text, time }) => {
    let messageClass = type === "bot" ? "bot-message" : "user-message";
    let bubbleClass = type === "bot" ? "bot-bubble" : "user-bubble";

    return (
        <div className={`chat-message ${messageClass}`}>
            {type === "bot" && (
                <div className='message-avatar bot-avatar'>
                    <FontAwesomeIcon icon={faRobot} />
                </div>
            )}

            <div className='message-content-wrapper'>
                <div className={`message-bubble ${bubbleClass}`}>
                    {type === "bot"
                        ? <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{text}</ReactMarkdown>
                        : text
                    }
                </div>
                <div className='message-time'>{time}</div>
            </div>

            {type !== "bot" && (
                <div className='message-avatar user-avatar'>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </div>
    );
}


// ------------------- MAIN CHAT AREA ---------------------


const MainChat = ({ toggleSidebar }) => {
    const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, threads, setThreads, msg, setMsg } = useContext(MyContext);

    // const [msg, setMsg] = useState([]);
    const [loading, setLoading] = useState(false);

    const [latestReply, setLatestReply] = useState("");

    // jab bhi currThreadId change ho, tab backend se wo thread ke messages fetch kare
    useEffect(() => {
        const fetchMsg = async () => {
            if (!currThreadId) {
                return;
            }
            try {
                const r = await fetch(`http://localhost:8080/api/thread/${currThreadId}`);
                const data = await r.json();

                if (!r.ok) {
                    return;
                }

                // Thread ke saare messages set kar do
                if (data && Array.isArray(data.message)) {
                    const formattedMsg = data.message.map(m => ({
                        type: m.role === "user" ? "user" : "bot",
                        text: m.content,
                        time: new Date(m.time || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }))
                    setMsg(formattedMsg);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchMsg();
    }, [currThreadId]);

    const handlePrompt = (e) => {
        setPrompt(e.target.value);
    }
    const refreshThreads = async () => {
        try {
            const r = await fetch("http://localhost:8080/api/thread");
            const data = await r.json();
            if (Array.isArray(data)) setThreads(data);
        } catch (err) {
            console.log("Failed to refresh threads", err);
        }
    };
    const handleReply = async () => {
        if (!prompt.trim())
            return;

        setLoading(true);     //jese hi msg send kiya user ne to loading icon dikhega jb tk reply nhi mil jata
        const userMsg = {
            type: "user",
            text: prompt,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMsg(prev => [...prev, userMsg]);
        setPrompt("");   // input box clear ho jaye

        try {
            const r = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ threadId: currThreadId, message: prompt })
            });

            const data = await r.json();
            setReply(data.reply);   //setting the reply in context for typing effect

            if (data.threadId && data.threadId !== currThreadId) {
                setCurrThreadId(data.threadId); // keep IDs in sync
            }

            // update sidebar according to chat history immediately
            setThreads((prevThreads) => {
                const existing = prevThreads.find(t => t.threadId === currThreadId);

                if (existing) {
                    // agar thread pehle se hai, to update karo
                    return prevThreads.map(t =>
                        t.threadId === currThreadId
                            ? {
                                ...t,
                                title: t.title || prompt.slice(0, 20),
                                message: [...(t.message || []),
                                { role: "user", content: prompt },
                                { role: "bot", content: data.reply }
                                ]
                            }
                            : t
                    );
                } else {
                    // agar thread pehli baar ban raha hai, to naya add karo
                    const newThread = {
                        threadId: currThreadId,
                        title: prompt.slice(0, 20),
                        message: [
                            { role: "user", content: prompt },
                            { role: "bot", content: data.reply }
                        ]
                    };
                    return [...prevThreads, newThread];
                }
            });
            await refreshThreads();     //it will refresh the threads (update the history according to the latest msg) after sending a message
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    // logic for typing effect.....
    useEffect(() => {
        if (!reply) return;

        let idx = 0;
        const words = reply.split(" ");

        setLatestReply("");

        const interval = setInterval(() => {
            idx++;
            setLatestReply(words.slice(0, idx).join(" "));
            if (idx === words.length) {
                clearInterval(interval);

                const finalBotMessage = {
                    type: "bot",
                    text: reply,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMsg(prev => [...prev, finalBotMessage]);
                setLatestReply(null);
                setLoading(false);
                setReply(null); // clear reply in context
            }
        }, 40);

        return () => clearInterval(interval);
    }, [reply]);

    return (
        <div className="main-chat-area">
               <div className="mobile-back-btn" onClick={toggleSidebar}>
                {/* <FaArrowLeft size={22} color="#00e0ff"/> */}
            </div>
            <div className='chat-area-scroll'>
                {msg.length === 0 ?
                    <div className="emptyChat-modern">
                        <div className="emptyChat-grid">
                            <div className="emptyChat-card">
                                <h3>Start a Conversation</h3>
                                <p>Share your thoughts and explore new ideas.</p>
                            </div>
                            <div className="emptyChat-card">
                                <h3>Ask Questions</h3>
                                <p>Curious about AI, tech, or science? Just type away.</p>
                            </div>
                            <div className="emptyChat-card">
                                <h3>Discover Insights</h3>
                                <p>Watch your conversations grow into meaningful discussions.</p>
                            </div>
                        </div>
                    </div>
                    :
                    (msg.map((m, index) => (
                        <ChatMessage
                            key={index}
                            type={m.type}
                            text={m.text}
                            time={m.time}
                        />
                    )))
                }
                {loading && (<div className="loading-wrapper">
                    <PulseLoader color="darkcyan" loading={loading} />
                </div>)}

                {/* typing effect implement */}
                {latestReply && (
                    <div className='chat-message bot-message'>
                        <div className='message-avatar bot-avatar'>
                            <FontAwesomeIcon icon={faRobot} />
                        </div>
                        <div className='message-content-wrapper'>
                            <div className='message-bubble bot-bubble'>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                            </div>
                            <div className='message-time'>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="chat-input-area">
                <div className="input-container">
                    <input type="text"
                        placeholder="Type your thoughts into the universe..."
                        value={prompt}
                        onChange={(e) => handlePrompt(e)} />
                    <div className="input-icons">
                        <button className="send-btn" onClick={handleReply}>
                            <span className="send-icon">🚀</span>
                        </button>
                        {/* <span className="mic-icon">🎤</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
};

function ChatWindow() {
    // MyContext ek global data store jaisa hota hai.
    // Aur useContext(MyContext) ka kaam hota hai —
    // “iss component ko us store ke andar ke data (prompt, setPrompt, etc.) tak access dena.”

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="home-container">
            <div className="chat-window-app">
                
                {/* Mobile Sidebar Overlay */}
                <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <ChatHistory />
                </div>

                {/* Desktop / regular sidebar */}
                <div className="desktop-sidebar">
                    <ChatHistory />
                </div>

                {/* Main Chat Area */}
                <MainChat toggleSidebar={toggleSidebar} />
            </div>

            {/* Sidebar toggle button for mobile */}
            <button className="mobile-sidebar-btn" onClick={toggleSidebar}>
                <FaBars size={24} />
            </button>
        </div>
    );
}

export default ChatWindow;
