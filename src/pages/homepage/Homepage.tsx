import useAuth from "@hooks/useAuth";

const Homepage = () => {
  const { auth } = useAuth();
  return <div style={{ color: "red" }}> heyyyyyyyyyyyyyyyyyyyyyy
  </div>;
};

export default Homepage;
