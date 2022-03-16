import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  console.log('data', imgData);
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
              fonts: {
                Montserrat: 'https://fonts.googleapis.com/css?family=Montserrat',
                'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans',
              },
              customStyleManager: [{
                name: 'Animation',
                open: false,
                buildProps: ['transform'],
              }],
            },
          },
          components: LandingPage.html || '<span><span/>',
          style: LandingPage.css || '<></>',
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

        const layersContainer = document.getElementById('layers-container');
        const stylesContainer = document.getElementById('style-manager-container');
        const selectorsContainer = document.getElementById('selectors-container');
        const blocksContainer = document.getElementById('blocks');
        const traitsContainer = document.getElementById('traits-container');

        const pn = e.Panels;
        const swv = 'sw-visibility';
        const prv = 'preview';

        pn.getPanels().reset([{
          id: 'commands',
          buttons: [{}],
        },
        {
          id: 'options',
          buttons: [
            {
              id: 'undo',
              className: 'fa fa-undo',
              command: (e) => e.runCommand('core:undo'),
              attributes: {
                title: 'Undo',
                'data-tooltip-pos': 'bottom',
              },
            }, {
              id: 'redo',
              className: 'fa fa-repeat',
              command: (e) => e.runCommand('core:redo'),
              attributes: {
                title: 'Redo',
                'data-tooltip-pos': 'bottom',
              },
            }, {
              id: swv,
              command: swv,
              context: swv,
              className: 'fa fa-square-o',
              attributes: {
                title: 'View Components',
                'data-tooltip-pos': 'bottom',
              },
            }, {
              id: prv,
              context: prv,
              command: (e) => e.runCommand(prv),
              className: 'fa fa-eye',
              attributes: {
                title: 'Preview',
                'data-tooltip-pos': 'bottom',
              },
            },
          ],
        },
        ]);

        e.Panels.addPanel({
          id: 'devices-b',
          visible: true,
          buttons: [{
            id: 'set-device-desktop',
            command(e, Model, Options) { e.setDevice('Desktop'); },
            className: 'fa fa-desktop',
            attributes: {
              title: 'Desktop',
              'data-tooltip-pos': 'bottom',
            },
            active: true,
          }, {
            id: 'set-device-tablet',
            command(e, Model, Options) { e.setDevice('Tablet'); },
            className: 'fa fa-tablet',
            attributes: {
              title: 'Tablet',
              'data-tooltip-pos': 'bottom',
            },
          }, {
            id: 'set-device-mobile',
            command(e, Model, Options) { e.setDevice('Mobile portrait'); },
            className: 'fa fa-mobile',
            attributes: {
              title: 'Mobile',
              'data-tooltip-pos': 'bottom',
            },
          }],
        });

        e.Panels.addPanel({
          id: 'basic-actions',
          el: '.panel__basic-actions',
          buttons: [
            {
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
                  traitsContainer.style.display = 'none';
                } else {
                  blocksContainer.style.display = 'none';
                }
              },
              attributes: {
                title: 'Show Blocks',
                'data-tooltip-pos': 'bottom',
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
                  traitsContainer.style.display = 'none';
                } else {
                  stylesContainer.style.display = 'none';
                  selectorsContainer.style.display = 'none';
                }
              },
              attributes: {
                title: 'Show Styles',
                'data-tooltip-pos': 'bottom',
              },
              togglable: false,
            }, {
              id: 'show-traits',
              active: true,
              className: 'panel-btn',
              label: '<i class="fa fa-cog" />',
              command() {
                if (traitsContainer.style.display === 'none') {
                  traitsContainer.style.display = 'block';
                  blocksContainer.style.display = 'none';
                  stylesContainer.style.display = 'none';
                  selectorsContainer.style.display = 'none';
                  layersContainer.style.display = 'none';
                } else {
                  traitsContainer.style.display = 'none';
                }
              },
              attributes: {
                title: 'Show Properties',
                'data-tooltip-pos': 'bottom',
              },
              togglable: false,
            }, {
              id: 'show-layers',
              active: true,
              className: 'panel-btn',
              label: '<i class="fa fa-list-alt" />',
              command() {
                if (layersContainer.style.display === 'none') {
                  layersContainer.style.display = 'block';
                  stylesContainer.style.display = 'none';
                  selectorsContainer.style.display = 'none';
                  blocksContainer.style.display = 'none';
                  traitsContainer.style.display = 'none';
                } else {
                  layersContainer.style.display = 'none';
                }
              },
              attributes: {
                title: 'Show DOM Structure',
                'data-tooltip-pos': 'bottom',
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
    console.log(imgData);
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
    const svgText = `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
    </svg>`;
    // Add a new Block
    const block = bm.add('hjde', {
      // Your block properties...
      label: 'Template 1',
      media: svgText,
      category: 'Templates',
      content: '<Textarea></textarea>',
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
          <div className="top-panel">
            <div className="fa fa-bars panel-drag handle" />
            <div className="panel__basic-actions top" />
          </div>
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
