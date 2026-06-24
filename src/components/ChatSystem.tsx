import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Paperclip, Image, Users, MessageSquare, 
  ChevronLeft, BookOpen, Clock, Smile, CheckCheck, Circle, AlertCircle 
} from 'lucide-react';
import { useApp } from '../store';
import { Channel, Message } from '../types';

export const ChatSystem: React.FC = () => {
  const { 
    currentUser, currentRole, channels, messages, 
    sendChatMessage, createChannel, users 
  } = useApp();

  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<Message['file'] | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set first direct channel as active on startup if none is set
  useEffect(() => {
    if (!activeChannel && currentUser) {
      // Find a direct channel where current user is a participant
      const userChan = channels.find(ch => ch.type === 'direct' && ch.participants.includes(currentUser.id));
      if (userChan) setActiveChannel(userChan);
    }
  }, [channels, activeChannel, currentUser]);

  // Scroll to bottom of chat on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel, isTyping]);

  if (!currentUser || currentRole === 'guest') {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <AlertCircle className="w-16 h-16 text-[#800000] mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">الدردشة تتطلب تسجيل الدخول</h2>
        <p className="text-slate-500">الرجاء تسجيل الدخول كطالب أو أستاذ أو مسؤول لاستخدام نظام المحادثة المباشرة.</p>
      </div>
    );
  }

  // Filter channels to show only direct chats where the current logged-in user is a participant
  const myChannels = channels.filter(ch => ch.type === 'direct' && ch.participants.includes(currentUser.id));

  // Filter messages for active channel
  const activeChannelMessages = messages.filter(m => {
    if (!activeChannel) return false;
    
    // For direct message channels
    if (activeChannel.type === 'direct') {
      const otherId = activeChannel.participants.find(id => id !== currentUser.id);
      return m.senderId === currentUser.id || m.senderId === otherId;
    }
    
    return false;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!typedMessage.trim() && !attachedFile) || !activeChannel) return;

    // Send original message
    sendChatMessage(activeChannel.id, typedMessage, attachedFile);
    
    const sentText = typedMessage;
    setTypedMessage('');
    setAttachedFile(undefined);

    // Trigger an incredibly smart "Simulated Reply" after 1.5 seconds to bring the chat to life!
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let replyText = 'أهلاً بك! نسعد دائماً بمساعدتك في مسيرتك اللغوية. كيف يمكنني إفادتك أكثر اليوم؟';
      
      if (activeChannel.type === 'direct') {
        const otherParticipant = users.find(u => activeChannel.participants.includes(u.id) && u.id !== currentUser.id);
        if (otherParticipant) {
          if (otherParticipant.role === 'teacher') {
            if (sentText.includes('واجب') || sentText.includes('الواجب')) {
              replyText = `أهلاً ${currentUser.name}، نعم اطلعت على الواجب وسأقوم بتصحيحه وإرسال الدرجة والملاحظات التفصيلية لك الليلة بإذن الله. واصل هذا الاجتهاد!`;
            } else if (sentText.includes('اختبار') || sentText.includes('امتحان')) {
              replyText = `مرحباً! التحضير للاختبار يتطلب تدريباً مستمراً. أنصحك بالتركيز على بنك الأسئلة الذي أرفقته لك في الدرس الأخير ومحاكاة وقت الاختبار بدقة.`;
            } else {
              replyText = `أهلاً بك يا ${currentUser.name}. سؤالك في غاية الأهمية لغوياً، سأقوم بصياغة شرح تفصيلي مبسط له وإرساله لك هنا في أقرب وقت.`;
            }
          }
        }
      } else {
        replyText = `مرحباً يا أبطال ELC! تذكير هام للجميع بضرورة حضور الورشة التفاعلية غداً لممارسة المحادثة الطليقة وتحصيل الاستفادة الكبرى.`;
      }

      // Add reply to message database
      sendChatMessage(
        activeChannel.id, 
        replyText, 
        undefined
      );
    }, 2000);
  };

  const handleAttachMockFile = (type: 'image' | 'file') => {
    if (type === 'image') {
      setAttachedFile({
        name: 'نموذج_حل_اسئلة_الايلتس.jpg',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100'
      });
    } else {
      setAttachedFile({
        name: 'ملخص_قواعد_المحادثة_الفرنسية.pdf',
        type: 'file',
        url: '#'
      });
    }
    alert(`تم إرفاق الملف التجريبي: ${type === 'image' ? 'صورة نموذج الحل' : 'ملف القواعد PDF'}. يمكنك الآن كتابة رسالة والضغط على إرسال.`);
  };

  return (
    <div className="py-4 md:py-8 max-w-7xl mx-auto px-2 sm:px-4 h-[75vh] md:h-[80vh] flex flex-col md:flex-row-reverse rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 text-right">
      
      {/* Channels list sidebar (Right panel on desktop) */}
      <div className="w-full md:w-80 border-l border-slate-100 dark:border-slate-800 flex flex-col h-1/3 md:h-full shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/20">
          <h3 className="font-bold text-[#002B5B] dark:text-slate-100 text-sm flex items-center justify-end gap-2">
            <span>المحادثات المباشرة والخاصة</span>
            <MessageSquare className="w-4 h-4 text-[#800000]" />
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">تواصل مباشرة وخاص مع الأساتذة وزملائك.</p>
        </div>

        {/* Channels scroll container */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/50">
          {myChannels.map((ch) => {
            const isActive = activeChannel?.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChannel(ch);
                  setAttachedFile(undefined);
                }}
                className={`w-full p-4 text-right transition flex flex-row-reverse items-center justify-between gap-3 ${
                  isActive 
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-r-4 border-[#800000]' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
                id={`chat-chan-${ch.id}`}
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <span className="text-[9px] text-slate-400 font-mono shrink-0">{ch.lastMessageTime}</span>
                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 truncate pr-1">{ch.name}</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate pr-1 text-right">{ch.lastMessageText}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {ch.type === 'group' ? (
                    <Users className="w-4 h-4 text-[#002B5B] dark:text-slate-300" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message conversation window (Left panel on desktop) */}
      <div className="flex-1 flex flex-col h-2/3 md:h-full bg-white dark:bg-slate-900">
        {activeChannel ? (
          <>
            {/* Active channel top header bar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                  <span>متصل الآن</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h4 className="font-bold text-sm text-[#002B5B] dark:text-slate-100">{activeChannel.name}</h4>
                  <p className="text-[9px] text-slate-400">
                    محادثة مشفرة آمنة
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/20 text-[#800000] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Conversation message thread list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-950/10">
              {activeChannelMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div 
                    key={msg.id} 
                    className={`flex gap-3 max-w-xl ${isMe ? 'mr-auto flex-row' : 'ml-auto flex-row-reverse'}`}
                  >
                    {/* Participant Avatar */}
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                        {msg.senderName.charAt(0)}
                      </div>
                    )}

                    <div className="space-y-1">
                      {/* Name & Badge (only for others) */}
                      {!isMe && (
                        <div className="flex items-center gap-2 flex-row-reverse justify-end">
                          <span className="font-bold text-[10px] text-slate-700 dark:text-slate-200">{msg.senderName}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            msg.senderRole === 'teacher' ? 'bg-rose-100 text-rose-800' : msg.senderRole === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {msg.senderRole === 'teacher' ? 'أستاذ' : msg.senderRole === 'admin' ? 'إشراف' : 'طالب'}
                          </span>
                        </div>
                      )}

                      {/* Message Bubble text content */}
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isMe 
                          ? 'bg-[#002B5B] text-white rounded-br-none' 
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none shadow-sm'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        
                        {/* Attached file visual module */}
                        {msg.file && (
                          <div className="mt-3 p-2.5 bg-slate-950/10 dark:bg-slate-900/40 rounded-xl border border-white/10 flex items-center justify-between gap-4 text-[10px]">
                            {msg.file.type === 'image' ? (
                              <img src={msg.file.url} alt="attached" className="w-10 h-10 object-cover rounded-lg border border-white/20" />
                            ) : (
                              <div className="w-8 h-8 bg-[#800000] text-white rounded flex items-center justify-center font-bold">PDF</div>
                            )}
                            <div className="text-right flex-1 min-w-0">
                              <p className="font-bold truncate text-slate-300">{msg.file.name}</p>
                              <p className="opacity-60 text-[8px]">مرفق بالرسالة</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Timestamp & receipts */}
                      <div className={`flex items-center gap-1 text-[8px] text-slate-400 font-mono ${isMe ? 'justify-start' : 'justify-end'}`}>
                        <span>{msg.timestamp.split(' ')[1] || msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 flex-row-reverse justify-end items-center text-slate-400 text-[10px] pl-10">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="mr-1">الأستاذ يكتب الآن...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Attached preview helper bar */}
            {attachedFile && (
              <div className="px-6 py-2 bg-rose-50/50 dark:bg-rose-950/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <button 
                  onClick={() => setAttachedFile(undefined)}
                  className="text-[#800000] font-bold"
                >
                  إلغاء المرفق
                </button>
                <p className="text-slate-500">📎 ملف مرفق معلق: <span className="font-bold text-slate-700 dark:text-slate-300">{attachedFile.name}</span></p>
              </div>
            )}

            {/* Bottom message input controls */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900">
              {/* Send Button */}
              <button
                type="submit"
                disabled={!typedMessage.trim() && !attachedFile}
                className={`p-3.5 rounded-xl transition shrink-0 ${
                  typedMessage.trim() || attachedFile
                    ? 'bg-[#800000] text-white hover:bg-[#600000] shadow-md hover:shadow-lg'
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800 cursor-not-allowed'
                }`}
                id="chat-send-btn"
              >
                <Send className="w-4 h-4 transform rotate-180" />
              </button>

              {/* Text Input field */}
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-right text-xs"
                placeholder="اكتب رسالتك لزميلك أو الأستاذ هنا..."
                id="chat-message-input"
              />

              {/* Attach action clips buttons */}
              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleAttachMockFile('image')}
                  className="p-2.5 text-slate-400 hover:text-[#800000] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition"
                  title="إرفاق صورة"
                  id="chat-attach-image-btn"
                >
                  <Image className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAttachMockFile('file')}
                  className="p-2.5 text-slate-400 hover:text-[#800000] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition"
                  title="إرفاق ملف PDF"
                  id="chat-attach-file-btn"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
            <MessageSquare className="w-16 h-16 text-slate-200" />
            <p className="font-bold text-sm">مرحباً بك في المحادثات التفاعلية لـ ELC</p>
            <p className="text-xs text-slate-500 max-w-sm">
              حدد محادثة خاصة مع أحد معمليك من القائمة الجانبية اليمنى لبدء إرسال الرسائل ومشاركة الملفات.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
