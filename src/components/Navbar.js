import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import purse from '../purse.png'
import fox from '../metamask-fox.svg'
import walletconnectLogo from '../walletconnect-logo.svg'
import Buttons from 'react-bootstrap/Button'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import MediaQuery from 'react-responsive'
import { FaWallet } from 'react-icons/fa'
import { slide as Menu } from 'react-burger-menu'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css'

import {
  NavLink,
  NavLink0,
} from './NavMenu'


class Navb extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark top bg-dark flex-md-nowrap p-0 shadow" style={{height:"50px",position:"fixed",width:"100%", top:"0",zIndex:"1"}}>
        <div className="navbar-brand col-sm-3 col-md-2 mt-1 md-1 mr-0 rowB">
          <MediaQuery maxWidth={960}>
            <Menu>
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
            </Menu>
          </MediaQuery>
          <div to='/menu' className="textWhiteHeading mr-5 ml-4 rowC" style={{ cursor: "pointer" }} onClick={() => {
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
            <Dropdown>
              <Dropdown.Toggle className='center' variant="transparent" style={{padding:0}}><NavLink to="/"> Farm</NavLink></Dropdown.Toggle>
               <Dropdown.Menu style={{backgroundColor:"#28313b", marginTop:"8px"}}>
                <Dropdown.Item href="/lpfarm/farmInfo">
                  <div className="dropdown0" style={{ paddingBottom: '12px' }}>Farm Dashboard</div>
                </Dropdown.Item>
                <Dropdown.Item href='/lpfarm/menu'>
                  <div className="dropdown">Farm Menu</div>
                </Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
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
                      <Dropdown>
                        <Dropdown.Toggle variant="transparent" style={{padding:0}}><Buttons variant="secondary" size="sm"> {this.props.first4Account}...{this.props.last4Account}</Buttons></Dropdown.Toggle>
                        <Dropdown.Menu style={{backgroundColor:"#28313b", marginTop:"8px"}}>
                          <Dropdown.Item>
                          <div className='dropdown0' style={{ paddingBottom: '12px' }} onClick={() => {
                            window.open(`https://bscscan.com/address/${this.props.account}`, '_blank')
                          }}>&nbsp;Wallet</div>
                          </Dropdown.Item>
                          <Dropdown.Item>
                          <div className='dropdown' onClick={() => {
                            this.props.setWalletTrigger(false)
                            if (this.props.walletConnect == true) {
                              this.props.WalletDisconnect()
                            }
                          }}>&nbsp;Disconnect</div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      
                    </div> : <div>
                      <Dropdown>
                        <Dropdown.Toggle variant="transparent" style={{padding:0}}><Buttons variant="secondary" size="sm" > Connect Wallet</Buttons></Dropdown.Toggle>
                        <Dropdown.Menu style={{backgroundColor:"#28313b", marginTop:"8px"}}>
                        <Dropdown.Item>
                        <div className='dropdown0' style={{ paddingBottom: '12px' }} onClick={async () => {
                            await this.props.connectWallet()
                          }
                          }><img src={fox} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Metamask</div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                        <div className='dropdown' onClick={async () => {
                            await this.props.WalletConnect()
                          }
                          }><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt="" />&nbsp; WalletConnect</div>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>}
                </div>
                </MediaQuery>
                <MediaQuery maxWidth={600}>
                <Dropdown style={{position:"absolute", top:"0px" ,right:"-2px"}}>
                  <Dropdown.Toggle variant="transparent"><FaWallet style={{color:"white",fontSize:"20px"}}/></Dropdown.Toggle>
                  <Dropdown.Menu style={{backgroundColor:"#28313b", marginTop:"5px"}}>
                    <Dropdown.Item>
                      <Buttons variant="secondary" size="sm" style={{width:"100%", backgroundColor:"#6A5ACD", marginTop:"10px"}} className='center' onClick={() => {
                        window.open(`https://pancakeswap.finance/swap?inputCurrency=0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C&outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56`, '_blank')
                        }}> <img src={purse} width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;${this.props.PURSEPrice}
                      </Buttons>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Buttons variant="info" size="sm" style={{width:"100%"}} onClick={() => {
                      }}>{this.props.networkName}
                      </Buttons>
                    </Dropdown.Item>
                      {this.props.wallet || this.props.walletConnect ?
                        <div>
                            <Dropdown.Item><Buttons variant="secondary" size="sm" style={{width:"100%"}}> {this.props.first4Account}...{this.props.last4Account}</Buttons></Dropdown.Item>
                            <Dropdown.Item>
                              <Buttons variant="secondary" size="sm" style={{width:"100%"}} onClick={() => {
                                window.open(`https://bscscan.com/address/${this.props.account}`, '_blank')
                              }}>&nbsp;Wallet</Buttons>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"10px"}} onClick={() => {
                                this.props.setWalletTrigger(false)
                                if (this.props.walletConnect == true) {
                                  this.props.WalletDisconnect()
                                }
                              }}>&nbsp;Disconnect</Buttons>
                            </Dropdown.Item>
                        </div> : <div>
                        
                          <Dropdown.Item>
                            <Buttons variant="secondary" size="sm" style={{width:"100%"}} onClick={async () => {
                              await this.props.connectWallet()
                              }}><img src={fox} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Metamask
                            </Buttons>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Buttons variant="secondary" size="sm" style={{width:"100%", marginBottom:"10px"}} onClick={async () => {
                              await this.props.WalletConnect()
                              }}><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt="" />&nbsp; WalletConnect  
                            </Buttons>
                          </Dropdown.Item>
                    </div>}
                  </Dropdown.Menu>
                </Dropdown>
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
