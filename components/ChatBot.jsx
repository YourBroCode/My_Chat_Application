"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { generateChatResponse } from "../app/api/ChatBot/generative";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your MyChat AI. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const toggleChatBot = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await generateChatResponse(input, messages);
      const botMessage = {
        sender: "bot",
        text: response.success ? response.text : "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChatBot}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div className="bg-white w-[22rem] h-[35rem] shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-[#2e3b43] animate-fade-in-up">
          
          {/* Header - Styled with your specific TopBar colors */}
          <div className="flex justify-between items-center p-4 bg-[#1f2c34] text-[#b0b0b0] border-b border-[#2e3b43] shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                 <span className="font-bold text-xs text-white">AI</span>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide text-white">MyChat Assistant</h4>
                <p className="text-xs text-[#b0b0b0] flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button 
              onClick={toggleChatBot} 
              className="text-[#b0b0b0] hover:text-white transition p-1.5 hover:bg-[#2e3b43] rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full mb-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 max-w-[85%] rounded-2xl text-sm leading-relaxed shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                  }`}
                >
                  {message.sender === "user" ? (
                    message.text
                  ) : (
                    <ReactMarkdown
                      components={{
                        strong: ({node, ...props}) => <span className="font-bold text-gray-900" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mt-2 space-y-1 text-gray-700" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 mt-2 space-y-1 text-gray-700" {...props} />,
                        code: ({node, ...props}) => <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-xs border border-gray-200" {...props} />,
                        p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start mb-4">
                 <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 w-16">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-200 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <input
                type="text"
                className="flex-1 bg-transparent px-3 py-2 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || loading}
                className={`p-2 rounded-full transition-all duration-200 ${
                  input.trim() 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transform hover:scale-105" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBot;