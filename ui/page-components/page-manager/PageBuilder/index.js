import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import useAxios from 'axios-hooks';

function PageBuilder() {
  const [editor, setEditor] = useState(null);
  const router = useRouter();

  const [{ data: getData }, refetchPageData] = useAxios(
    {
      url: `http://localhost:8000/api/page/${router.query.pageSlug}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const getApiM = () => {
    if (router.query.pageSlug) {
      refetchPageData().then((res) => {
        let obj = null;

        let LandingPage = {};
        // if (router.query.pageSlug) {
        obj = JSON.parse(res.data.data.data);
        LandingPage = {
          html: obj && obj['CMS-html'],
          css: obj && obj['CMS-css'],
          components: obj && obj['CMS-components'],
          style: obj && obj['CMS-styles'],
        };
        // }

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
              urlStore: `http://localhost:8000/api/page/${router.query.pageSlug}`,
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
    }
  };

  useEffect(() => {
    getApiM();
  }, [router.query.pageSlug]);

  return (
    <div>
      <div id="editor" />
    </div>
  );
}

export default PageBuilder;
