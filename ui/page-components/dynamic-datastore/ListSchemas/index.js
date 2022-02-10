import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

function ListSchema() {
  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    const [{ data, loading, error }, refetch] = useAxios(
      'https://reqres.in/api/users?delay=1',
    );
  }, []);

  return (
    <div>
      hello
    </div>
  );
}

export default ListSchema;
