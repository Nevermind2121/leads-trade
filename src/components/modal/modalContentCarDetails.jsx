import React from 'react'

import { CarItem } from '../carItem.jsx'

export const ModalContentCarDetails = (props) => {
  return (
    <>
      <CarItem showCarDetails={() => {}} showDescription={true} { ...props } />
    </>
  )
}
