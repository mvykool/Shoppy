import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const goSearch = () => {
    navigate("/search");
  };
  return (
    <div>
      <div className="text-black bg-blue-400 w-full h-20">
        <h1>title</h1>
        <p>paragraph</p>
        <button onClick={goSearch}>search</button>
      </div>
      <div>dog</div>
    </div>
  );
};

export default Home;
