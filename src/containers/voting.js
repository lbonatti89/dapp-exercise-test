import React, { useEffect, useState } from 'react';
import { useVotesCount } from '../hooks/useVotesCount';
import { useVoteFee } from '../hooks/useVoteFee';
import { useVoteAction } from '../hooks/useVoteAction';
import { BigNumber } from 'ethers';
import { VOTE_VALUE } from '../constants/commons';
import { useGetVote } from '../hooks/useGetVote';
import { useEthers } from '@usedapp/core';
import { Box, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const VotingContainer = () => {
  const { account } = useEthers();
  const hasVote = useGetVote(account);
  const [voteState, setVoteState] = useState();
  const [isLoading, setIsLoading] = useState();
  const currentVotes = useVotesCount();
  const voteFee = useVoteFee();

  const { state, send } = useVoteAction();

  const isDisabled = !!hasVote || !account;

  const buttonTooltipTitle = () => {
    if (!account) {
      return 'You need connect a wallet to vote';
    }

    if (hasVote === VOTE_VALUE.yes || hasVote === VOTE_VALUE.no) {
      return `You have already voted for ${hasVote === VOTE_VALUE.yes ? 'yes' : 'no'}. You cannot vote again.`;
    }

    return '';
  };

  useEffect(() => {
    if (!state) return;
    if (state.status !== voteState?.status) {
      setVoteState(state);
      setTimeout(() => {
        setVoteState(false);
      }, 6000);
    }
  }, [state]);

  const setVote = async (voteValue) => {
    if (isDisabled) return null;
    setIsLoading(true);
    await send(BigNumber.from(voteValue), { value: voteFee });
    setIsLoading(false);
  };

  return (
    <div>
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 'calc(100vh - 64px)',
          justifyContent: 'center',
          '& section': {
            marginLeft: 'auto',
            marginRight: 'auto',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box component="section">
          <Tooltip title="Current votes for YES" placement="top">
            <Typography component="center" variant="h1" sx={{ color: 'success.main' }}>
              {!isNaN(currentVotes.yes) ? currentVotes.yes : 0}
            </Typography>
          </Tooltip>
          <Tooltip title={buttonTooltipTitle()}>
            <span>
              <LoadingButton
                loading={isLoading}
                variant="outlined"
                size="large"
                onClick={() => setVote(VOTE_VALUE.yes)}
                disabled={isDisabled}
              >
                Vote for YES
              </LoadingButton>
            </span>
          </Tooltip>
        </Box>

        <Box component="section">
          <Tooltip title="Current votes for NO" placement="top">
            <Typography component="center" variant="h1" sx={{ color: 'error.main' }}>
              {!isNaN(currentVotes.no) ? currentVotes.no : 0}
            </Typography>
          </Tooltip>

          <Tooltip title={buttonTooltipTitle()}>
            <span>
              <LoadingButton
                loading={isLoading}
                variant="outlined"
                size="large"
                onClick={() => setVote(VOTE_VALUE.no)}
                disabled={isDisabled}
              >
                Vote for NO
              </LoadingButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default VotingContainer;
