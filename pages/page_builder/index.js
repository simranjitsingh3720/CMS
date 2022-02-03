import React,{ useEffect,useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage'; 
import axios from 'axios';

function Page_Builder() {

  const [editor, setEditor] = useState(null);
  const [code, setCode] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/page')
    .then(res => {
        const len = res.data.data.length;
        let obj=null;
        if(len){
            obj = JSON.parse(res.data.data[0].data);
        }
        setCode(obj);
        if(code){

                const LandingPage = {
                    html: obj && obj["CMS-html"],
                    css: obj && obj["CMS-css"],
                    components: obj && obj["CMS-components"],
                    style: obj && obj["CMS-styles"],
                };
                if (!editor) {
                    const e = GrapesJS.init({
                        container: `#editor`,
                        fromElement: false,
                        plugins: [gjsPresetWebpage],
                        components:  LandingPage.html || '<span><span/>',
                        style: LandingPage.css || '<></>',
                        // components: "<div id=\"i0e8\">Insert your text here</div>",
                        // style: "[{\"selectors\":[\"#i0e8\"],\"style\":{\"padding\":\"10px\"}}]",
                        storageManager: {
                            id: 'CMS-',             
                            type: 'remote',          
                            autosave: true,         
                            autoload: false,         
                            stepsBeforeSave: 1,     
                            storeHtml: true,
                            storeCss: true,
                            urlStore: 'http://localhost:8000/api/page',
                            headers:{
                                'Content-Type':'application/json',
                                origin: "http://localhost:8000/page_builder",
                                credentials:true,        
                                optionSuccessStatus:200
                                }
                        }
                    });
                    console.log(e);
                    setEditor(e);
                }
        } 
    });
  },[]);
  
  return (
    <div>
        <div id="editor"></div>
    </div>
  );
}

export default Page_Builder;