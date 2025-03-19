import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const goSearch = () => {
    navigate("/search");
  };
  return (
    <div>
      <div>
        <h1>title</h1>
        <p>paragraph</p>
        <button onClick={goSearch}>search</button>
      </div>
      <div>dog</div>
    </div>
  );
};

export default Home;
