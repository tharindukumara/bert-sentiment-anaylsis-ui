import React from 'react';
import { Box } from 'grommet';
import { Avatar, Chat, Divider, Provider, themes } from '@fluentui/react-northstar'

const ChatMessageList = (props) => {
    return (
        <Box overflow={{ horizontal: "hidden", vertical: "auto" }} >
            <Provider theme={themes.teams}>
                <Chat items={props.messages} />
            </Provider>
        </Box>
    );
}

export default ChatMessageList;