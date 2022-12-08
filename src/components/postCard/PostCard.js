import Posts from "../posts/Posts";
import "./postcard.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Share from "../share/Share";

const PostCard = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <>
      <Share />
      <div className="posts">
        {error
          ? "something went wrong"
          : isLoading
          ? "loading"
          : data.map((post) => <Posts post={post} key={post.id} />)}
      </div>
    </>
  );
};

export default PostCard;
