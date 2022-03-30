import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import Draggable from 'react-draggable';
import { useRequest } from '../../../helpers/request-helper';

function Home() {
  const [editor, setEditor] = useState(null);
  const router = useRouter();
  const [imgFile, setImgFile] = useState('');
  const [url, setUrl] = useState('');

  const [{ data: getData }, refetchPageData] = useRequest(
    {
      url: '/page',
      method: 'GET',
      params: { isHome: 1 },
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
            urlStore: '/api/v1/page',
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

    const svgText = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 347.873 347.873" style="enable-background:new 0 0 347.873 347.873; height:60px; width:60px" xml:space="preserve">
    <g>
      <rect x="64.148" y="76.604" width="219.576" height="34.249"/>
      <rect x="64.148" y="136.389" width="150.046" height="80.215"/>
      <rect x="242.927" y="136.389" width="40.798" height="80.215"/>
      <path d="M337.873,33.937H10c-5.523,0-10,4.477-10,10v210.393c0,5.523,4.477,10,10,10h114.979
        c-4.407,21.476-14.601,32.572-14.674,32.651c-2.793,2.885-3.59,7.16-2.023,10.857c1.566,3.697,5.191,6.099,9.207,6.099h112.895
        c4.016,0,7.641-2.402,9.207-6.099c1.566-3.697,0.77-7.973-2.023-10.857c-0.117-0.122-10.279-11.174-14.676-32.651h114.981
        c5.523,0,10-4.477,10-10V43.937C347.873,38.414,343.396,33.937,337.873,33.937z M327.873,244.329h-16.311v-2.816
        c0-5.523-4.477-10-10-10s-10,4.477-10,10v2.816h-10.439v-2.816c0-5.523-4.477-10-10-10c-5.522,0-10,4.477-10,10v2.816h-49.782
        h-74.809H20V53.937h307.873V244.329z"/>
    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
    </svg>
    `;

    const svgiframe = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-iframe-outline" width="24" height="24" viewBox="0 0 24 24"><path d="M9.5,8.5L11,10L8,13L11,16L9.5,17.5L5,13L9.5,8.5M14.5,17.5L13,16L16,13L13,10L14.5,8.5L19,13L14.5,17.5M21,2H3A2,2 0 0,0 1,4V20A2,2 0 0,0 3,22H21A2,2 0 0,0 23,20V4A2,2 0 0,0 21,2M21,20H3V6H21V20Z" /></svg>';

    bm.add('My Block 1', {
      label: 'iFrame',
      media: svgiframe,
      category: 'Basic',
      content: `
      <iframe src="" title="iFrame" height="500px" width="500px" style="box-shadow: 5px 5px 0 rgba(5, 5, 5, .2)">
      `,
    });
    bm.add('My Block 2', {
      // Your block properties...
      label: 'Template 1',
      media: svgText,
      category: 'Templates',
      content: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <title>W3.CSS Template</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
      body {font-family: "Lato", sans-serif}
      .mySlides {display: none}
      </style>
      </head>
      <body>
      
      <!-- Navbar -->
      <div class="w3-top">
        <div class="w3-bar w3-black w3-card">
          <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
          <a href="#" class="w3-bar-item w3-button w3-padding-large">HOME</a>
          <a href="#band" class="w3-bar-item w3-button w3-padding-large w3-hide-small">BAND</a>
          <a href="#tour" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TOUR</a>
          <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
          <div class="w3-dropdown-hover w3-hide-small">
            <button class="w3-padding-large w3-button" title="More">MORE <i class="fa fa-caret-down"></i></button>     
            <div class="w3-dropdown-content w3-bar-block w3-card-4">
              <a href="#" class="w3-bar-item w3-button">Merchandise</a>
              <a href="#" class="w3-bar-item w3-button">Extras</a>
              <a href="#" class="w3-bar-item w3-button">Media</a>
            </div>
          </div>
          <a href="javascript:void(0)" class="w3-padding-large w3-hover-red w3-hide-small w3-right"><i class="fa fa-search"></i></a>
        </div>
      </div>
      
      <!-- Navbar on small screens (remove the onclick attribute if you want the navbar to always show on top of the content when clicking on the links) -->
      <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
        <a href="#band" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">BAND</a>
        <a href="#tour" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">TOUR</a>
        <a href="#contact" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">CONTACT</a>
        <a href="#" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">MERCH</a>
      </div>
      
      <!-- Page content -->
      <div class="w3-content" style="max-width:2000px;margin-top:46px">
      
        <!-- Automatic Slideshow Images -->
        <div class="mySlides w3-display-container w3-center">
          <img src="https://www.w3schools.com/w3images/la.jpg" style="width:100%">
          <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
            <h3>Los Angeles</h3>
            <p><b>We had the best time playing at Venice Beach!</b></p>   
          </div>
        </div>
        <div class="mySlides w3-display-container w3-center">
          <img src="https://www.w3schools.com/w3images/ny.jpg" style="width:100%">
          <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
            <h3>New York</h3>
            <p><b>The atmosphere in New York is lorem ipsum.</b></p>    
          </div>
        </div>
        <div class="mySlides w3-display-container w3-center">
          <img src="https://www.w3schools.com/w3images/chicago.jpg" style="width:100%">
          <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
            <h3>Chicago</h3>
            <p><b>Thank you, Chicago - A night we won't forget.</b></p>    
          </div>
        </div>
      
        <!-- The Band Section -->
        <div class="w3-container w3-content w3-center w3-padding-64" style="max-width:800px" id="band">
          <h2 class="w3-wide">THE BAND</h2>
          <p class="w3-opacity"><i>We love music</i></p>
          <p class="w3-justify">We have created a fictional band website. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div class="w3-row w3-padding-32">
            <div class="w3-third">
              <p>Name</p>
              <img src="https://www.w3schools.com/w3images/bandmember.jpg" class="w3-round w3-margin-bottom" alt="Random Name" style="width:60%">
            </div>
            <div class="w3-third">
              <p>Name</p>
              <img src="https://www.w3schools.com/w3images/bandmember.jpg" class="w3-round w3-margin-bottom" alt="Random Name" style="width:60%">
            </div>
            <div class="w3-third">
              <p>Name</p>
              <img src="https://www.w3schools.com/w3images/bandmember.jpg" class="w3-round" alt="Random Name" style="width:60%">
            </div>
          </div>
        </div>
      
        <!-- The Tour Section -->
        <div class="w3-black" id="tour">
          <div class="w3-container w3-content w3-padding-64" style="max-width:800px">
            <h2 class="w3-wide w3-center">TOUR DATES</h2>
            <p class="w3-opacity w3-center"><i>Remember to book your tickets!</i></p><br>
      
            <ul class="w3-ul w3-border w3-white w3-text-grey">
              <li class="w3-padding">September <span class="w3-tag w3-red w3-margin-left">Sold out</span></li>
              <li class="w3-padding">October <span class="w3-tag w3-red w3-margin-left">Sold out</span></li>
              <li class="w3-padding">November <span class="w3-badge w3-right w3-margin-right">3</span></li>
            </ul>
      
            <div class="w3-row-padding w3-padding-32" style="margin:0 -16px">
              <div class="w3-third w3-margin-bottom">
                <img src="https://www.w3schools.com/w3images/newyork.jpg" alt="New York" style="width:100%" class="w3-hover-opacity">
                <div class="w3-container w3-white">
                  <p><b>New York</b></p>
                  <p class="w3-opacity">Fri 27 Nov 2016</p>
                  <p>Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
                  <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button>
                </div>
              </div>
              <div class="w3-third w3-margin-bottom">
                <img src="https://www.w3schools.com/w3images/paris.jpg" alt="Paris" style="width:100%" class="w3-hover-opacity">
                <div class="w3-container w3-white">
                  <p><b>Paris</b></p>
                  <p class="w3-opacity">Sat 28 Nov 2016</p>
                  <p>Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
                  <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button>
                </div>
              </div>
              <div class="w3-third w3-margin-bottom">
                <img src="https://www.w3schools.com/w3images/sanfran.jpg" alt="San Francisco" style="width:100%" class="w3-hover-opacity">
                <div class="w3-container w3-white">
                  <p><b>San Francisco</b></p>
                  <p class="w3-opacity">Sun 29 Nov 2016</p>
                  <p>Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
                  <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <!-- Ticket Modal -->
        <div id="ticketModal" class="w3-modal">
          <div class="w3-modal-content w3-animate-top w3-card-4">
            <header class="w3-container w3-teal w3-center w3-padding-32"> 
              <span onclick="document.getElementById('ticketModal').style.display='none'" 
             class="w3-button w3-teal w3-xlarge w3-display-topright">×</span>
              <h2 class="w3-wide"><i class="fa fa-suitcase w3-margin-right"></i>Tickets</h2>
            </header>
            <div class="w3-container">
              <p><label><i class="fa fa-shopping-cart"></i> Tickets, $15 per person</label></p>
              <input class="w3-input w3-border" type="text" placeholder="How many?">
              <p><label><i class="fa fa-user"></i> Send To</label></p>
              <input class="w3-input w3-border" type="text" placeholder="Enter email">
              <button class="w3-button w3-block w3-teal w3-padding-16 w3-section w3-right">PAY <i class="fa fa-check"></i></button>
              <button class="w3-button w3-red w3-section" onclick="document.getElementById('ticketModal').style.display='none'">Close <i class="fa fa-remove"></i></button>
              <p class="w3-right">Need <a href="#" class="w3-text-blue">help?</a></p>
            </div>
          </div>
        </div>
      
        <!-- The Contact Section -->
        <div class="w3-container w3-content w3-padding-64" style="max-width:800px" id="contact">
          <h2 class="w3-wide w3-center">CONTACT</h2>
          <p class="w3-opacity w3-center"><i>Fan? Drop a note!</i></p>
          <div class="w3-row w3-padding-32">
            <div class="w3-col m6 w3-large w3-margin-bottom">
              <i class="fa fa-map-marker" style="width:30px"></i> Chicago, US<br>
              <i class="fa fa-phone" style="width:30px"></i> Phone: +00 151515<br>
              <i class="fa fa-envelope" style="width:30px"> </i> Email: mail@mail.com<br>
            </div>
            <div class="w3-col m6">
              <form action="/action_page.php" target="_blank">
                <div class="w3-row-padding" style="margin:0 -16px 8px -16px">
                  <div class="w3-half">
                    <input class="w3-input w3-border" type="text" placeholder="Name" required name="Name">
                  </div>
                  <div class="w3-half">
                    <input class="w3-input w3-border" type="text" placeholder="Email" required name="Email">
                  </div>
                </div>
                <input class="w3-input w3-border" type="text" placeholder="Message" required name="Message">
                <button class="w3-button w3-black w3-section w3-right" type="submit">SEND</button>
              </form>
            </div>
          </div>
        </div>
        
      <!-- End Page Content -->
      </div>
      
      <!-- Image of location/map -->
      <img src="https://www.w3schools.com/w3images/map.jpg" class="w3-image w3-greyscale-min" style="width:100%">
      
      <!-- Footer -->
      <footer class="w3-container w3-padding-64 w3-center w3-opacity w3-light-grey w3-xlarge">
        <i class="fa fa-facebook-official w3-hover-opacity"></i>
        <i class="fa fa-instagram w3-hover-opacity"></i>
        <i class="fa fa-snapchat w3-hover-opacity"></i>
        <i class="fa fa-pinterest-p w3-hover-opacity"></i>
        <i class="fa fa-twitter w3-hover-opacity"></i>
        <i class="fa fa-linkedin w3-hover-opacity"></i>
      </footer>
      
      <script>
      // Automatic Slideshow - change image every 4 seconds
      var myIndex = 0;
      carousel();
      
      function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";  
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}    
        x[myIndex-1].style.display = "block";  
        setTimeout(carousel, 4000);    
      }
      
      // Used to toggle the menu on small screens when clicking on the menu button
      function myFunction() {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
        } else { 
          x.className = x.className.replace(" w3-show", "");
        }
      }
      
      // When the user clicks anywhere outside of the modal, close it
      var modal = document.getElementById('ticketModal');
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      </script>
      
      </body>
      </html>
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

    </div>
  );
}

export default Home;
