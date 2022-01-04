!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lodash"),require("web3")):"function"==typeof define&&define.amd?define(["exports","lodash","web3"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).core={},e.lodash,e.Web3)}(this,(function(e,t,n){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=a(t),s=a(n);const r={ETH:1,BSC:56,HECO:128,MATIC:137},u={defaultChainId:r.ETH,delay:100,timeout:2e4,maxCalls:500,allowFailure:!0,rpc:{[r.ETH]:{url:"https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",address:"0x5ba1e12693dc8f9c48aad8770482f4739beed696"},[r.BSC]:{url:"https://bsc-dataseed.binance.org/",address:"0x6427169aB7344F9C37E9dC9001c681BEcd09343d"},[r.HECO]:{url:"https://http-mainnet-node.huobichain.com",address:"0xBF4b1bE1F00F5624ba4D65f8548ccF6E75d0deFe"},[r.MATIC]:{url:"https://polygon-rpc.com/",address:"0x6427169aB7344F9C37E9dC9001c681BEcd09343d"}}};const i=require("web3-eth-contract"),o={};function c(e,t,n=u.defaultChainId){const a=e.reduce((e,t)=>("function"===t.type&&(e[t.name]=t),e),{}),l=`${t}_${n}`;o[l]||(o[l]=new i(e,t));const s={abi:e,address:t,chainId:n};return new Proxy(s,{get:function(e,t){return(...e)=>function(e,t){if(!a[e])throw new Error(`'${e}' is not a function`);if(a[e].inputs.length!==t.length)throw new Error(`The method parameter is ${a[e].inputs.length} and only ${t.length} was found`);return{method:e,params:t,address:s.address,chainId:n,outputs:a[e].outputs}}(t,e)}})}var p=[{inputs:[{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"aggregate",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"},{internalType:"bytes[]",name:"returnData",type:"bytes[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"blockAndAggregate",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"},{internalType:"bytes32",name:"blockHash",type:"bytes32"},{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"}],name:"getBlockHash",outputs:[{internalType:"bytes32",name:"blockHash",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[],name:"getBlockNumber",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockCoinbase",outputs:[{internalType:"address",name:"coinbase",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockDifficulty",outputs:[{internalType:"uint256",name:"difficulty",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockGasLimit",outputs:[{internalType:"uint256",name:"gaslimit",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockTimestamp",outputs:[{internalType:"uint256",name:"timestamp",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"addr",type:"address"}],name:"getEthBalance",outputs:[{internalType:"uint256",name:"balance",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getLastBlockHash",outputs:[{internalType:"bytes32",name:"blockHash",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bool",name:"requireSuccess",type:"bool"},{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"tryAggregate",outputs:[{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bool",name:"requireSuccess",type:"bool"},{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"tryBlockAndAggregate",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"},{internalType:"bytes32",name:"blockHash",type:"bytes32"},{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"}];let y={},d=0,m={};const b={};function f(){for(let e in b){const t=[];for(let n=0;n<b[e].calls.length&&void 0!==b[e].calls[n].result;n++)t.push(b[e].calls[n].result);t.length===b[e].calls.length&&(b[e].resolve(t),delete b[e])}}function h(e){if(1===e.__length__)return e[0];const t=[];for(let n=0;n<e.__length__;n++)t.push(e[n]);return t}async function g(e){const t=e,n=e[0],a=u.rpc[n.chainId];if(!a)throw new Error(`multicall-client unsupported chainId(${n.chainId}). Please read the documentation to configure rpc`);var l=new s.default(new s.default.providers.HttpProvider(a.url));const r=new l.eth.Contract(p,a.address),i=t.map(e=>{const t=o[`${e.address}_${e.chainId}`];return[e.address,t.methods[e.method](...e.params).encodeABI()]}),c=u.allowFailure?"blockAndAggregate":"aggregate",y=await new Promise(async e=>{let t;const n=setTimeout(()=>{if(!t)throw e({returnData:[]}),new Error(`Request timed out ${u.timeout}ms`)},u.timeout);r.methods[c](i).call().then(a=>{t=a,clearTimeout(n),e(t)}).catch(t=>{throw clearTimeout(n),e({returnData:[]}),t})});for(let e=0;e<t.length;e++){let n;if(u.allowFailure)if(y.returnData[e]){const a=h(l.eth.abi.decodeParameters(t[e].outputs,y.returnData[e].returnData));n=[y.returnData[e].success,a],n.success=y.returnData[e].success,n.returnData=a}else n=[!1,null],n.success=!1,n.returnData=null;else n=y.returnData[e]?h(l.eth.abi.decodeParameters(t[e].outputs,y.returnData[e])):null;t[e].result=n,f()}}function T(e){return new Promise((t,n)=>{b[d++]={resolve:t,calls:e},function(){for(let t=0;t<e.length;t++){const n=e[t].chainId||u.defaultChainId;y[n]||(y[n]=0);const a=`${y[n]}_${n}`;m[a]?(m[a].calls.push(e[t]),m[a].calls.length>=u.maxCalls&&(y[n]+=1)):m[a]={calls:[e[t]]}}for(let e in m)m[e].timeOut&&(clearTimeout(m[e].timeOut),m[e].timeOut=null),m[e].calls.length>=u.maxCalls?(g(m[e].calls),y[m[e].calls[0].chainId]+=1,delete m[e]):m[e].timeOut=setTimeout(()=>{g(m[e].calls),y[m[e].calls[0].chainId]+=1,delete m[e]},u.delay)}()})}function w(e){const t=e||u.defaultChainId,n=u.rpc[t];if(!n)throw new Error(`multicall-client unsupported chainId(${t}). Please read the documentation to configure rpc`);return new c(p,n.address,t)}T.getBlockInfo=async function(e){const t=w(e),n=[t.getBlockNumber(),t.getCurrentBlockCoinbase(),t.getCurrentBlockDifficulty(),t.getCurrentBlockGasLimit(),t.getCurrentBlockTimestamp(),t.getLastBlockHash()],a=await T(n),[l,s,r,u,i]=a;return{number:l,difficulty:s,gasLimit:r,Timestamp:u,hash:i}},T.getEthBalance=async function(e,t){const n=[w(t).getEthBalance(e)],a=await T(n),[l]=a;return l},T.getBlockHash=async function(e,t){const n=[w(t).getBlockHash(e)],a=await T(n),[l]=a;return l},e.ChainId=r,e.Contract=c,e.config=function(e){return l.default.merge(u,e),u},e.multicallClient=T,Object.defineProperty(e,"__esModule",{value:!0})}));