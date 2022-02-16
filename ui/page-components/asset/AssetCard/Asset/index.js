function Asset({ data }) {
  switch (data.type) {
    case 'image':
      return (<img src={data.url} alt={data.name} style={{ height: '200px' }} />);
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
