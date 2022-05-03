import React from "react"
import Nav from "../../navbar";
import './blog-1.css'
import Blogtop from "../../blog-top";
function Blog1() {
  return (
  <div className="blog1 bluez">
      <Nav />
      <div className="blog-1-container">
      <Blogtop 
      title="Taking Portraits is cringe" 
      time="12 January 2022" 
      discription="or atleast some for me"
        />
          <div className="blog-1-content">
            <p className="blog1-text">Some people love to take portraits, self portrait to be specific, what do i hate about them? their cringeness.
                fine take portraits if you want to but i feel like looking at the camera is important rather than looking at a random object in the side, other than this weird effects and editing really is cringe.</p>
            <p className="blog1-text">Taking pictures of things such as nature, animals, food is fine and so is taking portraits. But this should be done in a way less cringe way, you look way cool trying not to be cringe.
                  Do i hate people who do that? No, its their choice their personality is more important that the type of Portraits they prefer</p>
            <p className="blog1-text">If you want to take portraits how about do it in a professional way? Look at the camera, dont use weird filters, try to be real.
                  People often also misunderstand the term portrait according to google<code> "a painting, drawing, photograph, or engraving of a person, especially one depicting only the face or head and shoulders."</code></p>
            <p className="blog1-text">If you take full body images and do cringe stuff in them its cringe anyways and i hate that as well, a good group photo is what you need
                  Images were made for memories not for you to look cool. This does not mean there only there for memories tho.</p> 
            <p className="blog1-text">If you want to take a selfie, you should take it in a professional way. Over all do what you want to do, but what you can try to do is be professional and try not to be cringe</p>
            <br></br>
            <p>So what? Nothing, just my opinion.</p>
          </div>
        </div>
  </div>
  );
}

export default Blog1;
