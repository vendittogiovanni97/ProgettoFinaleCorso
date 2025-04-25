import { useTranslation } from "react-i18next";
import {Box, Typography} from "@mui/material";
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
  export default PaginaPrivacy;