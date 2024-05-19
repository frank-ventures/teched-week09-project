import "./shiny.css";

// This is a small animation, seen on the logged-in users 'profile edit' page. It's meant to indicate that the button at the top of the page is clickable.
export default function Shiny({ children }) {
  return (
    <div className="shiny-wrapper">
      {children}
      <div className="shiny-thing"></div>
    </div>
  );
}
