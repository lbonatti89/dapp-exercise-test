import { useContractCall } from '@usedapp/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../constants/commons';
import { utils } from 'ethers';

/**
 * Get current votes (yes and no) count from smartContract
 * @returns {{no: *, yes: *}}
 */
export function useVotesCount() {
  let [votesForYes, votesForNo] = [
    useContractCall({
      abi: new utils.Interface(CONTRACT_ABI),
      address: CONTRACT_ADDRESS,
      method: 'votesForYes',
      args: [],
    }) ?? [],
    useContractCall({
      abi: new utils.Interface(CONTRACT_ABI),
      address: CONTRACT_ADDRESS,
      method: 'votesForNo',
      args: [],
    }) ?? [],
  ];

  return {
    yes: votesForYes[0]?._isBigNumber && votesForYes[0]?.toNumber(),
    no: votesForNo[0]?._isBigNumber && votesForNo[0]?.toNumber(),
  };
}
