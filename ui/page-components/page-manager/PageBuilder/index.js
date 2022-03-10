import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import './grapes.min.css';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import Draggable from 'react-draggable';
import { useRequest } from '../../../helpers/request-helper';

function PageBuilder() {
  const [editor, setEditor] = useState(null);
  const router = useRouter();
  const [imgFile, setImgFile] = useState('');
  const [url, setUrl] = useState('');
  const [yes, setYes] = useState(false);

  const [{ data: getData }, refetchPageData] = useRequest(
    {
      url: `/page/${router.query.pageSlug}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );
  const [{ data: imgData }, refetch] = useRequest(
    {
      url: '/asset',
      method: 'GET',
      params: { q: '' },
    },
    {
      manual: true,
    },
  );

  const [load, setLoad] = useState(false);

  // eslint-disable-next-line no-empty-pattern
  const [{ }, executePost] = useRequest(
    {
      url: '/asset/',
      method: 'POST',
    },
    { manual: true },
  );
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePut] = useRequest(
    {
      method: 'PUT',
    },
    { manual: true },
  );

  const [{ loading: detailsLoading },
    detailPatch,
  ] = useRequest(
    {
      method: 'PATCH',
    },
    { manual: true },
  );

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
          pluginsOpts: {
            [gjsPresetWebpage]: {
              // The font imports are included on HTML <head/> when fonts are used on the template
              fonts: {
                Montserrat: 'https://fonts.googleapis.com/css?family=Montserrat',
                'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans',
              },
            },
          },
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
          defaults: {
            toolbar: [], // this will prevent its rendering on the component
          },

          assetManager: {

            uploadFile(info) {
              setImgFile(info.dataTransfer ? info.dataTransfer.files : info.target.files);
              const file = info.dataTransfer ? info.dataTransfer.files : info.target.files;
              executePost({
                data: {
                  name: file[0].name,
                  mimeType: file[0].type,
                  type: file[0].type.split('/')[0],
                },
              })
                .then((result) => {
                  const { writeUrl } = result.data;
                  setUrl(result.data);
                  executePut({
                    url: writeUrl,
                    data: file[0],
                    headers: { type: file[0].type },
                  });
                  setYes(true);
                });
            },
          },

        });

        e.on('load', () => {
          const styleManager = e.StyleManager;
          const fontProperty = styleManager.getProperty('typography', 'font-family');

          const list = [];
          // empty list
          fontProperty.set('list', list);

          // custom list
          list.push(fontProperty.addOption({ value: 'Montserrat, sans-serif', name: 'Montserrat' }));
          list.push(fontProperty.addOption({ value: 'Open Sans, sans-serif', name: 'Open Sans' }));
          fontProperty.set('list', list);

          styleManager.render();
        });

        setEditor(e);
      }
    });
  };
  if (editor) {
    const assetManager = editor.AssetManager;
    ((imgData && imgData.list) || []).map((page) => (
      assetManager.add({
        src: page.url,
        name: page.name,
      })
    ));
    if (yes) {
      assetManager.add({ src: url.readUrl, name: imgFile[0].name });
    }
    assetManager.getAll();
    assetManager.render();
    const bm = editor.Blocks; // `Blocks` is an alias of `BlockManager`

    // Add a new Block
    const block = bm.add('BLOCK-ID', {
      // Your block properties...
      label: 'My block',
      content: `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
      </svg>`,
    });
  }
  useEffect(() => {
    refetch();
    getApiM();
  }, [router.query.pageSlug]);

  return (
    <div>
      <Draggable>
        <div className="gjs-pn-panel" />
      </Draggable>
      <div id="editor" />

    </div>
  );
}

export default PageBuilder;
