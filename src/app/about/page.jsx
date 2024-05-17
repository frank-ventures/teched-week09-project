import "./about.css";

export default function AboutPage() {
  return (
    <>
      <h2>About this app</h2>
      <div className="about-container flex flex-col gap-8 w-8/12">
        <p>
          &ldquo;The Void&rdquo; has been made by Frankie Shrieves as part of
          the{" "}
          <a href="https://techeducators.co.uk/course/software-development-bootcamp">
            Software Development Bootcamp.
          </a>
        </p>
        <p>
          The Week Nine project was to create a full-stack application (a
          client, a server and a database) using Next.js, Clerk for
          authentication, and our choice of database{" "}
          <em>(Supabase in this example)</em>.
        </p>
        <p>
          This app allows you to create an account, post messages onto a feed...{" "}
        </p>
        <p>
          Frankies&apos; :
          <ul className="ml-5">
            <li>
              <a
                className="fancy-link"
                href="https://www.linkedin.com/in/frankie-shrieves/"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="fancy-link"
                href="https://github.com/frank-ventures"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="fancy-link "
                href="https://github.com/frank-ventures/teched-week09-project"
              >
                GitHub Repo for this project
              </a>
            </li>
          </ul>{" "}
        </p>
      </div>
    </>
  );
}
