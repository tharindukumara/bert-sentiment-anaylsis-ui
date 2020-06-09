import React from 'react';

import { Box, Button, TextArea, TextInput } from 'grommet';
import { Send } from 'grommet-icons';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, Divider, Provider, themes } from '@fluentui/react-northstar'


class ChatMessageList extends React.Component {

    componentDidMount() {
        this.scrollToBottom();
      }
    
      componentDidUpdate() {
        this.scrollToBottom();
      }
    
      scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
      }

    render() {
        return (
            <Box overflow={{ horizontal: "hidden", vertical: "auto" }} >
                <Provider theme={themes.teams}>
                    <Chat items={this.props.messages} />
                </Provider>
                <div ref={el => { this.el = el; }} />
            </Box>
        );
    };
    
}

export default ChatMessageList;