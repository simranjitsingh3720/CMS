import React, { useEffect, useState } from 'react';
import { message, Tabs } from 'antd';
import { useRouter } from 'next/router';
import ShowSchema from './ShowSchema';
import ShowContent from './ShowContent';
import ShowSettings from './ShowSettings';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import ContentTutorial from './ContentTutorial';
import Error from '../../../components/Error/Error';
import FieldTutorial from './FieldTutorial';

const { TabPane } = Tabs;

export default function ContentBuilder() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [notFound, setNotFound] = useState(false);
  const [defaultKey, setDefaultKey] = useState(null);
  const [schemaDetails, setSchemaDetails] = useState({});

  const [{ data: schemaDetail }, getSchemaDetails] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );

  const [{ data: schema }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}/field`,
    },
    { manual: true },
  );
  const callback = (key) => {
    if (key === '1') {
      getSchema().then(() => {}).catch((err) => {
        if (err.response.data.code === 'MissingError') {
          setNotFound(true);
        } else {
          message.error(err.response.data.message || err.response.data.messages[0]);
        }
      });
    } else if (key === '3') {
      getSchemaDetails().then((res) => {
        setSchemaDetails(res.data);
      }).catch((err) => {
        if (err.response.data.code === 'MissingError') {
          setNotFound(true);
        } else {
          message.error(err.response.data.message || err.response.data.messages[0]);
        }
      });
    }
    setDefaultKey(key);
  };

  useEffect(() => {
    if (schemaSlug) {
      getSchema().then((res) => {
        if (res.data.list.length > 0) {
          setDefaultKey('1');
        } else {
          setDefaultKey('2');
            <FieldTutorial />;
        }
      }).catch((err) => {
        if (err.response.data.code === 'MissingError') {
          setNotFound(true);
        } else {
          message.error(err.response.data.message || err.response.data.messages[0]);
        }
      });
    }
  }, [schemaSlug]);

  return (
    <div>
      {notFound ? <Error message="Page Not Found" code={404} /> : (
        <>
          {/* <ContentTutorial /> */}
          {defaultKey ? (
            <div className={styles.content_builder_wrapper}>
              <Tabs defaultActiveKey={defaultKey} onChange={callback} size="large" activeKey={defaultKey}>
                <TabPane tab="Contents" key="1">
                  <ShowContent
                    schema={schema}
                    setDefaultKey={setDefaultKey}
                    defaultKey={defaultKey}
                  />
                </TabPane>
                <TabPane tab="Structure" key="2">
                  {schema ? <ShowSchema schema={schema} /> : <>NO SCHEMA FOUND</>}
                </TabPane>
                <TabPane tab="Settings" key="3">
                  {schemaDetails ? (
                    <ShowSettings
                      schemaDetails={schemaDetails}
                    />
                  ) : <h1>Settings</h1> }
                </TabPane>
              </Tabs>
            </div>
          ) : null}
        </>
      ) }

    </div>
  );
}
