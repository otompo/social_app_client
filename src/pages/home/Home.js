import Stories from "../../components/stories/Stories";
import "./home.scss";
import PostCard from "../../components/postCard/PostCard";

function Home(props) {
  return (
    <div className="home">
      <Stories />
      <PostCard />
    </div>
  );
}

export default Home;
