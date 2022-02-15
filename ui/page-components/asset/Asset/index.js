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
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={data.url}
          />
        </video>
      );
    default:
      return (
        <img
          src={data.url}
          style={{ height: '200px' }}
          alt="example"
        />
      );
  }
}
export default Asset;
