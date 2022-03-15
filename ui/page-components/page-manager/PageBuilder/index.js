import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import Draggable from 'react-draggable';
import { useRequest } from '../../../helpers/request-helper';
// import { CustomFonts } from './fonts';

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
              // fonts: CustomFonts,
              customStyleManager: [{
                name: 'Animation',
                open: false,
                buildProps: ['transform'],
              }],
            },
          },
          components: LandingPage.html || '<span><span/>',
          style: LandingPage.css || '<></>',
          // panels: {
          //   defaults: [
          //     {
          //       id: 'panel-switcher',
          //       el: '.panel__switcher',
          //       buttons: [{
          //         id: 'show-layers',
          //         active: true,
          //         label: 'Layers',
          //         command: 'show-layers',
          //         togglable: false,
          //       }, {
          //         id: 'show-style',
          //         active: true,
          //         label: 'Styles',
          //         command: 'show-styles',
          //         togglable: false,
          //       }],
          //     },
          //   ],
          // },

          layerManager: {
            appendTo: '#layers-container',
          },
          blockManager: {
            appendTo: '#blocks',
          },
          styleManager: {
            appendTo: '#style-manager-container',
          },
          selectorManager: {
            appendTo: '#selectors-container',
          },
          traitManager: {
            appendTo: '#traits-container',
          },
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
            toolbar: [],
          },

          assetManager: {
            uploadFile(info) {
              setImgFile(info.dataTransfer ? info.dataTransfer.files : info.target.files);
              const file = info.dataTransfer ? info.dataTransfer.files : info.target.files;
              console.log(info);
              executePost({
                data: {
                  name: file[0].name,
                  mimeType: file[0].type,
                  type: file[0].type.split('/')[0],
                },
              })
                .then((result) => {
                  console.log('then statement');
                  const { writeUrl } = result.data;
                  console.log('write url = > ', writeUrl);
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

        const layersContainer = document.getElementById('layers-container');
        const stylesContainer = document.getElementById('style-manager-container');
        const selectorsContainer = document.getElementById('selectors-container');
        const blocksContainer = document.getElementById('blocks');

        e.Panels.addPanel({
          id: 'basic-actions',
          el: '.panel__basic-actions',
          buttons: [
            {
              id: 'show-layers',
              active: true,
              className: 'panel-btn',
              label: '<i class="fa fa-bars" />',
              command() {
                if (layersContainer.style.display === 'none') {
                  layersContainer.style.display = 'block';
                  stylesContainer.style.display = 'none';
                  selectorsContainer.style.display = 'none';
                  blocksContainer.style.display = 'none';
                } else {
                  layersContainer.style.display = 'none';
                }
              },
              togglable: false,
            }, {
              id: 'show-style',
              active: true,
              className: 'panel-btn',
              label: '<i class="fa fa-paint-brush" />',
              command() {
                if (stylesContainer.style.display === 'none') {
                  stylesContainer.style.display = 'block';
                  selectorsContainer.style.display = 'block';
                  layersContainer.style.display = 'none';
                  blocksContainer.style.display = 'none';
                } else {
                  stylesContainer.style.display = 'none';
                  selectorsContainer.style.display = 'none';
                }
              },
              togglable: false,
            }, {
              id: 'show-block',
              active: true,
              className: 'panel-btn',
              label: '<i class="fa fa-th-large" />',
              command() {
                if (blocksContainer.style.display === 'none') {
                  blocksContainer.style.display = 'block';
                  stylesContainer.style.display = 'none';
                  selectorsContainer.style.display = 'none';
                  layersContainer.style.display = 'none';
                } else {
                  blocksContainer.style.display = 'none';
                }
              },
              togglable: false,
            },
          ],
        });

        e.on('load', () => {
          const styleManager = e.StyleManager;
          const fontProperty = styleManager.getProperty('typography', 'font-family');

          const list = [];
          fontProperty.set('list', list);
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
    // console.log(imgData.list);
    console.log(assetManager);
    ((imgData && imgData.list) || []).map((page) => (
      assetManager.add({
        src: page.url,
        name: page.name,
      })
    ));
    if (yes) {
      assetManager.add({ src: url.readUrl, name: imgFile[0].name });
    }
    // console.log(assetManager.getAll());
    // console.log(assetManager.render());

    // assetManager.getAll();
    // assetManager.render();
    const bm = editor.Blocks; // `Blocks` is an alias of `BlockManager`

    // Add a new Block
    const block = bm.add('BLOCK-ID', {
      // Your block properties...
      label: 'Navbar Dropdown',
      content: '<Button>CLICK ME</Button>',
    });
  }
  useEffect(() => {
    refetch();
    getApiM();
  }, [router.query.pageSlug]);

  return (
    <div>

      <Draggable handle=".handle">
        <div className="gjs-pn-panel gjs-pn-views-container gjs-one-bg gjs-two-color">
          <div className="panel__basic-actions handle top" />
          <span id="layers-container" className="handle" />
          <span id="blocks" />
          <span id="selectors-container" className="handle" style={{ display: 'none' }} />
          <span id="style-manager-container" className="handle" style={{ display: 'none' }} />
          <span id="traits-container" className="handle" />
        </div>
      </Draggable>
      <div id="editor" />

    </div>
  );
}

export default PageBuilder;
