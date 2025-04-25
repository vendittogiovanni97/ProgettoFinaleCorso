import { useTranslation } from "react-i18next";
import {Box, Typography} from "@mui/material";

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
  export default PaginaAssistenza;