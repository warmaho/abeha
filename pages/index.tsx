import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import type { NextPage } from 'next';
import Header from '../src/Header';
import App from '../src/drag&drop/App'
import Chip from '@mui/material/Chip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux'
import Button from "@mui/material/Button";

const fetcher = async (query: string, search: string) =>
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query,  variables: {text:search} }),
    })
        .then((res) => res.json())
        .then((json) => json.data)

const Home: NextPage = () => {
    const search = useSelector((state: { search: any; }) => state.search)
    const [page, setPage] = useState(1)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const dataStorage = useSelector((state: { data: any; }) => state.data)
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    React.useEffect(()=>{
        const fetchData = async () => {
            try{
                if(search!==""){
                    let union=[];
                    setOpen(true)
                    const data = await fetcher('{ search { id, name, sprites { front_default } } } ',search)
                    setOpen(false)
                    union=[...dataStorage, data.search]
                    union.forEach((e:any,index: number)=> {
                        e.uid=index;
                        e.status = 2
                    })
                    let result = union.reduce((unique, o) => {
                        if(!unique.some(obj => obj.id === o.id && obj.name==="")) {
                            unique.push(o);
                        }
                        return unique;
                    },[]);
                    let result1 = result.filter((e)=>e.id!==null);
                    dispatch({type: 'DATA', payload: result1.filter(Boolean)})
                }
            }catch (e) {
                alert("No se encontro ese pokemón")
                dispatch({type: 'DATA', payload: []})
                dispatch({type: 'SEARCH', payload: ''})

            }

        }
        fetchData()
        activeScrollDetect()
    },[search, page])

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom) {
           setPage(page+1)
        }
    };
    function activeScrollDetect() {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }
    React.useEffect(() => {
        activeScrollDetect()
    }, []);

    return (
      <div className="container">
          <div className="w-100">
              <Header/>
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  onClick={handleClose}
              >
                  <CircularProgress color="inherit" />
              </Backdrop>
              <div className="p-2 second-bar">

                  <Button variant="contained" onClick={()=>window.location.reload()}>
                      Reiniciar
                  </Button>
                  {search!=="" && <Chip label={"Busqueda: "+search} variant="outlined" />}
              </div>
              <div>
                  <App />
              </div>

          </div>
      </div>

  )
}

export default Home;