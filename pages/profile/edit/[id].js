import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RegisterForm from '../../../components/Forms/RegisterForm';
import { getSingleUser } from '../../../api/userData';
// import { useAuth } from '../../../utils/context/authContext';

export default function AddPost() {
  const [userDetails, setUserDetails] = useState({});
  // const { updateUser } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const getTheUser = () => {
    getSingleUser(id).then((theUser) => {
      setUserDetails(theUser);
    });
  };

  useEffect(() => {
    getTheUser();
  }, []);

  console.warn('userDetails', userDetails);

  return (
    <RegisterForm obj={userDetails} updateUser={() => console.warn('updated')} />
  );
}
