import { useTranslation } from "react-i18next";
import { useState } from "react";
import useThemeColors from "../../styled/BarraSuperioreStyled";
import { useNavigate } from "react-router-dom";
import { Globe, Palette, Bell, Lock, HelpCircle} from "lucide-react";
import PaginaLingua from "./components/PageLanguages";
import PaginaTema from "./components/PageTheme";
import PaginaNotifiche from "./components/PageNotification";
import PaginaPrivacy from "./components/PagePrivacy";
import PaginaAssistenza from "./components/PageAssistance";
import { Box, Drawer, Typography, List,ListItemButton, ListItemIcon, ListItemText, Button} from "@mui/material";
import { Home } from "@mui/icons-material";

function PaginaImpostazioni() {
    const { t } = useTranslation();
    const [paginaAttiva, setPaginaAttiva] = useState("lingua");
    const themeColors = useThemeColors();
    const navigate = useNavigate();
  
    const menuItems = [
      { id: "lingua", nome: t('settings.language'), icona: <Globe size={20} /> },
      { id: "tema", nome: t('settings.theme'), icona: <Palette size={20} /> },
      { id: "notifiche", nome: t('settings.notifications'), icona: <Bell size={20} /> },
      { id: "privacy", nome: t('settings.privacy'), icona: <Lock size={20} /> },
      { id: "assistenza", nome: t('settings.assistance'), icona: <HelpCircle size={20} /> },
    ];
  
    const renderPagina = () => {
      switch (paginaAttiva) {
        case "lingua":
          return <PaginaLingua />;
        case "tema":
          return <PaginaTema />;
        case "notifiche":
          return <PaginaNotifiche />;
        case "privacy":
          return <PaginaPrivacy />;
        case "assistenza":
          return <PaginaAssistenza />;
        default:
          return <PaginaLingua />;
      }
    };
  
    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: themeColors.backgroundLight,
              color: themeColors.textLight,
            },
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <Typography variant="h6" sx={{ mt: 15, mb: 5, mx: 3, p:0}}>
              {t('app.settings')}
            </Typography>
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.id}
                  selected={paginaAttiva === item.id}
                  onClick={() => setPaginaAttiva(item.id)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: themeColors.primary,
                      color: themeColors.textLight,
                      '&:hover': {
                        backgroundColor: themeColors.primary,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icona}
                  </ListItemIcon>
                  <ListItemText primary={item.nome} />
                </ListItemButton>
              ))}
            </List>
            <Button
              startIcon ={<Home/>}
              onClick={() => navigate('/dashboard')}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2,
                color: themeColors.textLight,
                fontSize: '15px',
                '&:hover': {
                  backgroundColor: (themeColors.primary, 0.15),
                },
              }}
            > Home </Button>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: themeColors.backgroundLight }}>
          {renderPagina()}
        </Box>
      </Box>
    );
  }
  export default PaginaImpostazioni;
  