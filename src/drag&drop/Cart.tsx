import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardxD = props => {
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
                        <i className="fas fa-shopping-cart" style={{color:'#005db9', height:"60px" ,width:"60px"}}></i>
                    </Avatar>
                }
                action={
                <div className="d-grid justify-content-center">
                    <Typography variant="subtitle1" color="secondary" component="div">
                        {props.items.length} Articulos
                    </Typography>
                    <IconButton aria-label="settings" onClick={()=>props.clickClear(2)}>
                        <i className="fas fa-trash" style={{color:'#005db9', height:"20px" ,width:"20px"}}></i>
                    </IconButton>
                </div>

                }
                title={
                <Typography variant="h5" color="secondary" component="div">
                    Carrito de compras
                </Typography>
            }
                subheader="Arrastra aqui los productos"
            />
        </Card>
    </div>
  )
}

export default CardxD
