import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Markdown, Paragraph } from 'grommet';

const ChatBoxHeader = (props) => {
    return (
        <Box background="brand" height="xsmall" align="center" justify="center">
           <Heading size="small" level="3">Virtual Assitant</Heading>
        </Box>
    )
}

export default ChatBoxHeader;
