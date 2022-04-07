import { LinkOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tabs } from 'antd';
import React from 'react';
import styles from './style.module.scss';

const { TabPane } = Tabs;

export default function ShareFormModal({
  showShareFormModal,
  closeShareFormModal,
  formId,
  title,
}) {
  const copytext = (value) => {
    // eslint-disable-next-line no-undef
    navigator.clipboard.writeText(value);
  };

  const formLink = `${process.env.NEXT_PUBLIC_APP_LIVE_URL}/form/${formId}`;
  const formIframe = `<iframe src="${formLink}?embed=true" title=${title} style="margin:0;padding:0" frameBorder="0" width="80%" height="490vh" ></iframe>`;
  return (
    <Modal
      title="Share form"
      visible={showShareFormModal}
      onCancel={closeShareFormModal}
      footer={null}
      width={600}
    >

      <div className={styles.content_builder_wrapper}>
        <Tabs size="large">
          <TabPane
            tab={(
              <span>
                <LinkOutlined />
                Link
              </span>
)}
            key="1"
          >
            <a href={formLink} target="_blank" rel="noreferrer">
              <div className={styles.linkBorder}>
                {formLink}
              </div>
            </a>
            <div>
              <Button
                className={styles.copyButton}
                type="button"
                onClick={() => {
                  message.info('copied to clipboard');
                  copytext(formLink);
                }}
              >
                Copy
              </Button>
            </div>
          </TabPane>
          <TabPane tab="<> Embed" key="2">
            <div className={styles.linkBorder}>
              {formIframe }
            </div>
            <div>
              <Button
                className={styles.copyButton}
                type="copy"
                onClick={() => {
                  message.info('copied to clipboard');
                  copytext(formIframe);
                }}
              >
                Copy

              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}
