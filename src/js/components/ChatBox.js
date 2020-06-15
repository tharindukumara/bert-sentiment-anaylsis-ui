import React from 'react';

import { Box, Button, Text } from 'grommet';
import { Chat } from '@fluentui/react-northstar'
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';
import LoaderSpinner from './LoadSpinner';
import { getPositiveFeedback, getNegativeFeedback, neutralPositiveFeedback, neutralNegativeFeedback } from '../lib/ChatAPI'
import BarChat from './BarChart';
import { createChatMessage } from './ChatMessage';
import UserOptions from './UserOptions';

var config = {
  gutter: "chatbot.png"
}

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatItems: 0,
      loading: false,
      messages: [createChatMessage({ content: "Hello", avatar: config.gutter, attached: false })]
    }
    this.loadInitialMessages();

  }

  loadInitialMessages = () => {
    setTimeout(() => {
      var firstResponse = createChatMessage({ content: "I am Olivia." });
      this.setState({
        messages: [...this.state.messages, firstResponse],
        chatItems: this.state.chatItems + 1
      });

      setTimeout(() => {
        var secondResponse = createChatMessage({ content: "I can detect sentiments in your messages." });
        this.setState({
          messages: [...this.state.messages, secondResponse],
          chatItems: this.state.chatItems + 1
        });
      }, 1500);
    }, 1500);
  }


  onMessage = msg => {
    console.log("on message")
    console.log(JSON.stringify({ "sentence": msg }));

    var inputMsg = createChatMessage({ content: msg, loader: false, mine: true, attached: false, contentPosition: "end" });

    var loader = createChatMessage({ content: <LoaderSpinner />, attached: false });

    this.setState({ messages: [...this.state.messages, inputMsg, loader] });

    var chartsLoaded = false;

    fetch("http://127.0.0.1:5000/sentiment/predict", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "sentence": msg })
    })
      .then(response => {
        if (!response.ok) {
          console.log('error occurred');
        }
        return response.json()
      }).then(data => {
        var negative = data.response.negative
        var positive = data.response.positive
        this.state.messages.pop()
        if (positive >= negative) {

          var feedback = createChatMessage({ content: getPositiveFeedback(), avatar: config.gutter, attached: false })
          this.setState({ messages: [...this.state.messages, feedback] });

          setTimeout(() => {
            if (chartsLoaded == false) {
              var loadCharts = createChatMessage({ content: "You want see the charts?" })
              this.setState({ messages: [...this.state.messages, loadCharts] });

              setTimeout(() => {
                var loadChartsYesOrNo = createChatMessage({ 
                    content: (<UserOptions />) 
                  })
                this.setState({ messages: [...this.state.messages, loadChartsYesOrNo] });


                var barChart = <BarChat positive={positive * 1000} negative={negative * 1000} />
                chartsLoaded = true
              }, 1000);


            }
          }, 1000);
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
      })
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
          width='large'
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