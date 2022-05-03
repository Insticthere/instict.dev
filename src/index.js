import { createRoot } from 'react-dom/client';
import React from 'react'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import App from "./app.js"
import Blog1 from './components/blogs/blog-1/blog-1.js';
import Unnie from './components/projects/unnie/unnie.js';
import I from './components/I.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="blog-1" element={<Blog1 />} />
            <Route path="unnie" element={<Unnie />} />
            <Route path="I" element={<I />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>);