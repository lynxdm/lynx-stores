import React from "react";
import { Link } from "react-router-dom";

function ErrorMessage({ title, link, redirectmsg, hero, reload }) {
  return (
    <main>
      <section
        className={hero ? "hero-section error-section" : "error-section"}
      >
        <h2 className='error-title'>{title}</h2>
        {reload ? (
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            {redirectmsg}
          </button>
        ) : (
          <Link to={`/${link}`}>{redirectmsg}</Link>
        )}
      </section>
    </main>
  );
}

export default ErrorMessage;
