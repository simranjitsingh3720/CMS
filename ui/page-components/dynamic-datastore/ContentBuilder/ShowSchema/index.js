import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

function ShowSchema() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [{ data, loading, error }, getSchema] = useAxios(
    {
      method: 'GET',
      url: `http://localhost:8000/api/schema/${schemaSlug}`,
    },
    { manual: true },
  );

  useEffect(() => {
    if (schemaSlug) {
      getSchema();
    }
  }, [schemaSlug]);

  if (data) {
    console.log(data);
  }

  return (
    <div>
      {JSON.stringify(data)}
      {' '}
      HELLO
    </div>
  );
}

export default ShowSchema;
