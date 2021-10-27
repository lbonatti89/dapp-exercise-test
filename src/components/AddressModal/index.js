import React, { useState } from 'react';
import { getExplorerAddressLink, useEtherBalance, useEthers } from '@usedapp/core';
import { Box, IconButton, Link, Modal, Tooltip, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { formatEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const formatBalance = (balance) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

const AddressModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { account, chainId } = useEthers()
  const balance = useEtherBalance(account);

  if (!account) return null;

  return (
    <>
      <Tooltip title="Your wallet">
        <IconButton onClick={() => setModalOpen(true)}>
          <AccountBalanceWalletIcon />
        </IconButton>
      </Tooltip>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Typography id="account-address" variant="h4">
            Address information
          </Typography>
          <Typography id="account-address" variant="h6">
            Address: {account}
            {window.isSecureContext && (
              <Tooltip title="Copy to clipboard">
                <IconButton onClick={() => navigator.clipboard.writeText(account)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Link href={getExplorerAddressLink(account, chainId)} target="_blank" rel="noopener noreferrer">
              Show on etherscan
            </Link>
          </Typography>
          <br/>
          <Typography id="account-address" variant="h5">
            Your balance
          </Typography>
          <Typography id="account-address" variant="h6">
            ETH: {balance && formatBalance(balance)}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AddressModal;
