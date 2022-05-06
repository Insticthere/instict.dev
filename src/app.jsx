import React from "react"
import Nav from "./components/navbar.jsx"
import About from "./components/about.jsx"
// import Blog from "./components/blogs/Blog"
import Project from "./components/projects/project.jsx"
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
