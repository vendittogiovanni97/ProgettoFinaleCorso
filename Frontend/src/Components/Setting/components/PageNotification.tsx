import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText} from "@mui/material";

const PaginaNotifiche = () => {
    const { t } = useTranslation();
    const [notificheAttive, setNotificheAttive] = useState(true);
    const [suoniAttivi, setSuoniAttivi] = useState(true);

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
        </List>
      </Box>
    );
  };
  export default PaginaNotifiche;