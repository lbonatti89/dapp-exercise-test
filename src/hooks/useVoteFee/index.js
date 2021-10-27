import { useContractCall } from '@usedapp/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../constants/commons';
import { utils } from 'ethers';

export function useVoteFee() {
  const [voteFee] =
    useContractCall({
      abi: new utils.Interface(CONTRACT_ABI),
      address: CONTRACT_ADDRESS,
      method: 'VOTE_FEE',
      args: [],
    }) ?? [];

  return voteFee;
}
