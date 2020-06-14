import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chat } from '@fluentui/react-northstar'
import ChatMessageWrapper from './ChatMessageWrapper';


const ChatMessage = (avatar, loading, content, author, contentPosition, attached, key) => {
    return (
        {
            gutter: <Avatar {...avatar} />,
            message: (
                <Chat.Message
                    content={<ChatMessageWrapper
                        loading={loading}
                        content={content} />
                    }
                    author={author} />
            ),
            contentPosition: { contentPosition },
            attached: { attached },
            key: { key }
        }
    );
}


ChatMessage.propTypes = {
    avatar: PropTypes.object,
    loading: PropTypes.bool,
    content: PropTypes.object,
    author: PropTypes.string,
    contentPosition: PropTypes.string,
    attached: PropTypes.string,
    key: PropTypes.string
};


ChatMessage.defaultProps = {
    avatar: {
        image: "chatbot.png"
    },
    loading: true,
    content: undefined,
    author: "Olivia",
    contentPosition: "start",
    attached: true,
    key: ""
};


export default ChatMessage;
