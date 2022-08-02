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
    e.dataTransfer.setData('id', props.id)
  }

  return (
    <div
      draggable={props.canAddToCart}
      className="card"
      onDragStart={e => {
        handleDragStart(e)
      }}
    >
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ width: 86, height: 86 }}
                        alt={props.name}
                        src={props.image} />
                }
                action={
                   props.canAddToCart &&
                    <IconButton aria-label="settings" onClick={()=>props.clickCart(props.uid, props.id)}>
                        <i className="fas fa-cart-plus"></i>
                    </IconButton>
                }
                title={<Typography variant="subtitle1" color="secondary" component="div">
                    {props.name}
                </Typography>}
                subheader={<div>
                    <Typography variant="body1" component="div">
                        Precio: {props.price}
                    </Typography>
                    <Typography variant="body1"  component="div">
                        {props.availabilityStatusDisplayValue}
                    </Typography>
                </div>}
            />
        </Card>
    </div>
  )
}

export default CardxD
