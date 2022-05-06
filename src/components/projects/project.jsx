import React from "react"

function Project() {
  return (
    <div className='blog flex bluez'>
      <h2 className='blogheading'>Projects</h2>
      <a href="unnie">
          <article className='blogs'>
          <div>
            <time className='time'>24 april 2022</time>
          </div>
            <h2 className="blogtitle">Unnie</h2>
            <p className='blogabout'>An open source discord bot with fun, utility, moderation and more!</p>
          </article>
      </a>
      {/* <a href="blog-1">
          <article className='blogs'>
          <div>
            <time className='time'>12 January 2022</time>
          </div>
            <h2 className="blogtitle">Blog site</h2>
            <p className='blogabout'>This site your on right now!</p>
          </article>
      </a> */}
    </div>
  );
}

export default Project;
