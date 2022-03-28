import { useRouter } from 'next/router';
import { useContext } from 'react';
import CardWrapper from '../../components/CardWrapper';
import SessionContext from '../../context/SessionContext';
import { useRequest } from '../../helpers/request-helper';
import styles from './styles.module.scss';

function Home() {
  const { session } = useContext(SessionContext);

  const router = useRouter();
  // get all pages
  // get all schema
  // get all data
  // get all assets
  //

  const [{ data: getData }] = useRequest({
    method: 'GET',
    url: '/dashboard',
  });
  console.log(getData?.data);

  return (
    <div className={styles.home_container}>
      <div className={styles.title}>
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

      <div className="card_component_container">
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className={styles.card_heading}>
                Pages
              </h2>
            </div>
            <p className={styles.card_para}>
              <span>Number of Pages :</span>
              {getData?.data?.pages?.length}
            </p>
            <ul>
              {getData?.data?.pages?.map((item) => <li>{item.name}</li>)}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className={styles.card_heading}>
                Data Table
              </h2>
            </div>
            <p className={styles.card_para}>
              <span>Number of tables :</span>
              {getData?.data?.schemas?.length}
            </p>
            <ul>
              {getData?.data?.schemas?.map((item) => (
                <li>
                  <a href={`admin/datastore/content-builder/${item.slug}`}>{item.title}</a>
                  {/* {item.title} */}
                  {' '}
                  {' '}
                  -

                  <span title="Number of fields" style={{ color: 'gray' }}>
                    {' '}
                    [
                    {item.schema.length}
                    ]
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className={styles.card_heading}>
                Assets
              </h2>
            </div>
            <p className={styles.card_para}>
              <span>Number of Assets :</span>
              {getData?.data?.assets?.length}
            </p>
            <ul>
              {getData?.data?.assets?.map((item) => <li style={{ wordBreak: 'break-word' }}>{item.name}</li>)}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className={styles.card_heading}>
                Users
              </h2>
            </div>
            <p className={styles.card_para}>
              <span>Number of Users :</span>
              {getData?.data?.users?.length}
            </p>
            <ul>
              {getData?.data?.users?.map((item) => <li>{item.firstName}</li>)}
            </ul>
          </div>
        </CardWrapper>

      </div>

    </div>

  );
}

export default Home;
