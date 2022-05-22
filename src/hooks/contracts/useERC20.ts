import { formatFixed, parseFixed } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import ERC20ABI from "../../abis/ERC20abi.json";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";

import { TokenType } from "../useCovalent";

export const useERC20 = () => {
  const { library, active, chainId, account } = useWeb3React();

  const getContract = (address: string) => {
    if (!active || !chainId) return;

    const provider = new ethers.providers.Web3Provider(library.provider);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, ERC20ABI, signer);
    return contract;
  };

  const decimals = async (erc20Address: string) => {
    const contract = await getContract(erc20Address);
    if (contract) {
      return await contract.decimals();
    }
    return null;
  };
  const name = async (erc20Address: string) => {
    const contract = await getContract(erc20Address);
    if (contract) {
      return await contract.name();
    }
    return null;
  };
  const balanceOf = async (erc20Address: string, addr?: string) => {
    const contract = await getContract(erc20Address);
    if (contract) {
      return await contract.balanceOf(addr || account);
    }
    return null;
  };
  const symbol = async (erc20Address: string) => {
    const contract = await getContract(erc20Address);
    if (contract) {
      return await contract.symbol();
    }
    return null;
  };
  const totalSupply = async (erc20Address: string) => {
    const contract = await getContract(erc20Address);
    if (contract) {
      return await contract.totalSupply();
    }
    return null;
  };

  const approve = async (
    erc20Address: string,
    spenderAddress: string,
    amount: string,
    decimal = 18
  ) => {
    const contract = await getContract(erc20Address);
    if (contract) {
      const tx = await contract.approve(
        spenderAddress,
        parseFixed(amount, decimal).toString()
      );
      await tx.wait();
    }
  };

  const tokenInfo = async (
    erc20Address: string,
    managerAddr?: string
  ): Promise<any> => {
    try {
      const provider = new ethers.providers.Web3Provider(library.provider);
      // you can use any ethers provider context here this example is
      // just shows passing in a default provider, ethers hold providers in
      // other context like wallet, signer etc all can be passed in as well.
      const multicall = new Multicall({
        ethersProvider: provider,
        tryAggregate: true,
      });
      console.log(erc20Address);
      const contractCallContext: ContractCallContext[] = [
        {
          reference: "token",
          contractAddress: erc20Address,
          abi: ERC20ABI,
          calls: [
            { reference: "symbol", methodName: "symbol", methodParameters: [] },
            {
              reference: "balanceAccount",
              methodName: "balanceOf",
              methodParameters: [account],
            },
            { reference: "name", methodName: "name", methodParameters: [] },
            {
              reference: "decimals",
              methodName: "decimals",
              methodParameters: [],
            },
            {
              reference: "totalSupply",
              methodName: "totalSupply",
              methodParameters: [],
            },
            {
              reference: "balanceManager",
              methodName: "balanceOf",
              methodParameters: [managerAddr],
            },
          ],
        },
      ];

      const results: ContractCallResults = await multicall.call(
        contractCallContext
      );

      const _symbol =
        results.results.token.callsReturnContext[0].returnValues[0];

      const _balance =
        results.results.token.callsReturnContext[1].returnValues[0];

      const _name = results.results.token.callsReturnContext[2].returnValues[0];
      const _decimals =
        results.results.token.callsReturnContext[3].returnValues[0];
      const _totalSupply =
        results.results.token.callsReturnContext[4].returnValues[0];
      const _balanceManagerAddr =
        results.results.token.callsReturnContext[5].returnValues[0];

      console.log();
      return {
        symbol: _symbol,
        balance: formatFixed(_balance, _decimals),
        name: _name,
        decimals: _decimals,
        address: erc20Address,
        logo: "",
        totalSupply: Number(formatFixed(_totalSupply, _decimals)).toFixed(),
        branchBalance: formatFixed(_balanceManagerAddr, _decimals),
      };
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getContract,
    approve,
    decimals,
    name,
    balanceOf,
    symbol,
    tokenInfo,
    totalSupply,
  };
};
