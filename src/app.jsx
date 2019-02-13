import React, { Component } from 'react'
import store from 'store'

import { Header } from './components/header.jsx'
import { CarList } from './components/carList.jsx'
import { ModalWindow } from './components/modal/modal.jsx'
import { FilterBar } from './components/filterBar.jsx'
import { ModalContentCarDetails } from './components/modal/modalContentCarDetails.jsx'
import { ModalContentTrolley } from './components/modal/modalContentTrolley.jsx'
import { ModalContentUserData } from './components/modal/modalContentUserData.jsx'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      modalData: {},
      cars: [],
      filteredCars: [],
      minPrice: 0,
      maxPrice: 0,
      filterName: '',
      itemsInTrolley: 0,
      totalPrice: 0,
    }

    this.showCarDetails = this.showCarDetails.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.showTrolley = this.showTrolley.bind(this)
    this.updateCars = this.updateCars.bind(this)
    this.buyCar = this.buyCar.bind(this)
    this.updateTrolleyData = this.updateTrolleyData.bind(this)
    this.addToTrolley = this.addToTrolley.bind(this)
    this.buyCarFinish = this.buyCarFinish.bind(this)
  }

  componentDidMount() {
    fetch('./src/cars.json')
    .then(data => data.json())
    .then(cars => this.setState({ cars, filteredCars: cars }))

    this.updateTrolleyData()
  }

  updateCars(filteredCars) {
    this.setState({ filteredCars })
  }

  showCarDetails(carData) {
    const modalData = <ModalContentCarDetails addToTrolley={this.addToTrolley} {...carData} />
    this.setState({ showModal: true, modalData, modalHeading: carData.title })
  }

  handleCloseModal() {
    this.setState({ showModal: false, modalData: '' })
  }

  showTrolley() {
    const trolley = store.get('trolley')
    if (trolley && trolley.length) {
      const modalData = <ModalContentTrolley buyCar={this.buyCar} trolley={trolley} />
      this.setState({ showModal: true, modalData, modalHeading: 'Корзина' })
    }
  }

  addToTrolley(car) {
    const oldTrolley = store.get('trolley') || []
    store.set('trolley', [...oldTrolley, car])
    this.updateTrolleyData()
  }

  buyCar() {
    const modalData = <ModalContentUserData buyCarFinish={this.buyCarFinish}  />
    this.setState({ modalData })
  }

  buyCarFinish() {
    store.set('trolley', [])
    this.updateTrolleyData()
  }

  updateTrolleyData() {
    const trolley = store.get('trolley') || []
    const itemsInTrolley = trolley.length
    const totalPrice = trolley.reduce((acc, car) => acc + car.price, 0)
    this.setState({ itemsInTrolley, totalPrice })
  }

  render() {
    return (
      <>
        <Header 
          showTrolley={this.showTrolley} 
          itemsInTrolley={this.state.itemsInTrolley} 
          totalPrice={this.state.totalPrice} 
        />
        <div className="container" >
          {
            this.state.cars.length > 0 && 
            <FilterBar 
              updateCars={this.updateCars} 
              cars={this.state.cars} 
            />
          }
          <br/>
          <CarList 
            addToTrolley={this.addToTrolley} 
            showCarDetails={this.showCarDetails} 
            cars={this.state.filteredCars} 
          />
        </div>
        <ModalWindow 
          modalHeading={this.state.modalHeading} 
          modalData={this.state.modalData} 
          show={this.state.showModal} 
          handleClose={this.handleCloseModal} 
        />
      </>
    )
  }
}
