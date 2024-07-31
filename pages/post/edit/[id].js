import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/Forms/PostForm';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the post ID
  const { id } = router.query;

  // TODO: make a call to the API to get the Post data
  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);
  // TODO: pass object to form
  return (<PostForm obj={editItem} />);
}
