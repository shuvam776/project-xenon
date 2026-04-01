"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "admin" | "bot";
  time: string;
}

export default function AdminChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admin" | "bot">("admin");
  const [messageInput, setMessageInput] = useState("");
  
  const [adminMessages, setAdminMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to HoardSpace. How can we help you with your advertising needs?",
      sender: "admin",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [botMessages, setBotMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I am the HoardSpace AI Assistant 🤖. Ask me anything about our features, like how to book a billboard, list your space, or check pricing!",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [adminMessages, botMessages, isOpen, activeTab]);

  // Local Rule-Based "AI" Logic
  const getBotResponse = (input: string): string => {
    const text = input.toLowerCase();
    
    if (text.includes("book") || text.includes("rent") || text.includes("buy")) {
      return "To book a hoarding, head over to the 'Explore' tab! You can search by city, choose your dates on the calendar, and securely checkout.";
    }
    if (text.includes("price") || text.includes("cost") || text.includes("expensive")) {
      return "Hoarding prices depend on the location, size, and type of board (e.g., Lit vs. Non-Lit). We offer transparent pricing directly on each listing.";
    }
    if (text.includes("vendor") || text.includes("list") || text.includes("sell") || text.includes("owner")) {
      return "Are you a hoarding owner? You can list your space with us! Register as a Vendor to start uploading your billboards and managing bookings via your custom dashboard.";
    }
    if (text.includes("payment") || text.includes("secure") || text.includes("razorpay")) {
      return "All bookings are processed securely via Razorpay. We support Credit/Debit cards, UPI, and NetBanking.";
    }
    if (text.includes("dashboard") || text.includes("profile")) {
      return "Your personalized Dashboard allows you to manage active campaigns, view past bookings, chat with support, and browse your wishlist!";
    }
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! I am the HoardSpace AI Assistant. I can answer questions about finding billboards, pricing, and how our platform works.";
    }
    
    return "I'm not exactly sure how to answer that! 😅 I'm best at answering questions about booking spaces, listing as a vendor, pricing, or our features. Could you rephrase?";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      text: messageInput.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (activeTab === "admin") {
      setAdminMessages([...adminMessages, newMsg]);
      setMessageInput("");

      // Simulate admin typing
      setTimeout(() => {
        setAdminMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "Thanks for reaching out! One of our human agents will review your message shortly.",
          sender: "admin",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
    } else {
      setBotMessages([...botMessages, newMsg]);
      setMessageInput("");

      // Simulate Bot processing (faster than human)
      setTimeout(() => {
        const botReply = getBotResponse(newMsg.text);
        setBotMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: botReply,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 600);
    }
  };

  const currentMessages = activeTab === "admin" ? adminMessages : botMessages;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-80 sm:w-96 bg-[#efeae2] shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 pointer-events-none translate-y-10"
        }`}
        style={{ height: "480px", fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {/* WhatsApp-Style Header */}
        <div className="bg-[#0f4a8a] text-white pt-3 pb-0 flex flex-col shrink-0 shadow-md z-10 w-full relative">
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 transition-all">
                {activeTab === "admin" ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
              </div>
              <div>
                <h3 className="font-semibold text-[15px] leading-tight">
                  {activeTab === "admin" ? "HoardSpace Support" : "AI Help Desk"}
                </h3>
                <p className="text-[12px] text-blue-100 opacity-90 mt-0.5 font-medium tracking-wide">
                  {activeTab === "admin" ? "Typically replies instantly" : "Automated bot responses"}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors self-start"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex w-full bg-[#0a325a]">
            <button 
              onClick={() => setActiveTab("admin")}
              className={`flex-1 py-2 text-[13px] font-bold uppercase tracking-wider transition-colors border-b-[3px] ${activeTab === "admin" ? "text-orange-400 border-orange-400" : "text-white/60 border-transparent hover:text-white/80"}`}
            >
              Admin Chat
            </button>
            <button 
              onClick={() => setActiveTab("bot")}
              className={`flex-1 py-2 text-[13px] font-bold uppercase tracking-wider transition-colors border-b-[3px] ${activeTab === "bot" ? "text-orange-400 border-orange-400" : "text-white/60 border-transparent hover:text-white/80"}`}
            >
              AI Help Desk
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 relative">
          {/* Subtle background doodle similar to WhatsApp */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h20v20H0z\" fill=\"%23000\"/%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"1.5\" fill=\"%23000\"/%3E%3C/svg%3E')", backgroundSize: "20px" }}></div>
          
          <div className="text-center mb-4">
            <span className="text-[11px] font-medium bg-[#e4e2dd] text-gray-600 px-3 py-1 rounded-lg">Today</span>
          </div>

          {currentMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] relative z-10 mb-1 ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
            >
              <div 
                className={`px-3 pt-2 pb-1.5 rounded-lg shadow-sm relative break-words ${
                  msg.sender === "user" 
                    ? "bg-[#dbeafe] text-[#111b21] rounded-tr-[4px]" // Blue-100 for outgoing
                    : "bg-white text-[#111b21] rounded-tl-[4px]" // White for incoming
                }`}
              >
                {/* Visual tail (CSS triangle) */}
                <div 
                  className="absolute top-0 w-0 h-0 border-[6px]"
                  style={{ 
                    borderColor: msg.sender === "user" 
                      ? "#dbeafe transparent transparent transparent" 
                      : "#ffffff transparent transparent transparent",
                    right: msg.sender === "user" ? "-6px" : "auto",
                    left: msg.sender === "user" ? "auto" : "-6px",
                  }}
                ></div>

                <p className="text-[14px] leading-snug">{msg.text}</p>
                <div className="text-[10px] text-gray-500 float-right mt-1 ml-4 relative -bottom-[2px]">
                  {msg.time}
                  {msg.sender === "user" && (
                     <span className="ml-[3px] text-blue-500 inline-block font-bold">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#f0f2f5] shrink-0 border-t border-gray-200">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <input 
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message"
              className="flex-1 bg-white rounded-full px-5 py-3 outline-none text-[15px] shadow-sm text-gray-800 placeholder:text-gray-500 border border-transparent focus:border-blue-100 transition-colors"
            />
            <button 
              type="submit"
              disabled={!messageInput.trim()}
              className="w-[46px] h-[46px] bg-[#f97316] hover:bg-[#ea580c] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors shadow-sm shrink-0"
            >
              <Send size={18} className="translate-x-[2px]" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-[#0f4a8a] text-white hover:bg-[#1e3a8a] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative z-50 hover:shadow-[0_10px_25px_rgba(15,74,138,0.5)] ${isOpen ? "rotate-90 scale-90" : "scale-100 hover:-translate-y-1"}`}
      >
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#f97316] rounded-full border-2 border-white shadow-sm"></span>
        <div className="relative flex items-center justify-center w-full h-full">
          <MessageCircle size={28} className={`absolute transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <X size={28} className={`absolute transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />
        </div>
      </button>
    </div>
  );
}
