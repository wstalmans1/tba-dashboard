import { useAccount, useBalance } from 'wagmi';
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";
import { formatUnits } from 'viem';
//import { useGateway } from "@civic/ethereum-gateway-react";


const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-flex; // Ensures children are aligned
  align-items: center; // Vertically aligns children
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem; // Ensure this is the desired height
  min-height: 2rem; // Ensures the button has at least this height
  color: #ffffff;
  background: #1a83f5; // Dark blue background
  font-size: 15px;
  font-weight: 400;
  border-radius: 10rem;
  box-shadow: 0 4px 4px -6px #1a88f8;
  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 6px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 6px -6px #1a88f8;
  }
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18px;
  height: 14px;
  margin-right: 8px;

  div {
    width: 100%;
    height: 2px;
    background-color: #ffffff;
  }
`;

const ConnectionDot = () => {

  const { isConnected, address } = useAccount();
  const { data: balanceData } = useBalance({ address});
  //const { requestGatewayToken } = useGateway();


  const formattedBalance = balanceData ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(2) : '0.00';

  return (
    <div className="flex items-center">
      <ConnectKitButton.Custom>
        {({ show, truncatedAddress, ensName, chain }) => (
            <div onClick={show} className="cursor-pointer flex items-center">
              <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="ml-2 mr-3 text-l">{isConnected ? `Connected` : 'Not Connected'}</span>
              <StyledButton>
                {isConnected ?(
                <>
                  <HamburgerIcon>
                    <div></div>
                    <div></div>
                    <div></div>
                  </HamburgerIcon>
                  {ensName ? `${ensName} (${truncatedAddress})` : truncatedAddress}
                  <span className="inline-flex items-center justify-center bg-blue-700 text-center rounded-xl p-3 ml-3" style={{ height: '1.97rem' }}> {formattedBalance} {balanceData?.symbol} { "on" } {chain?.name}</span>
                </>
              ) : (
                "Connect Wallet"
              )}
              </StyledButton>
            </div>
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default ConnectionDot;