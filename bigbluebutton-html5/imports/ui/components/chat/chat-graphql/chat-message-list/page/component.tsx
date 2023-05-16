import React from "react";
import { useSubscription } from "@apollo/client";
import { CHAT_MESSAGE_SUBSCRIPTION, ChatMessageSubscriptionResponse } from "./queries";
import { Message } from '/imports/ui/Types/message';
import ChatMessage from './chat-message/componet';

interface ChatListPageContainerProps {
  page: number;
  pageSize: number;
  setLastSender: Function;
  lastSenderPreviousPage: string | undefined;
}

interface ChatListPageProps {
  messages: Array<Message>;
  lastSender: string;
  lastSenderPreviousPage: string;
}

const ChatListPage: React.FC<ChatListPageProps> = ({ messages, lastSenderPreviousPage }) => {  
  
  return (
    <span>
      {
        messages.map((message, index, Array) => {
          const previousMessage = Array[index-1];
          return (
            <ChatMessage
              key={message.createdTime}
              message={message}
              previousMessage={previousMessage}
              lastSenderPreviousPage={!previousMessage ? lastSenderPreviousPage : null}
            />
          )
        })
      }
    </span>
  );
}

const ChatListPageContainer: React.FC<ChatListPageContainerProps> = ({
  page,
  pageSize,
  setLastSender,
  lastSenderPreviousPage,
}) => {
  const  {
    data: chatMessageData,
    loading: chatMessageLoading,
    error: chatMessageError,
  } = useSubscription<ChatMessageSubscriptionResponse>(
    CHAT_MESSAGE_SUBSCRIPTION,
    { variables: { offset: (page)*pageSize, limit: pageSize } }
  );

  if (chatMessageError) return (<p>chatMessageError: {JSON.stringify(chatMessageError)}</p>);
  if (chatMessageLoading) return null;
  const messages = chatMessageData?.chat_message_public || [];
  if (messages.length > 0) {
    setLastSender(page, messages[messages.length-1].user.userId);
  }
  
  return (
    <ChatListPage
      messages={messages}
      lastSenderPreviousPage={lastSenderPreviousPage}
    />
  );
}

export default ChatListPageContainer;