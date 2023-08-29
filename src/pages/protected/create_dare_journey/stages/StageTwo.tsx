import React, { useState, ChangeEvent } from 'react';
import StageStyles from "./Stage.module.css";
import Cover from "@assets/images/man-smiling-and-holding-smartphone.png";
import GoBack from "./GoBack";
import { Timestamp } from 'firebase/firestore';
import Button from '../../../../components/button/Button';
import Input from '../../../../components/input/Input';

interface RadioOption {
  label: string;
  value: string;
}

interface StageTwoProps {
  handleSubmit: (data: any) => void;
  handleGoBack: () => void;
}

const StageTwo: React.FC<StageTwoProps> = ({ handleSubmit, handleGoBack }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const currentDate = new Date();

  const calculateNextDateTime = (option: string): string => {
    let nextDate = new Date();

    if (option === 'week') {
      nextDate.setDate(currentDate.getDate() + 7);
    } else if (option === 'fortnight') {
      nextDate.setDate(currentDate.getDate() + 14);
    } else if (option === 'month') {
      nextDate.setMonth(currentDate.getMonth() + 1);
    }

    return nextDate.toISOString();
  };


  const radioOptions: RadioOption[] = [
    { label: "week", value: calculateNextDateTime("week") },
    { label: "fortnight", value: calculateNextDateTime("fortnight") },
    { label: "month", value: calculateNextDateTime("month") },
  ];


  const handleStageTwoSubmit = () => {
    const startDateTimestamp = Timestamp.fromDate(new Date(currentDate.toISOString()));

    // Convert selectedOption (ISO date string) to Firestore Timestamp
    const endDateTimestamp = Timestamp.fromDate(new Date(selectedOption));
  
    const data = {
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    };

    handleSubmit(data);
  };

  return (
    <div className={StageStyles.container}>
      <div className={StageStyles.textColumn}>
        <GoBack handleGoBack={handleGoBack} />
        <h2>How long do you wanna go at it?</h2>
        <br />
        <div className={StageStyles.radio_button}>
          {radioOptions.map((option: RadioOption) => (
            <Input
              key={option.value}
              type="radio"
              label={option.label}
              name="duration"
              value={option.value}
              onChange={handleOptionChange}
              checked={selectedOption === option.value}
            />
          ))}
        </div>
        <br />
        <Button onClick={handleStageTwoSubmit}  type={''}>Next</Button>
      </div>

      <div className={StageStyles.imageColumn}>
        <img src={Cover} alt="Stage One" />
      </div>
    </div>
  );
};

export default StageTwo;
