import { useContractFunction } from '@usedapp/core';

export function useVoteAction() {
  const { state, send } = useContractFunction(window.__CONTRACT_INSTANCE__, 'vote');
  return { state, send };
}

export function useGetVote() {
  const { state, send } = useContractFunction(window.__CONTRACT_INSTANCE__, 'getVote');
  return { state, send };
}
