import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import StageStyles from "./Stage.module.css";
import Cover from "@assets/images/man-smiling-and-holding-smartphone.png";
import GoBack from "./GoBack";
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';

interface StageOneProps {
  handleSubmit: (data: any) => void;
  handleGoBack: () => void;
}

const StageOne: React.FC<StageOneProps> = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStageOneSubmit = () => {
    const data = {
      name: name,
    };

    handleSubmit(data);
  };

  return (
    <div className={StageStyles.container}>
      <div className={StageStyles.textColumn}>
        <GoBack handleGoBack={handleGoBack} />

        <h2>What do you wanna call the Journey?</h2>
        <br />
        <Input
          name="name"
          placeholder="name"
          style={{ width: "13rem" }}
          value={name}
          onChange={(e:any) => setName(e.target.value)}
        />
        <br />
        <Button onClick={handleStageOneSubmit} style={{ width: "13rem" }}  type={''}>
          next
        </Button>
      </div>
      <div className={StageStyles.imageColumn}>
        <img src={Cover} alt="Stage One" />
      </div>
    </div>
  );
};

export default StageOne;
