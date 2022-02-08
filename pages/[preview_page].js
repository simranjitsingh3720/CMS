import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

function Preview() {
  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);

  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/page/${router.query.preview_page}`)
      .then((res) => {
        if (router.query.preview_page) {
          const code = JSON.parse(res.data.data[0].data);
          setHtml(code['CMS-html']);
          setCss(code['CMS-css']);
        }
      });
  }, [router.query.preview_page]);

  return (
    <>
      <style>{css}</style>
      <div>
        {ReactHtmlParser(html)}
      </div>
    </>
  );
}

export default Preview;
