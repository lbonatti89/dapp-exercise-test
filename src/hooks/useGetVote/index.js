import { useContractCall } from '@usedapp/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../constants/commons';
import { utils } from 'ethers';

export function useGetVote(userAddress) {
  const [vote] =
    useContractCall(
      userAddress && {
        abi: new utils.Interface(CONTRACT_ABI),
        address: CONTRACT_ADDRESS,
        method: 'getVote',
        args: [userAddress],
      },
    ) ?? [];

  return vote?._isBigNumber && vote.toNumber();
}
