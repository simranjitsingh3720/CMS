import { useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import Styles from './styles.module.scss';

function Home() {
  const { session } = useContext(SessionContext);
  return (
    <div className={Styles.title}>
      Hello!
      {session ? (
        <span>
          {session.user.firstName}
          {' '}
          {session.user.lastName}
        </span>
      ) : null}
    </div>
  );
}

export default Home;
