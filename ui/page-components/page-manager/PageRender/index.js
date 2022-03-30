import { useRouter } from 'next/router';
import { useEffect, useState, createRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useScreenshot } from 'use-react-screenshot';
// import html2canvas from 'html2canvas';
// import { message } from 'antd';
import { useRequest } from '../../../helpers/request-helper';

function PageRender() {
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);
  // const [filed, setFiled] = useState(null);

  const [isData, setIsData] = useState(false);
  const router = useRouter();

  const [{ data: getData }] = useRequest(
    {
      url: `/page/${router.query.pageView}`,
      method: 'GET',
    },
  );

  // const [_document, set_document] = useState(null);

  // useEffect(() => {
  //   set_document(document.getElementById('page_render_canvas'));
  // }, []);

  // console.log('_doucment -> ', _document);

  // function dataURLtoFile(dataurl, filename) {
  //   const arr = dataurl.split(',');
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);

  //   while (n -= 1) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, { type: mime });
  // }

  // const [{ }, executePatch] = useRequest(
  //   {
  //     url: '/page/about',
  //     method: 'PATCH',
  //   },
  //   { manual: true },
  // );

  // useEffect(() => {
  //   html2canvas(_document).then((canvas) => {
  //     // console.log('Canvas -> ', canvas);
  //     // _document.appendChild(canvas);
  //     const imgsrc = canvas.toDataURL('image/png');
  //     console.log('Image - > ', imgsrc);

  //     // const filee = dataURLtoFile(imgsrc);
  //     setFiled(imgsrc);

  //     executePatch({
  //       data: {
  //         pageScreenshot: imgsrc,
  //         slug: 'aboutss',
  //       },
  //     })
  //       .then(() => {
  //         message.success('Page Updated Successfully');
  //       })
  //       .catch((err) => {
  //         console.log('err-> ', err);
  //         // message.info(err.response.data.message || err.response.data.messages[0]);
  //       });

  //     // console.log(dataURLtoFile(imgsrc));
  //   });
  // }, [_document, getData, css]);

  useEffect(() => {
    getImage();
    localStorage.setItem('image', image);
  }, [image, getImage]);

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
      <div ref={ref} id="page_render_canvas">
        <style>{css}</style>
        {isData ? (
          <div>
            {ReactHtmlParser(html)}

          </div>
        ) : (
          <div />
        )}
      </div>
      <br />

    </div>

  );
}

export default PageRender;
