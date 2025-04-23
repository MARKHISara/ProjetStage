import React, { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { FaRegLightbulb } from 'react-icons/fa';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assure-toi que React Router est configuré
import {useAuth} from "../../AuthContext"
import StatisticsDashboard from './StatisticsDashboard';
const DashboardContent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  
  useEffect(() => {
    const timer = setTimeout(() => {
      enqueueSnackbar(
        "Bienvenue dans le tableau de bord, vous pouvez gérer vos services et sous-services !",
        {
          variant: "success",
          autoHideDuration: 1000,
        }
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [enqueueSnackbar]);

  const handleLogout = () => {
    logout(); 
    enqueueSnackbar('Déconnexion réussie.', { variant: 'info' });
    navigate('/login');
  };

  return (
    <main className="flex-1 p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-black">
          Bienvenue sur le Tableau de Bord 
          <FaRegLightbulb className="inline-block text-[#ff9551] ml-2" />
        </h1>
      </div>
  
      {/* Introduction */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-[#ff9551]">
        <h2 className="text-xl font-semibold text-[#ff9551] mb-2">Vue d’Ensemble</h2>
        <p className="text-gray-800 text-lg">
          Ce tableau de bord vous offre un aperçu centralisé pour gérer le contenu et les fonctionnalités du site. 
          Vous avez accès à plusieurs modules essentiels pour le bon fonctionnement de la plateforme.
        </p>
      </div>
      <StatisticsDashboard />
      {/* Info cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#ffecd6] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black">Statistiques</h3>
          <p className="text-gray-700">Consultez des données globales sur l’activité du site, comme le nombre de visiteurs ou d’inscriptions.</p>
        </div>
        <div className="bg-[#f5f5f5] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black">Activité récente</h3>
          <p className="text-gray-700">Gardez un œil sur les ajouts récents, les modifications effectuées ou les dernières connexions.</p>
        </div>
        <div className="bg-[#ffe0c2] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black">Notifications</h3>
          <p className="text-gray-700">Soyez informé(e) des tâches en attente, des validations nécessaires ou des alertes du système.</p>
        </div>
      </div> */}
    </main>
  );
  
};

const DashboardLayout = () => {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <DashboardContent />
    </SnackbarProvider>
  );
};

export default DashboardLayout;
