import React from 'react';

import { Box, TextArea } from 'grommet';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, Divider, Provider, themes } from '@fluentui/react-northstar'

class ChatBox extends React.Component {
  render() {
    const janeAvatar = {
      image: 'public/images/avatar/small/ade.jpg',
      status: {
        color: 'green',
        icon: <AcceptIcon />,
      },
    };
    const items = [
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
    ];




    return (
      <Box>
        <Box
          key="fadeIn"
          animation={{ type: "fadeIn", duration: 2000 }}
          height="70vh"
          background="light-1"
          margin="xxsmall"
          gap="small"
          justify="center"
        >
          <Box overflow={{ horizontal: "hidden", vertical: "auto" }} >
          <Provider theme={themes.teams}>
            <Chat items={items} />
          </Provider>
        </Box>

        </Box>
        <Box align="center" pad="xsmall">
          <TextArea value="Wradasd" resize={false} />
        </Box>
      </Box>
      
    )
  }
}

export default ChatBox;