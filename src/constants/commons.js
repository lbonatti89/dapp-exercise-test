import contractAby from './contractAbi.json';

export const CONTRACT_ADDRESS = '0xc3394Ab9475Ae8499E3fD58B321ee05120ff414a';
export const CONTRACT_ABI = contractAby;

export const VOTE_VALUE = {
  no: 1,
  yes: 2,
};

// severity = error, warning, success, info
export const NOTIFICATIONS = {
  walletConnected: {
    getLabel: () => 'Your wallet is connected',
    severity: 'success',
  },
  transactionStarted: {
    getLabel: () => 'The transaction is in progress',
    severity: 'info',
  },
  transactionSucceed: {
    getLabel: () => 'The transaction is complete',
    severity: 'success',
  },
  transactionFailed: {
    getLabel: () => 'The transaction failed',
    severity: 'error',
  },
  NoEthereumProviderError: {
    getLabel: () => 'The transaction failed',
    severity: 'error',
  },
};
