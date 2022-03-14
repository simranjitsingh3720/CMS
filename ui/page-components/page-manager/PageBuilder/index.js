import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import './grapes.min.css';
// import 'grapesjs/dist/css/grapes.min.css';
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
  const [show, toggleShow] = useState(true);

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
          panels: {
            defaults: [
              {
                id: 'panel-switcher',
                el: '.panel__switcher',
                buttons: [{
                  id: 'show-layers',
                  active: true,
                  label: 'Layers',
                  command: 'show-layers',
                  togglable: false,
                }, {
                  id: 'show-style',
                  active: true,
                  label: 'Styles',
                  command: 'show-styles',
                  togglable: false,
                }],
              },
            ],
          },

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

        // // Define commands
        // e.Commands.add('show-layers', {
        //   getRowEl(e1) { return e1.getContainer().closest('.editor-row'); },
        //   getLayersEl(row) { return row.querySelector('#layers-container'); },

        //   run(e2, sender) {
        //     const lmEl = this.getLayersEl(this.getRowEl(e2));
        //     lmEl.style.display = '';
        //   },
        //   stop(e3, sender) {
        //     const lmEl = this.getLayersEl(this.getRowEl(e3));
        //     lmEl.style.display = 'none';
        //   },
        // });
        // e.Commands.add('show-styles', {
        //   getRowEl(e4) { return e4.getContainer().closest('.editor-row'); },
        //   getStyleEl(row) { return row.querySelector('#style-manager-container'); },

        //   run(e5, sender) {
        //     const smEl = this.getStyleEl(this.getRowEl(e5));
        //     smEl.style.display = '';
        //   },
        //   stop(e6, sender) {
        //     const smEl = this.getStyleEl(this.getRowEl(e6));
        //     smEl.style.display = 'none';
        //   },
        // });
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
              active: true, // active by default
              className: 'btn-toggle-borders',
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
              togglable: false, // For grouping context of buttons from the same panel
            },
          ],
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

        // const bm = e.BlockManager;
        // e.on('load', () => {
        //   e.BlockManager.render([
        //     bm.get('column1').set('category', ''),
        //     bm.get('column2').set('category', ''),
        //     bm.get('column3').set('category', ''),
        //     bm.get('text').set('category', ''),
        //     bm.get('image').set('category', ''),
        //   ]);
        // });

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

    // // Add a new Block
    // const block = bm.add('BLOCK-ID', {
    //   // Your block properties...
    //   label: 'My block',
    //   content: `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
    //   <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
    //   </svg>`,
    // });
  }
  useEffect(() => {
    refetch();
    getApiM();
  }, [router.query.pageSlug]);

  return (
    <div>

      <Draggable>
        <div className="gjs-pn-panel gjs-pn-views-container gjs-one-bg gjs-two-color">
          <div className="panel__basic-actions" />
          <span id="layers-container" />
          <span id="blocks" />
          <span id="selectors-container" style={{ display: 'none' }} />
          <span id="style-manager-container" style={{ display: 'none' }} />
          <span id="traits-container" />
        </div>
      </Draggable>
      <div id="editor" />

    </div>
  );
}

export default PageBuilder;
