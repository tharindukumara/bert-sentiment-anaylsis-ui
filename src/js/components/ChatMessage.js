import React from 'react';

import { Box } from 'grommet';
import { Chat } from '@fluentui/react-northstar'
import ChatMessageWrapper from './ChatMessageWrapper';


const ChatMessage = (props) => {
    return (
        {
            message: (
                <Chat.Message
                    content={<ChatMessageWrapper 
                                loading={this.props.loading} 
                                content={this.props.content} />}
                    author={this.props.author} />
            ),
            contentPosition: 'start',
            attached: {this.props.attached},
            key: {props.key}
        }
    );
}

export default ChatMessage;
