import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import Draggable from 'react-draggable';
import { useRequest } from '../../../helpers/request-helper';
import CustomTemplates from './PageBuilderComponents/CustomTemplates';
import CustomForms from './PageBuilderComponents/CustomForms';
import { svgText, svgiframe } from './PageBuilderComponents/SVG';

function PageBuilder() {
  const [editor, setEditor] = useState(null);
  const router = useRouter();
  const [imgFile, setImgFile] = useState('');
  const [url, setUrl] = useState('');

  const [{}, refetchPageData] = useRequest(
    {
      url: `/page/${router.query.pageSlug}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );
  const [{}, refetch] = useRequest(
    {
      url: '/asset',
      method: 'GET',
      params: { q: '' },
    },
    {
      manual: true,
    },
  );

  const [{ data }] = useRequest(
    {
      method: 'GET',
      url: '/schema',
      params: {
        q: '',
      },
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
      let LandingPage = {};
      LandingPage = {
        html: res.data && res.data.data.html,
        css: res.data && res.data.data.css,
        components: res.data && res.data.data.components,
        style: res.data && res.data.data.styles,
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
                  const { writeUrl, readUrl } = result.data;
                  setUrl(result.data);
                  executePut({
                    url: writeUrl,
                    data: file[0],
                    headers: { type: file[0].type },
                  }).then(() => {
                    e.AssetManager.add({ src: readUrl, name: file[0].name });
                  });
                });
            },
          },

        });

        const layersContainer = document.getElementById('layers-container');
        const stylesContainer = document.getElementById('style-manager-container');
        const selectorsContainer = document.getElementById('selectors-container');
        const blocksContainer = document.getElementById('blocks');
        const traitsContainer = document.getElementById('traits-container');
        const draggablePanel = document.getElementById('draggable-panel');

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
              active: true,
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

        e.on('run:preview', () => {
          draggablePanel.style.display = 'none';
        });

        e.on('stop:preview', () => {
          draggablePanel.style.display = 'block';
        });

        setEditor(e);
      }
    });
  };
  if (editor) {
    editor.BlockManager.add('form-modal', {
      label: 'Add Form',
      attributes: { class: 'fa fa-list-ul' },
      category: 'Forms',
      content: { type: 'form-modal' }, // Component ID type
      activate: true, // This will trigger onActive method when the block is dropped
    });

    editor.BlockManager.add('template-modal', {
      label: 'Templates',
      media: svgText,
      category: 'Templates',
      content: { type: 'template-modal' }, // Component ID type
      activate: true, // This will trigger onActive method when the block is dropped
    });

    const bm = editor.Blocks;

    bm.remove('map');

    bm.add('map', {
      label: 'Map',
      category: 'Basic',
      attributes: { class: 'fa fa-map-o' },
      content: {
        type: 'map',
        style: { height: '550px', width: '100%' },
      },
    });

    bm.add('My Block 1', {
      label: 'iFrame',
      media: svgiframe,
      category: 'Basic',
      content: `
<iframe src="" title="iFrame" height="500px" width="500px" style="box-shadow: 5px 5px 0 rgba(5, 5, 5, .2)">
      `,
    });
  }
  useEffect(() => {
    if (editor) {
      const assetManager = editor.AssetManager;
      refetch().then((res) => {
        ((res.data && res.data.list) || []).map((page) => {
          if (page.url !== url.readUrl && page.name !== imgFile.name) {
            assetManager.add({
              src: page.url,
              name: page.name,
            });
          }
        });
      });
    }
    getApiM();
  }, [router.query.pageSlug, editor]);

  return (
    <div>
      <Draggable handle=".handle" defaultPosition={{ x: 0, y: 40 }}>
        <div className="gjs-pn-panel gjs-pn-views-container gjs-one-bg gjs-two-color" id="draggable-panel">
          <div className="top-panel">
            <div className="fa fa-bars panel-drag handle" />
            <div className="panel__basic-actions top" />
          </div>
          <span id="layers-container" className="handle" />
          <span id="blocks" />
          <span id="selectors-container" style={{ display: 'none' }} />
          <span id="style-manager-container" style={{ display: 'none' }} />
          <span id="traits-container" />
        </div>
      </Draggable>
      <div id="editor" />
      <CustomTemplates
        editor={editor}
      />
      <CustomForms
        editor={editor}
        data={data}
      />

    </div>
  );
}

export default PageBuilder;
