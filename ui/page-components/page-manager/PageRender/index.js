import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, createRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Spin } from 'antd';
// import html2canvas from 'html2canvas';
import { useScreenshot } from 'use-react-screenshot';

function PageRender() {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);

  const [isData, setIsData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getImage();
    localStorage.setItem('image', image);
  }, [image]);

  useEffect(() => {
    // console.log(router.query.pageView);
    if (router.query.pageView) {
      axios.get(`http://localhost:8000/api/page/${router.query.pageView}`)
        .then((res) => {
          if (router.query.pageView) {
            setIsData(true);
            const code = JSON.parse(res.data.data.data);
            if (code) {
              setHtml(code['CMS-html']);
              setCss(code['CMS-css']);
            } else {
              setHtml('');
            }
          } else {
            setIsData(false);
          }
        });
    }
  }, [router.query.pageView]);

  return (
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
  );
}

export default PageRender;
