import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import bigInt from 'big-integer'
import Popup from 'reactjs-popup'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import fox from '../metamask-fox.svg'
import walletconnectLogo from '../walletconnect-logo.svg'
import { IoStar } from 'react-icons/io5'
import ReactLoading from 'react-loading'

import './App.css';

class Stake extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: "",
      inputType: "PURSE",
      buttonName: "Stake",
      stakeColor: "#6A5ACD",
      withdrawColor: "",
      checkColor: "",
      txDeposit: true,
      txWithdraw: false,
      txCheck: false,
    }

    this.clickHandlerDeposit = this.clickHandlerDeposit.bind(this)
    this.clickHandlerWithdraw = this.clickHandlerWithdraw.bind(this)
    this.clickHandlerCheck = this.clickHandlerCheck.bind(this)

  }

  changeHandler(event) {
    let result = !isNaN(+event)
    let afterDot = event.split('.', 2)[1]
    let afterDotResult = true
    if (event % 1 != 0 && result == true) {
      if (afterDot.toString().length > 18) {
        afterDotResult = false
      } else {
        afterDotResult = true
      }
    }
    if (event.length >=2 && event[0]=='0' && event[1]!='.') {
      result = false
    }
    if (event[0]=="."){
      result = false
    }

    if (event == "") {
      this.setState({
        message: ""
      })
      this.setState({
        txValidAmount: false
      })
    } else if (result == false) {
      this.setState({
        message: "Not a valid number"
      })
      this.setState({
        txValidAmount: false
      })
    } else if (event <= 0) {
      this.setState({
        message: "Value needs to be greater than 0"
      })
      this.setState({
        txValidAmount: false
      })
    } else if (afterDotResult == false){
      this.setState({
        message: "Value cannot have more than 18 decimals"
      })
      this.setState({
        txValidAmount: false
      }) 
    } else {
      this.setState({
        message: ""
      })
      this.setState({
        txValidAmount: true
      })
    }
  }

  clickHandlerDeposit() {
    this.setState({
      txDeposit: true,
      txWithdraw: false,
      txCheck: false,
      inputType: 'PURSE',
      buttonName: "Stake",
      stakeColor: "#6A5ACD",
      withdrawColor: "",
      checkColor: "",
    })
  }

  clickHandlerWithdraw() {
    this.setState({
      txDeposit: false,
      txWithdraw: true,
      txCheck: false,
      inputType: 'Share',
      buttonName: "Withdraw",
      withdrawColor: "#6A5ACD",
      stakeColor: "",
      checkColor: "",
    })
  }

  clickHandlerCheck() {
    this.setState({
      txDeposit: false,
      txWithdraw: false,
      txCheck: true,
      inputType: 'Share',
      buttonName: "Check",
      withdrawColor: "",
      stakeColor: "",
      checkColor: "#6A5ACD"
    })
  }

  render() {
    let purseStakingUserReceipt = this.props.purseStakingUserReceipt
    let purseTokenUpgradableBalance = this.props.purseStakingUserPurse
    let purseStakingUserStake = this.props.purseStakingUserStake
    let purseStakingUserAllowance = this.props.purseStakingUserAllowance
    let purseStakingTotalStake = this.props.purseStakingTotalStake
    let purseStakingTotalReceipt = this.props.purseStakingTotalReceipt
    const contentStyle = { background: '#353A40', border: "1px solid #596169", width:"50%", minWidth:"320px"};

    return (
      <div id="content" className="mt-4">
        <label className="textWhite center mb-5" style={{fontSize:"40px", textAlign:"center"}}><big><b>PURSE Staking</b></big></label>

        {this.props.wallet || this.props.walletConnect ?
          <form className="mb-0" onSubmit={async (event) => {
            event.preventDefault()
            if (this.state.txValidAmount === false) {
              alert("Invalid input! Please check your input again")
            } else {
              if (this.state.txDeposit === true && this.state.txWithdraw === false && this.state.txCheck === false) {
                let amount = this.input.value.toString()
                let amountWei = window.web3Bsc.utils.toWei(amount, 'Ether')
                if (bigInt(amountWei).value > bigInt(purseTokenUpgradableBalance).value) {
                  alert("Insufficient PURSE to stake!")
                } else {
                  this.props.stake(amountWei)
                }               
              } else if (this.state.txDeposit === false && this.state.txWithdraw === true && this.state.txCheck === false) {
                let receipt = this.input.value.toString()
                let receiptWei = window.web3Bsc.utils.toWei(receipt, 'Ether')
                if (bigInt(receiptWei).value > bigInt(purseStakingUserReceipt).value) {
                  alert("Insufficient Share to withdraw!")
                } else {
                  this.props.unstake(receiptWei)
                }
              } else if (this.state.txDeposit === false && this.state.txWithdraw === false && this.state.txCheck === true) {
                  let receipt = this.input.value.toString()
                  let receiptWei = window.web3Bsc.utils.toWei(receipt, 'Ether')
                if (bigInt(receiptWei).value > bigInt(purseStakingUserReceipt).value) {
                  alert("Insufficient Share to withdraw!")
                } else {
                  let checkPurseAmount = await this.props.checkPurseAmount(receiptWei)
                  let getPurseAmount = receipt + " Share : " + checkPurseAmount  + " PURSE (" + parseFloat(checkPurseAmount*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"
                  this.setState({ getPurseAmount })
                  let purseMessage = "PURSE Staking:"
                  this.setState({ purseMessage })
                }
              }
            }
          }}>
          
          <div className="rowC center">
            <div className="card cardbody" style={{ minWidth: '300px', width: "900px" }}>

            <ButtonGroup>
              <Button type="button" variant="ghost" style={{ color:"White", backgroundColor: this.state.stakeColor }} onClick={(event) => {
                this.clickHandlerDeposit()
              }}>Stake&nbsp;&nbsp;
                <Popup trigger={open => (
                  <span style={{ position: "relative", top: '-1.5px' }}><BsFillQuestionCircleFill size={14} /></span>
                )}
                  on="hover"
                  position="right"
                  offsetY={1}
                  offsetX={5}
                  contentStyle={{ padding: '3px' }}>
                  <span className="textInfo"> Stake your PURSE to earn auto-compounding PURSE rewards over time</span>
                </Popup></Button>

              <Button type="button" variant="ghost" style={{ color:"White", backgroundColor: this.state.withdrawColor }} onClick={(event) => {
                this.clickHandlerWithdraw()
              }}>Withdraw&nbsp;&nbsp;
               <Popup trigger={open => (
                  <span style={{ position: "relative", top: '-1.5px' }}><BsFillQuestionCircleFill size={14} /></span>
                )}
                  on="hover"
                  position="bottom"
                  offsetY={1}
                  offsetX={5}
                  contentStyle={{ padding: '3px' }}>
                  <span className="textInfo"> Withdraw your stake and earn PURSE rewards anytime using your share</span>
                </Popup></Button>

              <Button type="button" variant="ghost" style={{ color:"White", backgroundColor: this.state.checkColor }} onClick={(event) => {
                this.clickHandlerCheck()
              }}>Check&nbsp;&nbsp;
              <Popup trigger={open => (
                 <span style={{ position: "relative", top: '-1.5px' }}><BsFillQuestionCircleFill size={14} /></span>
               )}
                 on="hover"
                 position="left"
                 offsetY={1}
                 offsetX={5}
                 contentStyle={{ padding: '3px' }}>
                 <span className="textInfo"> Check your withdrawable PURSE using your share </span>
               </Popup></Button>
            </ButtonGroup>

            <div className="card-body">

              <div className="mb-4" style={{backgroundColor: "rgba(106, 90, 205, 0.2)", padding: "40px"}}>
                <div className="rowC textWhiteSmaller ml-2 mb-2">
                  <div><IoStar className='mb-1'/></div><div className="ml-2"><b>Rewards are tokens from BDL deducted from each PURSE token transaction</b></div> 
                </div>
                <div className="rowC textWhiteSmaller ml-2 mb-2">
                  <div><IoStar className='mb-1'/></div><div className="ml-2"><b>The more PURSE you stake,&nbsp;&nbsp;the more you earn as PURSE is continuously compounding</b></div> 
                </div>
                <div className="rowC textWhiteSmaller ml-2 mb-2">
                  <div><IoStar className='mb-1'/></div><div className="ml-2"><b>Earn automatically as the PURSE rewards appear under your Staked Balance periodically</b></div> 
                </div>
                <div className="rowC textWhiteSmaller ml-2 mb-2">
                  <div><IoStar className='mb-1'/></div><div className="ml-2"><b>When you withdraw,&nbsp;&nbsp;you receive your original staked PURSE and PURSE rewards</b></div> 
                </div>
              </div>

              {this.props.stakeLoading ? 
              <div>
              <div>
                <div className="textWhiteSmall mb-1"><b>Address:</b></div>
                <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{this.props.account}</b></div>
              </div>
              <div>
                <div className="textWhiteSmall mb-1"><b>PURSE Balance:</b></div>
                <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseTokenUpgradableBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " PURSE"}</b></div>
              </div>
              <div className='row ml-0'>
                <div style={{paddingRight:"2px", width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Staked Balance:</b></div>
                  <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " PURSE (" + parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserStake, 'Ether')*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"}</b></div>
                </div>
                <div style={{width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Total Staked (Pool):</b></div>
                  <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingTotalStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " PURSE (" + parseFloat(window.web3Bsc.utils.fromWei(purseStakingTotalStake, 'Ether')*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"}</b></div>
                </div> 
              </div>
              <div className='row ml-0'>
                <div style={{paddingRight:"2px", width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Share Balance:</b></div>
                  <div className="textWhiteSmall mb-3" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserReceipt, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " Share"}</b></div>
                </div>
                <div style={{width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Total Share (Pool):</b></div>
                  <div className="textWhiteSmall mb-3" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingTotalReceipt, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " Share"}</b></div>
                </div> 
              </div>
              <div>
                <div className="textWhiteSmall mb-1" ><b>{this.state.purseMessage}</b></div>
                <div className="textWhiteSmall mb-3" style={{ color : "#B0C4DE" }}><b>{this.state.getPurseAmount}</b></div>
              </div>  
              </div> 
              :<div className='center' style={{padding: "95px 0px"}}><ReactLoading type={"spin"} height={100} width={100}/></div>
            }
            </div>

            {purseStakingUserAllowance > 100000000000000000000000000000?
              <div>
                {this.props.stakeLoading ? 
                <div>
                <div className="center">
                  <div className="input-group mb-0" style={{width: "95%"}} >
                    <input
                      type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9.]/.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                      onPaste={(event)=>{
                        event.preventDefault()
                      }}
                      style={{ color: "#B0C4DE", backgroundColor: "#28313B" }}
                      ref={(input) => { this.input = input }}
                      className="form-control cardbody"
                      placeholder="0"
                      onChange={(e) => {
                        const value = e.target.value;
                        this.changeHandler(value)
                      }} 
                      required />
                    <div className="input-group-append">
                      <div className="input-group-text cardbody center" style={{ color: "#B0C4DE", width: "80px" }}>{this.state.inputType} </div>
                    </div>
                  </div >
                </div>
                <div className="ml-4" style={{ color: "#DC143C" }}>{this.state.message} </div>
                
                <div className="center mt-3 mb-3">
                  <ButtonGroup>
                    <Button type="submit" style={{ width : "140px" }} onClick={(event) => {
                      if (this.state.txDeposit === true && this.state.txWithdraw === false && this.state.txCheck === false) {
                        this.clickHandlerDeposit()
                      } else if (this.state.txDeposit === false && this.state.txWithdraw === true && this.state.txCheck === false) {
                        this.clickHandlerWithdraw()
                      } else if (this.state.txDeposit === false && this.state.txWithdraw === false && this.state.txCheck === true){
                        this.clickHandlerCheck()
                      }
                    }}>{this.state.buttonName}</Button>

                    <Button type="button" variant="outline-primary" style={{ width : "140px" }} onClick={(event) => {
                      if (this.state.txDeposit === true && this.state.txWithdraw === false && this.state.txCheck === false) {
                        this.input.value = window.web3Bsc.utils.fromWei(purseTokenUpgradableBalance, 'Ether')
                        this.changeHandler(this.input.value)
                      } else if (this.state.txDeposit === false && this.state.txWithdraw === true && this.state.txCheck === false) {
                        this.input.value = window.web3Bsc.utils.fromWei(purseStakingUserReceipt, 'Ether')
                        this.changeHandler(this.input.value)
                      } else if (this.state.txDeposit === false && this.state.txWithdraw === false && this.state.txCheck === true) {
                        this.input.value = window.web3Bsc.utils.fromWei(purseStakingUserReceipt, 'Ether')
                        this.changeHandler(this.input.value)
                      }          
                    }}>Max</Button>
                  </ButtonGroup>
                </div>
                </div>
                : <div></div>}
              </div>
                
              :
              <div className="center">
                {this.props.stakeLoading ? 
                <button type="button" className="btn btn-primary btn-block" onClick={(event) => {
                    this.props.approvePurse()
                }}>Approve</button>
                : <div></div>}
              </div>
              }
            </div>
            
          </div>
          </form>
       
        :
          <div className="center">
          <div className="card cardbody" style={{ minWidth: '300px', width: '900px', height: '200px', color: "White" }}>
            <div className="card-body">
              <div>
                <div className="center textWhiteMedium mt-3 mb-3" style={{textAlign:"center"}}><b>Connect wallet to stake PURSE</b></div>
                <div className="center">
                  <Popup trigger={<button type="button" className="btn btn-primary mt-3"> Connect </button>} modal {...{contentStyle}}>
                  {close => (
                    <div>
                      <button className="close" style={{background:"White" ,borderRadius: "12px", padding: "2px 5px", fontSize:"18px"}} onClick={close}> 
                        &times;
                      </button>
                      <div className="textWhiteMedium mb-2" style={{borderBottom: "1px Solid Gray", padding: "10px"}}> Connect a Wallet </div>
                      <div className="center mt-4 mb-3">
                        <Button type="button" variant="secondary" style={{minWidth:"150px",maxWidth:"250px", padding:"6px 32px"}} onClick={async () => {
                          await this.props.connectWallet()
                        }}><img src={fox} width="23" height="23" alt=""/>&nbsp;Metamask</Button><span style={{width:"15px"}}/>
                        <Button type="button" variant="secondary" style={{minWidth: "150px",maxWidth:"250px"}} onClick={async () => {
                          await this.props.WalletConnect()
                        }}><img src={walletconnectLogo} width="26" height="23" alt=""/>&nbsp;WalletConnect</Button>
                      </div>
                    </div>
                  )}
                  </Popup>
                </div>
                
              </div>
            </div>
          </div>
          </div>
        }
      </div>         

    );
  }
}

export default Stake;
