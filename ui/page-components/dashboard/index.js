import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/page').then((res) => {
      setPages(res.data.data);
    });
  }, []);

  // const handleClick = (e) => {
  //   // e.preventDefault();
  //   const len = e.target.href.split('/').length;
  //   const slug = e.target.href.split('/')[len - 1];
  // };
  const slugs = pages.map((slug, key) => (
    <li key={key}>
      <a href={`${slug.slug}`}>{slug.slug}</a>
    </li>
  ));

  const handleCreatePage = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/createPage', pageDetails).then((res) => {
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
