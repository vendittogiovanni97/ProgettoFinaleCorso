import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Box, Typography, List, ListItemButton, ListItemText} from "@mui/material";
import { ChevronRight } from "lucide-react";

type Tema = "chiaro" | "scuro" | "sistema";

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
  export default PaginaTema;