import { memo } from 'react';
import { Message } from '@/hooks/useRealtimeChat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export const ChatMessage = memo(({ message, isLatest }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 animate-in fade-in-0 slide-in-from-left-2',
          isUser
            ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground ml-auto'
            : 'bg-card text-card-foreground border border-border shadow-soft',
          isLatest && !isUser && 'duration-300'
        )}
        style={{
          animationDuration: isLatest && !isUser ? '0.3s' : '0.15s',
        }}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';
