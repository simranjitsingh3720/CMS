import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const { push } = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/api/page').then((res) => {
      setPages(res.data.data);
      console.log(res.data);
    });
  }, []);

  const handleClick = (newSlug) => {
    push('/page_builder/[pageID]', `page_builder/${newSlug}`);
  }; // handle Click Ends

  const slugs = pages.map((slug) => (
    <li key={slug.slug}>
      <button onClick={() => { handleClick(slug.slug); }} type="button">{slug.slug}</button>
      {/* <a href="http://localhost:8000/page_builder/home" onClick={handleClick}>{slug.slug}</a> */}
    </li>
  ));

  const handleCreatePage = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error => ', err);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="page"
          value={pageDetails.name}
          onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
          placeholder="Enter name of page"
        />

        <input
          type="text"
          name="slug"
          value={pageDetails.slug}
          onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
          placeholder="Enter name of slug"
        />

        <button type="submit" onClick={handleCreatePage}>Create New Page</button>
      </form>

      <ul>
        {slugs}
      </ul>
      <div />
    </div>
  );
}
