import React from 'react';
import { Avatar, Chat } from '@fluentui/react-northstar'
import ChatMessageWrapper from './ChatMessageWrapper';

export function createChatMessage(props) {
    var obj =
    {
        gutter: <Avatar image={props.avatar != null ? props.avatar : null} />,
        message: (
            <Chat.Message
                content={<ChatMessageWrapper
                    loading={props.loading != null ? props.loading : true}
                    content={props.content} />
                }
                author={props.author} />
        ),
        contentPosition: props.pos != null ? props.pos : "start",
        attached: props.attached != null ? props.attached : true,
        key: props.key != null ? props.key : null
    };

    return obj;
}