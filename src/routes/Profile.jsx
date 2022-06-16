import React, { useEffect, useState } from 'react';
import { useFireStore } from '../hooks/useFireStore';

import Title from '../components/Title';
import ProfileCard from '../components/cards/ProfileCard';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { getProfile } = useFireStore();

  useEffect(() => {
    const assignProfile = async () => {
      let p = await getProfile();
      setProfile(p);
    };
    assignProfile();
  }, []);

  return (
    <>
      <Title text="My profile 😎" />
      <ProfileCard userData={profile} />
    </>
  );
};

export default Profile;
