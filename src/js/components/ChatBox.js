import React from 'react';

import { Box } from 'grommet';
import { Avatar, Chat } from '@fluentui/react-northstar'
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';
import ChatMessageWrapper from './ChatMessageWrapper';

import { getPositiveFeedback, getNegativeFeedback, neutralPositiveFeedback, neutralNegativeFeedback } from '../lib/ChatAPI'
import BarChat from './BarChart';
import { createChatMessage } from './ChatMessage';

var oliviaAvatar = {
  image: "chatbot.png"
};

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatItems: 0,
      loading: false,
      messages: [createChatMessage({ content: "Hello", avatar: "chatbot.png", attached: false })]
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

    var message = {
      message: (
        <Chat.Message content={<ChatMessageWrapper loading={false} content={msg} />} author="John Doe" timestamp="Today, 11:15 PM" mine />
      ),
      contentPosition: 'end',
      key: 'message-id-10',
    }

    var sss = {
      message: (
        <Chat.Message
          content={<ChatMessageWrapper loading={true} />}
          author="Olivia"
          timestamp="Yesterday, 10:15 PM" />
      ),
      contentPosition: 'start',
      attached: true,
      key: 'message-id-4',
    }
    this.setState({ messages: [...this.state.messages, message, sss] });



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
          console.log('errot');
        }
        return response.json()
      }).then(data => {
        console.log(data)
        var negative = data.response.negative
        var positive = data.response.positive

        this.state.messages.pop()

        if (positive >= negative) {
          var barChart = <BarChat positive={positive * 1000} negative={negative * 1000} />
          let pos = {
            message: (
              <Chat.Message content={getPositiveFeedback()} author="Olivia" timestamp="Today, 11:15 PM" style={{ width: "100%" }} className="barchart" />
            ),
            contentPosition: 'start',
            key: 'message-id-10',
          }
          this.setState({ messages: [...this.state.messages, pos] });


          setInterval(() => {

            if (chartsLoaded == false) {
              let loadCharts = {
                message: (
                  <Chat.Message content={"You want see the charts?"} author="Olivia" timestamp="Today, 11:15 PM" style={{ width: "100%" }} className="barchart" />
                ),
                contentPosition: 'start',
                key: 'message-id-10',
              }
              this.setState({ messages: [...this.state.messages, loadCharts] });
              chartsLoaded = true
              var loadChartsAnswsrs = "Yes or No"
              let loadChartsYes = {
                message: (
                  <Chat.Message content={loadChartsAnswsrs} author="Olivia" timestamp="Today, 11:15 PM" style={{ width: "100%" }} className="barchart" />
                ),
                contentPosition: 'start',
                key: 'message-id-10',
              }
              this.setState({ messages: [...this.state.messages, loadChartsYes] });



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