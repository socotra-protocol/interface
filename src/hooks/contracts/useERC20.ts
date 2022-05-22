import { formatFixed, parseFixed } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import ERC20ABI from "../../abis/ERC20abi.json";
import { TokenType } from "../useCovalent";

export const useERC20 = () => {
  const { library, active, chainId, account } = useWeb3React();

  const getContract = (address: string) => {
    if (!active || !chainId) return;

    // const provider = new ethers.providers.JsonRpcProvider(
    //   process.env.REACT_APP_INFURA
    // )
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
  ): Promise<TokenType> => {
    const ethcallProvider = new Provider(provider);
    await ethcallProvider.init();

    // const contractCalls = accounts.map(account => compoundContract.getAccountLiquidity(account.id))
    const tokenContract = await getContract(erc20Address);
    const contractCalls = [];
    if (tokenContract) {
      contractCalls.push([
        tokenContract.symbol(),
        tokenContract.balanceOf(account),
        tokenContract.name(),
        tokenContract.decimal(),
        tokenContract.totalSupply(),
      ]);
      const results = await ethcallProvider.all(contractCalls);
    }

    let _balanceManagerAddr = null;
    if (managerAddr) {
      _balanceManagerAddr = await balanceOf(_balance, managerAddr!);
    }

    console.log({
      symbol: _symbol,
      balance: formatFixed(_balance, _decimals),
      name: _name,
      decimals: _decimals,
      address: erc20Address,
      logo: "",
      totalSupply: Number(formatFixed(_totalSupply, _decimals)).toFixed(),
      branchBalance: formatFixed(_balanceManagerAddr, _decimals),
    });
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
