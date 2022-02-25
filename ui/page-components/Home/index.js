import { useContext } from 'react';
import SessionContext from '../../context/session';
import Styles from './styles.module.scss';

function Home() {
  const loggedData = useContext(SessionContext);
  return (
    <div className={Styles.title}>
      Hello!
      {' '}
      {' '}
      {loggedData.session ? (
        <span>
          {loggedData.session.user.firstName}
          {' '}
          {loggedData.session.user.lastName}
        </span>
      ) : null}
    </div>
  );
}

export default Home;
