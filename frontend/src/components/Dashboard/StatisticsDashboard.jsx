import React, { useState, useEffect } from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box, 
  CircularProgress,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import { format } from 'date-fns';

const StatisticsDashboard = () => {
  const [stats, setStats] = useState({ Statiques: {}, DateStats: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/statics');
        if (!response.ok) throw new Error('Échec de la récupération des statistiques');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const processChartData = (data) => {
    return data.map(item => ({
      date: format(new Date(item.date), 'MMM dd, yyyy'),
      count: item.count
    }));
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress size={60} />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Typography color="error" variant="h6">Erreur : {error}</Typography>
    </Box>
  );

  // Préparation des données pour les graphiques
  const totalCounts = [
    { label: 'les villes', value: stats.Statiques.CityCount || 0, color: '#d49aa1' },
    { label: 'les sous villes', value: stats.Statiques.SubcityCount || 0, color: '#f28e2b' },
    { label: 'les services', value: stats.Statiques.ServiceCount || 0, color: '#ff9551' },
    { label: 'les sous services', value: stats.Statiques.SubserviceCount || 0, color: '#d4b88f' },
    { label: 'les utilisateurs', value: stats.Statiques.UserCount || 0, color: '#e07d3d' },
    { label: 'les blogs', value: stats.Statiques.BlogCount || 0, color: '#e07d5d' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Tableau de Bord des Statistiques
      </Typography>
      
      {/* Cartes de résumé */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {totalCounts.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: item.color }}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Graphiques de croissance */}
      <Grid container spacing={2}>
        {/* Graphique à barres des totaux */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Aperçu du Contenu Total
            </Typography>
            <Box sx={{ height: 400 }} >
              <BarChart
                xAxis={[{ 
                  scaleType: 'band', 
                  data: totalCounts.map(item => item.label),
                  tickLabelStyle: { angle: 45, textAnchor: 'start' }
                }]}
                series={[{
                  data: totalCounts.map(item => item.value),
                  color: totalCounts.map(item => item.color)
                }]}
                height={350}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Graphique circulaire de distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }} style={{width:'450px'}} >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Répartition du Contenu
            </Typography>
            <Box sx={{ height: 400 }}>
              <PieChart
                series={[{
                  data: totalCounts,
                  innerRadius: 40,
                  outerRadius: 120,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                }]}
                height={350}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Section Croissance Quotidienne */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Métriques de Croissance Quotidienne
      </Typography>
      
      <Grid container spacing={3}>
        {Object.entries(stats.DateStats || {}).map(([key, data]) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Ajoutés
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  xAxis={[{
                    scaleType: 'band',
                    data: processChartData(data).map(d => d.date),
                    tickLabelStyle: { fontSize: 12 },
                    label: 'Date'
                  }]}
                  series={[{
                    data: processChartData(data).map(d => d.count),
                    label: 'Nombre',
                    color: totalCounts.find(t => t.label.toLowerCase() === key)?.color || '#8884d8'
                  }]}
                  height={250}
                  width={400}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsDashboard;