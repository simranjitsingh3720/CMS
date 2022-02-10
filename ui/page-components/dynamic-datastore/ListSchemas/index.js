import React from 'react';
import useAxios from 'axios-hooks';
import SchemaCard from './SchemaCard';

function ListSchema() {
  const showSchema = () => {
  };
  const deleteSchema = () => {
    console.log('DELETE SCHEMA');
  };

  const [{ data, loading, error }, refetch] = useAxios(
    'http://localhost:8000/api/schema',
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      {data.list.map((schema) => <SchemaCard key={schema.id} schemaName={schema.slug} showSchema={showSchema} deleteSchema={deleteSchema} />)}
    </div>
  );
}

export default ListSchema;
