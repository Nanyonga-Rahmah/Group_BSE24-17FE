import {  Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import ArticlePage from "./pages/article-page";
import WriteArticle from "./pages/write-article";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import MyArticles from "./pages/my-articles";
import ViewArticle from "./pages/view-article";
import { Toaster } from '@/components/ui/sonner';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getStatus = localStorage.getItem("IsLoggedIn");

    if (getStatus === "true") {
      const user = true;
      setIsLoggedIn(user);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <>
          <Toaster />

      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage status={isLoggedIn} />}></Route>
          <Route
            path="/article-page"
            element={<ArticlePage status={isLoggedIn} />}
          />
          <Route
            path="/write-article"
            element={<WriteArticle status={isLoggedIn} />}
          />
          <Route path="/profile" element={<Profile status={isLoggedIn} />} />
          <Route
            path="/my-articles"
            element={<MyArticles status={isLoggedIn} />}
          />

          <Route
            path="/view-article"
            element={<ViewArticle status={isLoggedIn} />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
