import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import { useRequest } from '../../../helpers/request-helper';

function PageBuilder() {
  const [editor, setEditor] = useState(null);
  const router = useRouter();

  const [{ data: getData }, refetchPageData] = useRequest(
    {
      url: `/page/${router.query.pageSlug}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const [{ data }, refetch] = useRequest({
    method: 'GET',
    url: '/asset',
  });

  const getApiM = () => {
    refetchPageData().then((res) => {
      let obj = null;

      let LandingPage = {};
      obj = JSON.parse(res.data.data.data);
      LandingPage = {
        html: obj && obj['CMS-html'],
        css: obj && obj['CMS-css'],
        components: obj && obj['CMS-components'],
        style: obj && obj['CMS-styles'],
      };

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
            urlStore: `/api/v1/page/${router.query.pageSlug}`,
            headers: {
              'Content-Type': 'application/json',
              credentials: true,
              optionSuccessStatus: 200,
            },
          },
          assetManager: {
            assets: [
              {
                type: 'image',
                src: data.url,
                height: 350,
                width: 250,
                name: data.name,
              },
            ],
          },

        });

        setEditor(e);
      }
    });
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
