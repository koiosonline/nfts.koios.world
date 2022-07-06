const Hamburger = ({ handleToggle, props }: any) => {
  return (
    <div className={"flex items-center justify-center md:hidden"}>
      <button
        className={`hamburger hamburger--criss-cross ${props ? "active" : ""}`}
        type="button"
        onClick={handleToggle}
      >
        <div className="inner">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>
    </div>
  );
};

export default Hamburger;
