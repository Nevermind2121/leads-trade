import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export class ModalContentUserData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cvv: '',
      accNumber: '',
      fullName: '',
      errorMessage: '',
      finish: false
    }

    this.submit = this.submit.bind(this)
    this.handleInputData = this.handleInputData.bind(this)
  }

  validateForm(userData) {
    const { cvv, accNumber, fullName } = userData
    if (cvv && cvv.length && accNumber && accNumber.length && fullName && fullName.length) return true
    return false
  }

  handleInputData(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  submit(e) {
    e.preventDefault()
    const { cvv, accNumber, fullName } = this.state
    const userData = { cvv, accNumber, fullName }
    if (this.validateForm(userData)) {
      this.setState({ finish: true })
      this.props.buyCarFinish()
    }
    else {
      this.setState({ errorMessage: 'Форма не заполнена, пожалуйста заполните форму' })
    }
  }

  render() {

    if (this.state.finish) return <h2>Спасибо за покупку!</h2>

    return (
      <form >
        {this.state.errorMessage && <h3 className="text-danger">{this.state.errorMessage}</h3>}
        <div className="form-group">
          <label htmlFor="#fullName"></label>
          <input className="form-control" value={this.state.fullName} onChange={this.handleInputData} id="fullName" placeholder="Mihail Gorceag" />
        </div>

        <div className="form-group">
          <label htmlFor="#accNumber"></label>
          <input className="form-control" value={this.state.accNumber} onChange={this.handleInputData} id="accNumber" type="text" placeholder="64fs3rddfd" />
        </div>

        <div className="form-group">
          <label htmlFor="#cvv"></label>
          <input className="form-control" value={this.state.cvv} onChange={this.handleInputData} id="cvv" type="text" placeholder="566" />
        </div>
        <Button onClick={this.submit} className="btn-success" >Купить</Button>
      </form>
    )
  }
}