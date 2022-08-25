import React from "react";
import styled from "styled-components";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  return (
    <SNavbar>
      <span>Web3</span>
      <ConnectWallet />
    </SNavbar>
  );
}

const SNavbar = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: #102136;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  font-weight: 600;
  color: white;
`;
