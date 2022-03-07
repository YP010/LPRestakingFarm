// npx truffle migrate --reset --compile-all --network bscTestnet

const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

// Pancake LP token Pair factory: https://testnet.bscscan.com/address/0xd9a601f3a434008b921f21185b814b55534eb243#readContract
// Pancake LP token Pair:
// 0xF52e1f503FffF3c212d72045839915B11478fAc6    PURSE-mUSDC
// 0x58A26F9100f77aa68E19359EffDBd7f7B97320C1    mBNB-PURSE
// 0x38da41759CF77FB897ef237D4116aa50aFb1F743    mWETH-PURSE
// 0xEa6D6CE32bF9595c8e1ab706f7e8b2e2d8453850    PURSE-mUSDT
// 0xF02D596b10297417e9F545DFDa8895F558a728A6    PURSE-mBTC

// ONEINCH LP token pair:
// 0x3A97a6084b10AA8d9Dd0DE753192E549f0D75bAe    mBTC-PURSE

const RestakingFarm = artifacts.require("RestakingFarm");
// const LpToken = artifacts.require("LpToken");
// const PurseTokenUpgradable = artifacts.require("PurseTokenUpgradable");

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

// network is for network and accounts is to allow people to have access to all accounts
module.exports = async function (deployer, network, accounts) {

  //Deploy PurseToken
  // const purseToken = await deployProxy(PurseTokenUpgradable,["0x8CF7Fb0326C6a5B5A8dA62e3FE8c5eD8Cb041217", "0xA2993e1171520ba0fD0AB39224e1B24BDa5c24a9", 10, 5, 5],{deployer, kind: 'uups' });
  // const upgrade = await upgradeProxy(purseToken.address, PurseTokenUpgradableV2, { deployer }); //Upgrade smart contract
  // console.log(purseToken.address)
  // deploy RestakingFarm and pass in variables taken in in constructor ie the 2 token addresses and the 2 other variables
  const restakingFarm = await deployProxy(RestakingFarm, ["0x29a63F4B209C29B4DC47f06FFA896F32667DAD2C", tokens("1000000000")], { deployer, kind: 'uups' })
  console.log(restakingFarm.address)

  // await deployer.deploy(RestakingFarm, purseToken.address, tokens("1000000000"))
  // const restakingFarm = await RestakingFarm.deployed()
  await restakingFarm.add("0x081F4B87F223621B4B31cB7A727BB583586eAD98", tokens("1"), 1, 13245430)   //production change to 200
  // await restakingFarm.add("0x58A26F9100f77aa68E19359EffDBd7f7B97320C1", tokens("100"), 1, 5000)
  // await restakingFarm.add("0x38da41759CF77FB897ef237D4116aa50aFb1F743", tokens("100"), 1, 5000)
  // await restakingFarm.add("0x3A97a6084b10AA8d9Dd0DE753192E549f0D75bAe", tokens("100"), 1, 5000)
  // // await purseToken.addAdmin(restakingFarm.address)
  // console.log("addAdmin")
  // await purseToken.setWhitelistedFrom(restakingFarm.address)
  // console.log("whitelistedAddress")

};
