// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import {Script} from "forge-std/Script.sol";
import {ForensicChain} from "../src/ForensicChain.sol";

contract ForensicChainScript is Script {
    ForensicChain public forensicChain;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        forensicChain = new ForensicChain();

        vm.stopBroadcast();
    }
}
