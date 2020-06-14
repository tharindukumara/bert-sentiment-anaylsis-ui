import React from 'react';
import PropTypes from 'prop-types';
import { Chat } from '@fluentui/react-northstar'
import ChatMessageWrapper from './ChatMessageWrapper';


const ChatMessage = (loading, content, author, contentPosition, attached, key) => {
    return (
        {
            message: (
                <Chat.Message
                    content={<ChatMessageWrapper 
                                loading={loading} 
                                content={content} />
                            }
                    author={author} />
            ),
            contentPosition: {contentPosition},
            attached: {attached},
            key: {key}
        }
    );
}


ChatMessage.propTypes = {
    loading: PropTypes.bool, 
    content: PropTypes.object, 
    author: PropTypes.string, 
    contentPosition: PropTypes.string,
    attached: PropTypes.string, 
    key: PropTypes.string
  };
  
  ChatMessage.defaultProps = {
    loading: true, 
    content: undefined, 
    author: "Olivia", 
    contentPosition: "start",
    attached: true, 
    key: ""
  };
  

export default ChatMessage;
