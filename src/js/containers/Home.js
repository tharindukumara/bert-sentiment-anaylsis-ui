import React from 'react';

import { Anchor, Button, Box, Image, Paragraph, Text, TextArea } from 'grommet';
import { Github, Slack, Twitter } from 'grommet-icons';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import { Avatar, Chat, Divider, Provider, themes } from '@fluentui/react-northstar'
import Header from '../components/Header'
import Section from '../components/Section';
import ChatBox from '../components/ChatBox';
import Controllers from '../components/Media';

class Home extends React.Component {
    render() {
        return (
            <Box>
                <Section>
                    <Box direction="row-responsive" justify="center" gap="xlarge">
                        <Box width="100%" justify="center">
                            <Header
                                label="Olivia Sentiment Bot"
                                size=""
                                summary="Sentiment Analysis is the process of determining whether a piece of writing is positive, negative or neutral."
                            />
                            <Controllers />
                        </Box>
                        <Box width="xlarge" background="light-2" pad="small" elevation="medium">
                            <ChatBox />
                        </Box>
                    </Box>
                </Section>
            </Box>
        )
    }
}

export default Home;