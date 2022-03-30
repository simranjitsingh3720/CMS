import { useRouter } from 'next/router';
import { useEffect, useState, createRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
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

  const [{ data: getData }] = useRequest(
    {
      url: `/page/${router.query.pageView}`,
      method: 'GET',
    },
  );

  useEffect(() => {
    getImage();
    localStorage.setItem('image', image);
  }, [image,getImage]);

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
            {ReactHtmlParser(html)}

          </div>
        ) : (
          <div />
        )}
      </div>
    </div>

  );
}

export default PageRender;
