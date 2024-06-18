import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile';

export default function Dashboard() {
  const [tab, setTab] = useState();
  const Location = useLocation();
  useEffect(() => {
    const urlParam = new URLSearchParams(Location.search);
    const tabFromURL = urlParam.get("tab");
    if (tabFromURL) setTab(tabFromURL);
  }, [Location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
}
