import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SendToken from "../components/SendToken";
import MyNavbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <MyNavbar />
      <SendToken />
    </>
  );
};

export default Home;
