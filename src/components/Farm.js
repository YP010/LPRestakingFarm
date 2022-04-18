import React, { Component } from 'react'
import MediaQuery from 'react-responsive';
import { IoStar } from 'react-icons/io5'

class Farm extends Component {

  render() {
    return (
      <div id="content" className="mt-4">
        <label className="textWhite center mb-5" style={{ fontSize : '40px', textAlign: 'center'}}><big><b>Farm Dashboard</b></big></label>
        <MediaQuery minWidth={601}>
        <div className="card mb-4 cardbody" >
          <div className="card-body center">
            <table className="textWhiteSmall text-center">
              <thead>
                <tr>
                  <th scope="col">Total Pool</th>
                  <th scope="col">PURSE Token Total Supply</th>
                  <th scope="col">Farm's PURSE Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.poolLength}</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.purseTokenTotalSupply, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                  <td>{window.web3Bsc.utils.fromWei(this.props.totalrewardperblock, 'Ether')} Purse per block</td>
                </tr>
              </tbody>
              <thead><tr><td></td></tr></thead>
              <thead>
                <tr>
                  <th scope="col">Farm's Cap Reward Token</th>
                  <th scope="col">Farm's Minted Reward Token</th>
                  <th scope="col">Farm's PURSE Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.poolCapRewardToken, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.poolMintedRewardToken, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.poolRewardToken, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                </tr>
              </tbody>
            </table>
          
          </div></div>
        </MediaQuery>
        <MediaQuery maxWidth={600}>
        <div className="card mb-4 cardbody" style={{minWidth:"300px"}}>
          <div className="card-body center">
            <table className="textWhiteSmaller text-center">
              <thead>
                <tr>
                  <th scope="col">Total Pool</th>
                  <th scope="col">Farm's PURSE Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.poolLength}</td>
                  <td>{window.web3Bsc.utils.fromWei(this.props.totalrewardperblock, 'Ether')} Purse per block</td>
                </tr>
              </tbody>
              <thead><tr><td></td></tr></thead>
              <thead>
                <tr>
                  <th scope="col">PURSE Token Total Supply</th>
                  <th scope="col">Farm's Cap Reward Token</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.purseTokenTotalSupply, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.poolCapRewardToken, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                </tr>
              </tbody>
              <thead><tr><td></td></tr></thead>
              <thead>
                <tr>
                  <th scope="col">Farm's Minted Reward Token</th>
                  <th scope="col">Farm's PURSE Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.poolMintedRewardToken, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.poolRewardToken, 'Ether')).toLocaleString('en-US', {maximumFractionDigits:0})} Purse</td>
                </tr>
              </tbody>
            </table>
          
          </div></div>
          </MediaQuery>
          <br/> <br/>

        <div className="text mt-5" style={{ color: 'silver', fontSize: "14px" }}>&nbsp;Remarks :</div><br/>
        <div className="rowC ml-2 mt-2" style={{ color: 'silver', fontSize: "12px" }}>&nbsp;<div><IoStar className='mb-1'/>&nbsp;&nbsp;</div><div>Farm Cap Reward Token: Total capacity reward tokens will be minted by this farm.</div></div>
        <div className="rowC ml-2 mt-1" style={{ color: 'silver', fontSize: "12px" }}>&nbsp;<div><IoStar className='mb-1'/>&nbsp;&nbsp;</div><div>Farm Minted Reward Token: Total reward tokens minted by this farm until now.</div></div>
        <div className="rowC ml-2 mt-1" style={{ color: 'silver', fontSize: "12px" }}>&nbsp;<div><IoStar className='mb-1'/>&nbsp;&nbsp;</div><div>Farm's Reward Token: Total reward tokens inside this farm (smart contract).</div></div>
      </div>


    );
  }
}

export default Farm;
