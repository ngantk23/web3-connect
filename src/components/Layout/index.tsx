import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
export default function Layout() {
  return (
    <SLayout>
      <Navbar />
    </SLayout>
  );
}
const SLayout = styled.div``;
