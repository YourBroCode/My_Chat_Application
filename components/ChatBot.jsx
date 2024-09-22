// "use client"

// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai"; 

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [temp, Istemp] = useState("hello");
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const toggleChatBot = () => {
//     setIsOpen(!isOpen);
//   };

//   // Make sure to include these imports:


// // const genAI = new GoogleGenerativeAI(process.env.GCP_API_KEY);
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// // const Api  = (async (prompt)=>{
// //   const result = await model.generateContent(prompt);
// //   console.log(result.response.text());
// // })
// // const prompt = "Tell Story of Hatim Tai";
// // Api(prompt);


// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GCP_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message to chat
//     const userMessage = { sender: "user", text: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput("");
//     setLoading(true);

//     // console.log(text)
//     console.log(input)

//     // Send request to the backend API
    
//       const result = await model.generateContent(input);
//       const responseText = await result.response.text();
//       console.log(responseText)
//       const botMessage = { sender: "bot", text: responseText || "Sorry, I didn't get that." };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
  
//       setLoading(false);
    
//   };

//   return (
//     <div className="fixed bottom-4 right-4">
//       {!isOpen && (
//         <button
//           onClick={toggleChatBot}
//           className="bg-newgreen text-white p-3 rounded-full shadow-lg hover:bg-neworange transition"
//         >
//           Ask me
//         </button>
//       )}
 

//       {isOpen && (
//         <div className="bg-white w-96 h-[32rem] shadow-lg rounded-lg p-4 flex flex-col">
//           <div className="flex justify-between items-center">
//             <h4 className="font-semibold text-lg text-neworange ">Chat Bot</h4>
//             <button
//               onClick={toggleChatBot}
//               className="text-gray-500 hover:text-red-500"
//             >
//               X
//             </button>
//           </div>

//           <div className="flex-1 mt-4 border rounded p-2 overflow-y-auto">
//             {messages.map((message, index) => (
//               <p
//                 key={index}
//                 className={`text-gray-600 ${
//                   message.sender === "user" ? "text-right" : "text-left"
//                 }`}
//               >
//                 {message.text}
//               </p>
//             ))}
//             {loading && (
//               <p className="text-gray-600 text-center">Typing...</p>
//             )}
//           </div>

//           <input
//             type="text"
//             className="border rounded p-2 mt-4 w-full"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;





"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GCP_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    const result = await model.generateContent(input);
    const responseText = await result.response.text();

    const botMessage = {
      sender: "bot",
      text: responseText || "Sorry, I didn't get that.",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={toggleChatBot}
          className="bg-newgreen text-white p-3 rounded-full shadow-lg hover:bg-neworange transition"
        >
          Ask me
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-96 h-[32rem] shadow-lg rounded-lg flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 bg-neworange text-white rounded-t-lg">
            <h4 className="font-semibold text-lg">Chat Bot</h4>
            <button
              onClick={toggleChatBot}
              className="text-white hover:text-red-500"
            >
              X
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 mt-4 p-4 bg-gray-50 border rounded overflow-y-auto custom-scrollbar">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`p-2 mb-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-100 text-right self-end"
                    : "bg-gray-200 text-left"
                }`}
              >
                {message.text}
              </p>
            ))}
            {loading && <p className="text-center text-gray-600">Typing...</p>}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-gray-100">
            <input
              type="text"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-newgreen bg-white"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
