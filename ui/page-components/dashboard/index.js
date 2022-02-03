import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const [pages, setPages] = useState([]);
    const [pageDetails, setPageDetails] = useState({ pageName:'',slugName:'' });

    useEffect(() => {
        axios.get('http://localhost:8000/api/page').then( res => {
            setPages(res.data.data);
        });
    }, []);
    
    const slugs = pages.map((slug,key) => {
        return (
                <li key={key}>
                    <a href={`${slug.slug}`}>{slug.slug}</a>
                </li>
        );
    });

    // const handleOnChange = (e) =>{
    //     console.log(e.target.value);
    //     setPageDetails({ pageName:e.target.value, slugName:e.target.value });
    //     console.log(pageDetails);
    // };

    const handleCreatePage = (e) =>{
        e.preventDefault();
        console.log(pageDetails);
        axios.post('http://localhost:8000/api/createPage', pageDetails).then(res =>{
            console.log(res.data);
        });
    };

    return (
        <div>
            <form>
                <input 
                    type="text" 
                    name="page" 
                    value = {pageDetails.pageName} 
                    onChange={(e) => setPageDetails({...pageDetails, pageName:e.target.value })} 
                    placeholder="Enter name of page"/>

                <input 
                    type="text" 
                    name="slug" 
                    value = {pageDetails.slugName} 
                    onChange={(e) => setPageDetails({...pageDetails, slugName:e.target.value })}  
                    placeholder="Enter name of slug"/>

                <button onClick={handleCreatePage}>Create New Page</button>
            </form>
            
            <ul>
                {slugs}
            </ul>
        </div>
    );
  }
  