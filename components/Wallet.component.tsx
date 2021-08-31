import {useGetBalance} from '../hooks/Balance';
import {minimizeAddress} from '../util/address';
import {getNetworkName} from '../util/network';

import MetamaskIcon from '../assets/images/metamask.png';
import {GitcoinContext} from '../store';
import React from 'react';
import Image from 'next/image';
const WalletComponent = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const wallets = state.wallets;
    const balance = useGetBalance(wallets[state.wallet], state.provider);
    const onMetamaskConnect = async () => {
        //@ts-ignore
        const permissions = await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {state.wallets[state.wallet] ? (
                    <div className={'balance'}>
                        <p
                            style={{
                                margin: 0,
                                border: '2px solid white',
                                padding: 8,
                            }}
                        >
                            {balance + ' ETH'}
                        </p>
                    </div>
                ) : null}

                <h5
                    style={{margin: 0, border: '2px solid white', padding: 8}}
                    onClick={onMetamaskConnect}
                >
                    {state.wallets[state.wallet]
                        ? minimizeAddress(state.wallets[state.wallet])
                        : 'CONNECT'}
                </h5>
                <div
                    style={{
                        fontSize: '0.75rem',
                    }}
                >
                    <p style={{margin: '0 1rem'}}>
                        {getNetworkName(state.chain_id)}
                    </p>
                </div>
            </div>
            <div onClick={onMetamaskConnect} className={'btn-icon'}>
                <Image alt="wallet" src={MetamaskIcon} height="32" width="32" />
            </div>
        </div>
    );
};

export default WalletComponent;
