import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Accordion, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deletePost, getSinglePost } from '../../api/postData';
import { getCommentsByPostId } from '../../api/commentData';
import CommentCard from '../../components/CommentCard';
import CommentForm from '../../components/Forms/CommentForm';
import { useAuth } from '../../utils/context/authContext';

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
  const [comments, setComments] = useState([]);

  const { user } = useAuth();

  const postId = Number(id);

  const getThePost = () => {
    getSinglePost(id).then(setPostDetails);
  };

  const getCommentsByPost = () => {
    getCommentsByPostId(id).then(setComments);
  };

  useEffect(() => {
    getThePost();
    getCommentsByPost();
  }, []);

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postDetails.title}?`)) {
      deletePost(id).then(() => getThePost());
    }
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '400px', maxHeight: '600px', marginBottom: '10px' }} />
        {user.uid === postDetails.user?.uid ? (
          <Link href={`/post/edit/${id}`} passHref>
            <Button className="post-card-button" style={{ marginBottom: '15px' }}>Edit Post</Button>
          </Link>
        ) : ''}
        {user.uid === postDetails.user?.uid ? <Button onClick={deleteThisPost} className="post-card-button delete-button">Delete Post</Button> : ''}
      </div>
      <div className="text-white ms-5 details">
        <h3>{postDetails.title}</h3>
        <h5>Category: {postDetails.category?.label}</h5>
        <p>Written by: {postDetails.user?.name}</p>
        <p>Description: {postDetails.description}</p>
        <p>Likes: {postDetails.likes}</p>
        <p>Tags: {postDetails.tags?.map((tag) => (
          tag.label
        ))}
        </p>
        <div>
          <p>Comments:</p>
          {comments.map((comment) => (
            <CommentCard key={comment.id} commentObj={comment} onUpdate={getCommentsByPost} />
          ))}
          <Accordion style={{ width: '400px', margin: '15px' }} flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header><h5>Leave a Comment</h5></Accordion.Header>
              <Accordion.Body>
                <CommentForm commentPostId={postId} onSubmit={getCommentsByPost} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
