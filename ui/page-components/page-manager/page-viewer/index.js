import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Spin } from 'antd';

function PageView() {
  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);

  const [isData, setIsData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.pageView) {
      axios.get(`http://localhost:8000/api/page/${router.query.pageView}`)
        .then((res) => {
          if (router.query.pageView) {
            setIsData(true);
            const code = JSON.parse(res.data.data.data);
            setHtml(code['CMS-html']);
            setCss(code['CMS-css']);
          } else {
            setIsData(false);
          }
        });
    }
  }, [router.query.pageView]);

  return (
    <>
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

    </>
  );
}

export default PageView;
