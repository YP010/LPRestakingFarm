import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

class Main extends Component {

  render() {
    let cumulateTransfer = this.props.cumulateTransfer
    let cumulateBurn = this.props.cumulateBurn
    let newCumulateTransfer = []
    let newCumulateBurn = []
    cumulateTransfer.forEach(item => newCumulateTransfer.push({"Sum": parseFloat(item.Sum), "Date": item.Date}));
    cumulateBurn.forEach(item => newCumulateBurn.push({"Sum": parseFloat(item.Sum), "Date": item.Date}));

    const DataFormater = (number) => {
      if(number > 1000000000){
        return (number/1000000000).toString() + 'B';
      }else if(number > 1000000){
        return (number/1000000).toString() + 'M';
      }else if(number > 1000){
        return (number/1000).toString() + 'K';
      }else{
        return number.toString();
      }
    }
    const NumberFormater = (number) => {
      return parseFloat(number).toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return (
      <div id="content" className="mt-4">
        <label className="textWhite center mb-5" style={{ fontSize: '40px' }}><big><b>PURSE Dashboard</b></big></label>
        <div className="card mb-4 cardbody">
          <div className="card-body center">
            <table className="textWhiteSmall">
              <thead>
                <tr>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Circulating Supply <span className="">
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1px' }}><BsFillQuestionCircleFill size={10} /></span>
                    )}
                      on="hover"
                      position="right center"
                      offsetY={0}
                      offsetX={5}
                      contentStyle={{ padding: '3px' }}
                    ><span className="textInfo"> Currently based on the total supply of purse token </span>
                    </Popup></span></th>
                  <th scope="col">PURSE Token Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${(window.web3Bsc.utils.fromWei(this.props.purseTokenTotalSupply, 'Ether') * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.purseTokenTotalSupply, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td>${parseFloat(this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 6 })}</td>
                </tr>
              </tbody>
              <thead><tr><td></td></tr><tr><td></td></tr></thead>
              <thead>
                <tr>
                  <th scope="col">Burn <span className="">
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1px' }}><BsFillQuestionCircleFill size={10} /></span>
                    )}
                      on="hover"
                      position="right center"
                      offsetY={0}
                      offsetX={5}
                      contentStyle={{ padding: '1px' }}
                    ><span className="textInfo"> (Unit in Token / unit in Usd)</span>
                    </Popup></span></th>

                  <th scope="col">Distribution <span className="">
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1px' }}><BsFillQuestionCircleFill size={10} /></span>
                    )}
                      on="hover"
                      position="right center"
                      offsetY={0}
                      offsetX={5}
                      contentStyle={{ padding: '1px' }}
                    ><span className="textInfo"> (Unit in Token / unit in Usd)</span>
                    </Popup></span></th>

                  <th scope="col">Liquidity <span className="">
                    <Popup trigger={open => (
                      <span style={{ position: "relative", top: '-1px' }}><BsFillQuestionCircleFill size={10} /></span>
                    )}
                      on="hover"
                      position="right center"
                      offsetY={0}
                      offsetX={5}
                      contentStyle={{ padding: '1px' }}
                    ><span className="textInfo"> (Unit in Token / unit in Usd) </span>
                    </Popup></span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="col">(Total)</td>
                  <td scope="col">(Total)</td>
                  <td scope="col">(Total)</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.totalBurnAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} / $ {(parseFloat(window.web3Bsc.utils.fromWei(this.props.totalBurnAmount, 'Ether')).toFixed(4) * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.totalTransferAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} / $ {(parseFloat(window.web3Bsc.utils.fromWei(this.props.totalTransferAmount, 'Ether')).toFixed(4) * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.totalTransferAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} / $ {(parseFloat(window.web3Bsc.utils.fromWei(this.props.totalTransferAmount, 'Ether')).toFixed(4) * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope="col">(Past 30 days Sum)</th>
                  <th scope="col">(Past 30 days Sum)</th>
                  <th scope="col">(Past 30 days Sum)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.sum30BurnAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} / $ {(parseFloat(window.web3Bsc.utils.fromWei(this.props.sum30BurnAmount, 'Ether')).toFixed(4) * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.sum30TransferAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} / $ {(parseFloat(window.web3Bsc.utils.fromWei(this.props.sum30TransferAmount, 'Ether')).toFixed(4) * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td>{parseFloat(window.web3Bsc.utils.fromWei(this.props.sum30TransferAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} / $ {(parseFloat(window.web3Bsc.utils.fromWei(this.props.sum30TransferAmount, 'Ether')).toFixed(4) * this.props.PURSEPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div><br/><br/>
        <div className="container" style={{ width: 'fit-content' }}>
          <div className="row">
            <div>
              <AreaChart width={460} height={300} data={newCumulateBurn}>
                <XAxis dataKey="Date" tick={{fontSize: 14}} stroke="#A9A9A9"/>
                <YAxis tickFormatter={DataFormater} tick={{fontSize: 14}} stroke="#A9A9A9"/>
                <CartesianGrid vertical={false} strokeDasharray="2 2" />
                <Tooltip formatter={NumberFormater} />
                <Legend verticalAlign="top" height={40} formatter={() => ("Burn")} wrapperStyle={{fontSize: "20px"}}/>
                <Area type="monotone" dataKey="Sum" stroke="#8884d8" fillOpacity={0.5} fill="#8884d8" />
              </AreaChart>
            </div><li></li><li></li>
            <div>  
              <AreaChart width={460} height={300} data={newCumulateTransfer}>
                <XAxis dataKey="Date" tick={{fontSize: 14}} stroke="#A9A9A9"/>
                <YAxis tickFormatter={DataFormater} tick={{fontSize: 14}} stroke="#A9A9A9"/>
                <CartesianGrid vertical={false} strokeDasharray="2 2" />
                <Tooltip formatter={NumberFormater} />
                <Legend verticalAlign="top" height={40} formatter={() => ("Distribution / Liquidity")} wrapperStyle={{fontSize: "20px"}}/>
                <Area type="monotone" dataKey="Sum" stroke="#82ca9d" fillOpacity={0.5} fill="#82ca9d" />
              </AreaChart>
            </div>
          </div>
        </div><br/><br/><br/><br/>
      </div>

    );
  }
}

export default Main;