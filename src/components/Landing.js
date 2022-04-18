import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Blockchain from '../Blockchain.png'
import { NavLink } from './NavMenu'
import MediaQuery from 'react-responsive'
import Bounce from 'react-reveal/Bounce'
import Zoom from 'react-reveal/Zoom'
import { IoStar } from 'react-icons/io5'

import './App.css';

class Landing extends Component {
  render() {
    return (
    <div id="content">
    <MediaQuery minWidth={961}>
        <div className="rowC">
            <div className="mt-5">
                <div className="textWhite mt-5" style={{borderBottom:"1px solid grey"}}><b>Pundi&nbsp;X&nbsp;PURSE</b></div>
                <div className="textWhiteSmaller mt-5"><b>PURSE is Pundi X reward token, created to incentivize XPOS usage, expand Pundi X Chain's ecosystem and increase PUNDIX value through rewards, gamification, discount vouchers and redemption for NFTs and other tokens.</b></div>
                <div className="mt-5"><NavLink to='/home'>
                    <Zoom left><Button type="button" variant="info">Get Started</Button></Zoom>
                </NavLink></div>
            </div>
            <img src={Blockchain} width="600px" alt=""/>
        </div>

        <div className="rowC mt-5" style={{borderTop:"1px solid grey"}}>
            <Bounce left>
            <div className="mt-5 mr-4" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
                <div className="textWhiteSmall" style={{borderBottom:"1px solid grey"}}><b>BDL Mechanism</b></div>
                <div className="textWhite mt-2" style={{fontSize:"13px"}}><b>For every non-whitelisted transaction, 10% of the transacted PURSE amount is burned, 5% goes to distribution pool and 5% goes to liquidity pool.</b></div>
            </div>
            <div className="mt-5 mr-4" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
                <div className="textWhiteSmall" style={{borderBottom:"1px solid grey"}}><b>LP Restaking Farm</b></div>
                <div className="textWhite mt-2" style={{fontSize:"13px"}}><b>Providing liquidity on respective plaform to receive LP Tokens and earn PURSE by staking the LP Tokens in the LP Restaking Farm.</b></div>
            </div>
            <div className="mt-5" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
                <div className="textWhiteSmall" style={{borderBottom:"1px solid grey"}}><b>PURSE Staking</b></div>
                <div className="textWhite mt-2" style={{fontSize:"13px"}}><b>PURSE from distribution pool, derived from the 5% BDL Mechanism, is distributed to PURSE holders through PURSE staking.</b></div>
            </div>
            </Bounce>
        </div>
    </MediaQuery>

    <MediaQuery maxWidth={960}>
        <div className="mt-4">
            <div className="textWhite" style={{borderBottom:"1px solid grey"}}><b>Pundi&nbsp;X PURSE</b></div>
            <div className="textWhiteSmaller mt-5"><b>PURSE is Pundi X reward token, created to incentivize XPOS usage, expand Pundi X Chain's ecosystem and increase PUNDIX value through rewards, gamification, discount vouchers and redemption for NFTs and other tokens.</b></div>
            <div className="mt-5"><NavLink to='/home'>
                <Zoom left><Button type="button" variant="info">Get Started</Button></Zoom>
            </NavLink></div>
        </div>

        <div className="center" style={{borderBottom:"1px solid grey"}}>
            <img src={Blockchain} width="70%" alt="" style={{minWidth:"300px", maxWidth:"600px"}}/>
        </div>

        <Bounce left>
        <div className="mt-5" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
            <div className="textWhiteSmall" style={{borderBottom:"1px solid grey"}}><b>BDL Mechanism</b></div>
            <div className="textWhite mt-2" style={{fontSize:"13px"}}><b>For every non-whitelisted transaction, 10% of the transacted PURSE amount is burned, 5% goes to distribution pool and 5% goes to liquidity pool.</b></div>
        </div>
        </Bounce>
        <Bounce right>
        <div className="mt-5" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
            <div className="textWhiteSmall" style={{borderBottom:"1px solid grey"}}><b>LP Restaking Farm</b></div>
            <div className="textWhite mt-2" style={{fontSize:"13px"}}><b>Providing liquidity on respective plaform to receive LP Tokens and earn PURSE by staking the LP Tokens in the LP Restaking Farm.</b></div>
        </div>
        </Bounce>
        <Bounce left>
        <div className="mt-5" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
            <div className="textWhiteSmall" style={{borderBottom:"1px solid grey"}}><b>PURSE Staking</b></div>
            <div className="textWhite mt-2" style={{fontSize:"13px"}}><b>PURSE from distribution pool, derived from the 5% BDL Mechanism, is distributed to PURSE holders through PURSE staking.</b></div>
        </div>
        </Bounce>
    </MediaQuery>

    <Bounce right>
    <div className="mt-5 textWhiteSmall" style={{minWidth:"300px", padding:"15px", borderRadius:"10px", backgroundColor:"rgba(106, 90, 205, 0.4)"}}>
        <div className="center" style={{borderBottom: "1px solid grey"}}>•&nbsp;•&nbsp;•&nbsp;&nbsp;What are the whitelisted transactions?&nbsp;&nbsp;•&nbsp;•&nbsp;•</div>
        <div className="mt-2 rowC" style={{fontSize:"13px"}}><IoStar style={{minWidth:"12px",marginTop:"2px"}}/>&nbsp;&nbsp;<div>PURSE harvested from PURSE-BUSD LP Restaking Farm contract</div></div>
        <div className="mt-1 rowC" style={{fontSize:"13px"}}><IoStar style={{minWidth:"12px",marginTop:"2px"}}/>&nbsp;&nbsp;<div>PURSE staked into PURSE Staking contract</div></div>
        <div className="mt-1 rowC" style={{fontSize:"13px"}}><IoStar style={{minWidth:"12px",marginTop:"2px"}}/>&nbsp;&nbsp;<div>PURSE withdrawn from PURSE Staking contract</div></div>
        <div className="mt-1 rowC" style={{fontSize:"13px"}}><IoStar style={{minWidth:"12px",marginTop:"2px"}}/>&nbsp;&nbsp;<div>PURSE received when remove liquidity from PURSE-BUSD LP Pancake contract</div></div>
    </div>
    </Bounce>
    </div>

    );
  }
}

export default Landing;
