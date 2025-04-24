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

type Tema = "chiaro" | "scuro" | "sistema";
type Lingua = "italiano" | "english" | "français" | "español";

const PaginaLingua = () => {
  const [linguaSelezionata, setLinguaSelezionata] = useState<Lingua>("italiano");
  const lingue: Lingua[] = ["italiano", "english", "français", "español"];

  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        Impostazioni Lingua
      </Typography>
      <List>
        {lingue.map((lingua) => (
          <ListItemButton
            key={lingua}
            selected={linguaSelezionata === lingua}
            onClick={() => setLinguaSelezionata(lingua)}
          >
            <ListItemText primary={lingua} />
            {linguaSelezionata === lingua && <ChevronRight />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

const PaginaTema = () => {
  const [temaSelezionato, setTemaSelezionato] = useState<Tema>("chiaro");
  const temi: { id: Tema; nome: string; descrizione: string }[] = [
    {
      id: "chiaro",
      nome: "Tema Chiaro",
      descrizione: "Tema chiaro con testo scuro",
    },
    {
      id: "scuro",
      nome: "Tema Scuro",
      descrizione: "Tema scuro con testo chiaro",
    },
    {
      id: "sistema",
      nome: "Tema di Sistema",
      descrizione: "Tema basato sulle impostazioni di sistema",
    },
  ];

  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        Impostazioni Tema
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
  const [notificheAttive, setNotificheAttive] = useState(true);
  const [suoniAttivi, setSuoniAttivi] = useState(true);
  const [notificheDisattivate, setNotificheDisattivate] = useState(false);
  const [suoniDisattivati, setSuoniDisattivati] = useState(false);

  return (
    <Box p={10}>
      <Typography variant="h5" gutterBottom>
        Impostazioni Notifiche
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Notifiche" />
          <input
            type="checkbox"
            checked={notificheAttive}
            onChange={() => setNotificheAttive(!notificheAttive)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Suoni" />
          <input
            type="checkbox"
            checked={suoniAttivi}
            onChange={() => setSuoniAttivi(!suoniAttivi)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Disattiva tutte le notifiche" />
          <input
            type="checkbox"
            checked={notificheDisattivate}
            onChange={() => setNotificheDisattivate(!notificheDisattivate)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Disattiva suoni" />
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

const PaginaPrivacy = () => (
  <Box p={10}>
    <Typography variant="h5" gutterBottom>
      Privacy e Sicurezza
    </Typography>
    <Typography>
      Modifica le impostazioni relative a privacy e sicurezza.
    </Typography>
  </Box>
);

const PaginaAssistenza = () => (
  <Box p={10}>
    <Typography variant="h5" gutterBottom>
      Assistenza
    </Typography>
    <Typography>
      Contatta il supporto o consulta le FAQ.
    </Typography>
  </Box>
);

export default function PaginaImpostazioni() {
  const [paginaAttiva, setPaginaAttiva] = useState("dashboard");
  const themeColors = useThemeColors();

  const menuItems = [
    { id: "lingua", nome: "Lingua", icona: <Globe size={20} /> },
    { id: "tema", nome: "Tema", icona: <Palette size={20} /> },
    { id: "notifiche", nome: "Notifiche", icona: <Bell size={20} /> },
    { id: "privacy", nome: "Privacy", icona: <Lock size={20} /> },
    { id: "assistenza", nome: "Assistenza", icona: <HelpCircle size={20} /> },
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
          <Typography variant="h6" sx={{ p: 2 }}>
            Impostazioni
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
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: themeColors.backgroundLight }}>
        {renderPagina()}
      </Box>
    </Box>
  );
}
