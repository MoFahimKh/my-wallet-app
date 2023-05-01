import "bootstrap/dist/css/bootstrap.min.css";
import SendTransactions from "../components/SendToken";
import MyNavbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <MyNavbar />
      <SendTransactions />
    </>
  );
};

export default Home;
