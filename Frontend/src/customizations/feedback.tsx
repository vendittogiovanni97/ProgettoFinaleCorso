import { Theme, alpha, Components } from '@mui/material/styles';
import { gray, orange } from './themePrimitives';


const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: theme.palette.mode === 'dark' ? alpha(orange[900], 0.5) : orange[100],
        color: (theme.vars || theme).palette.text.primary,
        border: `1px solid ${theme.palette.mode === 'dark' ? alpha(orange[800], 0.5) : alpha(orange[300], 0.5)}`,
        '& .MuiAlert-icon': {
          color: orange[500],
        },
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: theme.palette.mode === 'dark' ? gray[800] : gray[200],
      }),
    },
  },
};

export default feedbackCustomizations;