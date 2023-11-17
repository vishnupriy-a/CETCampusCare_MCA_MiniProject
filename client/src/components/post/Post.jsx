import "./post.scss";
import ReportIcon from '@mui/icons-material/Report';
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading: likesLoading, error: likesError, data: likesData } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const { isLoading: reportsLoading, error: reportsError, data: reportsData } = useQuery(["reports", post.id], () =>
    makeRequest.get("/reports?postId=" + post.id).then((res) => {
      return res.data;
    })
  );
  

  const queryClient = useQueryClient();

  const likeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  // const queryClients = useQueryClient();
  const reportMutation = useMutation(
    (reported) => {
      if (reported) return makeRequest.delete("/reports?postId=" + post.id);
      return makeRequest.post("/reports", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["reports"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const completedMutation = useMutation(
    (postId) => {
      return makeRequest.post(`/posts/${postId}/complete`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  

  const handleLike = () => {
    likeMutation.mutate(likesData?.includes(currentUser.id), {
      onSuccess: () => {
        // Reload the page
        console.log("upvoted successfully");
        window.location.reload();
      },
    });
  };

  const handleReport = () => {
    reportMutation.mutate(reportsData?.includes(currentUser.id), {
      onSuccess: () => {
        // Reload the page
        console.log("Reported successfully");
        window.location.reload();
      },
    });
  };
    

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleCompleted = () => {
    completedMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>

          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && post.userId === currentUser.id && (
              <>
                <button onClick={handleDelete}>Delete</button>
                <button className="completed" onClick={handleCompleted}>Completed</button>
              </>
            )}

        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">


          <div className="item">
            {likesLoading ? (
              "loading"
            ) : likesData?.includes(currentUser.id) ? (
              <ArrowCircleUpTwoToneIcon
                style={{ color: "green" }}
                onClick={handleLike}
              />
            ) : (
              <ArrowCircleUpIcon onClick={handleLike} />
            )}
            {likesData?.length} Upvotes
          </div>


          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>

          <div className="item">
            {reportsLoading ? (
              "loading"
            ) : reportsData?.includes(currentUser.id) ? (
              <ReportIcon
                style={{ color: "red" }}
                onClick={handleReport}
              />
            ) : (
              <ReportIcon onClick={handleReport} />
            )}
            {reportsData?.length} Reports
          </div>

        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
