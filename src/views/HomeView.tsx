import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const goSearch = () => {
    navigate("/search");
  };
  return (
    <div className="bg-pink-300 px-40 flex h-[calc(100vh-100px)] w-full">
      <div className="text-black w-full flex space-y-5 flex-col mt-40 items-start justify-start">
        <h1 className="text-3xl font-bold">title</h1>
        <p>paragraph</p>
        <button onClick={goSearch}>search</button>
      </div>
      <div>dog</div>
    </div>
  );
};

export default Home;
