import React from 'react';

import { Box } from 'grommet';

import { ChatBot } from '@fluentui/react-icons-northstar';
import { Avatar, Chat } from '@fluentui/react-northstar'
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';

import { getPositiveFeedback, getNegativeFeedback } from '../lib/ChatAPI'
import BarChat from './BarChart';

var oliviaAvatar = {
  image: "chatbot.png"
};

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: true,
      messages: [{
        gutter: <Avatar {...oliviaAvatar} />,
        message: (
          <Chat.Message
            content="Hello"
            author="Olivia" timestamp="Yesterday, 10:15 PM" />
        ),
        contentPosition: 'start',
        key: 'message-id-1',
      },
      {
        message: (
          <Chat.Message
            content="I am Olivia."
            author="John Doe"
            timestamp="Yesterday, 10:15 PM" />
        ),
        contentPosition: 'start',
        attached: true,
        key: 'message-id-2',
      },
      {
        message: (
          <Chat.Message
            content="I can detect the sentiments in the text that you are going to type."
            author="John Doe"
            timestamp="Yesterday, 10:15 PM" />
        ),
        contentPosition: 'start',
        attached: true,
        key: 'message-id-3',
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

          />
        ),
        contentPosition: 'end',
        attached: 'bottom',
        key: 'message-id-4',
      }]
    }


  }


  onMessage = msg => {
    console.log("on message")
    console.log(JSON.stringify({ "sentence": msg }));
    fetch("http://127.0.0.1:5000/sentiment/predict", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "sentence": msg })
    })
      .then(response => {
        if (!response.ok) {
          console.log('errot');
        }
        return response.json()
      }).then(data => {
        console.log(data)
        // let a = { content: JSON.stringify(data) }
        var negative = data.response.negative
        var positive = data.response.positive

        if (positive >= negative) {
          var barChart = <BarChat positive={920} negative={120} />
          let pos = {
            message: (
              <Chat.Message content={barChart} author="Olivia" timestamp="Today, 11:15 PM" />
            ),
            contentPosition: 'start',
            key: 'message-id-10',
          }

          this.setState({ messages: [...this.state.messages, pos] });

        } else {
          console.log("negative")
          let pos = {
            message: (
              <Chat.Message content={getNegativeFeedback()} author="Olivia" timestamp="Today, 11:15 PM" />
            ),
            contentPosition: 'end',
            key: 'message-id-10',
          }

          this.setState({ messages: [...this.state.messages, pos] });
        }


      });

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
          background="#F3F2F1"
 
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