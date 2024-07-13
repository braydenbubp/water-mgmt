import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewPostDetails from '../../api/mergedData';
import { getCommentsByPostId } from '../../api/commentData';
import CommentCard from '../../components/CommentCard';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState({});
  const router = useRouter();

  const { postId } = router.query;

  useEffect(() => {
    viewPostDetails(postId).then(setPostDetails);
    getCommentsByPostId(postId).then(setComments);
  }, [postId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={postDetails.image} alt={postDetails.title} style={{ width: '300px ' }} />
      </div>
      <div className="text-white ms-5 details">
        <h3>{postDetails.title}</h3>
        <h5>{postDetails.category}</h5>
        <p>Written by {postDetails.userObject?.first_name} {postDetails.userObject?.last_name}</p>
        <p>{postDetails.description}</p>
        <p>Likes: {postDetails.likes}</p>
        <p>Tags: {postDetails.tags}</p>
      </div>
      <div>
        <p>Comments:</p>
        {/* NOT SURE IF I CAN CALL useEffect LIKE THIS, MIGHT NEED TO CREATE A NEW FUNCTION */}
        {comments.map((comment) => (
          <CommentCard key={comment.id} postObj={comment} onUpdate={useEffect} />
        ))}
      </div>
    </div>
  );
}
