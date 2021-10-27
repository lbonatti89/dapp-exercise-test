import React, { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import './styles.scss';
import { Alert, Button, Snackbar } from '@mui/material';

const errorScreenTime = 4000;

function ConnectToWalletButton() {
  const [activeError, setActiveError] = useState();
  const { activateBrowserWallet, account, deactivate, error } = useEthers();

  async function connect() {
    try {
      await activateBrowserWallet();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    if (error) {
      setActiveError(error);
    }
  }, [error]);

  return (
    <div>
      <div>
        {!account && (
          <Button variant="contained" onClick={connect}>
            Connect your wallet
          </Button>
        )}
        {account && (
          <Button variant="outlined" onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        key={activeError?.name}
        open={!!activeError}
        autoHideDuration={errorScreenTime}
        onClose={() => setActiveError(null)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {activeError?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ConnectToWalletButton;
