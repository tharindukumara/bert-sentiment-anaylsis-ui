import React from 'react';

import { Anchor, Button, Box, Image, Paragraph, Text, TextArea } from 'grommet';
import { Github, Slack, Twitter } from 'grommet-icons';


export default () => (
    <Box
        direction="row"
        gap="large"
        justify="center"
        margin={{ vertical: 'medium' }}
    >
        <Anchor
            target="_blank"
            a11yTitle="Follow us on Twitter"
            href="https://twitter.com/grommet_io"
            icon={<Twitter color="brand" size="large" />}
            label={<Text size="large"></Text>}
        />
        <Anchor
            target="_blank"
            a11yTitle="Share feedback on Github"
            href="https://github.com/grommet/grommet"
            icon={<Github color="brand" size="large" />}
            label={<Text size="large"></Text>}
        />
        <Anchor
            target="_blank"
            a11yTitle="Chat with us on Slack"
            href="https://slackin.grommet.io/"
            icon={<Slack color="brand" size="large" />}
            label={<Text size="large"></Text>}
        />
    </Box>
);