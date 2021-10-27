import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import ConnectToWalletButton from '../ConnectWalletButton';
import AddressModal from '../AddressModal';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <p>Voting dApp</p>
          <Box component="div" sx={{ marginLeft: 'auto', marginRight: '20px' }}>
            <AddressModal />
          </Box>
          <Box component="div">
            <ConnectToWalletButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
