import { FileTextOutlined, PictureOutlined, RocketOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useContext } from 'react';
// import CardWrapper from '../../components/CardWrapper';
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

  const [{ data: logs }] = useRequest({
    method: 'GET',
    url: '/logs',
  });

  const findTime = (updatedAt) => {
    const currentDate = new Date();
    let diff = (currentDate.getTime() - updatedAt.getTime()) / 1000;
    diff /= 60;

    const timeDifferenceInMin = Math.abs(Math.round(diff));
    const hours = timeDifferenceInMin / 60;

    if (timeDifferenceInMin > 60) {
      return (
        <span>
          {Math.abs(Math.round(hours))}
          {' '}
          hours ago
        </span>
      );
    } if (hours > 24) {
      const days = hours / 24;

      return (
        <span>
          {Math.abs(Math.round(days))}
          {' '}
          days ago
        </span>
      );
    }
    return (
      <span>
        {timeDifferenceInMin}
        {' '}
        min ago
      </span>
    );
  };

  const Capitalize = (str) => str.charAt(0) + str.slice(1).toLowerCase();

  return (
    <div className={styles.home_container}>
      <div className={styles.title}>
        {session ? (
          <span className={styles.title}>
            WELCOME TO COGO-CMS
          </span>
        ) : <span>Please Login or Signup to continue</span>}
      </div>
      <div className={styles.container}>

        <div className={styles.card_component_container}>
          <div className={styles.admin_card_wrapper}>
            <div
              className={styles.card_body}
            >
              <div
                className={styles.primary_heading}
                onClick={() => router.push('/admin/page-manager')}
              >
                <h2
                  className={styles.card_heading}

                >
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
          </div>
          <div className={styles.admin_card_wrapper}>
            <div
              className={styles.card_body}
            >
              <div className={styles.primary_heading} onClick={() => router.push('/admin/datastore')}>
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
          </div>
          <div className={styles.admin_card_wrapper}>
            <div
              className={styles.card_body}
            >
              <div className={styles.primary_heading} onClick={() => router.push('/admin/assets')}>
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
          </div>
          <div className={styles.admin_card_wrapper}>
            <div
              className={styles.card_body}
            >
              <div className={styles.primary_heading} onClick={() => router.push('/admin/users')}>
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
          </div>

        </div>

        <div className={styles.log_container}>
          <h3>Logs</h3>
          {((logs && logs.Logs) || []).map((log) => (
            <div>
              {(log.objectType === 'USER DEMO PREFERENCES' || log.objectType === 'AUTH' || log.objectType === 'USER') ? null
                : (
                  <div className={styles.log_box}>
                    <RocketOutlined />
                    <div style={{ marginLeft: '4px', padding: '5px' }}>
                      {Capitalize(log.objectType)}
                      {' '}
                      {log.actionName.toLowerCase()}
                      d
                      {' '}
                      by
                      {' '}
                      {session.user.id === log.User.id ? <span style={{ fontWeight: 'bold' }}>You</span>
                        : (
                          <span style={{ fontWeight: 'bold' }}>

                            { log.User.firstName}
                            {' '}
                            { log.User.lastName}
                          </span>
                        )}
                      {' '}
                      <br />
                      <small style={{ color: 'rgb(134 141 149)' }}>
                        {' '}
                        {findTime(new Date(log.updatedAt))}
                      </small>
                    </div>

                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

    </div>

  );
}

export default Home;
