import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCheck, 
  Phone, 
  Clock, 
  Cake,
  Smile,
  Paperclip
} from 'lucide-react';
import { ChatMessage, BakerProfile } from '../types/confectionery';

interface DirectChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  bakerProfile: BakerProfile;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const DirectChatModal: React.FC<DirectChatModalProps> = ({
  isOpen,
  onClose,
  bakerProfile,
  messages,
  onSendMessage,
}) => {
  if (!isOpen) return null;

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickTemplates = [
    'سلام، برای مهمانی ۲۰ نفره چند کیلو شیرینی تر پیشنهاد میدین؟',
    'آیا امکانش هست روی کیک متن تبریک سفارشی بنویسید؟',
    'سلام، آیا شیرینی‌های شما با کره طبیعی حیوانی پخته میشن؟',
    'آیا امکان تحویل سفارش تا ساعت ۴ بعدازظهر فردا وجود دارد؟',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onSendMessage(inputVal.trim());
    setInputVal('');
  };

  const handleTemplateClick = (template: string) => {
    onSendMessage(template);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg h-[620px] max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-3.5 bg-gradient-to-r from-amber-800 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={bakerProfile.avatar}
                alt={bakerProfile.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-300/80 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">{bakerProfile.name}</span>
                <span className="text-[10px] bg-amber-700/60 text-amber-200 px-1.5 py-0.2 rounded font-medium">قناد خانگی</span>
              </div>
              <p className="text-[11px] text-amber-200/90 flex items-center gap-1">
                <span>پاسخگویی سریع | در حال حاضر در کارگاه</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${bakerProfile.phone}`}
              title="تماس تلفنی با کارگاه"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick templates chips */}
        <div className="bg-amber-50/70 p-2 border-b border-amber-200/50 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-amber-800 font-bold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            پرسش‌های سریع:
          </span>
          {quickTemplates.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTemplateClick(item)}
              className="bg-white hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]">
          {messages.map((msg) => {
            const isMe = msg.sender === 'customer';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-amber-600 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 text-[10px] ${
                      isMe ? 'text-amber-100 justify-end' : 'text-stone-400 justify-start'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-amber-200" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="پیام یا سوال خود را درباره شیرینی‌ها بنویسید..."
            className="flex-1 text-xs sm:text-sm p-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50"
          />

          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-11 h-11 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white flex items-center justify-center shadow-xs transition-all active:scale-95"
          >
            <Send className="w-4 h-4 -scale-x-100" />
          </button>
        </form>
      </div>
    </div>
  );
};
