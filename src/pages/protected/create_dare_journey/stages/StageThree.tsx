import { useState } from "react";

// Component
import GoBack from "./GoBack";

//Styles
import StageStyles from "./Stage.module.css";
import ProgressBar from "../../../../components/progress_bar/ProgressBar";
import Button from "../../../../components/button/Button";
import ChallengeBox from "../../../../components/challenge_box/ChallengeBox";
import { darepoolController } from "../../../../firebase/controllers/DarePool.controller";
import { useQuery } from "react-query";
import CustomLoader from "../../../../components/loader/loader";
import { Dare, JourneyDare } from "../../../../types/FreakPoolType";

interface StageThreeProps {
    // handleSubmit: () => void;
    handleSubmit: (data: any) => void;
    handleGoBack: () => void;
}

const StageThree: React.FC<StageThreeProps> = ({
    handleSubmit,
    handleGoBack,
}) => {
    const [progressVal] = useState<number>(50);
    const { getAllDares } = darepoolController();
    const [selectedDares, setSelectedDares] = useState<JourneyDare[]>([])
    const { data: dares, isLoading, isError } = useQuery(["dares"], getAllDares);

    const handleStageThreeSubmit = () => {
        handleSubmit(selectedDares);
    };

    const onSelect = (dare: JourneyDare) => {
        setSelectedDares([...selectedDares, dare])
    }

    return (
        <>
            <div className={StageStyles.challenge__container}>
                <GoBack handleGoBack={handleGoBack} />
                <div className={StageStyles.main_wrapper}>
                    <span>
                        select up to X challenges to include in your freak journey{" "}
                    </span>
                    <small>click the plus button to create custom challenges</small>
                    <ProgressBar value={progressVal} />
                    {/* TODO: DISPLAY ADDED CHALLENGES HERE */}
                    {/* TODO: Screen specific display of added dares and darepools */}
                    <div className={StageStyles.challenge__container__wrapper}>
                        {isLoading ? (
                            <CustomLoader />
                        ) : (
                            <>
                                {!isError ? (
                                    <>
                                        <div>
                                            <span>Darepool</span>
                                            <div className={StageStyles.challenge__container__list}>
                                                {dares?.slice(0, 50).map((dare: Dare, index) => {
                                                    return <ChallengeBox key={index}
                                                        onClick={() => onSelect({ id: dare.id, dare_id: dare.id, milestone: "ongoing" } as JourneyDare)}>
                                                        {dare.short_name}
                                                    </ChallengeBox>;
                                                })}
                                            </div>
                                        </div>
                                        <div className={StageStyles.selected__challenges}>
                                            <span>Selected Dares</span>
                                            <div className={StageStyles.challenge__container__list}>
                                                {dares?.slice(0, 50).map((dare: Dare) => {
                                                    return <ChallengeBox>{dare.short_name}</ChallengeBox>;
                                                })}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    "No dares to show currently "
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={StageStyles.wrapper__roundButton}>
                <Button
                    onClick={() => { handleStageThreeSubmit; handleSubmit }}
                    children={<a title="finish">Finish</a>}
                    type={""}
                />
            </div>
        </>
    );
};

export default StageThree;
