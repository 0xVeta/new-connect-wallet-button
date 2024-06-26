import Head from "next/head"
import {
	ConnectWallet,
	useAddress,
	useNetwork,
	useNetworkMismatch,
	ChainId,
} from "@thirdweb-dev/react"
import { useEffect } from "react"

export default function Home() {
	const address = useAddress()
	const [, switchNetwork] = useNetwork()
	const isWrongNetwork = useNetworkMismatch()

	useEffect(() => {
		if (isWrongNetwork && switchNetwork) {
			switchNetwork(ChainId.Mumbai)
		}
	}, [isWrongNetwork, switchNetwork, address])

	useEffect(() => {
		if (address) {
			// Post message to parent window including the wallet address
			window.parent.postMessage({ walletConnected: true, address: address }, '*');
		}
	}, [address]); // Depend on the address to trigger this effect when it changes

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div style={{ width: "250px" }}>
				<ConnectWallet
					accentColor={isWrongNetwork ? "#c4c4c4" : "#f213a4"}
					colorMode="light"
				/>
				{isWrongNetwork ? (
					<p>Please switch your network to the Mumbai Testnet</p>
				) : (
					""
				)}
			</div>
		</>
	)
}
