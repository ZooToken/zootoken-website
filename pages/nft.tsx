import { NextPage } from 'next';
import styled from 'styled-components';
import { H1, P } from '../components/Typography';

const NFTPageWrapper = styled.div`
  background: #f6f6ff;
  width: 100%;
`;

const NFTPageContainer = styled.div`
  width: 100%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  background: white;
`;

const MeatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1f1f41;
  min-height: 514px;
  padding: 0 30px 30px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 15px;
  }
`;

const StyledH1 = styled(H1)`
  text-align: center;
`;
const StyledHeaderP = styled(P)`
  text-align: center;
  line-height: 21px;
`;

const NFTPage: NextPage = () => {
  return (
    <>
      <NFTPageWrapper>
        <NFTPageContainer>
          <StyledH1 fontSize="48px">Limited Edition $ZOO NFT</StyledH1>
          <StyledHeaderP
            style={{ maxWidth: '900px', fontSize: '18px', padding: '10px' }}
          >
            $ZOO token holders who held $ZOO on April 30th will be eligible to
            claim this free NFT, minted by Architect Ogar.
          </StyledHeaderP>
        </NFTPageContainer>
        <MeatContainer>
          <a
            href="https://rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:526923:0x69df7dd293eeff309d8fa12126be3f5d2eb277e2?tab=details"
            target="_blank"
          >
            <video
              src="https://storage.opensea.io/files/8538e36131277394de9cad700a7e68c9.mp4"
              className={``}
              autoPlay
              muted
              loop
              style={{ height: '300px', margin: '40px' }}
            />
          </a>
          <div style={{ color: 'white' }}>
            <p style={{ fontSize: '20px' }}>
              NFT will be claimable on or before May 5th.
            </p>
            {/* <NFTClaim /> */}
          </div>
        </MeatContainer>
      </NFTPageWrapper>
    </>
  );
};
export default NFTPage;
