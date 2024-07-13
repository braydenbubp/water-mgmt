import { getSinglePost } from './postData';
import getSingleUser from './userData';

const viewPostDetails = (postId) => new Promise((resolve, reject) => {
  getSinglePost(postId)
    .then((postObject) => {
      getSingleUser(postObject.user_id)
        .then((userObject) => {
          resolve({ userObject, ...postObject });
        });
    }).catch((error) => reject(error));
});

export default viewPostDetails;
