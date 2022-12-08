import { useContext, useState } from "react";
import "./comments.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import moment from "moment";
import toast from "react-hot-toast";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  // Mutations
  const mutation = useMutation(
    (newComments) => {
      return makeRequest.post("/comments?postId=" + postId, newComments);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc) {
      toast.error("Enter Description");
      return;
    }
    mutation.mutate({ desc });
    setDesc("");
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilepicture} alt="" />
        <input
          type="text"
          placeholder={`Say something ${currentUser.name}?`}
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something is wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={"/upload/" + comment.profilepicture} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
