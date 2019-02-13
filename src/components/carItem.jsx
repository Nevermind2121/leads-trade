import React from 'react'
import { Button } from 'react-bootstrap'

export const CarItem = ({ addToTrolley, showCarDetails, showDescription, image, title, description, price }) => {
  const carData = { image, title, description, price }
  return (
    <>
      <h3 onClick={() => showCarDetails(carData)} >{title}</h3>
      <img onClick={() => showCarDetails(carData)} className="img-thumbnail" src={image} />
      {showDescription && <p>{description}</p>}
      <br/>
      <span>Цена: $ {price}</span>
      <br />
      {
        addToTrolley && <Button className="btn-primary" onClick={() => addToTrolley(carData)}>Добавить в корзину</Button>
      }
    </>
  )
}
