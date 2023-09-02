import PropTypes from 'prop-types';
import LoaderStyles from './loader.module.css'

interface LoaderProps {
    size:string,
    color:string

}

const CustomLoader = ({ size, color }:LoaderProps) => {
  const loaderStyle = {
    width: size,
    height: size,
    borderTopColor: color,
  };

  return (
    <div className={LoaderStyles.customLoader}>
      <div className={LoaderStyles.loader} style={loaderStyle}></div>
    </div>
  );
};

CustomLoader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

CustomLoader.defaultProps = {
  size: '40px', // Default size
  color: 'var( --app-green)', // Default color
};

export default CustomLoader;
