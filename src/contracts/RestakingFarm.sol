// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
 
interface PurseToken {

    function transfer(address to, uint tokens) external returns (bool success);

    function mint(address to, uint tokens) external;

    function transferFrom(address from, address to, uint tokens) external returns (bool success);

    function balanceOf(address tokenOwner) external view returns (uint balance);

}

contract RestakingFarm is Initializable, UUPSUpgradeable, OwnableUpgradeable, PausableUpgradeable {

    using SafeERC20Upgradeable for IERC20Upgradeable;

    // ---Contract Variables---
    string public name;

    // Userinfo
    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of PURSEs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accPursePerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accPursePerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }
    
    // Info of each pool.
    struct PoolInfo {
        IERC20Upgradeable lpToken;           // Address of LP token contract.
        uint256 pursePerBlock;
        uint256 bonusMultiplier;
        uint256 lastRewardBlock;  // Last block number that PURSEs distribution occurs.
        uint256 accPursePerShare; // Accumulated PURSEs per share, times 1e12. See below.
        uint256 startBlock;
    }

    // The PURSE TOKEN!
    PurseToken public purseToken;
    uint256 public totalMintToken;    
    uint256 public capMintToken;
    IERC20Upgradeable[] public poolTokenList;
    mapping(IERC20Upgradeable => PoolInfo) public poolInfo;

    // Info of each user that stakes LP tokens.
    mapping (IERC20Upgradeable => mapping (address => UserInfo)) public userInfo;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event AddNewPool(address indexed owner, IERC20Upgradeable indexed lpToken, uint256 pursePerBlock, uint256 bonusMultiplier, uint256 startBlock);
    event UpdatePoolReward(address indexed owner, IERC20Upgradeable indexed lpToken, uint256 pursePerBlock);
    event UpdatePoolMultiplier(address indexed owner, IERC20Upgradeable indexed lpToken, uint256 bonusMultiplier);
    event ClaimReward(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, IERC20Upgradeable indexed lpToken, uint256 amount);

    modifier poolExist(IERC20Upgradeable _lpToken) {
        require( poolInfo[(_lpToken)].lpToken != IERC20Upgradeable(address(0)), "Pool not exist");
        _;
    }  

    function poolLength() external view returns (uint256) {
        return poolTokenList.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    function add(IERC20Upgradeable _lpToken, uint256 _pursePerBlock, uint256 _bonusMultiplier, uint256 _startBlock) public onlyOwner {
        require(_lpToken != IERC20Upgradeable(address(0)), "Farmer::add: invalid lp token");
        require(poolInfo[_lpToken].lpToken == IERC20Upgradeable(address(0)), "Farmer::add: lp is already in pool");
        uint256 lastRewardBlock = block.number > _startBlock ? block.number : _startBlock;
        poolInfo[(_lpToken)] = PoolInfo({
            lpToken: _lpToken,
            pursePerBlock : _pursePerBlock,
            bonusMultiplier: _bonusMultiplier,
            lastRewardBlock: lastRewardBlock,
            accPursePerShare: 0,
            startBlock: _startBlock
        });
        poolTokenList.push(_lpToken);
        emit AddNewPool(msg.sender, _lpToken, _pursePerBlock, _bonusMultiplier, _startBlock);
    }

    // Update the given pool's PURSE _pursePerBlock. Can only be called by the owner.
    function setPurseReward(IERC20Upgradeable _lpToken, uint256 _pursePerBlock) public onlyOwner poolExist(_lpToken){        
        PoolInfo storage pool = poolInfo[_lpToken];
        require(pool.pursePerBlock != _pursePerBlock, "Same Purse Reward");
        updatePool(_lpToken);
        pool.pursePerBlock = _pursePerBlock;
        emit UpdatePoolReward(msg.sender, _lpToken, _pursePerBlock);
    }

    // Update the given pool's PURSE _bonusMultiplier. Can only be called by the owner.
    function setBonusMultiplier(IERC20Upgradeable _lpToken, uint256 _bonusMultiplier) public onlyOwner poolExist(_lpToken){        
        PoolInfo storage pool = poolInfo[_lpToken];
        require(pool.bonusMultiplier != _bonusMultiplier, "Same bonus multiplier");
        updatePool(_lpToken);
        pool.bonusMultiplier= _bonusMultiplier;
        emit UpdatePoolMultiplier(msg.sender, _lpToken, _bonusMultiplier );
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public pure returns (uint256) {
        return _to-_from;
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(IERC20Upgradeable _lpToken) public poolExist(_lpToken){
        PoolInfo storage pool = poolInfo[_lpToken];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 purseReward = multiplier*pool.pursePerBlock*pool.bonusMultiplier;
        if (totalMintToken < capMintToken) {
            if (totalMintToken + purseReward >= capMintToken) {
                uint256 PurseCanMint = capMintToken-totalMintToken;
                totalMintToken += PurseCanMint;
                purseToken.mint(address(this), PurseCanMint);
            } else {
                totalMintToken += purseReward;
                purseToken.mint(address(this), purseReward);
            }
        }
        pool.accPursePerShare = pool.accPursePerShare+(purseReward*1e12/lpSupply);
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to Restaking Pool for Purse allocation.
    function deposit(IERC20Upgradeable _lpToken, uint256 _amount) public whenNotPaused poolExist(_lpToken) {     
        require(_amount > 0, "Deposit: not good");
        PoolInfo storage pool = poolInfo[_lpToken];
        UserInfo storage user = userInfo[_lpToken][msg.sender];
        updatePool(_lpToken);

        if (user.amount > 0) {
            uint256 pending = user.amount*pool.accPursePerShare/1e12-user.rewardDebt;

            if(pending > 0) {
                safePurseTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            user.amount = user.amount+_amount;
        }
        user.rewardDebt = user.amount*pool.accPursePerShare/1e12;
        emit Deposit(msg.sender, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(IERC20Upgradeable _lpToken, uint256 _amount) public whenNotPaused poolExist(_lpToken){

        PoolInfo storage pool = poolInfo[_lpToken];
        UserInfo storage user = userInfo[_lpToken][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_lpToken);
        uint256 pending = user.amount*pool.accPursePerShare/1e12-user.rewardDebt;

        if(pending > 0) {
            safePurseTransfer(msg.sender, pending);
        }
        if(_amount > 0) {
            user.amount = user.amount-_amount;
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amount*pool.accPursePerShare/1e12;
        emit Withdraw(msg.sender, _amount);
    }

    // Harvest reward tokens from pool.
    function claimReward(IERC20Upgradeable _lpToken) public whenNotPaused poolExist(_lpToken){

        PoolInfo storage pool = poolInfo[_lpToken];
        UserInfo storage user = userInfo[_lpToken][msg.sender];
        require(user.amount > 0, "Claim: not good");

        updatePool(_lpToken);
        uint256 pending = user.amount*pool.accPursePerShare/1e12-user.rewardDebt;

        if(pending > 0) {
            safePurseTransfer(msg.sender, pending);
        }
        user.rewardDebt = user.amount*pool.accPursePerShare/1e12;

        emit ClaimReward(msg.sender, pending);
    }

    function capMintTokenUpdate (uint256 _newCap) public onlyOwner {
        capMintToken = _newCap;
    }

    // Safe purse transfer function, just in case if rounding error causes pool to not have enough PURSEs.
    function safePurseTransfer(address _to, uint256 _amount) internal {
        uint256 purseBal = purseToken.balanceOf(address(this));
        if (_amount > purseBal) {
            purseToken.transfer(_to, purseBal);
        } else {
            purseToken.transfer(_to, _amount);
        }
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(IERC20Upgradeable _lpToken) public poolExist(_lpToken) {
        PoolInfo storage pool = poolInfo[_lpToken];
        UserInfo storage user = userInfo[_lpToken][msg.sender];
        require(user.amount > 0, "Emergency Withdraw: not good");
        uint256 amount = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        pool.lpToken.safeTransfer(address(msg.sender), amount);
        emit EmergencyWithdraw(msg.sender, _lpToken, amount);
    }

    // Recover any token function, just in case if any user transfer token into the smart contract. 
    function recoverToken(address token, uint256 amount, address _to) public onlyOwner{
        require(_to != address(0), "send to the zero address");
        IERC20Upgradeable(token).safeTransfer(_to, amount);
    }

     // View function to see pending PURSEs on frontend.
    function pendingReward(IERC20Upgradeable _lpToken, address _user) external view poolExist(_lpToken) returns (uint256) {
        PoolInfo memory pool = poolInfo[_lpToken];
        UserInfo memory user = userInfo[_lpToken][_user];
        uint256 accPursePerShare = pool.accPursePerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        uint256 purseBal = purseToken.balanceOf(address(this));
        uint256 pendingPurseMint = capMintToken - totalMintToken;
        uint256 totalPurseSupply = purseBal + pendingPurseMint;
        uint256 multiplier;
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 purseReward = multiplier*pool.pursePerBlock*pool.bonusMultiplier;
            accPursePerShare = accPursePerShare+(purseReward*(1e12)/lpSupply);
        }
        uint256 pending = user.amount*(accPursePerShare)/(1e12)-(user.rewardDebt);

        if (pending > totalPurseSupply) {
            pending = totalPurseSupply;
        }

        return (pending);
    }

    function pause() public whenNotPaused onlyOwner {
        _pause();
    }

    function unpause() public whenPaused onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function initialize(PurseToken _purseToken, uint256 _capMintToken) public initializer {
        name = "LP Token Restaking Farm";
        purseToken = _purseToken;
        capMintToken = _capMintToken;
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

}