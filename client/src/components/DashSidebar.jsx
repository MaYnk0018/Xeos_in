import React from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function DashSidebar() {
  const [tab, setTab] = useState();
  const location = useLocation(); 
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabFromURL = urlParam.get("tab");
    if (tabFromURL) setTab(tabFromURL);
  }, [location.search]);

  return (
    <div className="min-h-screen flex">
      <Sidebar className="w-full md:w-56 h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={"User"}
                labelColor="dark"
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
