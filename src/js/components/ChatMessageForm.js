import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Send } from 'grommet-icons';
import { Avatar, Chat, Divider, Provider, themes } from '@fluentui/react-northstar'

class ChatMessageForm extends React.Component {
    state = { message: '' };


    onMessage = (e) => {
        e.preventDefault();
        console.log(this.state.message)
        if (this.state.message === '') return;
        this.props.onMessage(this.state.message);
        this.setState({ message: '' });
    }

    render() {
        return (
            <Box align="center" pad="xsmall" direction="row">
                <TextInput placeholder="Write a message!!!" 
                            resize={false} 
                            value={this.state.message}
                            onChange={(e) => this.setState({ message: e.target.value })}/>
                <Box pad="small" direction="row" align="center" gap="small">
                    <Button primary
                        plain={false}
                        icon={<Send />}
                        onClick={e => this.onMessage(e)} />
                </Box>
            </Box>
        );
    }
}

export default ChatMessageForm;