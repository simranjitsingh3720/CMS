import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ShowSchema() {
  const [q, setQ] = useState('');

  const router = useRouter();

  useEffect(() => {
    setQ(router.query.schmaId);
  }, [router.query.schmaId]);

  return (
    <div>
      {q}
    </div>
  );
}

export default ShowSchema;
