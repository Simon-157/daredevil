import React, { ChangeEvent, useState } from 'react';
import ChallengeStyles from './Custom.module.css';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import { InputStyle, buttonStyle } from '../../../utils/constants';
import { darepoolController } from '../../../bass/controllers/DarePool.controller';
import { Timestamp } from 'firebase/firestore';
import { useFirebaseAuth } from '../../../bass/auth/auth';
import { useSnackbar } from '../../../hooks/useSnackbar';
import CustomLoader from '../../../components/loader/loader';

const CustomChallenge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar, snackbar } = useSnackbar();
  const [shortname, setShortname] = useState('');
  const [description, setDescription] = useState('');
  const { createDare } = darepoolController();
  const { user } = useFirebaseAuth();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShortname(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  async function handleSubmit() {
    // Check if fields are empty
    if (!shortname || !description) {
      showSnackbar('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await createDare({
        short_name: shortname,
        description: description,
        created_at: Timestamp.now(),
        created_by: user!.uid,
        shared_experiences: [],
        id: '',
      });
      showSnackbar('Custom dare added', 'success');
      // Clear the input fields after submission
      setShortname('');
      setDescription('');
    } catch (error) {
      console.log(error);
      showSnackbar("Couldn't add dare", 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={ChallengeStyles.challenge__wrapper}>
      <Input
        name="shortname"
        value={shortname}
        onChange={handleTitleChange}
        placeholder="Custom dare name"
        style={InputStyle} // Apply custom style for title input
      />
      <Input
        name="description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Freak dare description"
        style={InputStyle} // Apply custom style for description input
      />
      <Button
        onClick={handleSubmit}
        children={isLoading? <CustomLoader /> :<h3>Add freak</h3> }
        type={''}
        style={buttonStyle}
      ></Button>
      {snackbar}
    </div>
  );
};

export default CustomChallenge;
