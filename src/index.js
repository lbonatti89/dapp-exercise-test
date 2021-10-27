import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import { ChainId, DAppProvider } from '@usedapp/core';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Contract, utils } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants/commons';

const dAppProviderConfig = {
  supportedChainIds: [ChainId.Rinkeby],
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: { [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/1c20baa263d44a4bb7b3ee8a6f909147' },
  notifications: {
    expirationPeriod: 6000,
  },
  pollingInterval: 8000,
};

const appUITheme = createTheme({
  palette: {
    mode: 'dark',
  },
  shape: {
    borderRadius: 50,
  },
});

window.__CONTRACT_INSTANCE__ = new Contract(CONTRACT_ADDRESS, new utils.Interface(CONTRACT_ABI));

ReactDOM.render(
  <DAppProvider config={dAppProviderConfig}>
    <ThemeProvider theme={appUITheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </DAppProvider>,
  document.getElementById('root'),
);
