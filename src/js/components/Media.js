import React from 'react';

import { Anchor, Box, Text } from 'grommet';
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
            href="https://github.com/tharindukumara/bert-sentiment-analysis"
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