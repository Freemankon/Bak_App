const Section = ({ title, children }) => (
  <div className="mt-3">
    <h5>{title}</h5>
    <hr />
    <div>{children}</div>
  </div>
);

export default Section;
