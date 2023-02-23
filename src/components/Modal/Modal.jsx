import css from './Modal.module.css';
import propTypes from 'prop-types';

export const Modal = ({ src, alt, handleClose }) => (
  <div className={css.overlay} onClick={handleClose}>
    <div className={css.modal}>
      <img src={src} alt={alt} />
    </div>
  </div>
);

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
