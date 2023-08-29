import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components


// Styles
import ChallengeStyles from './Custom.module.css';
import GoBack from '../create_dare_journey/stages/GoBack';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import { titleInputStyle, descriptionInputStyle, buttonStyle } from '../../../utils/constants';


const CustomChallenge: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  function handleSubmit(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={ChallengeStyles.challenge__wrapper}>
      <GoBack  handleGoBack ={handleGoBack}/>
      <Input
        name="title"
        value={title}
        onChange={handleTitleChange}
        placeholder="custom challenge"
        style={titleInputStyle} // Apply custom style for title input
      />
      <Input
        name="description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="challenge description"
        style={descriptionInputStyle} // Apply custom style for description input
      />
      <Button
        onClick={handleSubmit}
        children={<h3>Add Challenge</h3>}
        type={''}
        style={buttonStyle}
      ></Button>
    </div>
  );
};

export default CustomChallenge;