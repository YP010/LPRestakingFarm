import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import bigInt from 'big-integer'
import Popup from 'reactjs-popup'
import { BsFillQuestionCircleFill, BsInfoCircleFill } from 'react-icons/bs'
import fox from '../metamask-fox.svg'
import walletconnectLogo from '../walletconnect-logo.svg'
import { IoStar } from 'react-icons/io5'
import { MdLockClock } from 'react-icons/md'
import { AiFillAlert } from 'react-icons/ai'
import { RiArrowRightFill } from 'react-icons/ri'
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
      buttonName: "Unstake",
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
    let purseStakingUserNewReceipt=this.props.purseStakingUserNewReceipt
    let purseStakingUserWithdrawReward=this.props.purseStakingUserWithdrawReward
    let purseStakingUserLockTime=this.props.purseStakingUserLockTime
    let purseTokenUpgradableBalance = this.props.purseStakingUserPurse
    let purseStakingUserStake = this.props.purseStakingUserStake
    let purseStakingUserAllowance = this.props.purseStakingUserAllowance
    let purseStakingTotalStake = this.props.purseStakingTotalStake
    let purseStakingTotalReceipt = this.props.purseStakingTotalReceipt
    let purseStakingLockPeriod = this.props.purseStakingLockPeriod
    let sum30TransferAmount = this.props.sum30TransferAmount
    let purseStakingAPR = parseFloat(sum30TransferAmount*12*100/purseStakingTotalStake).toLocaleString('en-US', { maximumFractionDigits: 5 })
    let purseStakingUserTotalReceipt = (bigInt(this.props.purseStakingUserReceipt).value + bigInt(this.props.purseStakingUserNewReceipt).value).toString()
    let sharePercent = parseFloat(purseStakingUserReceipt*100/purseStakingTotalReceipt).toLocaleString('en-US', { maximumFractionDigits: 5 })
    let sharePercent1 = parseFloat(purseStakingUserNewReceipt*100/purseStakingTotalReceipt).toLocaleString('en-US', { maximumFractionDigits: 5 })
    let sharePercent2 = parseFloat(purseStakingUserTotalReceipt*100/purseStakingTotalReceipt).toLocaleString('en-US', { maximumFractionDigits: 5 })
    const contentStyle = { background: '#353A40', border: "1px solid #596169", width:"50%", minWidth:"320px"};

    let purseStakingRemainingTime
    if(purseStakingUserLockTime == 0){
      purseStakingRemainingTime = 0
    }else{
      let newTime = Math.round(+new Date()/1000) - purseStakingUserLockTime
      if(newTime > purseStakingLockPeriod){
        purseStakingRemainingTime = 0
      }else{
        purseStakingRemainingTime = newTime
      }
    }
    const secondsToDhms = (seconds) => {
      seconds = purseStakingLockPeriod - Number(seconds);
      let d = Math.floor(seconds / (3600*24));
      let h = Math.floor(seconds % (3600*24) / 3600);
      let m = Math.floor(seconds % 3600 / 60);

      let dDisplay = d > 0 ? d + ("d ") : "";
      let hDisplay = h > 0 ? h + ("h ") : "";
      let mDisplay = m > 0 ? m + ("m ") : "";
      return seconds > 60 ? dDisplay + hDisplay + mDisplay : "< 1m";
    }

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
                if (bigInt(receiptWei).value > bigInt(purseStakingUserTotalReceipt).value) {
                  alert("Insufficient Share to unstake!")
                } else {
                  this.props.unstake(receiptWei)
                }
              } else if (this.state.txDeposit === false && this.state.txWithdraw === false && this.state.txCheck === true) {
                  let receipt = this.input.value.toString()
                  let receiptWei = window.web3Bsc.utils.toWei(receipt, 'Ether')
                if (bigInt(receiptWei).value > bigInt(purseStakingUserTotalReceipt).value) {
                  alert("Insufficient Share to withdraw!")
                } else {
                  let checkPurseAmount = await this.props.checkPurseAmount(receiptWei)
                  let getPurseAmount = checkPurseAmount[0] + " Share : " + parseFloat(checkPurseAmount[3]).toLocaleString('en-US', { maximumFractionDigits: 18 })  + " PURSE (" + parseFloat(checkPurseAmount[3]*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"
                  let getRewardAmount = checkPurseAmount[1] + " Share : " + parseFloat(checkPurseAmount[2]).toLocaleString('en-US', { maximumFractionDigits: 18 })   + " PURSE (" + parseFloat(checkPurseAmount[2]*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"
                  this.setState({ getPurseAmount })
                  this.setState({ getRewardAmount })
                  let purseMessage = "PURSE Staking:"
                  let purseMessage1 = "No 21-Day Lock "
                  let purseMessage2 = "With 21-Day Lock "
                  this.setState({ purseMessage })
                  this.setState({ purseMessage1 })
                  this.setState({ purseMessage2 })
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
                  offsetY={-23}
                  offsetX={0}
                  contentStyle={{ padding: '3px' }}>
                  <span className="textInfo"> Stake your PURSE to earn auto-compounding PURSE rewards over time</span>
                </Popup></Button>

              <Button type="button" variant="ghost" style={{ color:"White", backgroundColor: this.state.withdrawColor }} onClick={(event) => {
                this.clickHandlerWithdraw()
              }}>Unstake&nbsp;&nbsp;
               <Popup trigger={open => (
                  <span style={{ position: "relative", top: '-1.5px' }}><BsFillQuestionCircleFill size={14} /></span>
                )}
                  on="hover"
                  position="bottom"
                  offsetY={-23}
                  offsetX={0}
                  contentStyle={{ padding: '3px' }}>
                  <span className="textInfo"> Unstake and earn PURSE rewards using your share</span>
                </Popup></Button>

              <Button type="button" variant="ghost" style={{ color:"White", backgroundColor: this.state.checkColor }} onClick={(event) => {
                this.clickHandlerCheck()
              }}>Check&nbsp;&nbsp;
              <Popup trigger={open => (
                 <span style={{ position: "relative", top: '-1.5px' }}><BsFillQuestionCircleFill size={14} /></span>
               )}
                 on="hover"
                 position="left"
                 offsetY={-23}
                 offsetX={0}
                 contentStyle={{ padding: '3px' }}>
                 <span className="textInfo"> Check your withdrawable PURSE using your share </span>
               </Popup></Button>
            </ButtonGroup>

            <div className="card-body">

              <div className="mb-4" style={{backgroundColor: "rgba(106, 90, 205, 0.2)", padding: "30px 40px"}}>
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
                {purseStakingUserWithdrawReward>0 ?
                <div>
                  {purseStakingRemainingTime>0 ?
                  <div className='mb-3 textWhiteSmall' style={{borderBottom:"1px solid grey"}}>
                    <div className='row ml-2 mb-1'>
                      <div style={{width:"50%", minWidth:"250px"}}>
                        <div className='mb-1'>PURSE Locked For 21 Days:&nbsp;&nbsp;
                          <Popup trigger={open => (
                            <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                            )}
                            on="hover"
                            position="top"
                            offsetY={20}
                            offsetX={0}
                            contentStyle={{ padding: '3px' }}>
                            <span className="textInfo">PURSE locked during these 21 days will not earn any rewards</span>
                          </Popup>   
                        </div>
                        <div className="mb-3" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserWithdrawReward, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " PURSE"}</b></div>
                      </div>
                      <div style={{width:"50%", minWidth:"250px"}}>
                        <div className="mb-1">Remaining Lock Time:</div>
                        <div className="mb-3" style={{ color : "#B0C4DE" }}><MdLockClock/>&nbsp;&nbsp;<b>{secondsToDhms(purseStakingRemainingTime)}</b></div> 
                      </div>
                    </div>
                  </div>
                :
                <div className='mb-3 textWhiteSmall' style={{borderBottom:"1px solid grey"}}>
                  <div className='row ml-2 mb-1'>
                    <div style={{width:"50%", minWidth:"250px"}}>   
                      <div className='mb-1'>Withdrawable PURSE:&nbsp;&nbsp;
                        <Popup trigger={open => (
                          <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                          )}
                          on="hover"
                          position="top"
                          offsetY={20}
                          offsetX={0}
                          contentStyle={{ padding: '3px' }}>
                          <span className="textInfo mb-2">Click the button below to withdraw the PURSE</span>
                          <span className="textInfo">If not it will automatically be withdrawn when unstake</span>
                        </Popup>   
                      </div>
                      <div className="mb-3" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserWithdrawReward, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " PURSE"}</b></div>
                      <Button type="button" className="btn btn-sm mb-3" variant="outline-success" onClick={(event) => {
                        this.props.withdrawLocked()
                      }}>Withdraw</Button>
                    </div>
                    <div style={{width:"50%", minWidth:"250px"}}>  
                      <div className="mb-1">Remaining Lock Time:</div>
                      <div className="mb-2" style={{ color : "#B0C4DE" }}><b>21-Day Lock is over</b></div>
                    </div>
                  </div>
                </div>
                }
                </div>
                :
                <div></div>}
              <div>
                <div className="textWhiteSmall ml-2 mb-1"><b>Address:</b></div>
                <div className="textWhiteSmall ml-2 mb-2" style={{ color : "#B0C4DE" }}><b>{this.props.account}</b></div>
              </div>
              <div>
                <div className="textWhiteSmall ml-2 mb-1"><b>PURSE Balance:</b></div>
                <div className="textWhiteSmall ml-2 mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseTokenUpgradableBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " PURSE"}</b></div>
              </div>
              <div className='row ml-2'>
              <div style={{width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>APR:&nbsp;&nbsp;</b>
                  <Popup trigger={open => (
                    <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="right"
                    offsetY={-23}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo">Percentage of Past 30 Days Distribution Sum x 12 / Total Staked (Pool).</span>
                  </Popup>      
                  </div>
                  <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{purseStakingAPR+" %"}</b></div>
              </div> 
              <div style={{paddingRight:"2px", width:"50%", minWidth:"250px"}}>
                <div className="textWhiteSmall mb-1"><b>Past 30 Days Distribution Sum:</b></div>
                <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(sum30TransferAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " PURSE"}</b></div>
              </div>
              </div>
              <div className='row ml-2'>
                <div style={{paddingRight:"2px", width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Staked Balance:&nbsp;&nbsp;</b>
                  <Popup trigger={open => (
                    <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="top"
                    offsetY={20}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo">Amount of PURSE user has staked + PURSE reward from PURSE Distribution</span>
                  </Popup> 
                  </div>   
                  <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " PURSE (" + parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserStake, 'Ether')*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"}</b></div>
                </div>
                <div style={{width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Total Staked (Pool):&nbsp;&nbsp;</b>
                  <Popup trigger={open => (
                    <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="top"
                    offsetY={20}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo">Total PURSE amount in the PURSE Staking contract</span>
                    <span className="textInfo mt-2">Calculated based on PURSE staked by PURSE holders + PURSE Distribution</span>                    
                  </Popup> 
                  </div>
                  <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingTotalStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " PURSE (" + parseFloat(window.web3Bsc.utils.fromWei(purseStakingTotalStake, 'Ether')*this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " USD)"}</b></div>
                </div> 
              </div>
              <div className='row ml-2'>
                <div style={{paddingRight:"2px", width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Share Balance:&nbsp;&nbsp;</b>
                  <Popup trigger={open => (
                    <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="top"
                    offsetY={20}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo">Represents the amount of PURSE the user owns in the PURSE Staking contract</span>
                    <span className="textInfo mt-2">Staked Balance = Share Balance / Total Share (Pool) x Total Staked (Pool)</span>
                  </Popup>       
                  </div>
                  <div className="textWhiteSmall mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserTotalReceipt, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " Share (" + sharePercent2 + " %)"}</b></div>
                  <div className="textWhiteSmaller"><RiArrowRightFill/><b style={{textDecoration:"underline grey"}}> Unlocked Share</b>&nbsp;&nbsp;
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                      )}
                      on="hover"
                      position="top"
                      offsetY={20}
                      offsetX={0}
                      contentStyle={{ padding: '3px' }}>
                      <span className="textInfo">Share received previously when staked into contract before the 21-Day Lock implementation</span>
                    </Popup>     
                  </div>           
                  <div className="textWhiteSmall ml-3 mb-2" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserReceipt, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " Share (" + sharePercent + " %)"}</b></div>
                  <div className="textWhiteSmaller"><RiArrowRightFill/><b style={{textDecoration:"underline grey"}}> Locked Share</b>&nbsp;&nbsp;
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                      )}
                      on="hover"
                      position="top"
                      offsetY={20}
                      offsetX={0}
                      contentStyle={{ padding: '3px' }}>
                      <span className="textInfo">Locked share received when staked into contract after the 21-Day Lock implementation</span>
                    </Popup> 
                  </div>           
                  <div className="textWhiteSmall ml-3 mb-3" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingUserNewReceipt, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " Share (" + sharePercent1 + " %)"}</b></div>
                </div>
                <div style={{width:"50%", minWidth:"250px"}}>
                  <div className="textWhiteSmall mb-1" ><b>Total Share (Pool):&nbsp;&nbsp;</b>
                  <Popup trigger={open => (
                    <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="top"
                    offsetY={20}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo">Represents the total amount of PURSE in the PURSE Staking contract</span>
                    <span className="textInfo mt-2">Total Share (Pool) ≡ Total Staked (Pool)</span>
                  </Popup>     
                  </div>
                  <div className="textWhiteSmall mb-3" style={{ color : "#B0C4DE" }}><b>{parseFloat(window.web3Bsc.utils.fromWei(purseStakingTotalReceipt, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })+ " Share (100%)"}</b></div>
                </div> 
              </div>

              {!!this.state.purseMessage?
              <div style={{borderTop:"1px solid grey"}}></div>
              :
              <div></div>}

                <div>
                  <div className="textWhiteSmall mt-3 ml-2 mb-2"><b>{this.state.purseMessage}</b></div>
                  <div className="textWhiteSmaller ml-2" style={{textDecoration:"underline grey"}}><b>{this.state.purseMessage1}</b>
                  {!!this.state.purseMessage1?
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="top"
                    offsetY={20}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo">No 21-Day Lock: If unstake using Unlocked Share, PURSE will be transferred instantly to user</span>
                    </Popup>   
                  :
                  <div></div>
                  }   
                  </div>           
                  <div className="textWhiteSmall ml-2 mb-2" style={{ color : "#B0C4DE" }}><b>{this.state.getPurseAmount}</b></div>
                  <div className="textWhiteSmaller ml-2" style={{textDecoration:"underline grey"}}><b>{this.state.purseMessage2}</b>
                  {!!this.state.purseMessage2?
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1.5px' }}><BsInfoCircleFill size={10}/></span>
                    )}
                    on="hover"
                    position="top"
                    offsetY={20}
                    offsetX={0}
                    contentStyle={{ padding: '3px' }}>
                    <span className="textInfo mt-2">With 21-Day Lock: If unstake using Locked Share, PURSE can only be withdrawn after 21 days</span>
                    </Popup>   
                  :
                  <div></div>
                  }   
                  </div>           
                  <div className="textWhiteSmall ml-2 mb-2" style={{ color : "#B0C4DE" }}><b>{this.state.getRewardAmount}</b></div>      
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
                        this.input.value = window.web3Bsc.utils.fromWei(purseStakingUserTotalReceipt, 'Ether')
                        this.changeHandler(this.input.value)
                      } else if (this.state.txDeposit === false && this.state.txWithdraw === false && this.state.txCheck === true) {
                        this.input.value = window.web3Bsc.utils.fromWei(purseStakingUserTotalReceipt, 'Ether')
                        this.changeHandler(this.input.value)
                      }          
                    }}>Max</Button>
                  </ButtonGroup>
                </div>
                {this.state.buttonName == "Unstake"?
                <div className='center textWhite mb-3'>
                  <div style={{color:"silver", width:"90%", textAlign:"center", fontSize:"12px", backgroundColor: "rgba(106, 90, 205, 0.2)", padding:"8px"}}><AiFillAlert className='mb-1'/>&nbsp;Disclaimer: If unstake when there's an existing unstaking entry locked for &lt; 21-Day, the lock period will reset back to 21-Day</div>
                </div>
                :
                <div></div>}
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
