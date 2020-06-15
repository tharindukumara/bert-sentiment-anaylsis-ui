import React from 'react';
import { Avatar, Chat } from '@fluentui/react-northstar'
import ChatMessageWrapper from './ChatMessageWrapper';

export function createChatMessage(props) {
    var chatMsgObj = {
        message: (
            <Chat.Message
                content={<ChatMessageWrapper
                    loading={props.loading != null ? props.loading : true}
                    content={props.content} />
                }
                author={props.author != null ? props.author : "Olivia"}
                mine={props.mine ? props.mine : false} />
        ),
        contentPosition: props.contentPosition != null ? props.contentPosition : "start",
        attached: props.attached != null ? props.attached : true,
        key: props.key != null ? props.key : null,
    };

    if(props.avatar != null) {
        chatMsgObj.gutter = <Avatar image={props.avatar} />
    }

    return chatMsgObj;
}