import React, { Component } from 'react'
import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LpToken from '../abis/LpToken.json'
import IPancakePair from '../abis/IPancakePair.json'
import PurseTokenUpgradable from '../abis/PurseTokenUpgradable.json'
import RestakingFarm from '../abis/RestakingFarm.json'

import PurseFarm from '../farm/farmPurse.json'
import Navb from './Navbar'
import Main from './Main'
import Menu from './Menu'
import Oneinch from './1inch'
import Deposit from './Deposit'
import Popup from './Popup'
import Farm from './Farm'
import Distribution from './Distribution'
import Stake from './Stake'

import './Popup.css'
import './App.css'

import PurseStaking from '../abis/PurseStaking.json'
import PurseToken from '../abis/PurseTokenTest.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadFarmData()
    await this.loadBlockchainData()
    this.loadTVLAPR()
    while ((this.state.wallet || this.state.walletConnect) == true) {
      await this.loadBlockchainUserData()
      await this.delay(10000);
    }
  }

  async loadFarmData() {
    const farm = PurseFarm.farm
    this.setState({ farm })
  }

  async loadBlockchainData() {
    const web3Bsc = window.web3Bsc

    //const networkId = "56"
    const networkId = "97"
    this.setState({ networkId })
    const farmNetwork = "MAINNET"
    this.setState({ farmNetwork })

    if (this.state.metamask == true && this.state.walletConnect == false) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      this.setState({ chainId })

      if (this.state.chainId == "0x61") {
        this.setState({ networkName: "BSC Testnet" })
      } else if (this.state.chainId == "0x38") {
        this.setState({ networkName: "BSC" })
      } else if (this.state.chainId == "0x1") {
        this.setState({ networkName: "Ethereum" })
      } else if (this.state.chainId == "0x3") {
        this.setState({ networkName: "Ropsten" })
      } else if (this.state.chainId == "0x4") {
        this.setState({ networkName: "Rinkeby" })
      } else if (this.state.chainId == "0x2a") {
        this.setState({ networkName: "Kovan" })
      } else if (this.state.chainId == "0x89") {
        this.setState({ networkName: "Polygon" })
      } else if (this.state.chainId == "0x13881") {
        this.setState({ networkName: "Mumbai" })
      } else if (this.state.chainId == "0xa869") {
        this.setState({ networkName: "Fuji" })
      } else if (this.state.chainId == "0xa86a") {
        this.setState({ networkName: "Avalanche" })
      }
      window.ethereum.on('chainChanged', this.handleChainChanged);
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
    } else if (this.state.metamask == false && this.state.walletConnect == false) {
      this.setState({ chainID: "0x" })
      this.setState({ networkName: "Unavailable" })
    }

    let mongoResponse0 = this.loadBDL()
    let mongoResponse1 = this.loadAccumulateTransfer()
    let mongoResponse2 = this.loadAccumulateBurn()
    let coingeckoResponse = this.loadApiPrice()
    let myJson = await mongoResponse0;
    let myJson1 = await mongoResponse1;
    let myJson2 = await mongoResponse2;
    let myJson3 = await coingeckoResponse;

    let PURSEPrice = myJson3["pundi-x-purse"]["usd"]
    this.setState({ PURSEPrice: PURSEPrice.toFixed(7) })
    let USDTPrice = myJson3["tether"]["usd"]
    this.setState({ USDTPrice: USDTPrice.toFixed(7) })
    let USDCPrice = myJson3["usd-coin"]["usd"]
    this.setState({ USDCPrice: USDCPrice.toFixed(7) })
    let BNBPrice = myJson3["binancecoin"]["usd"]
    this.setState({ BNBPrice: BNBPrice.toFixed(7) })
    let WETHPrice = myJson3["weth"]["usd"]
    this.setState({ WETHPrice: WETHPrice.toFixed(7) })
    let BUSDPrice = myJson3["binance-usd"]["usd"]
    this.setState({ BUSDPrice: BUSDPrice.toFixed(7) })
    let BTCPrice = myJson3["bitcoin"]["usd"]
    this.setState({ BTCPrice: BTCPrice.toFixed(7) })

    let totalTransferAmount = myJson["TransferTotal"]
    let sum30TransferAmount = myJson["Transfer30Days"]
    let totalBurnAmount = myJson["BurnTotal"]
    let sum30BurnAmount = myJson["Burn30Days"]
    let cumulateTransfer = myJson1
    let cumulateBurn = myJson2

    this.setState({ totalBurnAmount })
    this.setState({ sum30BurnAmount })
    this.setState({ totalTransferAmount })
    this.setState({ sum30TransferAmount })
    this.setState({ cumulateTransfer })
    this.setState({ cumulateBurn })

    // Load contract
    const pancakeContract = new window.web3Bsc.eth.Contract(IPancakePair.abi, "0x081F4B87F223621B4B31cB7A727BB583586eAD98")
    const purseTokenUpgradable = new web3Bsc.eth.Contract(PurseTokenUpgradable.abi, "0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C") //mainnet
    const restakingFarm = new web3Bsc.eth.Contract(RestakingFarm.abi, "0x439ec8159740a9b9a579f286963ac1c050af31c8")
    const purseStaking = new window.web3Bsc.eth.Contract(PurseStaking.abi, "0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711") 
    const purseToken = new window.web3Bsc.eth.Contract(PurseToken.abi, "0x20A31793e46CE77680e554cc5931938374C3D940")

    this.setState({ purseTokenUpgradable })
    this.setState({ restakingFarm })
    this.setState({ pancakeContract })
    this.setState({ purseStaking })
    this.setState({ purseToken })

    if (this.state.wallet == false && this.state.walletConnect == false) {

      let farmResponse0 = this.loadStakedBalance()
      let farmResponse1 = this.loadPurseTokenTotalSupply()
      let farmResponse2 = this.loadPoolRewardToken()

      let response0 = this.loadRewardEndTime()
      let response1 = this.loadRewardStartTime()
      let response2 = this.loadDistributedAmount()
      let response3 = this.loadDistributedPercentage()
      let response4 = this.loadPoolCapRewardToken()
      let response5 = this.loadPoolMintedRewardToken()
      let response6 = this.loadPoolLength()

      let stakedBalance = await farmResponse0
      let purseTokenTotalSupply = await farmResponse1
      let poolRewardToken = await farmResponse2

      let rewardEndTime = await response0
      let rewardStartTime = await response1
      let distributedAmount = await response2
      let distributedPercentage = await response3
      let poolCapRewardToken = await response4
      let poolMintedRewardToken = await response5
      let poolLength = await response6
      let rewardStartTimeDate = this.timeConverter(rewardStartTime)
      let rewardEndTimeDate = this.timeConverter(rewardEndTime)

      this.setState({ stakedBalance: stakedBalance.toString() })
      this.setState({ purseTokenTotalSupply: purseTokenTotalSupply.toString() })
      this.setState({ poolRewardToken: poolRewardToken.toString() })
      this.setState({ poolCapRewardToken })
      this.setState({ poolMintedRewardToken })
      this.setState({ poolLength })

      let totalrewardperblock = 0
      let purseTokenUpgradableBalance = 0
      let poolSegmentInfo = [[], []]
      let lpTokenSegmentBalance = [[], []]
      let userSegmentInfo = [[], []]
      let pendingSegmentReward = [[], []]

      let lpTokenAddresses = []
      let lpTokenPairsymbols = []

      let n = 0
      let i = 0

      for (i = 0; i < poolLength; i++) {
        let poolInfo = this.state.farm[i]
        let lpTokenBalance = 0
        totalrewardperblock += parseInt(poolInfo.pursePerBlock * poolInfo.bonusMultiplier)
        lpTokenAddresses[i] = poolInfo.lpAddresses[this.state.networkId]
        lpTokenPairsymbols[i] = poolInfo.lpTokenPairsymbol

        if (poolInfo.lpTokenPairsymbol == "Cake-LP") {
          userSegmentInfo[0][n] = ""
          pendingSegmentReward[0][n] = ""
          poolSegmentInfo[0][n] = poolInfo
          lpTokenSegmentBalance[0][n] = lpTokenBalance
          n += 1
        } else {
          userSegmentInfo[1][n] = ""
          pendingSegmentReward[1][n] = ""
          poolSegmentInfo[1][n] = poolInfo
          lpTokenSegmentBalance[1][n] = lpTokenBalance
          n += 1
        }
      }

      this.setState({ purseTokenUpgradableBalance: purseTokenUpgradableBalance.toString() })
      this.setState({ poolSegmentInfo })
      this.setState({ lpTokenSegmentBalance })
      this.setState({ totalrewardperblock: totalrewardperblock.toLocaleString('fullwide', { useGrouping: false }) })
      this.setState({ pendingSegmentReward: [[], []] })
      this.setState({ userSegmentInfo: [[], []] })
      this.setState({ totalpendingReward: "0" })

      this.setState({ lpTokenAddresses })
      this.setState({ lpTokenPairsymbols })

      this.setState({ rewardStartTime })
      this.setState({ rewardEndTime })
      this.setState({ rewardStartTimeDate })
      this.setState({ rewardEndTimeDate })
      this.setState({ distributedAmount })
      this.setState({ distributedPercentage })
      this.setState({ farmLoading: true })
    }
  }

  // ##############################################################################################################################
  async loadBlockchainUserData() {
    let purseStakingUserInfo = await this.loadPurseStakingUserInfo()
    let purseStakingUserStake = await this.loadPurseStakingUserStake()
    let purseStakingUserAllowance = await this.loadPurseStakingUserAllowance()
    let purseStakingUserPurse = await this.loadPurseStakingUserPurse()
    let purseStakingTotalStake = await this.loadPurseStakingTotalStake()
    let purseStakingTotalReceipt = await this.loadPurseStakingTotalReceipt()

    this.setState({ purseStakingUserReceipt: purseStakingUserInfo.toString()})
    this.setState({ purseStakingUserStake: purseStakingUserStake.toString() })
    this.setState({ purseStakingUserAllowance: purseStakingUserAllowance.toString() })
    this.setState({ purseStakingUserPurse: purseStakingUserPurse.toString() })
    this.setState({ purseStakingTotalStake: purseStakingTotalStake.toString() })
    this.setState({ purseStakingTotalReceipt: purseStakingTotalReceipt.toString() })

    // Load PurseTokenUpgradable
    let userResponse0 = this.loadPurseTokenBalance()
    let userResponse1 = this.checkClaimAmount(this.state.account)
    let purseTokenUpgradableBalance = await userResponse0
    let claimAmount = await userResponse1

    this.setState({ purseTokenUpgradableBalance: purseTokenUpgradableBalance.toString() })
    this.setState({ claimAmount })

    let totalpendingReward = 0
    let userSegmentInfo = [[], []]
    let lpTokenSegmentBalance = [[], []]
    let lpTokenSegmentAllowance = [[], []]
    let pendingSegmentReward = [[], []]
    let n = 0
    let i = 0

    let response0 = []
    let response1 = []
    let response2 = []
    let response3 = []

    for (i = 0; i < this.state.poolLength; i++) {
      response0[i] = this.loadUserInfo(i)
      response1[i] = this.loadLpTokenBalance(i)
      response2[i] = this.loadLpTokenAllowance(i)
      response3[i] = this.loadPendingReward(i)
    }

    for (i = 0; i < this.state.poolLength; i++) {

      let userInfo = await response0[i]
      let lpTokenBalance = await response1[i]
      let lpTokenAllowance = await response2[i]
      let pendingReward = await response3[i]
      totalpendingReward += parseInt(pendingReward)

      if (this.state.lpTokenPairsymbols[i] == "Cake-LP") {
        userSegmentInfo[0][n] = window.web3Bsc.utils.fromWei(userInfo.amount, 'Ether')
        lpTokenSegmentBalance[0][n] = lpTokenBalance
        lpTokenSegmentAllowance[0][n] = lpTokenAllowance
        pendingSegmentReward[0][n] = window.web3Bsc.utils.fromWei(pendingReward, 'Ether')
        n += 1
      } else {
        userSegmentInfo[1][n] = window.web3Bsc.utils.fromWei(userInfo.amount, 'Ether')
        lpTokenSegmentBalance[1][n] = lpTokenBalance
        lpTokenSegmentAllowance[1][n] = lpTokenAllowance
        pendingSegmentReward[1][n] = window.web3Bsc.utils.fromWei(pendingReward, 'Ether')
        n += 1
      }
    }

    this.setState({ lpTokenSegmentBalance })
    this.setState({ pendingSegmentReward })
    this.setState({ lpTokenSegmentAllowance })
    this.setState({ userSegmentInfo })
    this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
    this.setState({ farmLoading: true })
  }
  // ***************************Farm Info***********************************************************************
  async loadRewardEndTime() {
    let rewardEndTime = await this.state.purseTokenUpgradable.methods._getRewardEndTime().call()
    return rewardEndTime
  }

  async loadRewardStartTime() {
    let rewardStartTime = await this.state.purseTokenUpgradable.methods._getRewardStartTime().call()
    return rewardStartTime
  }

  async loadDistributedAmount() {
    let distributedAmount = await this.state.purseTokenUpgradable.methods._monthlyDistributePr().call()
    return distributedAmount
  }

  async loadDistributedPercentage() {
    let distributedPercentage = await this.state.purseTokenUpgradable.methods._percentageDistribute().call()
    return distributedPercentage
  }

  async loadPurseTotalSupply() {
    let purseTokenTotalSupply = await this.state.purseTokenUpgradable.methods._totalSupply().call()
    return purseTokenTotalSupply
  }

  async loadPoolCapRewardToken() {
    let poolCapRewardToken = await this.state.restakingFarm.methods.capMintToken().call()
    return poolCapRewardToken
  }

  async loadPoolMintedRewardToken() {
    let poolMintedRewardToken = await this.state.restakingFarm.methods.totalMintToken().call()
    return poolMintedRewardToken
  }

  async loadPoolLength() {
    let poolLength = await this.state.restakingFarm.methods.poolLength().call()
    return poolLength
  }

  async loadApiPrice() {
    let coingeckoResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin%2Cweth%2Cbinance-usd%2Cusd-coin%2Ctether%2Cbitcoin%2Cpundi-x-purse&vs_currencies=usd`);
    return coingeckoResponse.json();
  }

  async loadBDL() {
    let mongoResponse0 = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-iqgbt/endpoint/PundiX`);
    return mongoResponse0.json()
  }

  async loadAccumulateTransfer() {
    let mongoResponse1 = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-iqgbt/endpoint/CumulativeTransfer`);
    return mongoResponse1.json()
  }

  async loadAccumulateBurn() {
    let mongoResponse2 = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-iqgbt/endpoint/CumulativeBurn`);
    return mongoResponse2.json()
  }

  async loadStakedBalance() {
    let stakedBalance = await this.state.pancakeContract.methods.balanceOf("0x439ec8159740a9B9a579F286963Ac1C050aF31C8").call()
    stakedBalance = window.web3Bsc.utils.fromWei(stakedBalance, 'Ether')
    return stakedBalance
  }

  async loadPurseTokenTotalSupply() {
    let purseTokenTotalSupply = await this.state.purseTokenUpgradable.methods.totalSupply().call()
    return purseTokenTotalSupply
  }

  async loadPoolRewardToken() {
    let poolRewardToken = await this.state.purseTokenUpgradable.methods.balanceOf("0x439ec8159740a9b9a579f286963ac1c050af31c8").call()
    return poolRewardToken
  }



  // ***************************User Info***********************************************************************

  async loadPurseTokenBalance() {
    let purseTokenBalance = await this.state.purseTokenUpgradable.methods.balanceOf(this.state.account).call()
    return purseTokenBalance
  }

  async loadUserInfo(i) {
    let userInfo = await this.state.restakingFarm.methods.userInfo(this.state.lpTokenAddresses[i], this.state.account).call()
    return userInfo
  }

  async loadLpTokenBalance(i) {
    let lpTokenPair = new window.web3Bsc.eth.Contract(IPancakePair.abi, this.state.lpTokenAddresses[i])
    let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
    return lpTokenBalance
  }

  async loadLpTokenAllowance(i) {
    let lpTokenPair = new window.web3Bsc.eth.Contract(IPancakePair.abi, this.state.lpTokenAddresses[i])
    let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.restakingFarm._address).call()
    return lpTokenAllowance
  }

  async loadPendingReward(i) {
    let pendingReward = await this.state.restakingFarm.methods.pendingReward(this.state.lpTokenAddresses[i], this.state.account).call()
    return pendingReward
  }

  // *************************** Distribution Reward Info ***********************************************************************

  async loadLastRewardStartTime() {
    let lastRewardStartTime = await this.state.purseTokenUpgradable.methods._lastRewardStartTime().call()
    return lastRewardStartTime
  }

  async loadNumOfDays() {
    let numOfDays = await this.state.purseTokenUpgradable.methods._numOfDaysPerMth().call()
    return numOfDays
  }

  async loadPercentageDis() {
    let percentageDis = await this.state.purseTokenUpgradable.methods._percentageDistribute().call()
    return percentageDis
  }

  async loadAverageInterval() {
    let averageInterval = await this.state.purseTokenUpgradable.methods._averageInterval().call()
    return averageInterval
  }

  async loadUserRewardInfo(address) {
    let userRewardInfo = await this.state.purseTokenUpgradable.methods.accAmount(address).call()
    return userRewardInfo
  }

  async loadUserBalance(address) {
    let userBalance = await this.state.purseTokenUpgradable.methods.balanceOf(address).call()
    // userBalance = window.web3Bsc.utils.fromWei(userBalance, 'Ether')
    return userBalance
  }

    // ***********************************Purse Staking***************************************************************
    async loadPurseStakingUserInfo() {
      let purseStakingUserInfo = await this.state.purseStaking.methods.userInfo(this.state.account).call()
      return purseStakingUserInfo
    }
    async loadPurseStakingUserStake() {
      let purseStakingUserPurse = await this.state.purseStaking.methods.getTotalPurse(this.state.account).call()
      return purseStakingUserPurse
    }
    async loadPurseStakingUserAllowance() {
      let purseStakingUserAllowance = await this.state.purseToken.methods.allowance(this.state.account, "0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711").call()
      return purseStakingUserAllowance
    }
    async loadPurseStakingUserPurse() {
      let purseStakingUserPurse = await this.state.purseToken.methods.balanceOf(this.state.account).call()
      return purseStakingUserPurse
    }
    async loadPurseStakingTotalReceipt() {
      let purseStakingTotalReceipt = await this.state.purseStaking.methods.totalReceiptSupply().call()
      return purseStakingTotalReceipt
    }
    async loadPurseStakingTotalStake() {
      let purseStakingTotalReceipt = await this.state.purseToken.methods.balanceOf("0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711").call()
      return purseStakingTotalReceipt
    }

  // ***************************TVL & APR***********************************************************************
  async loadTVLAPR() {
    // Load bavaMasterFarmer

    let tvl = [[], []]
    let apr = [[], []]
    let apyDaily = [[], []]
    let apyWeekly = [[], []]
    let apyMonthly = [[], []]
    let n = 0

    let response = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-iqgbt/endpoint/TVLAPR`);
    const myJson = await response.json();
    let tvlArray = myJson["TVL"]
    let aprArray = myJson["APR"]
    let apyArray = myJson["APYDaily"]

    for (let i = 0; i < this.state.poolLength; i++) {

      if (this.state.lpTokenPairsymbols[i] == "Cake-LP") {
        tvl[0][n] = tvlArray
        apr[0][n] = aprArray
        apyDaily[0][n] = (Math.pow((1 + 0.8 * apr[0][n] / 36500), 365) - 1) * 100
        apyWeekly[0][n] = (Math.pow((1 + 0.8 * apr[0][n] / 5200), 52) - 1) * 100
        apyMonthly[0][n] = (Math.pow((1 + 0.8 * apr[0][n] / 1200), 12) - 1) * 100
        n += 1
      } else {
        tvl[1][n] = tvlArray
        apr[1][n] = aprArray
        apyDaily[1][n] = (Math.pow((1 + 0.8 * apr[1][n] / 36500), 365) - 1) * 100
        apyWeekly[1][n] = (Math.pow((1 + 0.8 * apr[1][n] / 5200), 52) - 1) * 100
        apyMonthly[1][n] = (Math.pow((1 + 0.8 * apr[1][n] / 1200), 12) - 1) * 100
        n += 1
      }
    }
    this.setState({ tvl })
    this.setState({ apr })
    this.setState({ apyDaily })
    this.setState({ apyWeekly })
    this.setState({ apyMonthly })
    this.setState({ aprloading: true })
  }


  // ***********************************************************************************************************

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      // await window.ethereum.enable()
      this.setState({ metamask: true })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      this.setState({ metamask: true })
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      this.setState({ metamask: false })
      this.setState({ wallet: false })
    }
    window.web3Bsc = new Web3(`https://data-seed-prebsc-1-s2.binance.org:8545/`);  // testnet
    //window.web3Bsc = new Web3(`https://bsc-dataseed.binance.org/`);
  }

  connectWallet = () => {
    if (this.state.metamask == true) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await this.switchNetwork()
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == "0x61") {      // mainnet: 0x38, testnet: 0x61
            this.setWalletTrigger(true)
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
          } else {
            console.error("error");
            console.error(err);
          }
        });
    } else {
      alert("No Metamask provider was found")
    }
  }

  WalletConnect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        97: `https://data-seed-prebsc-1-s3.binance.org:8545/`
        //56: `https://bsc-dataseed.binance.org/`
      },
      chainId: 97,
      //chainId: 56,
    });
    window.provider = provider
    await window.provider.enable();
    window.web3Con = await new Web3(window.provider);
    const networkId = await window.web3Con.eth.net.getId();
    if (networkId != 97) {
      alert("You're connected to an unsupported network.")
      this.WalletDisconnect()
    } else {
      const accounts = await window.web3Con.eth.getAccounts();
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ walletConnect: true })
      this.setState({ networkName: "BSC" })
      this.componentWillMount()
    }

    // Subscribe to accounts change
    window.provider.on("accountsChanged", this.handleAccountsChanged);
    // Subscribe to session disconnection
    window.provider.on("disconnect", async () => {
      await this.WalletDisconnect()
    });
    window.provider.on("chainChanged", async () => {
      await this.WalletDisconnect()
      alert("You're connected to an unsupported network.")
    });
  }

  WalletDisconnect = async () => {
    if (window.provider.connected == true) {
      await window.provider.disconnect()
    }
    await this.setState({ walletConnect: false })
    this.componentWillMount()
  }

  switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],    // mainnet 0x38, testnet: 0x61
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38', rpcUrls: ['https://bsc-dataseed1.binance.org/'], chainName: 'BSC Mainnet',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB', // 2-6 characters long
                decimals: 18
              }, blockExplorerUrls: ['https://bscscan.com/']
            }],
          });
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          this.setState({ chainId })
          if (this.state.chainId == "0x61") {
            this.setState({ networkName: "BSC Testnet" })
          } else if (this.state.chainId == "0x38") {
            this.setState({ networkName: "BSC" })
          } else if (this.state.chainId == "0x1") {
            this.setState({ networkName: "Ethereum" })
          } else if (this.state.chainId == "0x3") {
            this.setState({ networkName: "Ropsten" })
          } else if (this.state.chainId == "0x4") {
            this.setState({ networkName: "Rinkeby" })
          } else if (this.state.chainId == "0x2a") {
            this.setState({ networkName: "Kovan" })
          } else if (this.state.chainId == "0x89") {
            this.setState({ networkName: "Polygon" })
          } else if (this.state.chainId == "0x13881") {
            this.setState({ networkName: "Mumbai" })
          } else if (this.state.chainId == "0xa869") {
            this.setState({ networkName: "Fuji" })
          } else if (this.state.chainId == "0xa86a") {
            this.setState({ networkName: "Avalanche" })
          }
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }


  handleAccountsChanged = async (accounts) => {
    if (this.state.wallet == true) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.setWalletTrigger(false)
      } else if (accounts[0] !== this.state.account) {
        this.state.account = accounts[0];
        const first4Account = this.state.account.substring(0, 4)
        const last4Account = this.state.account.slice(-4)
        this.setState({ first4Account: first4Account })
        this.setState({ last4Account: last4Account })
        this.componentWillMount()
        // Do any other work!
      }
    } else if (this.state.walletConnect == true) {
      const accounts = await window.web3Con.eth.getAccounts();
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ walletConnect: true })
      this.componentWillMount()
    }
  }

  handleChainChanged = async () => {
    // We recommend reloading the page, unless you must do otherwise
    // window.location.reload();
    if (this.state.wallet == true) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      this.setState({ chainId })
      if (chainId != "0x61") {
        this.setWalletTrigger(false)
      }
      if (this.state.chainId == "0x61") {
        this.setState({ networkName: "BSC Testnet" })
      } else if (this.state.chainId == "0x38") {
        this.setState({ networkName: "BSC" })
      } else if (this.state.chainId == "0x1") {
        this.setState({ networkName: "Ethereum" })
      } else if (this.state.chainId == "0x3") {
        this.setState({ networkName: "Ropsten" })
      } else if (this.state.chainId == "0x4") {
        this.setState({ networkName: "Rinkeby" })
      } else if (this.state.chainId == "0x2a") {
        this.setState({ networkName: "Kovan" })
      } else if (this.state.chainId == "0x89") {
        this.setState({ networkName: "Polygon" })
      } else if (this.state.chainId == "0x13881") {
        this.setState({ networkName: "Mumbai" })
      } else if (this.state.chainId == "0xa869") {
        this.setState({ networkName: "Fuji" })
      } else if (this.state.chainId == "0xa86a") {
        this.setState({ networkName: "Avalanche" })
      }
      this.switchNetwork()
      // Run any other necessary logic...
    }
  }

  timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var min = a.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var sec = a.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  deposit = async (i, amount, n) => {
    if (this.state.walletConnect == true) {
      const restakingFarmData = RestakingFarm.networks[this.state.networkId]
      let restakingFarm = new window.web3Con.eth.Contract(RestakingFarm.abi, restakingFarmData.address)
      await restakingFarm.methods.deposit(this.state.lpTokenAddresses[i], amount).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    } else if (this.state.wallet == true) {
      const restakingFarmData = RestakingFarm.networks[this.state.networkId]
      let restakingFarm = new window.web3.eth.Contract(RestakingFarm.abi, restakingFarmData.address)
      await restakingFarm.methods.deposit(this.state.lpTokenAddresses[i], amount).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  approve = async (i, n) => {
    if (this.state.walletConnect == true) {
      let lpToken = new window.web3Con.eth.Contract(LpToken.abi, this.state.lpTokenAddresses[i])
      await lpToken.methods.approve(this.state.restakingFarm._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      })
    } else if (this.state.wallet == true) {
      let lpToken = new window.web3.eth.Contract(LpToken.abi, this.state.lpTokenAddresses[i])
      await lpToken.methods.approve(this.state.restakingFarm._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      })
    }
  }

  withdraw = async (i, amount, n) => {
    if (this.state.walletConnect == true) {
      const restakingFarmData = RestakingFarm.networks[this.state.networkId]
      let restakingFarm = new window.web3Con.eth.Contract(RestakingFarm.abi, restakingFarmData.address)
      restakingFarm.methods.withdraw(this.state.lpTokenAddresses[i], amount).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    } else if (this.state.wallet == true) {
      const restakingFarmData = RestakingFarm.networks[this.state.networkId]
      let restakingFarm = new window.web3.eth.Contract(RestakingFarm.abi, restakingFarmData.address)
      restakingFarm.methods.withdraw(this.state.lpTokenAddresses[i], amount).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  harvest = async (i, n) => {
    if (this.state.walletConnect == true) {
      if (this.state.pendingSegmentReward[n][i] <= 0) {
        alert("No token to harvest! Please deposit LP to earn PURSE")
      } else {
        const restakingFarmData = RestakingFarm.networks[this.state.networkId]
        let restakingFarm = new window.web3Con.eth.Contract(RestakingFarm.abi, restakingFarmData.address)
        restakingFarm.methods.claimReward(this.state.lpTokenAddresses[i]).send({ from: this.state.account }).then(async (result) => {
          this.componentWillMount()
        }).catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      }
    } else if (this.state.wallet == true) {
      if (this.state.pendingSegmentReward[n][i] <= 0) {
        alert("No token to harvest! Please deposit LP to earn PURSE")
      } else {
        const restakingFarmData = RestakingFarm.networks[this.state.networkId]
        let restakingFarm = new window.web3.eth.Contract(RestakingFarm.abi, restakingFarmData.address)

        restakingFarm.methods.claimReward(this.state.lpTokenAddresses[i]).send({ from: this.state.account }).then(async (result) => {
          this.componentWillMount()
        }).catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      }
    } else {
      alert("Wallet is not connected")
    }
  }

  checkClaimAmount = async (address) => {

    let response0 = this.loadLastRewardStartTime()
    let response1 = this.loadNumOfDays()
    let response2 = this.loadPercentageDis()
    let response3 = this.loadAverageInterval()
    let response4 = this.loadUserRewardInfo(address)
    let response5 = this.loadUserBalance(address)
    let response6 = this.loadPurseTotalSupply()

    let lastRewardStartTime = await response0
    let numOfDays = await response1
    let percentageDis = await response2
    let averageInterval = await response3
    let userRewardInfo = await response4
    let userBalance = await response5
    let purseTokenTotalSupply = await response6
    let reward = 0

    if (userRewardInfo.lastUpdateTime == 0) {
      reward = 0
    } else if (userRewardInfo.lastUpdateTime >= this.state.rewardStartTime) {
      reward = parseFloat(window.web3Bsc.utils.fromWei(userRewardInfo.accReward, 'Ether'))
    } else if (userRewardInfo.lastUpdateTime < lastRewardStartTime) {       // 1st distribution wont happen, all users lastUpdateTime either 0 or > lastRewardStartTime
      let interval = parseInt((this.state.rewardStartTime - lastRewardStartTime) / averageInterval);
      let accumulateAmount = parseFloat(window.web3Bsc.utils.fromWei(userBalance, 'Ether') * interval);
      reward = accumulateAmount * this.state.distributedAmount * percentageDis / purseTokenTotalSupply / numOfDays / 100;
    } else {
      let interval = parseInt((this.state.rewardStartTime - userRewardInfo.lastUpdateTime) / averageInterval);
      let accumulateAmount = parseFloat(window.web3Bsc.utils.fromWei(userBalance, 'Ether') * interval)
      let lastmonthAccAmount = parseFloat(window.web3Bsc.utils.fromWei(userRewardInfo.amount, 'Ether')) + accumulateAmount
      reward = lastmonthAccAmount * this.state.distributedAmount * percentageDis / purseTokenTotalSupply / numOfDays / 100
    }
    return reward
  }

  claimDistributePurse = async () => {
    if ((Date.now() / 1000).toFixed(0) < this.state.rewardStartTime) {
      alert("Distribution not started yet")
    } else if ((Date.now() / 1000).toFixed(0) > this.state.rewardEndTime) {
      alert("Distribution already end")
    } else {
      if (this.state.claimAmount == 0) {
        alert("No reward available")
      } else {
        if (this.state.walletConnect == true) {
          let purseTokenUpgradable = new window.web3Con.eth.Contract(PurseTokenUpgradable.abi, "0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C")
          await purseTokenUpgradable.methods.claimDistributionPurse().send({ from: this.state.account })
        } else if (this.state.wallet == true) {
          let purseTokenUpgradable = new window.web3.eth.Contract(PurseTokenUpgradable.abi, "0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C")
          await purseTokenUpgradable.methods.claimDistributionPurse().send({ from: this.state.account })
        }
      }
    }
  }

  setI = (type, pair) => {
    this.setState({ n: type })
    this.setState({ i: pair })
  }

  setTrigger = (state) => {
    this.setState({ buttonPopup: state })
  }

  setWalletTrigger = async (state) => {
    if (state == false) {
      await this.setState({ wallet: state })
      this.componentWillMount()
    } else {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ wallet: state })
      this.componentWillMount()
    }
  }

  stake = async (amount) => {
    if (this.state.walletConnect == true) {
      let purseStaking = new window.web3Con.eth.Contract(PurseStaking.abi, "0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711") 
      await purseStaking.methods.enter(amount).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong. Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });   
    } else if (this.state.wallet == true) {
      this.setState({ loading: false })
      let purseStaking = new window.web3.eth.Contract(PurseStaking.abi, "0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711") 
      await purseStaking.methods.enter(amount).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong. Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });   
    }
  }

  unstake = async (receipt) => {
    if (this.state.walletConnect == true) {
      let purseStaking = new window.web3Con.eth.Contract(PurseStaking.abi, "0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711") 
      await purseStaking.methods.leave(receipt).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong. Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });   
    } else if (this.state.wallet == true) {
      let purseStaking = new window.web3.eth.Contract(PurseStaking.abi, "0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711") 
      await purseStaking.methods.leave(receipt).send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong. Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });  
    }
  }

  checkPurseAmount = async (receipt) => {
    let purseStakingTotalStake = await this.loadPurseStakingTotalStake()
    let purseStakingTotalReceipt = await this.loadPurseStakingTotalReceipt()

    let purseWei = (receipt * purseStakingTotalStake / purseStakingTotalReceipt).toString()
    let purse = parseFloat(window.web3Bsc.utils.fromWei(purseWei, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 10 })
    return purse
  }

  approvePurse = async () => {
    if (this.state.walletConnect == true) {
      let purseToken = new window.web3Con.eth.Contract(PurseToken.abi, "0x20A31793e46CE77680e554cc5931938374C3D940")
      await purseToken.methods.approve("0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711", "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      })
      this.componentWillMount()
      this.setState({ loading: true })
    } else if (this.state.wallet == true) {
      let purseToken = new window.web3.eth.Contract(PurseToken.abi, "0x20A31793e46CE77680e554cc5931938374C3D940")
      await purseToken.methods.approve("0x7Afe4C3Cee2036341C6D1a5Fefb8178F8b556711", "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
        this.componentWillMount()
      })
    }
  }



  constructor(props) {
    super(props)
    this.state = {
      account: '',
      lpToken: {},
      purseTokenUpgradable: {},
      restakingFarm: {},
      purseTokenUpgradableBalance: '0',
      purseTokenTotalSupply: '0',
      totalBurnAmount: '0',
      sum30BurnAmount: '0',
      totalTransferAmount: '0',
      sum30TransferAmount: '0',
      cumulateTransfer: [],
      cumulateBurn: [],
      stakedBalance: '0',
      i: '0',
      n: '0',
      wallet: false,
      metamask: false,
      farmLoading: false,
      walletConnect: false,
      aprloading: false,
      poolLength: '0',
      userSegmentInfo: [[], []],
      poolSegmentInfo: [[], []],
      lpTokenSegmentBalance: [[], []],
      pendingSegmentReward: [[], []],
      lpTokenSegmentAllowance: [[], []],
      tvl: [[], []],
      apr: [[], []],
      apyDaily: [[], []],
      apyWeekly: [[], []],
      apyMonthly: [[], []],
      totalrewardperblock: '0',
      totalpendingReward: '0',
      buttonPopup: false,
      poolCapRewardToken: '0',
      poolMintedRewardToken: '0',
      poolRewardToken: '0',
      networkName: "Loading",
      rewardEndTime: '0',
      rewardStartTime: '0',
      distributedAmount: '0',
      distributedPercentage: '0',
      rewardEndTimeDate: '0',
      rewardStartTimeDate: '0',
      claimAmount: '0',
      purseStakingUserReceipt: '0',
      purseStakingUserPurse: '0',
      purseStakingUserStake: '0',
      purseStakingUserAllowance: '0',
      purseStakingTotalStake: '0',
      purseStakingTotalReceipt: '0',
    }
  }

  render() {
    let maincontent
    let menucontent
    let depositcontent
    let oneinchContent
    let distributionContent
    let farmInfoContent
    let stakeContent
    maincontent = <Main
      lpTokenBalance={this.state.lpTokenBalance}
      purseTokenUpgradableBalance={this.state.purseTokenUpgradableBalance}
      poolLength={this.state.poolLength}
      deposit={this.deposit}
      withdraw={this.withdraw}
      PURSEPrice={this.state.PURSEPrice}
      purseTokenTotalSupply={this.state.purseTokenTotalSupply}
      lpTokenInContract={this.state.lpTokenInContract}
      totalrewardperblock={this.state.totalrewardperblock}
      poolCapRewardToken={this.state.poolCapRewardToken}
      poolMintedRewardToken={this.state.poolMintedRewardToken}
      poolRewardToken={this.state.poolRewardToken}
      totalBurnAmount={this.state.totalBurnAmount}
      sum30BurnAmount={this.state.sum30BurnAmount}
      totalTransferAmount={this.state.totalTransferAmount}
      sum30TransferAmount={this.state.sum30TransferAmount}
      cumulateTransfer={this.state.cumulateTransfer}
      cumulateBurn={this.state.cumulateBurn}
    />
    menucontent = <Menu
      lpTokenBalance={this.state.lpTokenBalance}
      purseTokenUpgradableBalance={this.state.purseTokenUpgradableBalance}
      purseTokenTotalSupply={this.state.purseTokenTotalSupply}
      totalpendingReward={this.state.totalpendingReward}
      totalrewardperblock={this.state.totalrewardperblock}
      userSegmentInfo={this.state.userSegmentInfo}
      poolSegmentInfo={this.state.poolSegmentInfo}
      lpTokenSegmentBalance={this.state.lpTokenSegmentBalance}
      pendingSegmentReward={this.state.pendingSegmentReward}
      buttonPopup={this.state.buttonPopup}
      farmNetwork={this.state.farmNetwork}
      tvl={this.state.tvl}
      apr={this.state.apr}
      apyDaily={this.state.apyDaily}
      apyWeekly={this.state.apyWeekly}
      apyMonthly={this.state.apyMonthly}
      farmLoading={this.state.farmLoading}
      aprloading={this.state.aprloading}
      deposit={this.deposit}
      withdraw={this.withdraw}
      setI={this.setI}
      setTrigger={this.setTrigger}
      harvest={this.harvest}
      stakedBalance={this.state.stakedBalance}
    />
    depositcontent = <Deposit
      lpTokenBalance={this.state.lpTokenBalance}
      purseTokenUpgradableBalance={this.state.purseTokenUpgradableBalance}
      deposit={this.deposit}
      withdraw={this.withdraw}
      i={this.state.i}
      n={this.state.n}
      userSegmentInfo={this.state.userSegmentInfo}
      poolSegmentInfo={this.state.poolSegmentInfo}
      lpTokenSegmentBalance={this.state.lpTokenSegmentBalance}
      c={this.state.lpTokenSegmentAsymbol}
      pendingSegmentReward={this.state.pendingSegmentReward}
      lpTokenSegmentAllowance={this.state.lpTokenSegmentAllowance}
      wallet={this.state.wallet}
      farmNetwork={this.state.farmNetwork}
      harvest={this.harvest}
      approve={this.approve}
      connectWallet={this.connectWallet}
      walletConnect={this.state.walletConnect}
    />
    oneinchContent = <Oneinch
      lpTokenBalance={this.state.lpTokenBalance}
      purseTokenUpgradableBalance={this.state.purseTokenUpgradableBalance}
      purseTokenTotalSupply={this.state.purseTokenTotalSupply}
      totalpendingReward={this.state.totalpendingReward}
      totalrewardperblock={this.state.totalrewardperblock}
      userSegmentInfo={this.state.userSegmentInfo}
      poolSegmentInfo={this.state.poolSegmentInfo}
      lpTokenSegmentBalance={this.state.lpTokenSegmentBalance}
      pendingSegmentReward={this.state.pendingSegmentReward}
      buttonPopup={this.state.buttonPopup}
      farmNetwork={this.state.farmNetwork}
      tvl={this.state.tvl}
      apr={this.state.apr}
      apyDaily={this.state.apyDaily}
      apyWeekly={this.state.apyWeekly}
      apyMonthly={this.state.apyMonthly}
      farmLoading={this.state.farmLoading}
      aprloading={this.state.aprloading}
      deposit={this.deposit}
      withdraw={this.withdraw}
      setI={this.setI}
      setTrigger={this.setTrigger}
      harvest={this.harvest}
    />
    farmInfoContent = <Farm
      lpTokenBalance={this.state.lpTokenBalance}
      purseTokenUpgradableBalance={this.state.purseTokenUpgradableBalance}
      poolLength={this.state.poolLength}
      deposit={this.deposit}
      withdraw={this.withdraw}
      purseTokenTotalSupply={this.state.purseTokenTotalSupply}
      lpTokenInContract={this.state.lpTokenInContract}
      totalrewardperblock={this.state.totalrewardperblock}
      poolCapRewardToken={this.state.poolCapRewardToken}
      poolMintedRewardToken={this.state.poolMintedRewardToken}
      poolRewardToken={this.state.poolRewardToken}
    />
    distributionContent = <Distribution
      wallet={this.state.wallet}
      walletConnect={this.state.walletConnect}
      connectWallet={this.connectWallet}
      checkClaimAmount={this.checkClaimAmount}
      claimDistributePurse={this.claimDistributePurse}
      account={this.state.account}
      rewardEndTime={this.state.rewardEndTime}
      rewardStartTime={this.state.rewardStartTime}
      distributedAmount={this.state.distributedAmount}
      distributedPercentage={this.state.distributedPercentage}
      rewardStartTimeDate={this.state.rewardStartTimeDate}
      rewardEndTimeDate={this.state.rewardEndTimeDate}
      claimAmount={this.state.claimAmount}
      totalTransferAmount={this.state.totalTransferAmount}
      purseTokenTotalSupply={this.state.purseTokenTotalSupply}
    />
    stakeContent = <Stake
      wallet={this.state.wallet}
      walletConnect={this.state.walletConnect}
      connectWallet={this.connectWallet}
      account={this.state.account}
      PURSEPrice={this.state.PURSEPrice}
      purseStaking={this.state.purseStaking}
      purseStakingUserReceipt={this.state.purseStakingUserReceipt}
      purseStakingUserPurse={this.state.purseStakingUserPurse}
      purseStakingUserStake={this.state.purseStakingUserStake}
      purseStakingUserAllowance={this.state.purseStakingUserAllowance}
      purseStakingTotalStake={this.state.purseStakingTotalStake}
      purseStakingTotalReceipt={this.state.purseStakingTotalReceipt}
      stake={this.stake}
      unstake={this.unstake}
      checkPurseAmount={this.checkPurseAmount}
      approvePurse = {this.approvePurse}
    />

    return (
      <Router>
        <div>
          <Navb
            account={this.state.account}
            first4Account={this.state.first4Account}
            last4Account={this.state.last4Account}
            wallet={this.state.wallet}
            setWalletTrigger={this.setWalletTrigger}
            loadWeb3={this.loadWeb3}
            connectWallet={this.connectWallet}
            WalletConnect={this.WalletConnect}
            walletConnect={this.state.walletConnect}
            WalletDisconnect={this.WalletDisconnect}
            networkName={this.state.networkName}
            PURSEPrice={this.state.PURSEPrice}
          />
          <div className="container-fluid mt-4">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                <div className="content mr-auto ml-auto">
                  <Switch>
                    <Route path="/" exact > {maincontent} </Route>
                    <Route path="/home" exact > {maincontent} </Route>
                    <Route path="/lpfarm/menu" exact > {menucontent} </Route>
                    <Route path="/lpfarm/farmInfo" exact > {farmInfoContent} </Route>
                    <Route path="/lpfarm/oneinch" exact > {oneinchContent} </Route>
                    <Route path="/distribution" exact > {distributionContent} </Route>
                    <Route path="/stake" exact > {stakeContent} </Route>
                    <Route path="/deposit" exact > {depositcontent} </Route>
                  </Switch>
                  <Popup trigger={this.state.buttonPopup} setTrigger={this.setTrigger}>
                    <div className="container-fluid">{depositcontent}</div>
                  </Popup>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;