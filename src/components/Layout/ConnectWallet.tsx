import { useEffect, useState } from "react";

import Web3Modal from "web3modal";
import Core from "web3modal";
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import styled from "styled-components";
const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Web 3 Modal Demo", // Required
      infuraId: "c22c90a767684c5fbd7257da57802b35", // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "c22c90a767684c5fbd7257da57802b35", // required
    },
  },
};
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

// --------
export default function ConnectWallet() {
  //   const [web3Modal, setWeb3Modal] = useState<Core>();
  //   const [provider, setProvider] = useState();
  const [account, setAccount] = useState<string>();
  const [network, setNetwork] = useState<ethers.providers.Network>();
  const [balance, setBalance] = useState<any>();

  //   ----------
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setNetwork(network);
      //   setProvider(provider);
      if (accounts) setAccount(accounts[0]);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  const disconnectWallet = async () => {
    await web3Modal?.clearCachedProvider();
    // setProvider(undefined);
    setAccount(undefined);
    setBalance(undefined);
    setNetwork(undefined);
  };

  //   useEffect(() => {
  //     if (provider && provider?.on) {
  //       const handleAccountsChanged = (accounts:any) => {
  //         console.log("accountsChanged", accounts);
  //         if (accounts) setAccount(accounts[0]);
  //       };

  //       const handleDisconnect = () => {
  //         console.log("disconnect", error);
  //         disconnect();
  //       };

  //       provider.on("accountsChanged", handleAccountsChanged);
  //       provider.on("chainChanged", handleChainChanged);
  //       provider.on("disconnect", handleDisconnect);

  //       return () => {
  //         if (provider.removeListener) {
  //           provider.removeListener("accountsChanged", handleAccountsChanged);
  //           provider.removeListener("chainChanged", handleChainChanged);
  //           provider.removeListener("disconnect", handleDisconnect);
  //         }
  //       };
  //     }
  //   }, [provider]);

  //   useEffect(() => {
  //     const providerOptions = {
  //       walletlink: {
  //         package: CoinbaseWalletSDK, // Required
  //         options: {
  //           appName: "Web 3 Modal Demo", // Required
  //           infuraId: "c22c90a767684c5fbd7257da57802b35", // Required unless you provide a JSON RPC url; see `rpc` below
  //         },
  //       },
  //       walletconnect: {
  //         package: WalletConnectProvider, // required
  //         options: {
  //           // infuraId: "c22c90a767684c5fbd7257da57802b35", // required
  //           rpc: {
  //             56: "https://bsc-dataseed.binance.org/",
  //           },
  //           network: "binance",
  //           // chainId: 56,
  //         },
  //       },
  //     };

  //     const newWeb3Modal = new Web3Modal({
  //       cacheProvider: true,
  //       providerOptions,
  //     });

  //     setWeb3Modal(newWeb3Modal);
  //   }, []);
  //   async function connectWallet() {
  //     const provider = await web3Modal?.connect();
  //     setProvider(provider);
  //     const library = new ethers.providers.Web3Provider(provider);
  //     const accounts = await library.listAccounts();
  //     setAccount(accounts[0]);
  //     const network = await library.getNetwork();
  //     setNetwork(network);
  //   }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_getBalance",
          params: [account, "latest"],
        })
        .then((balance: any) => {
          setBalance(ethers.utils.formatEther(balance));
        });
    } else {
    }
  }, [account]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, []);
  return (
    <SConnectWallet>
      {account ? (
        <div className="disconnect-btn button">
          {`${account.slice(0, 4)}....${account.slice(-4)}`}

          <ul className="sub-menu">
            <li>Network: {network?.name}</li>
            <li>
              Balance: {Number.parseFloat(balance).toFixed(4) || 0}{" "}
              {network?.name}
            </li>
            <li onClick={disconnectWallet}>Logout</li>
          </ul>
        </div>
      ) : (
        <div className="connect-btn button" onClick={connectWallet}>
          Connect
        </div>
      )}
      {/* <div>Account: {account}</div>
      <div>Network: {network?.name}</div>
      <div>
        Balance: {balance || 0} {network?.name}
      </div> */}
    </SConnectWallet>
  );
}

const SConnectWallet = styled.div`
  .button {
    border-radius: 10px;
    height: 50px;
    cursor: pointer;
    &.disconnect-btn {
      border: 1px solid rgb(31, 155, 247);
      background-color: transparent;
      color: #1f9bf7;
      font-weight: 500;
      font-size: 20px;
      padding: 10px;
    }
    &.connect-btn {
      background-color: #1f9bf7;
      color: white;
      border-radius: 4px;
      border: unset;
      font-weight: 600;
      font-size: 18px;
      text-decoration: unset;
      padding: 10px 15px;
    }
  }
  .sub-menu {
    background-color: pink;
    display: none;
    position: absolute;
    font-size: 16px;
    min-width: 200px;
    right: 0;
    top: 50px;
    border-radius: 10px;
    list-style: none;
    padding: 10px 15px;
    li {
      &:hover {
        color: white;
      }
    }
  }
  .disconnect-btn {
    position: relative;
    &::after {
      position: absolute;
      top: 48px;
      right: 0;
      height: 20px;
      width: 200px;
      background-color: transparent;
      display: block;
      content: "";
    }
    &:hover {
      .sub-menu {
        display: block;
      }
    }
  }
`;
