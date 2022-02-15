import { useRouter } from 'next/router';
import { useEffect, useState, createRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Spin } from 'antd';
import useAxios from 'axios-hooks';
import { useScreenshot } from 'use-react-screenshot';

function PageRender() {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);

  const [isData, setIsData] = useState(false);
  const router = useRouter();

  const [{ data: getData, loading: getLoading, error: getError }] = useAxios(
    {
      url: `http://localhost:8000/api/page/${router.query.pageView}`,
      method: 'GET',
    },
  );

  useEffect(() => {
    getImage();
    localStorage.setItem('image', image);
  }, [image]);

  useEffect(() => {
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
          <div className="example">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>

  );
}

export default PageRender;
