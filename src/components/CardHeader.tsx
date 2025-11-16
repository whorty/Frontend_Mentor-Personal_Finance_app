type Header = {
  theme: string;
  name: string;
  children?: React.ReactNode;
};

export default function CardHeader({ theme, name, children }: Header) {
  return (
    <>
      <div className="potCard-info">
        <div className="ball" style={{ backgroundColor: theme }}></div>
        <h2>{name}</h2>
        {/* <button>
          <img src={ellipsis} alt="elipsis icons for options" />
        </button> */}
        {children}
      </div>
    </>
  );
}
