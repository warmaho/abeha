import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Image from "next/image";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    const [searchWord, setSearchWord] = React.useState('');
    const [alert, setAlert] = React.useState('d-none');
    const [alert2, setAlert2] = React.useState('d-flex');
    const dispatch = useDispatch()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event.target.value);
        if(event.target.value!==''){
            setAlert('d-none')
            setAlert2('d-flex')
        }
    };
    const search = () => {
        if(searchWord===''){
            setAlert('d-flex')
            setAlert2('d-none')
        }
        dispatch({type: 'DATA', payload: []})
        dispatch({type: 'SEARCH', payload: searchWord})
        setSearchWord('');
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Image src="/images/logo.png" width={200} height={80}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Finder
                    </Typography>
                    <Alert variant="outlined" severity="warning" className={alert}>
                        Ingresa un termino de busqueda
                    </Alert>
                    <Alert variant="outlined" severity="info" className={alert2}>
                       Busca algún pokemón para empezar
                    </Alert>
                    <Search>
                        <SearchIconWrapper >
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChange}
                            value={searchWord}
                        />
                        <Button variant="contained" onClick={search}>
                            Buscar
                        </Button>


                    </Search>

                </Toolbar>
            </AppBar>

        </Box>
    );
}