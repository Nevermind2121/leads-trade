import React from 'react'

export const Header = ({ itemsInTrolley, totalPrice, showTrolley }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div onClick={showTrolley} > 
          <i  className="fas fa-shopping-cart"></i> &nbsp;
          кол-во: {itemsInTrolley}, 
          $ {totalPrice}
        </div>
      </div>
    </nav>
  )
}
