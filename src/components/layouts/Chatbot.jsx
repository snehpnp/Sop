import React, { useState, useRef, useEffect } from 'react';
import { askQuestion, unsatisfied } from '../CommonAPI/ChatbotApi';
import { IoSend } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: 'Welcome! How can I help you?', sender: 'bot', feedbackGiven: false }
  ]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupIdx, setPopupIdx] = useState(null);
  const [reason, setReason] = useState('');
  const messagesEndRef = useRef(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showCloseAlert, setShowCloseAlert] = useState(false);
  const [showThumbAnim, setShowThumbAnim] = useState(false);
  const [thumbAnimPos, setThumbAnimPos] = useState(null);

  const username = localStorage.getItem('name')

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
  };

  const handleQuesion = async (que) => {
    setIsBotTyping(true);
    try {
      const data = { question: que };
      const res = await askQuestion(data);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: res.answer,
            sender: 'bot',
            feedbackGiven: false
          }
        ]);
        setIsBotTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error in handleQuesion:', error);
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === 'user') {
      handleQuesion(lastMsg.text);
    }
    // Auto-scroll to last message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleFeedback = (index, type) => {
    if (type === 'helpful') {
      // Find the button position
      const btn = document.getElementById(`helpful-btn-${index}`);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setThumbAnimPos({
          left: rect.left + rect.width / 2,
          top: rect.top + rect.height / 2
        });
      }
      setShowThumbAnim(true);
      setTimeout(() => {
        setShowThumbAnim(false);
        setMessages(prev =>
          prev.map((msg, i) =>
            i === index ? { ...msg, feedbackGiven: true } : msg
          )
        );
        setThumbAnimPos(null);
      }, 1200);
    } else {
      // Directly submit feedback as not helpful, no popup
      handlePopupSubmit(true, index);
      toast.success('Thank you! Your feedback has been submitted.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        containerId: 'chatbot-toast',
        style: { zIndex: 4000 }
      });
    }
  };

  // Update handlePopupSubmit to accept index
  const handlePopupSubmit = async (isCancel = false, idx = popupIdx) => {
    // If cancel, allow empty reason, else require non-empty reason
    // (No reason needed now)
    const message = messages[idx];
    let question = '';
    if (idx > 0) {
      for (let i = idx - 1; i >= 0; i--) {
        if (messages[i].sender === 'user') {
          question = messages[i].text;
          break;
        }
      }
    }

    try {
      const data = {
        question: question,
        answer: message.text,
        Reason: '', // Always empty now
        Domain: window.location.origin,
        Username: username
      }; 
      const res = unsatisfied(data) 


      setMessages(prev =>
        prev.map((msg, i) =>
          i === idx ? { ...msg, feedbackGiven: true } : msg
        )
      );
      setShowPopup(false);
      setReason('');
      setPopupIdx(null);
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className="chatbot-container position-fixed bottom-1 end-1 m-3 shadow rounded-xl bg-white border"
      style={{ width: 380, zIndex: 1050, height: 520 }}>
      <ToastContainer
        enableMultiContainer
        containerId="chatbot-toast"
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 4000 }}
      />
      {/* Chat Header */}
      <div className="chatbot-header d-flex justify-content-between align-items-center p-2 border-bottom text-white rounded-top card-bg-color"
        style={{
          background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)'
        }}>
        <span className="fw-bold ms-3">
          🤖 SOP AI</span>
        <button className="btn btn-sm btn-light" onClick={() => setShowCloseAlert(true)}>&times;</button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages p-3 card-bg-color" style={{ maxHeight: 420, overflowY: 'auto', background: '#f8f9fa', position: 'relative', paddingBottom: 40 }}>
        {messages.map((msg, idx) => {
          const isLastBotMsg =
            msg.sender === 'bot' &&
            idx === messages.length - 1 &&
            msg.text !== 'Welcome! How can I help you?';
          return (
            <div key={idx} className={`d-flex mb-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className="p-2 rounded-3  "
                style={{
                  maxWidth: '75%',
                  background: msg.sender === 'user'
                    ? 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)'
                    : '#f1f1f1',
                  color: msg.sender === 'user' ? '#fff' : '#222',
                  border: msg.sender === 'user' ? undefined : '1px solid #e0e0e0'
                }}>
                {msg.text}
                {isLastBotMsg && !msg.feedbackGiven && (
                  <div className="mt-1 d-flex gap-1">
                    <button
                      id={`helpful-btn-${idx}`}
                      style={{ fontSize: '0.7rem', padding: '1px 6px', background: '#eafbe7', color: '#388e3c', borderColor: '#c8e6c9', fontWeight: 500, opacity: 0.9 }}
                      className="btn btn-xs btn-outline-success"
                      onClick={() => handleFeedback(idx, 'helpful')}
                    >
                      👍 Helpful
                    </button>
                    <button style={{ fontSize: '0.7rem', padding: '1px 6px', background: '#fdeaea', color: '#d32f2f', borderColor: '#ffcdd2', fontWeight: 500, opacity: 0.9 }} className="btn btn-xs btn-outline-danger" onClick={() => handleFeedback(idx, 'not_helpful')}>👎 Not Helpful</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isBotTyping && (
          <div className="d-flex mb-2 justify-content-start" style={{ marginBottom: 16 }}>
            <div className="p-2 rounded-3" style={{ maxWidth: '75%', background: '#f1f1f1', color: '#222', border: '1px solid #e0e0e0' }}>
              <span style={{ fontSize: '1.5rem', letterSpacing: '2px', display: 'inline-block', minHeight: 24 }}>
                <span className="typing-dots">
                  <span style={{ animation: 'blink 1s infinite' }}>.</span>
                  <span style={{ animation: 'blink 1s 0.2s infinite' }}>.</span>
                  <span style={{ animation: 'blink 1s 0.4s infinite' }}>.</span>
                </span>
              </span>
            </div>
          </div>
        )}
        {showThumbAnim && thumbAnimPos && (
          <div className="thumb-anim-container" style={{
            position: 'fixed',
            left: thumbAnimPos.left,
            top: thumbAnimPos.top,
            transform: 'translate(-50%, 0)',
            pointerEvents: 'none',
            zIndex: 3001
          }}>
            <FaThumbsUp className="thumb-anim" />
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="chatbot-input d-flex border-top p-2 card-bg-color">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="d-flex align-items-center justify-content-center" style={{ width: 38, height: 38, padding: 0, background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)', border: 'none' }} onClick={handleSend}>
          <IoSend size={22} color="white" />
        </button>
      </div>

      {/* Close Chat Alert */}
      {showCloseAlert && (
        <div className="position-absolute shadow rounded card-bg-color border border-1 d-flex flex-column align-items-center"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 350,
            zIndex: 3000,
            padding: 0
          }}>
          <div className="p-3 w-100 text-center" style={{ borderBottom: '1px solid var(--bs-border-color, #e0e0e0)', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
            <div className="mb-3 card-text-Color" style={{ color: 'var(--bs-heading-color, #222)' }}>Do you want to discontinue chat?</div>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-success btn-sm px-4 fw-bold" onClick={onClose}>Yes</button>
              <button className="btn btn-danger btn-sm px-4 fw-bold" onClick={() => setShowCloseAlert(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Typing Dots Animation */}
      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        .thumb-anim-container {
          position: absolute;
          left: 50%;
          bottom: 60px;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 3001;
        }
        .thumb-anim {
          font-size: 2.5rem;
          color: #4caf50;
          animation: thumb-float 1.2s cubic-bezier(0.4,0,0.2,1);
          filter: drop-shadow(0 2px 8px rgba(76,175,80,0.25));
        }
        @keyframes thumb-float {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.7) rotate(-20deg);
          }
          30% {
            opacity: 1;
            transform: translateY(-20px) scale(1.1) rotate(0deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-40px) scale(1.2) rotate(8deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.7) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
