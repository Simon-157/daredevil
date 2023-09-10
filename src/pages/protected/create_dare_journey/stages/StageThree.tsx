import { useState } from "react";

// Component
import GoBack from "./GoBack";

//Styles
import StageStyles from "./Stage.module.css";
import ProgressBar from "../../../../components/progress_bar/ProgressBar";
import Button from "../../../../components/button/Button";
import ChallengeBox from "../../../../components/challenge_box/ChallengeBox";
import { darepoolController } from "../../../../bass/controllers/DarePool.controller";
import { useQuery } from "react-query";
import CustomLoader from "../../../../components/loader/loader";
import { Dare, JourneyDare } from "../../../../types/FreakPoolType";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { useModalContext } from "../../../../contexts/ModalContext";
import Modal from "../../../../components/modal/Modal";
import CustomChallenge from "../../custom_challenge/CustomChallenge";
import { PlusIcon } from "../../../../assets/icons/Icons";
import RoundButton from "../../../../components/round_button/RoundButton";

interface StageThreeProps {
    handleSubmit: (data: any) => void;
    handleGoBack: () => void;
}

const btnStyles = {
    color: "#F49867",
    height:"3rem",
    width:"3rem",
  }
  

const StageThree: React.FC<StageThreeProps> = ({
    handleSubmit,
    handleGoBack,
}) => {
    const { isOpen, openModal, closeModal } = useModalContext();
    const [progressVal] = useState<number>(50);
    const [selectedDares, setSelectedDares] = useState<JourneyDare[]>([])
    const { showSnackbar, snackbar } = useSnackbar();
    const { getDares } = darepoolController();
    const { data: dares, isLoading, isError } = useQuery(["dares"], getDares);
    console.log(dares);


    const onSelect = (dare: JourneyDare) => {
        setSelectedDares([...selectedDares, dare])
        showSnackbar("dare added successfully", "success")
    }

    if (isError) { showSnackbar("Error loading data", "error"); }

    return (
        <>
            <div className={StageStyles.challenge__container}>
                <GoBack handleGoBack={handleGoBack} />
                <div className={StageStyles.main_wrapper}>
                    {snackbar}
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
                                        <div className={StageStyles.dare__pool}>
                                            <span>Darepool</span>
                                            <div className={StageStyles.challenge__container__list}>
                                                {dares?.map((dare: Dare, index) => {
                                                    return <ChallengeBox key={index}
                                                        onClick={() => onSelect({ id: dare.id, dare_id: dare.id, milestone: "ongoing", short_name: dare.short_name, description: dare.description } as JourneyDare)}>
                                                        {dare.short_name}
                                                    </ChallengeBox>;
                                                })}
                                            </div>
                                        </div>
                                        {selectedDares.length > 0 ?
                                            <div className={StageStyles.selected__challenges}>
                                                <span>Selected Dares<p>{selectedDares.length}</p></span>
                                                <div className={StageStyles.challenge__container__list}>
                                                    {selectedDares?.slice(0, 3).map((dare: JourneyDare) => {
                                                        return <ChallengeBox>{dare.short_name}</ChallengeBox>;
                                                    })}
                                                </div>
                                            </div> : <span>No dare selected Yet, select at least 3 dares</span>}
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
                <div>
                <Button
                    onClick={() => handleSubmit(selectedDares)}
                    children={<a title="finish">Finish</a>}
                    type={"outlined"}
                />
                </div>
                <div className={StageStyles.add_btn_lg}>
                <Button
                    onClick={openModal}
                    children={<a title="finish">Add a custom dare</a>}
                    type={"outlined"}
                />

                </div>

                <Modal isOpen={isOpen} onClose={closeModal} header={<h2>Create a custom dare</h2>} body={<CustomChallenge />} />
                   
                <div className={StageStyles.add_btn_sm} title='custom dare'>
                    <RoundButton style={btnStyles} onClick={openModal} children={<PlusIcon />} />
                </div>
            </div>
        </>
    );
};

export default StageThree;
