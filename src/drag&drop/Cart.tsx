import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';

const CardxD = props => {

    const cart = useSelector((state: { cart: any; }) => state.cart)
  const handleDragStart = e => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('uid', props.uid)
  }
  return (
    <div
      className="card"
      onDragStart={e => {
        handleDragStart(e)
      }}
    >
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe"
                            sx={{ width: 80, height: 80, bgcolor:"transparent" }}>
                        <i className="fas fa-star" style={{color:'#005db9', height:"60px" ,width:"60px"}}></i>
                    </Avatar>
                }
                action={
                <div className="d-grid justify-content-center">
                    <Typography variant="subtitle1" color="secondary" component="div">
                        {cart.length} Pokemóns
                    </Typography>
                    <IconButton aria-label="settings" onClick={()=>props.clickClear(2)}>
                        <i className="fas fa-trash" style={{color:'#005db9', height:"20px" ,width:"20px"}}></i>
                    </IconButton>
                </div>

                }
                title={
                <Typography variant="h5" color="secondary" component="div">
                    Favoritos
                </Typography>
            }
                subheader="Arrastra aqui tus favoritos"
            />
        </Card>
        {cart.length>0 && cart.map((e)=>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 86, height: 86 }}
                                alt={e.name}
                                src={e?.sprites?.front_default} />
                        }
                        title={<Typography variant="subtitle1" color="secondary" component="div">
                            {e.name}
                        </Typography>}
                        subheader={<div>
                            <Typography variant="body1" component="div">
                                ID: {e.id}
                            </Typography>
                        </div>}
                    />
                </Card>
            )
        }
    </div>
  )
}

export default CardxD
