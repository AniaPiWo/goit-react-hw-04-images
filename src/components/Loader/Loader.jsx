import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.Loader}>
    <InfinitySpin width="200" color="hotpink" />
  </div>
);
