import { useRouter } from 'next/router';
import { useEffect, useState, createRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Alert } from 'antd';
import { useScreenshot } from 'use-react-screenshot';
import { useRequest } from '../../../helpers/request-helper';

function PageRender() {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);

  const [isData, setIsData] = useState(false);
  const router = useRouter();

  const [{ data: getData, loading: getLoading, error: getError }] = useRequest(
    {
      url: '/page/',
      method: 'GET',
      params: {
        isHome: 1,
      },
    },
  );

  useEffect(() => {
    getImage();
    localStorage.setItem('image', image);
  }, [image]);

  useEffect(() => {
    console.log(getData);
    if (getData) {
      setIsData(true);
      const code = JSON.parse(getData.data.data);
      if (code) {
        setHtml(code['CMS-html']);
        setCss(code['CMS-css']);
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
