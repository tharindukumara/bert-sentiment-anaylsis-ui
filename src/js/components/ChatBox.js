import React from 'react';

import { Box } from 'grommet';
import { Chat } from '@fluentui/react-northstar'
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';

import { getPositiveFeedback, getNegativeFeedback, neutralPositiveFeedback, neutralNegativeFeedback } from '../lib/ChatAPI'
import BarChat from './BarChart';
import { createChatMessage } from './ChatMessage';


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

    var inputMsg = createChatMessage({ content: msg, loading: false, mine: true, attached:false, contentPosition:"end" });

    var loader =  createChatMessage({ loading: true,  attached:false });

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
          console.log('errot');
        }
        return response.json()
      }).then(data => {
        console.log(data)
        var negative = data.response.negative
        var positive = data.response.positive

        this.state.messages.pop()

        if (positive >= negative) {
          
          var feedback = createChatMessage({content:getPositiveFeedback()})
          this.setState({ messages: [...this.state.messages, feedback]});


          setInterval(() => {

            if (chartsLoaded == false) {

              var barChart = <BarChat positive={positive * 1000} negative={negative * 1000} />

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