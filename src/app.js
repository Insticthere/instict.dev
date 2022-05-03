import React from "react"
import Nav from "./components/navbar.js"
import About from "./components/about.js"
// import Blog from "./components/blogs/Blog"
import Project from "./components/projects/project.js"
import "./components/index.css"

function App() {
  return (
    <div className="bluez">
            <Nav />
            <main className="top-div top">
                    <About />
                <div>
                    {/* <Blog /> */}
                    <Project />
                </div>
            </main>
    </div>
  );
};

export default App;
