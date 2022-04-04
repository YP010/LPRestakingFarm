import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import purse from '../purse.png'
import fox from '../metamask-fox.svg'
import walletconnectLogo from '../walletconnect-logo.svg'
import Buttons from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MediaQuery from 'react-responsive'
import { FaBars, FaWallet } from 'react-icons/fa';
import './App.css';

import {
  NavLink,
  NavLink0,
} from './NavMenu'


class Navb extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark top bg-dark flex-md-nowrap p-0 shadow" style={{height:"50px"}}>
        <div className="navbar-brand col-sm-3 col-md-2 mt-1 md-1 mr-0 rowB">
        <MediaQuery maxWidth={960}>
            <Popup className='popup1' trigger={open => (
              <div className="mr-3" style={{position:"relative", top:"-3px"}}><FaBars/></div>
              )}
                on="hover"
                position="right top"
                offsetY={44}
                offsetX={-33}
                mouseLeaveDelay={200}
                contentStyle={{ padding: '3px', minWidth: '200px', width:'35%'}}
                arrow={false}
              ><div> 
                <Link to="/#"></Link>
                <div className='dropdown0'><NavLink to='/home'>Home</NavLink></div>
                <div className='dropdown0'><NavLink to='/lpfarm/farmInfo'>Farm Dashboard</NavLink></div>
                <div className='dropdown0'><NavLink to='/lpfarm/menu'>Farm Menu</NavLink></div>
                {/*<div className='dropdown0'><NavLink to='/distribution'>Distribution</NavLink></div>*/}
                <div className='dropdown0'><NavLink to='/stake'>Stake</NavLink></div>
                <div className='dropdown'>
                  <span className='hover' style={{ fontSize:'16px' }} onClick={() => {
                    window.open(`https://pundix-purse.gitbook.io/untitled/`, '_blank')
                  }}> Docs
                  </span>
                </div>        
              </div>
            </Popup>
          </MediaQuery>
          <div to='/menu' className="textWhiteHeading mr-5 rowC" style={{ cursor: "pointer" }} onClick={() => {
            window.open(`https://www.pundix.com/`, '_blank')
          }}>
            <img src={purse} width="30" height="30" className="d-inline-block" alt="" />
            &nbsp; <b> PURSE </b>
          </div>&nbsp;&nbsp;&nbsp;

          <MediaQuery minWidth={961}>
          <div className="mr-4">
            <NavLink to='/home' >Home</NavLink>
          </div>
          <div className="mr-4">
            <Popup className='popup1' trigger={open => (
              <NavLink0 to='/lpfarm/menu'> Farm</NavLink0>
            )}
              on="hover"
              position="bottom left"
              offsetY={5}
              offsetX={-5}
              mouseLeaveDelay={200}
              contentStyle={{ padding: '3px' }}
              arrow={false}
            ><div>
                <Link to='/lpfarm/farmInfo'></Link>
                <div style={{ marginTop: '5px' }}><Link className='dropdown0' to='/lpfarm/farmInfo' >&nbsp;Farm Dashboard</Link><br /></div>
                <div style={{ marginTop: '8px' }}><Link className='dropdown' to='/lpfarm/menu' >&nbsp;Farm Menu</Link></div>
              </div>
            </Popup>
          </div>
          {/*<div className="mr-4">
            <NavLink to='/distribution' >Distribution</NavLink>
            </div>*/}
          <div className="mr-4">
            <NavLink to='/stake' >Stake</NavLink>
          </div>
          <div>
            <span className='hover' style={{ fontSize:'16px' }} onClick={() => {
              window.open(`https://pundix-purse.gitbook.io/untitled/`, '_blank')
            }}> Docs
            </span>
          </div>
          </MediaQuery>
        </div>

        <span>
          <ul className="navbar-nav px-3">
            {/* <li className="nav-item text-nowrap-small d-none d-sm-none d-sm-block"> */}
              <div className="text-light rowC">
                <MediaQuery minWidth={601}>
                <div className="rowC">
                  <span className='dropdown1 center' onClick={() => {
                    window.open(`https://pancakeswap.finance/swap?inputCurrency=0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C&outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56`, '_blank')
                  }}> <img src={purse} width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;${this.props.PURSEPrice}
                  </span>
                </div>&nbsp;

                <div className='center'>
                  <Buttons variant="info" size="sm" onClick={() => {
                  }}>{this.props.networkName}
                  </Buttons>
                </div>&nbsp;

                <div className='center'>
                  {this.props.wallet || this.props.walletConnect ?
                    <div>
                      <Popup className='popup1' trigger={open => (
                        <Buttons variant="secondary" size="sm"> {this.props.first4Account}...{this.props.last4Account}</Buttons>
                      )}
                        on="hover"
                        position="bottom right"
                        offsetY={6}
                        offsetX={0}
                        mouseLeaveDelay={200}
                        contentStyle={{ padding: '3px' }}
                        arrow={false}
                      ><div>
                          <div className='dropdown0' onClick={() => {
                            window.open(`https://bscscan.com/address/${this.props.account}`, '_blank')
                          }}>&nbsp;Wallet</div>
                          <div className='dropdown' onClick={() => {
                            this.props.setWalletTrigger(false)
                            if (this.props.walletConnect == true) {
                              this.props.WalletDisconnect()
                            }
                          }}>&nbsp;Disconnect</div>
                        </div>
                      </Popup>
                    </div> : <div>
                      <Popup className='popup1' trigger={open => (
                        <Buttons variant="secondary" size="sm" > Connect Wallet</Buttons>
                      )}
                        on="hover"
                        position="bottom right"
                        offsetY={6}
                        offsetX={0}
                        mouseLeaveDelay={200}
                        contentStyle={{ padding: '3px' }}
                        arrow={false}
                      ><div>
                          <div className='dropdown0' onClick={async () => {
                            await this.props.connectWallet()
                          }
                          }><img src={fox} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Metamask</div>
                          <div className='dropdown' onClick={async () => {
                            await this.props.WalletConnect()
                          }
                          }><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt="" />&nbsp; WalletConnect</div>
                        </div>
                      </Popup>
                    </div>}
                </div>
                </MediaQuery>
                <MediaQuery maxWidth={600}>
                  <Popup className='popup1' trigger={open => (
                    <div className="mr-3" style={{position:"absolute", top:"7px" ,right:"0px", fontSize:"20px"}}><FaWallet/></div>
                    )}
                    on="hover"
                    position="left top"
                    offsetY={44}
                    offsetX={-33}
                    mouseLeaveDelay={200}
                    contentStyle={{ padding: '3px', minWidth: '190px', width:'35%'}}
                    arrow={false}
                  ><div> 
                    <Link to="/#"></Link>
                    <div className="dropdown rowC">
                      <Buttons variant="secondary" size="sm" style={{width:"100%", backgroundColor:"#6A5ACD"}} className='center' onClick={() => {
                        window.open(`https://pancakeswap.finance/swap?inputCurrency=0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C&outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56`, '_blank')
                        }}> <img src={purse} width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;${this.props.PURSEPrice}
                      </Buttons>
                    </div>
                    <div className='dropdown'>
                      <Buttons variant="info" size="sm" style={{width:"100%"}} onClick={() => {
                      }}>{this.props.networkName}
                      </Buttons>
                    </div>
                    <div className='dropdown'>
                      {this.props.wallet || this.props.walletConnect ?
                        <div>
                          <div>
                            <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"10px"}}> {this.props.first4Account}...{this.props.last4Account}</Buttons>
                            <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"10px"}} onClick={() => {
                              window.open(`https://bscscan.com/address/${this.props.account}`, '_blank')
                            }}>&nbsp;Wallet</Buttons>
                            <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"2px"}} onClick={() => {
                              this.props.setWalletTrigger(false)
                              if (this.props.walletConnect == true) {
                                this.props.WalletDisconnect()
                              }
                            }}>&nbsp;Disconnect</Buttons>
                            </div>
                        </div> : <div>
                        
                          <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"10px"}} onClick={async () => {
                            await this.props.connectWallet()
                            }}><img src={fox} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Metamask
                          </Buttons>
                          <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"2px"}} onClick={async () => {
                            await this.props.WalletConnect()
                            }}><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt="" />&nbsp; WalletConnect  
                          </Buttons>
                    </div>}
                  </div>
                  </div>
                  </Popup>
                </MediaQuery>
              </div>
            {/* </li> */}
          </ul>
        </span>
      </nav>

    );
  }
}

export default Navb;
