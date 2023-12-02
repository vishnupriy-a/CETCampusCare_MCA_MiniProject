import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q= ` SELECT p.*, u.id AS userId, name, profilePic, COUNT(v.postId) AS upvotesCount
    // FROM posts AS p
    // JOIN users AS u ON u.id = p.userId
    // LEFT JOIN upvotes AS v ON v.postId = p.idx`
    // WHERE p.id != 1 AND p.completed = 0 
    // GROUP BY p.id, u.id, name, profilePic
    // ORDER BY upvotesCount DESC;`;

    const q='SELECT p.*, u.id AS userId, name, profilePic, COUNT(v.postId) AS upvotesCount, COUNT(r.postId) AS reportCount FROM posts AS p JOIN users AS u ON u.id = p.userId LEFT JOIN upvotes AS v ON v.postId = p.id LEFT JOIN reports AS r ON r.postId = p.id WHERE p.id != 1 AND p.completed = 0 GROUP BY p.id, u.id, name, profilePic HAVING reportCount < 5 ORDER BY upvotesCount DESC,p.CreatedAt DESC;';

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
///////////////////////////////////////////////////////////
export const getUserPosts = (req, res) => {
  const { userId } = req.body; // Assuming the form data contains userId

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      SELECT p.*, u.id AS userId, u.name, u.profilePic, COUNT(v.postId) AS upvotesCount, p.completedTime AS completedTime
      FROM posts AS p
      JOIN users AS u ON u.id = p.userId
      LEFT JOIN upvotes AS v ON v.postId = p.id
      WHERE u.id = ${userInfo.id} 
      GROUP BY p.id, u.id, u.name, u.profilePic, p.completedTime
      ORDER BY p.createdAt DESC;
    `;
    
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data);
      return res.status(200).json(data);
    });
  });
};

///////////////////////////////////////////////////////////


export const getResolvedPosts = (req, res) => {
  console.log('reached resolved');
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q= ` SELECT p.*, u.id AS userId, name, profilePic, COUNT(v.postId) AS upvotesCount, p.completedTime AS completedTime
    FROM posts AS p
    JOIN users AS u ON u.id = p.userId
    LEFT JOIN upvotes AS v ON v.postId = p.id
    WHERE p.id != 1 AND p.completed = 1
    GROUP BY p.id, u.id, name, profilePic
    ORDER BY completedTime DESC;
    `;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data);
      return res.status(200).json(data);
    });
  });
};



export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};


export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};


export const completedPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q =
      // "UPDATE posts SET `completed` = 1 WHERE `id`=? AND `userId` = ?";
    const q ="UPDATE posts SET `completed` = 1, `completedTime` = NOW() WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Post has been completed.");
      return res.status(403).json("You can complete only your post");
    });
  });
};

