import { FileTextOutlined, PictureOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import CardWrapper from '../../components/CardWrapper';
import SessionContext from '../../context/SessionContext';
import { useRequest } from '../../helpers/request-helper';
import styles from './styles.module.scss';

function Home() {
  const { session } = useContext(SessionContext);

  const router = useRouter();

  const [{ data: getData }] = useRequest({
    method: 'GET',
    url: '/dashboard',
  });

  return (
    <div className={styles.home_container}>
      <div className={styles.title}>
        {session ? (
          <span className={styles.title}>
            WELCOME TO COGO-CMS
          </span>
        ) : <span>Please Login or Signup to continue</span>}
      </div>
      <div className="card_component_container">
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div className={styles.primary_heading}>
              <h2 className={styles.card_heading}>
                Pages
              </h2>
            </div>
            <p className={styles.card_colorGray}>
              {getData?.data?.pages?.length <= 0 ? <span>No Page Found</span>
                : (
                  <>
                    <span>Number of Pages: </span>
                    {getData?.data?.pages?.length}
                  </>
                )}
            </p>

            <ul className={styles.list}>
              {getData?.data?.pages?.map((item) => (
                <li key={item.name}>
                  <FileTextOutlined style={{ marginRight: '10px' }} />
                  <a href={`admin/page-manager/builder/${item.slug}`}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div className={styles.primary_heading}>
              <h2 className={styles.card_heading}>
                Data Table
              </h2>
            </div>
            <p className={styles.card_colorGray}>
              {getData?.data?.schemas?.length <= 0 ? <span>No Table Found</span>
                : (
                  <>
                    <span>Number of Tables: </span>
                    {getData?.data?.schemas?.length}
                  </>
                )}

            </p>
            <ul className={styles.list}>
              {getData?.data?.schemas?.map((item) => (
                <li key={item.title}>
                  <TableOutlined style={{ marginRight: '10px' }} />
                  <a href={`admin/datastore/content-builder/${item.slug}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div className={styles.primary_heading}>
              <h2 className={styles.card_heading}>
                Assets
              </h2>
            </div>
            <p className={styles.card_colorGray}>
              {getData?.data?.assets?.length <= 0 ? <span>No Asset Found</span>
                : (
                  <>
                    <span>Number of Assets: </span>
                    {getData?.data?.assets?.length}
                  </>
                )}

            </p>
            <ul className={styles.list}>

              {getData?.data?.assets?.map((item) => (
                <li style={{ wordBreak: 'break-word' }}>
                  <PictureOutlined style={{ marginRight: '10px' }} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div
            className={styles.card_body}
          >
            <div className={styles.primary_heading}>
              <h2 className={styles.card_heading}>
                Users
              </h2>
            </div>
            <p className={styles.card_colorGray}>
              {getData?.data?.users?.length <= 0 ? <span>No User Found</span>
                : (
                  <>
                    <span>Number of Users: </span>
                    {getData?.data?.users?.length}
                  </>
                )}

            </p>
            <ul className={styles.list}>
              {getData?.data?.users?.map((item) => (
                <li key={item.firstName}>
                  <UserOutlined style={{ marginRight: '10px' }} />
                  {item.firstName}
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>

      </div>

    </div>

  );
}

export default Home;
