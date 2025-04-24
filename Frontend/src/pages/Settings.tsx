import { useState } from "react";
import {
  ChevronRight,
  Globe,
  Palette,
  Bell,
  Lock,
  HelpCircle,
} from "lucide-react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import useThemeColors from "../styled/BarraSuperioreStyled";
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../language/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Home } from "@mui/icons-material";

type Tema = "chiaro" | "scuro" | "sistema";
type Lingua = "italiano" | "english" | "français" | "español";

const PaginaLingua = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguageContext();
  const lingue: Lingua[] = ["italiano", "english", "français", "español"];

  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        {t('language.title')}
      </Typography>
      <List>
        {lingue.map((lingua) => (
          <ListItemButton
            key={lingua}
            selected={language === lingua}
            onClick={() => changeLanguage(lingua)}
          >
            <ListItemText primary={lingua} />
            {language === lingua && <ChevronRight />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

const PaginaTema = () => {
  const { t } = useTranslation();
  const [temaSelezionato, setTemaSelezionato] = useState<Tema>("chiaro");
  const temi: { id: Tema; nome: string; descrizione: string }[] = [
    {
      id: "chiaro",
      nome: t('theme.light'),
      descrizione: t('theme.lightDesc'),
    },
    {
      id: "scuro",
      nome: t('theme.dark'),
      descrizione: t('theme.darkDesc'),
    },
    {
      id: "sistema",
      nome: t('theme.system'),
      descrizione: t('theme.systemDesc'),
    },
  ];

  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        {t('theme.title')}
      </Typography>
      <List>
        {temi.map((tema) => (
          <ListItemButton
            key={tema.id}
            selected={temaSelezionato === tema.id}
            onClick={() => setTemaSelezionato(tema.id)}
          >
            <ListItemText primary={tema.nome} secondary={tema.descrizione} />
            {temaSelezionato === tema.id && <ChevronRight />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

const PaginaNotifiche = () => {
  const { t } = useTranslation();
  const [notificheAttive, setNotificheAttive] = useState(true);
  const [suoniAttivi, setSuoniAttivi] = useState(true);
  const [notificheDisattivate, setNotificheDisattivate] = useState(false);
  const [suoniDisattivati, setSuoniDisattivati] = useState(false);

  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        {t('notifications.title')}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={t('notifications.notifications')} />
          <input
            type="checkbox"
            checked={notificheAttive}
            onChange={() => setNotificheAttive(!notificheAttive)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={t('notifications.sounds')} />
          <input
            type="checkbox"
            checked={suoniAttivi}
            onChange={() => setSuoniAttivi(!suoniAttivi)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={t('notifications.disableAll')} />
          <input
            type="checkbox"
            checked={notificheDisattivate}
            onChange={() => setNotificheDisattivate(!notificheDisattivate)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={t('notifications.disableSounds')} />
          <input
            type="checkbox"
            checked={suoniDisattivati}
            onChange={() => setSuoniDisattivati(!suoniDisattivati)}
          />
        </ListItem>
      </List>
    </Box>
  );
};

const PaginaPrivacy = () => {
  const { t } = useTranslation();
  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        {t('privacy.title')}
      </Typography>
      <Typography>
        {t('privacy.description')}
      </Typography>
    </Box>
  );
};

const PaginaAssistenza = () => {
  const { t } = useTranslation();
  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        {t('assistance.title')}
      </Typography>
      <Typography>
        {t('assistance.description')}
      </Typography>
    </Box>
  );
};

export default function PaginaImpostazioni() {
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
