import React from "react"

function Blog() {
  return (
    <div className='blog flex'>
      <h2 className='blogheading'>Blogs</h2>
      <a href="blog-1">
          <article className='blogs'>
          <div>
            <time className='time'>12 January 2022</time>
          </div>
            <h2 className="blogtitle">Mozilla Firefox</h2>
            <p className='blogabout'>Mozilla Firefox is an open-source web browser developed by Mozilla. Firefox has been the second most popular web browser since January, 2018.</p>
          </article>
      </a>
      <a href="blog-1">
          <article className='blogs'>
          <div>
            <time className='time'>12 January 2022</time>
          </div>
            <h2 className="blogtitle">Mozilla Firefox</h2>
            <p className='blogabout'>Mozilla Firefox is an open-source web browser developed by Mozilla. Firefox has been the second most popular web browser since January, 2018.</p>
          </article>
      </a>
    </div>
  );
}

export default Blog;
