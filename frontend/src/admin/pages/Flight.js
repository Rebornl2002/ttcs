import Sidenav from '../component/Sidenav';
import Navbar from '../component/Navbar';

import Box from '@mui/material/Box';

function Flight() {
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Day la trang flight</h1>
                </Box>
            </Box>
        </>
    );
}

export default Flight;