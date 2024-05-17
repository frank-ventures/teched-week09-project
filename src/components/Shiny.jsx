import "./shiny.css";

export default function Shiny({ children }) {
  return (
    <div className="shiny-wrapper">
      {children}
      <div className="shiny-thing"></div>
    </div>
  );
}
