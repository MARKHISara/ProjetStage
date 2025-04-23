import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaCity,
  FaListAlt,
  FaEnvelope,
  FaCog,
  FaQuestionCircle,
  FaUserPlus,
} from 'react-icons/fa';
import { Button } from '@mui/material';
import { useAuth } from "../../AuthContext";
import { enqueueSnackbar } from 'notistack';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userRole, setUserRole] = useState(null);

  const handleLogout = () => {
    logout();
    enqueueSnackbar('Déconnexion réussie.', { variant: 'info' });
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (!token ||!user ) {
      navigate("/login");
    } else {
      setUserRole(user.role);
    }
  }, [navigate]);

  const commonItems = [
    { to: "/dashboard", icon: <FaHome />, label: "DASHBOARD" },
  ];

  const serviceItems = [
    { to: "/dashboard/services", icon: <FaListAlt />, label: "NOS SERVICES" },
    { to: "/dashboard/subservices", icon: <FaEnvelope />, label: "SOUS SERVICES" },
  ];

  const villeItems = [
    { to: "/dashboard/villes", icon: <FaCity />, label: "NOS VILLES" },
    { to: "/dashboard/sousvilles", icon: <FaCity />, label: "NOS SOUSVILLES" },
  ];

  const blogItems = [
    { to: "/dashboard/blogList", icon: <FaQuestionCircle />, label: "BLOG",}
  ];

  const contenuItems = [
    { to: "/dashboard/descriptionList", icon: <FaCog />, label: "NOS CONTENUS" },
  ];

  const adminItems = [
    { to: "/dashboard/ajouter-utilisateur", icon: <FaUserPlus />, label: "AJOUTER UTILISATEUR" },
  ];

  const renderMenu = () => {
    let roleLinks = [...commonItems];

    switch (userRole) {
      case 'admin':
        roleLinks.push(...serviceItems, ...villeItems, ...blogItems, ...contenuItems, ...adminItems);
        break;
      case 'responsable_blog':
        roleLinks.push(...blogItems);
        break;
      case 'responsable_service':
        roleLinks.push(...serviceItems);
        break;
      case 'responsable_ville':
        roleLinks.push(...villeItems);
        break;
      case 'responsable_description':
        roleLinks.push(...contenuItems);
        break;
      default:
        break;
    }

    return roleLinks;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <div className="text-2xl font-bold mb-8 pl-5">
          <img src="../images/logo.png" alt="Logo" className="h-10" />
        </div>

        <nav className="space-y-3">
          {renderMenu().map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-gray-300 ${isActive ? 'text-[#ff9551]' : 'text-white'}`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ff9551',
              color: '#000',
              '&:hover': {
                backgroundColor: '#e07d3d',
              },
              mt: 2,
            }}
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
