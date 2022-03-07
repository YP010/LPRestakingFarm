import React, { Component } from 'react'
import asterisk from '../asterisk.png'
import exlink from '../link.png'
import purse from '../purse.png'
import pancake from '../pancakeswap.png'
import bigInt from 'big-integer'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './App.css';

class Deposit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.state = {
      txValidAmount: false
    }
    this.state = {
      txDeposit: false
    }
    this.state = {
      txWithdraw: false
    }
    this.clickHandlerDeposit = this.clickHandlerDeposit.bind(this)
    this.clickHandlerWithdraw = this.clickHandlerWithdraw.bind(this)
  }

  changeHandler(event) {
    let result = !isNaN(+event); // true if its a number, false if not

    if (event == "") {
      this.setState({
        message: ''
      })
      this.setState({
        txValidAmount: false
      })
    } else if (result == false) {
      this.setState({
        message: 'Not a valid number'
      })
      this.setState({
        txValidAmount: false
      })
    } else if (event <= 0) {
      this.setState({
        message: 'Value need to be greater than 0'
      })
      this.setState({
        txValidAmount: false
      })
    } else {
      this.setState({
        message: ''
      })
      this.setState({
        txValidAmount: true
      })
    }
  }

  clickHandlerDeposit() {
    // console.log("clicked")
    this.setState({
      txDeposit: true,
      txWithdraw: false
    })
  }

  clickHandlerWithdraw() {
    // console.log("clicked")
    this.setState({
      txDeposit: false,
      txWithdraw: true
    })
  }

  render() {
    return (
      <div id="content" className="mt-0">
        <h2 className="center textWhite"><b>{this.props.poolSegmentInfo[this.props.n][this.props.i].token[this.props.farmNetwork]["symbol"]}-{this.props.poolSegmentInfo[this.props.n][this.props.i].quoteToken[this.props.farmNetwork]["symbol"]}</b></h2>
       
        <div className="center" style={{ color: 'silver' }}>&nbsp;Deposit <b>&nbsp;{this.props.poolSegmentInfo[this.props.n][this.props.i].token[this.props.farmNetwork]["symbol"]}-{this.props.poolSegmentInfo[this.props.n][this.props.i].quoteToken[this.props.farmNetwork]["symbol"]} LP Token&nbsp;</b> and earn PURSE!!!</div>
        <br />
        <div className="card mb-3 cardbody" >
          <div className="card-body">
            <div className='float-left'>
              <span className='dropdown' style={{ fontSize: '12px' }} onClick={() => {
                window.open(this.props.poolSegmentInfo[this.props.n][this.props.i].getLPLink, '_blank')
              }}> Get {this.props.poolSegmentInfo[this.props.n][this.props.i].token[this.props.farmNetwork]["symbol"]}-{this.props.poolSegmentInfo[this.props.n][this.props.i].quoteToken[this.props.farmNetwork]["symbol"]} <img src={exlink} className='mb-1' height='10' alt="" />
              </span>
              <span className='dropdown' style={{ fontSize: '12px' }} onClick={() => {
                window.open(this.props.poolSegmentInfo[this.props.n][this.props.i].lpContract, '_blank')
              }}> View Contract <img src={exlink} className='mb-1' height='10' alt="" />
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-sm float-right"
              style={{ maxWidth: '70px' }}
              onClick={(event) => {
                event.preventDefault()
                this.props.harvest(this.props.i, this.props.n)
              }}>
              <small>Harvest</small>
            </button>  <br />  <br />

            <table className="table table-borderless text-center" style={{ color: 'silver' }}>
              <thead>
                <tr>
                  <th scope="col">{this.props.poolSegmentInfo[this.props.n][this.props.i].token[this.props.farmNetwork]["symbol"]}-{this.props.poolSegmentInfo[this.props.n][this.props.i].quoteToken[this.props.farmNetwork]["symbol"]} LP Staked </th>
                  <th scope="col">PURSE Earned</th>
                </tr>
                <tr>
                  <th scope="col"><img src={pancake} height='30' alt="" /></th>
                  <th scope="col"><img src={purse} height='34' alt="" /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parseFloat(this.props.userSegmentInfo[this.props.n][this.props.i]).toLocaleString('en-US', { maximumFractionDigits: 5 })}</td>
                  <td>{parseFloat(this.props.pendingSegmentReward[this.props.n][this.props.i]).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td>
                </tr>
              </tbody>
            </table>


            <div className="card mb-4 cardbody" >
              <div className="card-body">
                {this.props.wallet || this.props.walletConnect ?
                <div>
                    <div>
                      <label className="float-left" style={{ color: 'silver' }}><b>Start Farming</b></label>
                      <span className="float-right" style={{ color: 'silver' }}>
                        <span>
                          LP Balance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {parseFloat(window.web3Bsc.utils.fromWei(this.props.lpTokenSegmentBalance[this.props.n][this.props.i].toString(), 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })}
                        </span>
                        <span><br />
                          PURSE Balance&nbsp;: {parseFloat(window.web3Bsc.utils.fromWei(this.props.purseTokenUpgradableBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })}
                        </span>
                      </span>
                    </div>
                    <br /><br /><br />

                    {this.props.lpTokenSegmentAllowance[this.props.n][this.props.i] > 100000000000000000000000000000 ?
                      <div>
                      <form className="mb-3" onSubmit={(event) => {
                        event.preventDefault()
                        if (this.state.txValidAmount === false) {
                          alert("Invalid input! PLease check your input again")
                        } else {
                          let amount = this.input.value.toString()
                          let amountWei = window.web3Bsc.utils.toWei(amount, 'Ether')
                          if (this.state.txDeposit === true && this.state.txWithdraw === false) {
                            if (bigInt(amountWei).value <= 0 ) {
                              alert("Amount cannot less than or equal to 0")
                            } else if (bigInt(amountWei).value > bigInt(this.props.lpTokenSegmentBalance[this.props.n][this.props.i]).value) {
                              alert("Not enough funds")
                            } else {
                              this.props.deposit(this.props.i, amountWei, this.props.n)
                            }
                          } else if (this.state.txDeposit === false && this.state.txWithdraw === true) {
                            if (bigInt(amountWei).value <= 0 ) {
                              alert("Amount cannot less than or equal to 0")
                            } else if (bigInt(amountWei).value > bigInt(window.web3Bsc.utils.toWei(this.props.userSegmentInfo[this.props.n][this.props.i], 'Ether')).value) {
                              alert("Withdraw tokens more than deposit LP tokens")
                            } else {
                              this.props.withdraw(this.props.i, amountWei, this.props.n)
                            }
                          }
                        }
                      }}>
                        <div className="input-group mb-4" >
                          <input
                            type="text"
                            style={{ color: 'silver', backgroundColor: '#28313b' }}
                            ref={(input) => { this.input = input }}
                            className="form-control form-control-lg cardbody"
                            placeholder="0"
                            onChange={(e) => {
                              const value = e.target.value;
                              this.changeHandler(value)
                            }}
                            required />
                          <div className="input-group-append">
                            <div className="input-group-text cardbody" style={{ color: 'silver' }}>
                              <img src={pancake} height='25' alt="" />
                              &nbsp;&nbsp;&nbsp; LP
                            </div>
                          </div>
                        </div >
                        <div style={{ color: 'red' }}>{this.state.message} </div>

                        <div className="rowC center">
                          <ButtonGroup>
                            <Button type="submit" className="btn btn-primary" onClick={(event) => {
                              this.clickHandlerDeposit()
                            }}>&nbsp;Deposit&nbsp;</Button>
                            <Button type="text" variant="outline-primary" className="btn" onClick={(event) => {
                              this.state.txValidAmount = true
                              this.state.message = ''
                              this.state.txDeposit = false
                              this.state.txWithdraw = false
                              this.input.value = window.web3Bsc.utils.fromWei(this.props.lpTokenSegmentBalance[this.props.n][this.props.i], 'Ether')
                            }}>Max</Button>&nbsp;&nbsp;&nbsp;
                          </ButtonGroup>
                          <ButtonGroup>
                            <Button type="submit" className="btn btn-primary" onClick={(event) => {
                              this.clickHandlerWithdraw()
                            }}>Withdraw</Button>
                            <Button type="text" variant="outline-primary" className="btn" onClick={(event) => {
                              this.state.txValidAmount = true
                              this.state.message = ''
                              this.state.txDeposit = false
                              this.state.txWithdraw = false
                              this.input.value = this.props.userSegmentInfo[this.props.n][this.props.i]
                            }}>Max</Button>&nbsp;&nbsp;&nbsp;
                          </ButtonGroup>
                        </div>
                      </form>
                      </div>
                      :
                      <div className="rowC center">
                        <button className="btn btn-primary btn-block" onClick={(event) => {
                          console.log("abc")
                          this.props.approve(this.props.i, this.props.n)
                        }}>Approve</button>
                      </div>
                    }</div>
                  :
                  <div className="rowC center">
                    <button className="btn btn-primary" onClick={async () => {
                      await this.props.connectWallet()
                    }}>Connect Wallet</button>
                  </div>
                }
              </div>
          </div>
        </div>
        </div>
        <div className="text-center" style={{ color: 'silver' }}><img src={asterisk} height='15' />&nbsp;<small>Every time you stake & unstake LP tokens, the contract will automatically harvest PURSE rewards for you!</small></div>
      </div>

    );
  }
}

export default Deposit;
