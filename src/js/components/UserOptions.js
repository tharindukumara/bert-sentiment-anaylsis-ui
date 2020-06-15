import React from 'react';
import { Box, Button } from 'grommet';


const UserOptions = (onClickYes, onClickNo) => {
    return (
        <Box gap="xxsmall">
            <Button hoverIndicator="light-2" size="small" label="Yes" onClick={onClickYes} />
            <Button hoverIndicator="light-2" size="small" label="No" onClick={onClickNo} />
        </Box>
    );
}

export default UserOptions;
