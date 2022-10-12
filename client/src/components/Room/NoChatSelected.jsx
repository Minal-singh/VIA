import svg from '../../static/texting.svg';

const NoChatSelected = () => {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center bg-img">
        <img src={svg} alt="" width="52%" height="50%" />
      </div>
      <div className="container-fluid d-flex justify-content-center m-4">
        <h1 style={{ fontFamily: "cursive" }}>No chat selected</h1>
      </div>
    </>
  );
};
export default NoChatSelected;
