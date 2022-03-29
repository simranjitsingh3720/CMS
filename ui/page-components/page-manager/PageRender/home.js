import { useEffect, useState, createRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Alert } from 'antd';
import { useScreenshot } from 'use-react-screenshot';

function PageRender({ data }) {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);
  const [isData, setIsData] = useState(false);
  const getData = data;

  useEffect(() => {
    getImage();
    localStorage.setItem('image', image);
  }, [image]);

  useEffect(() => {
    if (getData) {
      setIsData(true);
      if (getData.data) {
        setHtml(getData.data.html);
        setCss(getData.data.css);
      } else {
        setHtml('');
      }
    }
  }, [getData]);

  return (
    <div>
      <div ref={ref}>
        <style>{css}</style>
        {isData ? (
          <div>
            <div style={{
              textAlign: 'center',
              margin: '10px',
              padding: '5px',
            }}
            >
              <a href="/admin">Go To Dashboard</a>
            </div>
            {ReactHtmlParser(html)}
          </div>
        ) : (
          <div style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '12% auto',
          }}
          >
            <Alert
              message="Message"
              description="You don't have home page, first create home page."
              type="info"
              showIcon
            />
            <a href="/admin">Go To Dashboard</a>
          </div>
        )}
      </div>
    </div>

  );
}

export default PageRender;
