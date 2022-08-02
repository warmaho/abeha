import React, { useState, useContext } from 'react'
import { AppContext } from './context'
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card'
import Cart from './Cart'

const Dropzone = (props: { status: number }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const context = useContext(AppContext)
  const dispatch = useDispatch()
  const data = useSelector((state: { data: any; }) => state.data)
  const cart = useSelector((state: { cart: any; }) => state.cart)
  const handleDragEnter = e => {
    setIsDraggingOver(true)
  }
  const handleDragLeave = e => {
    setIsDraggingOver(false)
  }
  const handleDragOver = e => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragEnd = e => {
    setIsDraggingOver(false)
  }

  const handleDrop = e => {
    const uid = parseInt(e.dataTransfer.getData('uid'), 10)
    const id = e.dataTransfer.getData('id')
    setIsDraggingOver(false)
    context.changeCardStatus(uid, props.status)
    dispatch({type: 'CART', payload: [...cart, id]})
  }

  const clickCart = (uid: any, id:any) => {
    context.changeCardStatus(uid, props.status===1?2:1)
    dispatch({type: 'CART', payload: [...cart, id]})
  }
  const clickClear = (status) => {
    context.changeCartStatus(status)
    dispatch({type: 'CART', payload: []})
  }


  React.useEffect(()=>{
    if(data.length>0){
      data.forEach((e)=>{
        if(cart.includes(e.id)){
          e.status=1;
        }
      })
      console.log("data")
      console.log(data.filter(e=>e.status===1))
      context.setCards(data)
    }
  },[data])
  React.useEffect(()=>{
    console.log(cart)
  },[cart])
  return (
    <div
      className={`dropzone ${isDraggingOver ? 'is-dragging' : ''}`}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      onDragEnd={e => handleDragEnd(e)}
    >
      {props.status===1?
          <Cart items={context.cards.filter(e=>e.status===1)} clickClear={clickClear}/>:
      context.cards
        .filter(card => card.status === props.status)
        .map(card => (
            card.status===2 &&
            <Card key={card.uid} {...card} clickCart={clickCart} />
        ))
      }
    </div>
  )
}

export default Dropzone
