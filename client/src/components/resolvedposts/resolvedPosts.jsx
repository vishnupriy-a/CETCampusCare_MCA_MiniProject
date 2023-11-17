import ResolvedPost from "../resolvedpost/resolvedPost";
import "./resolvedposts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const ResolvedPosts = ({userId}) => {
  const { isLoading, error, data } = useQuery(["resolvedposts"], () =>
    makeRequest.get("/posts/resolved").then((res) => {
      console.log(res);
      return res.data;
    }),
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <ResolvedPost post={post} key={post.id} />)}
    </div>
  );
};

export default ResolvedPosts;