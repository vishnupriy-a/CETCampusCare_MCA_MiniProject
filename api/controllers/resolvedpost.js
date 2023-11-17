import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getResolvedPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q= ` SELECT p.*, u.id AS userId, name, profilePic, COUNT(v.postId) AS upvotesCount
    FROM posts AS p
    JOIN users AS u ON u.id = p.userId
    LEFT JOIN upvotes AS v ON v.postId = p.id
    WHERE p.id != 1 AND p.completed = 1
    GROUP BY p.id, u.id, name, profilePic
    ORDER BY upvotesCount DESC;`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
