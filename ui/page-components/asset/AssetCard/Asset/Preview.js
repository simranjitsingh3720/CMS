/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Empty } from 'antd';
import { FileOutlined, PictureOutlined, PlayCircleOutlined } from '@ant-design/icons';

export function CardTitle({ data }) {
  if (data && data.type === 'image') {
    return (
      <PictureOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
    );
  }
  if (data && data.type === 'video') {
    return (
      <PlayCircleOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
    );
  }
  return (
    <FileOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
  );
}
export function CardPreview({ data, showAssetPreviewModal }) {
  if (data && data.type === 'image') {
    return (
      <div
        style={{ height: '200px', backgroundColor: '#000', textAlign: 'center' }}
        onClick={showAssetPreviewModal}
        role="button"
      >
        <img src={data.url} alt="asset" style={{ width: 'auto', height: '100%' }} />
      </div>
    );
  }
  if (data && data.type === 'video') {
    return (
      <video style={{ height: '200px', width: '100%' }} src={data.url} onClick={showAssetPreviewModal}>
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <div onClick={showAssetPreviewModal} role="button">
      <Empty
        imageStyle={{
          height: 80,
        }}
        style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        description={(
          <span>
            Preview Not Available
          </span>
    )}
      />
    </div>

  );
}

export function Preview({ data }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess() {
    setNumPages(numPages);
  }

  if (data && data.type === 'image') {
    return (
      <div
        style={{ height: '80vh', backgroundColor: '#000', textAlign: 'center' }}
      >

        <img src={data.url} alt="asset" style={{ width: '100%', height: '100%' }} />
      </div>
    );
  } if (data && data.type === 'video') {
    return (
      <video
        style={{ height: '80vh', width: '100%' }}
        src={data.url}
        controls
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <iframe src={data.url} title="W3Schools Free Online Web Tutorials" width="100%" height="100%" allowFullScreen />
    </div>
  );
}
