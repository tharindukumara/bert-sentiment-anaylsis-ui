import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Markdown, Paragraph } from 'grommet';
import '../../css/LoaderSpinner.css'


const LoaderSpinner = (props) => {
    return (
        <Box size="medium" pad="medium"> 
            <div class="loader">
        <div class="loader-inner line-scale-party">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
        </Box>
        

    )
}

export default LoaderSpinner;
