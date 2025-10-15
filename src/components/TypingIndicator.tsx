export const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-card border border-border shadow-soft animate-in fade-in-0 slide-in-from-left-2">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
