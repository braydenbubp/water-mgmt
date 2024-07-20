import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getSinglePost } from '../../api/postData';
// import { getCommentsByPostId } from '../../api/commentData';
// import CommentCard from '../../components/CommentCard';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  category: {},
};
export default function ViewPost() {
  const router = useRouter();
  const { id } = router.query;
  const [postDetails, setPostDetails] = useState({});
  // const [comments, setComments] = useState({});

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
    // getCommentsByPostId(postId).then(setComments);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px ' }} />
      </div>
      <div className="text-white ms-5 details">
        <h3>{postDetails.title}</h3>
        <h5>Category: {postDetails.category?.label}</h5>
        <p>Written by: {postDetails.user?.name}</p>
        <p>Description: {postDetails.description}</p>
        <p>Likes: {postDetails.likes}</p>
        <p>Tags: {postDetails.tags}</p>
        <div>
          <p>Comments:</p>
          {/* NOT SURE IF I CAN CALL useEffect LIKE THIS, MIGHT NEED TO CREATE A NEW FUNCTION */}
          {/* {comments.map((comment) => (
            <CommentCard key={comment.id} postObj={comment} onUpdate={useEffect} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

ViewPost.propTypes = {
  postDetails: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    likes: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

ViewPost.defaultProps = {
  postDetails: initialState,
};
