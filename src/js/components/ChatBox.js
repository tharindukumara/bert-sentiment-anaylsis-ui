import React from 'react';

import { Box, Button, TextArea, TextInput } from 'grommet';

import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, Divider, Provider, themes } from '@fluentui/react-northstar'
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';


var janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: <AcceptIcon />,
  }
};

class ChatBox extends React.Component {
  constructor(props) {
    super(props)

  }


  state = {
    messages: [
      {
        message: (
          <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
        ),
        contentPosition: 'end',
        attached: 'top',
        key: 'message-id-1',
      },
      {
        message: (
          <Chat.Message content="I'm back!" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
        ),
        contentPosition: 'end',
        attached: true,
        key: 'message-id-2',
      },
      {
        message: (
          <Chat.Message
            content={{
              content: (
                <div>
                  What do you think about <a href="#">www.goodFood.com</a>?
                </div>
              ),
            }}
            author="John Doe"
            timestamp="Yesterday, 10:15 PM"
            mine
          />
        ),
        contentPosition: 'end',
        attached: 'bottom',
        key: 'message-id-3',
      },
      {
        gutter: <Avatar {...janeAvatar} />,
        message: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
        attached: 'top',
        key: 'message-id-4',
      },
      {
        gutter: <Avatar {...janeAvatar} />,
        message: (
          <Chat.Message content="Looks good!" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
        ),
        attached: true,
        key: 'message-id-5',
      },
      {
        gutter: <Avatar {...janeAvatar} />,
        message: (
          <Chat.Message
            content={
              <div>
                I also like <a href="#">www.goodFood2.com</a>.
                    </div>
            }
            author="Jane Doe"
            timestamp="Yesterday, 10:15 PM"
          />
        ),
        attached: 'bottom',
        key: 'message-id-6',
      },
      {
        message: (
          <Chat.Message
            content="Would you like to grab lunch there?"
            author="John Doe"
            timestamp="Yesterday, 10:16 PM"
            mine
          />
        ),
        contentPosition: 'end',
        key: 'message-id-7',
      },
      {
        gutter: <Avatar {...janeAvatar} />,
        message: (
          <Chat.Message
            content="Sure! Let's try it."
            author="Jane Doe"
            timestamp="Yesterday, 10:15 PM"
          />
        ),
        key: 'message-id-8',
      },
      {
        children: <Divider content="Today" color="brand" important />,
        key: 'message-id-9',
      },
      {
        message: (
          <Chat.Message content="Ok, let's go." author="John Doe" timestamp="Today, 11:15 PM" mine />
        ),
        contentPosition: 'end',
        key: 'message-id-10',
      },
    ]
  };

  onMessage = msg => {
    console.log("on message")

    let message = {
      message: (
        <Chat.Message content={msg} author="John Doe" timestamp="Today, 11:15 PM" mine />
      ),
      contentPosition: 'end',
      key: 'message-id-10',
    }

    this.setState({ messages: [...this.state.messages, message] });
  }



  render() {
    return (
      <Box>
        <Box
          key="fadeIn"
          animation={{ type: "fadeIn", duration: 2000 }}
          height="80vh"
          background="light-1"
          margin="xxsmall"
          gap="small"
          justify="center"
        >
          <ChatBoxHeader />
          <ChatMessageList messages={this.state.messages} />
          <ChatMessageForm onMessage={this.onMessage} />
        </Box>
      </Box>
    )
  }
}

export default ChatBox;