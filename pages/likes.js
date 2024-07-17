// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSinglePost } from '../api/postData';

// export default function Likes() {
//   const [postLikes, setPostLikes] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const router = useRouter();
//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     getSinglePost(firebaseKey).then(setPostLikes);
//   }, [firebaseKey]);
// }
// const handleLike = () => {
// }

// const handleUnLike = () => {
// }
