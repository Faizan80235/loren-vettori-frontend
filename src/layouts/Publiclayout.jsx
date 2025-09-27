// import React from "react";
// import { Outlet } from "react-router-dom";
// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
// import SearchBar from "../components/SearchBar";

// const PublicLayout = () => (
//   <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//  <div className="mb-23">
//  <NavBar></NavBar>
// </div>
//     <SearchBar />
//     <Outlet />
//     <Footer />
//   </div>
// );

// export default PublicLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";

// Styled component for wrapper
const PageWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }

  @media (min-width: 768px) {
    padding-left: 7vw;
    padding-right: 7vw;
  }

  @media (min-width: 1024px) {
    padding-left: 9vw;
    padding-right: 9vw;
  }
`;

// Styled component for NavBar wrapper
const NavBarWrapper = styled.div`
  margin-top: 78px; // ✅ Apply your desired margin here (px/rem/%)
`;

const PublicLayout = () => (
  <PageWrapper>
    <NavBarWrapper>
      <NavBar />
    </NavBarWrapper>
    <SearchBar />
    <Outlet />
    <Footer />
  </PageWrapper>
);

export default PublicLayout;
