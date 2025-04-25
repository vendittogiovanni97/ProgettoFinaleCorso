import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from '../../../language/LanguageContext';
import { ChevronRight } from "lucide-react";

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

export default PaginaLingua;