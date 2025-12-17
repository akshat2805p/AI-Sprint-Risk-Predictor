import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './ToastProvider';

const SprintChat = ({ isOpen, toggleChat }) => {
    const { addToast } = useToast();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your Rovo Sprint Assistant. Ask me anything about the team, risks, or blockers.", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // "Omniscient" Mock Logic
        setTimeout(() => {
            let botResponse = "I'm analyzing the sprint data... could you clarify?";
            const lowerInput = userMsg.text.toLowerCase();

            // 1. Team Questions
            if (lowerInput.includes('who') || lowerInput.includes('team') || lowerInput.includes('member')) {
                botResponse = "Our team currently consists of:\n- Aksha Sharma (Scrum Master)\n- John Dev (Lead Developer)\n- Alice QA (QA Engineer)\n\nDev_A represents a high 'Bus Factor' risk due to ticket overload.";
            }
            // 2. Risk/Velocity Questions
            else if (lowerInput.includes('risk') || lowerInput.includes('score')) {
                botResponse = "The Sprint Risk Score is **78/100 (High)**. This is driven by 3 main factors:\n1. Scope Creep (+3 tickets)\n2. Stalled Tickets (SPR-124)\n3. Negative Velocity Trend.";
            }
            // 3. Blocker Questions
            else if (lowerInput.includes('block') || lowerInput.includes('stuck') || lowerInput.includes('spr-124')) {
                botResponse = "Found 2 critical blockers:\n- **SPR-124**: Payment Gateway (Waiting for API Keys).\n- **SPR-145**: Notification Service (Pending Code Review).\n\nI recommend contacting the client regarding the API keys immediately.";
            }
            // 4. Action Questions
            else if (lowerInput.includes('fix') || lowerInput.includes('help') || lowerInput.includes('email')) {
                botResponse = "I can help with that. Go to the 'Insights' tab to use my **One-Click Fixes**. I can draft a delay notification email for you there.";
            }
            // 5. Casual/Personality
            else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botResponse = "Hello! I'm ready to help you get this sprint back on track. What do you need?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            setIsTyping(false);

            // Easter egg toast
            if (lowerInput.includes('magic')) {
                addToast("✨ Rovo Magic Activated!", "info");
            }
        }, 1200);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-emerald-500 rounded-lg shadow-sm">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-sm">Sprint Assistant</h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-emerald-500 text-white rounded-tr-none'
                                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-slate-200 flex gap-1.5 shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ask Rovo..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-800 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-sm"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center z-50 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </>
    );
};

export default SprintChat;
