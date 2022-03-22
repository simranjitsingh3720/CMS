import { Button, Modal, Tabs } from 'antd';
import React from 'react';
import styles from './style.module.scss';

const { TabPane } = Tabs;

export default function ShareFormModal({
  showShareFormModal,
  closeShareFormModal,
  // loading,
  formId,
  title,
}) {
  const copytext = (value) => {
    navigator.clipboard.writeText(value);
  };

  const formLink = `http://localhost:8000/form/${formId}`;
  const formIframe = `<iframe src="${formLink}" title=${title} ></iframe>`;
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
          <TabPane tab="Link" key="1">
            <a href={formLink} target="_blank" rel="noreferrer">
              <div className={styles.linkBorder}>
                {formLink}
              </div>
            </a>
            <div>
              <Button
                className={styles.copyButton}
                type="button"
                onClick={() => { copytext(formLink); }}
              >
                Copy
              </Button>
            </div>
          </TabPane>
          <TabPane tab="iframe" key="2">
            <div className={styles.linkBorder}>
              {formIframe }
            </div>
            <div>
              <Button
                className={styles.copyButton}
                type="copy"
                onClick={() => { copytext(formIframe); }}
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
