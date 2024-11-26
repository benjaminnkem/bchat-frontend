const MessageTypingBubble = () => {
  return (
    <div className="flex h-full items-center space-x-1">
      <div className="size-2.5 animate-bounce [animation-delay:200ms] rounded-full bg-gray-400"></div>
      <div className="size-2.5 animate-bounce [animation-delay:300ms] rounded-full bg-gray-400"></div>
      <div className="size-2.5 animate-bounce [animation-delay:400ms] rounded-full bg-gray-400"></div>
    </div>
  );
};

export default MessageTypingBubble;
