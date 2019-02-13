import React, { Component } from 'react'

import { CarItem } from './carItem.jsx'

export class CarList extends Component {  
  render() {
    const { cars, addToTrolley } = this.props

    return (
      <ul className="car-list" >
        <div className="row" >
          {cars.map((car, index) => <li key={index} className="car-item col-xs-1 col-md-4" >
          <CarItem
            addToTrolley={addToTrolley}
            showCarDetails={this.props.showCarDetails}
            showDescription={false}
            keyIndex={index} {...car} 
          /></li>)}
        </div>
      </ul>
    )
  }
}
