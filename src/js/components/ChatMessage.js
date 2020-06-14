import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import LoaderSpinner from './LoadSpinner';

class ChatMessage extends React.Component {
    constructor() {
        super()
        this.state = { isLoading: true }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 800);
    }

    render() {
        if (this.state.isLoading) {
            return (<LoaderSpinner />);
        }


        return (
            <Box animation={{ type: "fadeIn", duration: 1000}}>
                {this.props.content}
            </Box>
        );
    }
}

export default ChatMessage;