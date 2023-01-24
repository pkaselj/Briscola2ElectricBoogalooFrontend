import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ILoginRequestDTO from '../../dto/login-request-dto';
import _localeService from '../../services/locale/locale-service';

const theme = createTheme();

interface IProps {
    onSubmit : (x : ILoginRequestDTO) => void
    main_image_url : string
    avatar_image_url : string
    children? : React.ReactNode
}

interface IState {
  username_text : string
  password_text : string
  sign_in_text : string
}

export default function LoginComponent({onSubmit, main_image_url, avatar_image_url, children} : IProps) {
  const [state, setState] = React.useState<IState | undefined>(undefined)
  React.useEffect(() => {
    const Load = async () => {
      const data : IState = {
        username_text: await _localeService.GetLocaleString('USERNAME'),
        password_text: await _localeService.GetLocaleString('PASSWORD'),
        sign_in_text: await _localeService.GetLocaleString('SIGN_IN')
      }

      setState(data)
    }
      Load()
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginRequestData : ILoginRequestDTO = {
        username: data.get('username')?.toString() ?? '' ,
        password: data.get('password')?.toString() ?? ''
    }

    onSubmit(loginRequestData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${main_image_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar src={avatar_image_url} />
            <Typography component="h1" variant="h5">
              BRISCOLA
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={state?.username_text ?? ''}
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={state?.password_text ?? ''}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {children}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {state?.sign_in_text ?? ''}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}