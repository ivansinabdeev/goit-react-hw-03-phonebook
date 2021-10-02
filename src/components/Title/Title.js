import s from './Title.module.css';

function Title({ title }) {
  return <p className={s.title}>{title}</p>;
}
export default Title;
