function Asset({ data }) {
  switch (data.type) {
    case 'image':
      return (<img src={data.url} alt="example" style={{ height: '200px' }} />);
    case 'video':
      return (
        <video
          src={data.url}
          style={{ height: '200px' }}
          alt="example"
          controls
        />
      );
    default:
      return (
        <object
          data={data.url}
          style={{ height: '200px' }}
          alt="example"
        />
      );
  }
}
export default Asset;
