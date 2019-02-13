import React from 'react'
import { Button } from 'react-bootstrap'

import { CarItem } from '../carItem.jsx'

export const ModalContentTrolley = ({ trolley, buyCar }) => {
  return (
    <>
    <ul>
      {
        trolley.map((carData, index) => {
          return <li key={index}>
            <CarItem showCarDetails={() => {}} {...carData} buyCar={buyCar} />
          </li>
        })
      }
      <Button className="btn-success" onClick={buyCar} >Оформить Заказ</Button>
    </ul>
    </>
  )
}
