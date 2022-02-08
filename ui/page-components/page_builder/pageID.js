import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import axios from 'axios';

function PageID() {
  const [editor, setEditor] = useState(null);
  const router = useRouter();

  const getApi = () => {
    axios.get(`http://localhost:8000/api/page/${router.query.pageID}`)
      .then((res) => {
        let obj = null;

        let LandingPage = {};
        if (router.query.pageID) {
          obj = JSON.parse(res.data.data[0].data);
          LandingPage = {
            html: obj && obj['CMS-html'],
            css: obj && obj['CMS-css'],
            components: obj && obj['CMS-components'],
            style: obj && obj['CMS-styles'],
          };
        }

        if (!editor) {
          const e = GrapesJS.init({
            container: '#editor',
            fromElement: false,
            plugins: [gjsPresetWebpage],
            components: LandingPage.html || '<span><span/>',
            style: LandingPage.css || '<></>',
            storageManager: {
              id: 'CMS-',
              type: 'remote',
              autosave: true,
              autoload: false,
              stepsBeforeSave: 1,
              storeHtml: true,
              storeCss: true,
              urlStore: `http://localhost:8000/api/page/${router.query.pageID}`,
              headers: {
                'Content-Type': 'application/json',
                credentials: true,
                optionSuccessStatus: 200,
              },
            },

          });

          setEditor(e);
        }
      });
  };

  useEffect(() => {
    getApi();
  }, [router.query.pageID]);

  return (
    <div>
      <div id="editor" />
      <div className="panel__top">
        <div className="panel__basic-actions" />
      </div>
    </div>
  );
}

export default PageID;
