const fs = require('fs');
const path = require('path');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'src', 'ForensicChain.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'ForensicChain.sol': {
            content: source,
        },
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

console.log('Compiling contract...');
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log('Contract compiled.');

if (output.errors) {
    let hasErrors = false;
    output.errors.forEach(err => {
        if (err.severity === 'error') {
            console.error(err.formattedMessage);
            hasErrors = true;
        } else {
            console.warn(err.formattedMessage);
        }
    });
    if (hasErrors) {
        process.exit(1);
    }
}

const contract = output.contracts['ForensicChain.sol']['ForensicChain'];
if (!contract) {
    console.error('Contract not found in compilation output.');
    process.exit(1);
}
const abi = contract.abi;
const abiJson = JSON.stringify(abi, null, 2);

console.log('New ABI:');
console.log(abiJson);

const web3ServicePath = path.resolve(__dirname, 'src', 'services', 'web3Service.ts');
try {
    let web3ServiceContent = fs.readFileSync(web3ServicePath, 'utf8');
    const newAbiConst = `const CONTRACT_ABI = ${abiJson};`;

    const regex = /const CONTRACT_ABI = \[.*?\];/s;
    if (!regex.test(web3ServiceContent)) {
        console.error('Could not find CONTRACT_ABI declaration in web3Service.ts');
        process.exit(1);
    }

    web3ServiceContent = web3ServiceContent.replace(regex, newAbiConst);

    fs.writeFileSync(web3ServicePath, web3ServiceContent);

    console.log('ABI updated successfully in web3Service.ts');
} catch (err) {
    console.error('Error updating web3Service.ts:', err);
    process.exit(1);
}
