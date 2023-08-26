import React, { ChangeEvent, useState } from 'react';

//components
import Input from '@components/input/Input';
import Button from '@components/button/Button';

//styles
import { titleInputStyle, descriptionInputStyle, buttonStyle } from '@utils/constants';
import GoBack from './GoBack';


interface StageFourProps {
    handleGoBack: () => void;
    
  }

const StageFour: React.FC<StageFourProps> = ({ handleGoBack })=> {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };


  const handleSubmit = () => {
    throw new Error('Function not implemented.');
  }

  return (
    <main>
      <GoBack handleGoBack={handleGoBack} />
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
    </main>
  );
};

export default StageFour;
