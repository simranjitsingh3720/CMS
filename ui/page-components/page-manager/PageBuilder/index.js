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
  const [{ data: imgData }, refetch] = useRequest({
    url: '/asset',
    method: 'GET',
    params: {
      q: '',
    },
  });

  console.log('pahle', imgData);

  const getApiM = () => {
    ((imgData && imgData.list) || []).map((page) => (
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

                // 'https://assets-global.website-files.com/5e557f57e065e822f0adb45d/607fb80c3127fd33d55408e4_B-L_image.png'
                `url(${page.url})`,

              ],
            },

          });

          setEditor(e);
        }
      })
    ));
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
