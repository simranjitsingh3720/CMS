function Asset({ data }) {
  switch (data.type) {
    case 'image':
      return (<img src={data.url} alt="example" style={{ height: '200px' }} />);
    case 'video':
      return (
        <video
          style={{ height: '200px' }}
          alt="example"
          controls
        >
          <source src={data.url} type={data.type} />
        </video>
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
