import Dashboard from "./Dashboard";
import Complaints from "./Complaints";
import Certificates from "./Certificates";
import Bills from "./Bills";
import Profile from "./Profile";
import StaggeredMenu from "../components/StaggeredMenu/StaggeredMenu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Portal() {
  const navigate = useNavigate();
  const [menuButtonColor, setMenuButtonColor] = useState("#111");

  const menuItems = [
    {
      label: "Dashboard",
      action: () =>
        document.getElementById("dashboard")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      label: "Complaints",
      action: () =>
        document.getElementById("complaints")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      label: "Certificates",
      action: () =>
        document.getElementById("certificates")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      label: "Bills",
      action: () =>
        document.getElementById("bills")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      label: "Profile",
      action: () =>
        document.getElementById("profile")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      label: "Logout",
      action: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const dashboard = document.getElementById("dashboard");
      const complaints = document.getElementById("complaints");
      const bills = document.getElementById("bills");
      const profile = document.getElementById("profile");

      const scroll = window.scrollY;

      let darkSection = false;

      // Dashboard black content
      if (scroll >= 290 && scroll <= 1235) {
        darkSection = true;
      }

      // Complaints dark content
      if (scroll >= 1600 && scroll <= 2170) {
        darkSection = true;
      }

      // Bills
      if (scroll >= bills.offsetTop && scroll <= bills.offsetTop + bills.offsetHeight) {
        darkSection = true;
      }

      // Profile
      if (scroll >= profile.offsetTop && scroll <= profile.offsetTop + profile.offsetHeight) {
        darkSection = true;
      }

      setMenuButtonColor(darkSection ? "#fff" : "#111");


    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StaggeredMenu
        position="left"
        items={menuItems}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor={menuButtonColor}
        openMenuButtonColor={menuButtonColor}
        changeMenuColorOnOpen={false}
        colors={["#B497CF", "#5227FF"]}
        accentColor="#5227FF"
      />
      <div id="dashboard">
        <Dashboard />
      </div>

      <div id="complaints">
        <Complaints />
      </div>

      <div id="certificates">
        <Certificates />
      </div>

      <div id="bills">
        <Bills />
      </div>

      <div id="profile">
        <Profile />
      </div>
    </>
  );
}

export default Portal;