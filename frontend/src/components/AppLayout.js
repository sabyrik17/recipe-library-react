import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FeedbackBanner from "./FeedbackBanner";

export default function AppLayout() {
  return (
    <>
      <Header />
      <FeedbackBanner />
      <Outlet />
      <Footer />
    </>
  );
}
