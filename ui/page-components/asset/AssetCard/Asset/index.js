function Asset({ data }) {
  switch (data.type) {
    case 'image':
      return (
        <div style={{
          backgroundImage: `url(${data.url})`,
          height: '195px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        />
      );
    case 'video':
      return (
        <video
          src={data.url}
          style={{ height: '200px' }}
          alt={data.name}
          controls
        />
      );
    default:
      return (
        <img
          src={data.url}
          style={{ height: '200px' }}
          alt={data.name}
        />
      );
  }
}
export default Asset;
