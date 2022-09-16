import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Clear from '@mui/icons-material/Clear';

import { styled } from '@mui/material/styles';

import parchmentBackground from '../../assets/parchment.jpg';

const TitleBar = styled(Box)(({ theme }) => ({
    WebkitAppRegion: 'drag',
    height: 30,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
}));

const DraggableViewBase = ({ children, title }) => {
    return (
        <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <TitleBar>
                <Grid sx={{ height: '100%' }} container>
                    <Grid display="flex" justifyContent="center" alignItems="center" xs={4} />
                    <Grid display="flex" justifyContent="center" alignItems="center" xs={4}>
                        <Typography variant="body2">{title}</Typography>
                    </Grid>
                    <Grid
                        sx={{ pr: 1 }}
                        display="flex"
                        justifyContent="right"
                        alignItems="center"
                        xs={4}
                    >
                        <IconButton
                            sx={{ WebkitAppRegion: 'no-drag' }}
                            color="inherit"
                            size="small"
                            onClick={() => window.close()}
                        >
                            <Clear color="inherit" fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
            </TitleBar>
            <Box
                sx={{
                    height: 'calc(100vh - 30px)',
                    maxHeight: 'calc(100vh - 30px)',
                    overflow: 'auto',
                    backgroundImage: `url(${parchmentBackground})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default DraggableViewBase;
