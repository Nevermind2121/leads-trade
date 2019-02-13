import React, { Component } from 'react'

export class FilterBar extends Component {
  constructor(props) {
    super(props)

    const maxPrice = props.cars.reduce((acc, car) => {
      return (car.price > acc) ? car.price : acc
    }, 0)

    const minPrice = props.cars.reduce((acc, car) => {
      return (car.price < acc) ? car.price : acc
    }, maxPrice)

    this.state = {
      minPrice,
      maxPrice,
      filterName: '',
      cars: props.cars,
    }

    this.handleFilterMinPrice = this.handleFilterMinPrice.bind(this)
    this.handleFilterMaxPrice = this.handleFilterMaxPrice.bind(this)
    this.handleFilterNameChange = this.handleFilterNameChange.bind(this)
    this.filterCars = this.filterCars.bind(this)
  }

  handleFilterMinPrice(e) {
    const newPrice = e.target.value
    if (newPrice[0] === '0') return
    const minPrice = Number(newPrice)
    if (minPrice >= this.state.maxPrice) return
    this.setState({ minPrice })
    this.filterCars({ ...this.state, minPrice })
  }

  handleFilterMaxPrice(e) {
    const newPrice = e.target.value
    if (newPrice[0] === '0') return
    const maxPrice = Number(newPrice)
    if (maxPrice <= this.state.minPrice) return
    this.setState({ maxPrice })
    this.filterCars({ ...this.state, maxPrice })
  }

  handleFilterNameChange(e) {
    const filterName = e.target.value.toLowerCase()
    this.setState({ filterName })
    this.filterCars({ ...this.state, filterName })
  }

  filterCars(filterData) {
    const { minPrice, maxPrice, filterName } = filterData

    const filteredCars = this.state.cars
    .filter(car => car.title.toLowerCase().includes(filterName))
    .filter(car => car.price >= minPrice && car.price <= maxPrice)

    this.props.updateCars(filteredCars)
  }

  render () {
    const { filterName, minPrice, maxPrice } = this.state

    return (
      <>
        Название: <input type="text" value={filterName} onChange={this.handleFilterNameChange} /> &nbsp;
        Цена $: мин. <input type="number" value={minPrice} onChange={this.handleFilterMinPrice} />  &nbsp;
        макс. <input type="number" value={maxPrice} onChange={this.handleFilterMaxPrice} />
      </>
    )
  }
}
