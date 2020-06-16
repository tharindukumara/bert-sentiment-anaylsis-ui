import React from 'react';

import { Box } from 'grommet';
import { Chat } from '@fluentui/react-northstar'
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';
import LoaderSpinner from './LoadSpinner';
import { getPositiveFeedback, getNegativeFeedback, getNeutralPositiveFeedback, getNeutralNegativeFeedback } from '../lib/ChatAPI'
import BarChat from './BarChart';
import { createChatMessage } from './ChatMessage';
import UserOptions from './UserOptions';


const CONFIG = {
  GUTTER: "chatbot.png",
  SERVER_IP_ADDR: "http://127.0.0.1:5000"
}

const APIS = {
  SENTIMENT_PREDICT: "/sentiment/predict"
}


class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatItems: 0,
      loading: false,
      messages: []
    }

    this.postiveValue = 0
    this.negativeValue = 0

    this.loadInitialMessages();
  }

  updateState = (states) => {
    this.setState({ messages: [...this.state.messages, ...states] });
  }


  loadInitialMessages = async () => {
    await createChatMessage({ content: "Hello", avatar: CONFIG.GUTTER, attached: false })
      .then(data => {
        this.updateState([data])
      })

    await createChatMessage({ content: "I am Olivia.", delay: true})
      .then(data => {
        this.updateState([data])
      })

      ;
    await createChatMessage({ content: "I can detect sentiments in your messages." , delay: true})
      .then((data) => {
        this.updateState([data])
      });
  }

  onClickNo = () => {
    this.state.messages.pop()
    var tryAgain = createChatMessage({ content: "Ok. Wanna try again?", loader: false, mine: true, attached: false, contentPosition: "end" });
    this.setState({ messages: [...this.state.messages, tryAgain] });
  }

  onClickYes = () => {
    this.state.messages.pop()
    var barChart = <BarChat positive={this.postiveValue * 1000} negative={this.negativeValue * 1000} />
    var barChartMsg = createChatMessage({ content: barChart });

    this.setState({ messages: [...this.state.messages, barChartMsg] });

    this.postiveValue = 0
    this.negativeValue = 0
  }

  onPostResponse = () => {
    setTimeout(() => {
      var loadCharts = createChatMessage({ content: "You want see the charts?" })
      this.setState({ messages: [...this.state.messages, loadCharts] });

      setTimeout(() => {
        var loadChartsYesOrNo = createChatMessage({
          content: (<UserOptions onClickYes={this.onClickYes} onClickNo={this.onClickNo} />)
        })
        this.setState({ messages: [...this.state.messages, loadChartsYesOrNo] });
      }, 1000);
    }, 1000);
  }

  onErrorResponse = () => {
    console.log('error occurred');
    var feedback = createChatMessage({ content: "Hmmm... Something is wrong.", avatar: CONFIG.GUTTER, attached: false })
    this.setState({ messages: [...this.state.messages, feedback] });
  }

  onServerData = (data) => {
    var negativeValue = data.response.negative
    var positiveValue = data.response.positive
    this.state.messages.pop()

    var feedbackContent = ""
    if (positiveValue >= negativeValue) {
      feedbackContent = getPositiveFeedback()
      if (Math.abs(positiveValue - negativeValue) <= 1) {
        feedbackContent = getNeutralPositiveFeedback()
      }
    } else {
      feedbackContent = getNegativeFeedback()
      if (Math.abs(positiveValue - negativeValue) <= 1) {
        feedbackContent = getNeutralNegativeFeedback()
      }
    }

    var feedback = createChatMessage({ content: feedbackContent, avatar: CONFIG.GUTTER, attached: false })
    this.setState({ messages: [...this.state.messages, feedback] });

    this.negativeValue = negativeValue;
    this.positiveValue = positiveValue;
    this.onPostResponse();
  }

  onServerCall = (data) => {
    fetch(CONFIG.APIS + APIS.SENTIMENT_PREDICT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "sentence": data })
    })
      .then(response => {
        if (!response.ok) {
          this.onErrorResponse();
        }
        return response.json()
      }).then(data => {
        this.onServerData(data);
      })
  }

  onUserInput = msg => {
    var inputMsg = createChatMessage({ content: msg, loader: false, mine: true, attached: false, contentPosition: "end" });
    var loader = createChatMessage({ content: <LoaderSpinner />, attached: false });

    this.setState({ messages: [...this.state.messages, inputMsg, loader] });

    this.onServerCall(msg);
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
          <ChatMessageForm onMessage={this.onUserInput} />
        </Box>
      </Box>
    )
  }
}

export default ChatBox;