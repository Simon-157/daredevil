import { useState } from "react";

// Component
import GoBack from "./GoBack";


//Styles
import StageStyles from "./Stage.module.css";
import ProgressBar from "../../../../components/progress_bar/ProgressBar";
import Button from "../../../../components/button/Button";
import ChallengeBox from "../../../../components/challenge_box/ChallengeBox";

interface StageThreeProps {
    // handleSubmit: () => void;
    handleSubmit: (data: any) => void;
    handleGoBack: () => void;
}

const StageThree: React.FC<StageThreeProps> = ({ handleSubmit, handleGoBack }) => {
    const [progressVal] = useState<number>(50);

    return (
        <>
            <div className={StageStyles.challenge__container}>
                <GoBack handleGoBack={handleGoBack} />
                <div className={StageStyles.text__row}>
                    <small>
                        select up to X challenges to include in your freak journey{" "}
                    </small>
                    <small>click the plus button to create custom challenges</small>
                    <ProgressBar value={progressVal} />
                    {/* TODO: DISPLAY ADDED CHALLENGES HERE */}
                    <div className={StageStyles.challenge__container__list}>
                        <ChallengeBox children={<h3>Challenege one</h3>} />
                        <ChallengeBox children={<h3>Challenege one</h3>} />
                        <ChallengeBox children={<h3>Challenege one</h3>} />
                    </div>
                </div>
                <div className={StageStyles.wrapper__roundButton}>
                    <Button onClick={handleSubmit} children={<a title='finish'>Finish</a>} type={""} />
                </div>
            </div>
        </>
    );
};

export default StageThree;




