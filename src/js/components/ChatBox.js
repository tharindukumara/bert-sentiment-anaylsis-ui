import React from 'react';

import { Box } from 'grommet';
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

    await createChatMessage({ content: "I am Olivia.", delay: true })
      .then(data => {
        this.updateState([data])
      })

      ;
    await createChatMessage({ content: "I can detect sentiments in your messages.", delay: true })
      .then((data) => {
        this.updateState([data])
      });
  }

  onClickNo = async () => {
    this.state.messages.pop();

    await createChatMessage({
      content: "Ok. Wanna try again?"
      , loader: false, mine: true, attached: false, contentPosition: "end"
    }).then((data) => {
      this.updateState(data);
    });
  }

  onClickYes = () => {
    this.state.messages.pop()
    var barChart = <BarChat positive={this.postiveValue * 1000} negative={this.negativeValue * 1000} />
    createChatMessage({ content: barChart }).then((data) => {
      this.updateState([data])
    });

    this.postiveValue = 0
    this.negativeValue = 0
  }

  onPostResponse = async () => {
    await createChatMessage({ content: "You want see the charts?" }).then((data) => {
      this.updateState([data])
    });

    await createChatMessage({
      content: (<UserOptions onClickYes={this.onClickYes} onClickNo={this.onClickNo} />)
    }).then((data) => {
      this.updateState([data])
    });
  }

  onErrorResponse = async () => {
    console.log('error occurred');
    await createChatMessage({
      content: "Hmmm... Something is wrong."
      , avatar: CONFIG.GUTTER, attached: false
    })
      .then((data) => {
        this.updateState([data])
      });
  }

  onServerData = async (data) => {
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

    await createChatMessage({ content: feedbackContent, avatar: CONFIG.GUTTER, attached: false })
      .then((data) => {
      this.updateState([data])
    });


    this.negativeValue = negativeValue;
    this.positiveValue = positiveValue;
    this.onPostResponse();
  }

  onServerCall = async (data) => {
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

  onUserInput = async (msg) => {
    await createChatMessage({ content: msg, loader: false, mine: true, attached: false, contentPosition: "end" }).then((data) => {
      this.updateState([data])
    });


    await createChatMessage({ content: <LoaderSpinner />, attached: false }).then((data) => {
      this.updateState([data])
    });

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