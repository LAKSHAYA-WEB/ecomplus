import { useState, useEffect, useRef } from 'react';
import { useRealtimeChat } from '@/hooks/useRealtimeChat';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { TypingIndicator } from '@/components/TypingIndicator';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Sparkles, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const IfrChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useRealtimeChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6">
      {/* Chat Window */}
      <div
        className={cn(
          'mb-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 origin-bottom-right',
          isOpen
            ? 'opacity-100 scale-100 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh]'
            : 'opacity-0 scale-95 pointer-events-none w-0 h-0'
        )}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary to-accent px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">ecom+</h3>
              <p className="text-white/80 text-xs">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[calc(100%-140px)] overflow-y-auto p-4 bg-gradient-to-br from-background to-secondary/20">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-glow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Hi there! 👋</h3>
              <p className="text-sm text-muted-foreground">
                How can I help with your e-commerce needs?
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
              {isLoading && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t border-border">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          'h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:shadow-glow transition-all hover:scale-110',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default IfrChat;
