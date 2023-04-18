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
    e.dataTransfer.setData('info', JSON.stringify(props))
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
                        src={props.sprites.front_default} />
                }
                action={
                    <IconButton aria-label="settings" onClick={()=>props.clickCart(props.uid, props.id, props)}>
                        <i className="fas fa-plus"></i>
                    </IconButton>
                }
                title={<Typography variant="subtitle1" color="secondary" component="div">
                    {props.name}
                </Typography>}
                subheader={<div>
                    <Typography variant="body1" component="div">
                        ID: {props.id}
                    </Typography>
                </div>}
            />
        </Card>
    </div>
  )
}

export default CardxD
