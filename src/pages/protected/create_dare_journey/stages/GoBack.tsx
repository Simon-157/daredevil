import StageStyles from './Stage.module.css';

interface GoBackProps {
    handleGoBack:() => void
}
const GoBack: React.FC<GoBackProps>  = ({handleGoBack}) => {
  return (
    <div className={StageStyles.arrow} onClick={handleGoBack}>
        &larr; Go Back
      </div>
  )
}

export default GoBack