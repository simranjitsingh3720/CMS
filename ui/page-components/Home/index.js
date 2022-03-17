import { useContext } from 'react';
import SessionContext from '../../context/SessionContext';
import Styles from './styles.module.scss';

function Home() {
  const { session } = useContext(SessionContext);
  return (
    <div className={Styles.title}>
      Hello! Mr.
      {' '}
      {session ? (
        <span>
          {session.user.firstName}
          {' '}
          {session.user.lastName}
        </span>
      ) : <span>Please Login or Signup to continue</span>}
    </div>
  );
}

export default Home;
