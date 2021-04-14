import React, { useState, useEffect } from 'react';
import partition from 'lodash/partition';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import { H1, H2, P } from '../components/Typography';
import { Footer } from '../components/Footer';
import { routes } from '../utils/routes';
import { BaseLink } from '../components/BaseLink';

import {
  ZOOTOKEN_COMMUNITY_TREASURY_URL,
  ZOOTOKEN_EARN_ZOO_FORM_URL,
} from '../utils/config';
import { GetProposalsResponseBody, ProposalData } from '../types/zootoken';

const VoteButton = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Khula';
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-size: 19px;
  line-height: 19px;
  cursor: pointer;
  text-decoration: none;
`;

const GovernancePageWrapper = styled.div`
  background: #f6f6ff;
  width: 100%;
`;

const HeaderContainer = styled.div`
  width: 100%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledH1 = styled(H1)`
  text-align: center;
`;
const StyledHeaderP = styled(P)`
  text-align: center;
  line-height: 21px;
`;

const StyledProposalH2 = styled(H2)`
  font-size: 34px;
  line-height: 40px;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: #ffffff;
`;

const StyledProposalP = styled(P)`
  font-size: 18px;
  line-height: 26px;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: #ffffff;
`;

const VotesContainer = styled.div`
  width: 100%;
  background: #1f1f41;
  min-height: 514px;
`;

const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & + & {
    margin-top: 80px;
  }
`;

const ProposalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 20px;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const fetchProposals = async (): Promise<GetProposalsResponseBody> => {
  const response = fetch(
    'https://zoo-vote.vercel.app/api/get_proposals', // todo: dont commit
  ).then((r) => r.json());

  return response;
};

interface ProposalProps {
  prop: ProposalData;
  refetch?: () => Promise<boolean>;
}

const VoteBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledConnectLink = styled(BaseLink)`
  text-decoration: none;

  :hover,
  :active {
    text-decoration: none;
  }
`;

const StyledLink = styled(BaseLink)``;

interface BarProps {
  percentage: number;
  color: string;
}

const Container = styled.div`
  height: 18px;
  width: 100%;
  position: relative;
`;

const Bar = styled.div<BarProps>`
  transition: width 0.3s ease;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

export const Progressbar: React.FC<BarProps> = ({ percentage, color }) => {
  return (
    <Container>
      <Bar percentage={percentage} color={color} />
    </Container>
  );
};

const VoteResultsContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Proposal: React.FC<ProposalProps> = ({ prop, refetch }) => {
  const { library, account } = useWeb3React();
  const handleVoteOnProposal = async (choice: boolean) => {
    if (!account || !library) {
      return;
    }

    const { zpNumber } = prop.proposal;

    const message = `${choice ? 'Yes' : 'No'} on ZOO Proposal ${zpNumber}`;
    const signature = await library.getSigner(account).signMessage(message);

    const data = {
      from: account.toLowerCase(),
      message,
      signature,
      choice,
      zp: zpNumber,
    };

    const response = await fetch('https://zoo-vote.vercel.app/api/add_vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error('Failed to submit vote');
    }

    if (refetch) {
      await refetch();
    }
  };

  const isActive = prop.status === 'open';

  const hasAlreadyVoted =
    isActive && account && prop.uniqueVoters
      ? prop.uniqueVoters.some(
          (voter) => voter.toLowerCase() === account.toLowerCase(),
        )
      : false;

  const totalVotes = prop.numVotesYes + prop.numVotesNo;
  const percentYes = totalVotes > 0 ? (prop.numVotesYes / totalVotes) * 100 : 0;
  const percentNo = totalVotes > 0 ? (prop.numVotesNo / totalVotes) * 100 : 0;

  const doneAndConfirmed = !isActive && prop.numVotesYes > prop.numVotesNo;

  return (
    <CenterFlex>
      <ProposalContainer>
        <DescriptionContainer>
          <StyledProposalH2
            style={{
              marginBottom: '30px',
            }}
          >
            {!isActive ? (doneAndConfirmed ? '✅' : '❌') : ''}
            {!isActive ? <span>&nbsp;</span> : ''}
            {prop.proposal.name}
          </StyledProposalH2>
          <StyledProposalP>{prop.proposal.description}</StyledProposalP>
        </DescriptionContainer>
        <ResultsContainer
          style={{
            minWidth: '120px',
          }}
        >
          <ResultsContainer>
            <StyledProposalP>Results</StyledProposalP>
            <VoteResultsContainer>
              <StyledProposalP>Yes</StyledProposalP>
              <div
                style={{
                  width: '150px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              >
                <Progressbar color="#00BF86" percentage={percentYes} />
              </div>
              <StyledProposalP>{percentYes.toFixed(0)}%</StyledProposalP>
            </VoteResultsContainer>
            <VoteResultsContainer>
              <StyledProposalP>No</StyledProposalP>
              <div
                style={{
                  width: '150px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              >
                <Progressbar color="#FF8730" percentage={percentNo} />
              </div>
              <StyledProposalP>{percentNo.toFixed(0)}%</StyledProposalP>
            </VoteResultsContainer>
            <StyledProposalP
              style={{ marginTop: '14px', marginBottom: '14px' }}
            >
              ({totalVotes.toFixed(0)} ZOO total votes)
            </StyledProposalP>
          </ResultsContainer>
          {isActive &&
            (hasAlreadyVoted ? (
              <StyledProposalP>You already voted</StyledProposalP>
            ) : account ? (
              <VoteBox>
                <StyledProposalP>Vote</StyledProposalP>
                <VoteButton onClick={() => handleVoteOnProposal(true)}>
                  👍
                </VoteButton>
                <VoteButton onClick={() => handleVoteOnProposal(false)}>
                  👎
                </VoteButton>
              </VoteBox>
            ) : (
              <StyledConnectLink href={routes.LOGIN}>
                <StyledProposalP style={{ color: '#FF656D' }}>
                  Connect wallet to vote
                </StyledProposalP>
              </StyledConnectLink>
            ))}
          {!isActive && <p style={{ color: 'white' }}>Vote has completed</p>}
        </ResultsContainer>
      </ProposalContainer>
    </CenterFlex>
  );
};

const ProposalSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 92px;
`;
const CurrentVote = React.memo(() => (
  <svg
    width="378"
    height="24"
    viewBox="0 0 378 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: '60px' }}
  >
    <line opacity="0.19" y1="13.5" x2="378" y2="13.5" stroke="white" />
    <rect x="132" width="114" height="24" fill="#1F1F41" />
    <path
      opacity="0.6"
      d="M149.464 16.208C147.768 16.208 146.365 15.648 145.256 14.528C144.157 13.408 143.608 12.032 143.608 10.4C143.608 8.768 144.157 7.392 145.256 6.272C146.365 5.152 147.768 4.592 149.464 4.592C150.488 4.592 151.427 4.83733 152.28 5.328C153.144 5.81867 153.816 6.48 154.296 7.312L153 8.064C152.68 7.44533 152.2 6.95467 151.56 6.592C150.931 6.21867 150.232 6.032 149.464 6.032C148.173 6.032 147.117 6.448 146.296 7.28C145.485 8.112 145.08 9.152 145.08 10.4C145.08 11.6373 145.485 12.672 146.296 13.504C147.117 14.336 148.173 14.752 149.464 14.752C150.232 14.752 150.931 14.5707 151.56 14.208C152.2 13.8347 152.68 13.344 153 12.736L154.296 13.472C153.827 14.304 153.16 14.9707 152.296 15.472C151.432 15.9627 150.488 16.208 149.464 16.208ZM161.404 8H162.796V16H161.404V14.848C160.839 15.7547 159.975 16.208 158.812 16.208C157.873 16.208 157.121 15.9147 156.556 15.328C155.991 14.7307 155.708 13.9253 155.708 12.912V8H157.1V12.832C157.1 13.4827 157.276 13.9893 157.628 14.352C157.98 14.704 158.465 14.88 159.084 14.88C159.777 14.88 160.337 14.6667 160.764 14.24C161.191 13.8027 161.404 13.136 161.404 12.24V8ZM166.307 9.344C166.766 8.352 167.598 7.856 168.803 7.856V9.312C168.121 9.28 167.534 9.46133 167.043 9.856C166.553 10.2507 166.307 10.8853 166.307 11.76V16H164.915V8H166.307V9.344ZM171.557 9.344C172.016 8.352 172.848 7.856 174.053 7.856V9.312C173.371 9.28 172.784 9.46133 172.293 9.856C171.803 10.2507 171.557 10.8853 171.557 11.76V16H170.165V8H171.557V9.344ZM175.954 12.64C176.093 13.3547 176.418 13.9093 176.93 14.304C177.453 14.6987 178.093 14.896 178.85 14.896C179.906 14.896 180.674 14.5067 181.154 13.728L182.338 14.4C181.559 15.6053 180.386 16.208 178.818 16.208C177.549 16.208 176.514 15.8133 175.714 15.024C174.925 14.224 174.53 13.216 174.53 12C174.53 10.7947 174.919 9.792 175.698 8.992C176.477 8.192 177.485 7.792 178.722 7.792C179.895 7.792 180.85 8.208 181.586 9.04C182.333 9.86133 182.706 10.8533 182.706 12.016C182.706 12.2187 182.69 12.4267 182.658 12.64H175.954ZM178.722 9.104C177.975 9.104 177.357 9.31733 176.866 9.744C176.375 10.16 176.071 10.72 175.954 11.424H181.298C181.181 10.6667 180.882 10.0907 180.402 9.696C179.922 9.30133 179.362 9.104 178.722 9.104ZM188.29 7.792C189.229 7.792 189.981 8.09067 190.546 8.688C191.111 9.27467 191.394 10.0747 191.394 11.088V16H190.002V11.168C190.002 10.5173 189.826 10.016 189.474 9.664C189.122 9.30133 188.637 9.12 188.018 9.12C187.325 9.12 186.765 9.33867 186.338 9.776C185.911 10.2027 185.698 10.864 185.698 11.76V16H184.306V8H185.698V9.152C186.263 8.24533 187.127 7.792 188.29 7.792ZM197.689 9.344H195.561V13.68C195.561 14.0747 195.636 14.3573 195.785 14.528C195.945 14.688 196.185 14.7733 196.505 14.784C196.825 14.784 197.22 14.7733 197.689 14.752V16C196.473 16.16 195.583 16.064 195.017 15.712C194.452 15.3493 194.169 14.672 194.169 13.68V9.344H192.585V8H194.169V6.176L195.561 5.76V8H197.689V9.344ZM206.456 16L202.456 4.8H204.056L207.304 14.144L210.536 4.8H212.152L208.136 16H206.456ZM219.121 14.992C218.299 15.8027 217.302 16.208 216.129 16.208C214.955 16.208 213.958 15.8027 213.137 14.992C212.326 14.1813 211.921 13.184 211.921 12C211.921 10.816 212.326 9.81867 213.137 9.008C213.958 8.19733 214.955 7.792 216.129 7.792C217.302 7.792 218.299 8.19733 219.121 9.008C219.942 9.81867 220.352 10.816 220.352 12C220.352 13.184 219.942 14.1813 219.121 14.992ZM216.129 14.848C216.929 14.848 217.601 14.576 218.145 14.032C218.689 13.488 218.961 12.8107 218.961 12C218.961 11.1893 218.689 10.512 218.145 9.968C217.601 9.424 216.929 9.152 216.129 9.152C215.339 9.152 214.673 9.424 214.129 9.968C213.585 10.512 213.312 11.1893 213.312 12C213.312 12.8107 213.585 13.488 214.129 14.032C214.673 14.576 215.339 14.848 216.129 14.848ZM226.174 9.344H224.046V13.68C224.046 14.0747 224.12 14.3573 224.27 14.528C224.43 14.688 224.67 14.7733 224.99 14.784C225.31 14.784 225.704 14.7733 226.174 14.752V16C224.958 16.16 224.067 16.064 223.502 15.712C222.936 15.3493 222.654 14.672 222.654 13.68V9.344H221.07V8H222.654V6.176L224.046 5.76V8H226.174V9.344ZM228.391 12.64C228.53 13.3547 228.855 13.9093 229.367 14.304C229.89 14.6987 230.53 14.896 231.287 14.896C232.343 14.896 233.111 14.5067 233.591 13.728L234.775 14.4C233.997 15.6053 232.823 16.208 231.255 16.208C229.986 16.208 228.951 15.8133 228.151 15.024C227.362 14.224 226.967 13.216 226.967 12C226.967 10.7947 227.357 9.792 228.135 8.992C228.914 8.192 229.922 7.792 231.159 7.792C232.333 7.792 233.287 8.208 234.023 9.04C234.77 9.86133 235.143 10.8533 235.143 12.016C235.143 12.2187 235.127 12.4267 235.095 12.64H228.391ZM231.159 9.104C230.413 9.104 229.794 9.31733 229.303 9.744C228.813 10.16 228.509 10.72 228.391 11.424H233.735C233.618 10.6667 233.319 10.0907 232.839 9.696C232.359 9.30133 231.799 9.104 231.159 9.104Z"
      fill="white"
    />
  </svg>
));

const PastVotes = React.memo(() => (
  <svg
    width="378"
    height="24"
    viewBox="0 0 378 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: '60px' }}
  >
    <line opacity="0.19" y1="13.5" x2="378" y2="13.5" stroke="white" />
    <rect x="132" width="114" height="24" fill="#1F1F41" />
    <path
      opacity="0.6"
      d="M156.577 4.8C157.611 4.8 158.47 5.14667 159.153 5.84C159.846 6.52267 160.193 7.376 160.193 8.4C160.193 9.41333 159.846 10.2667 159.153 10.96C158.47 11.6533 157.611 12 156.577 12H154.001V16H152.513V4.8H156.577ZM156.577 10.608C157.195 10.608 157.707 10.4 158.113 9.984C158.518 9.55733 158.721 9.02933 158.721 8.4C158.721 7.76 158.518 7.232 158.113 6.816C157.707 6.4 157.195 6.192 156.577 6.192H154.001V10.608H156.577ZM167.821 8H169.213V16H167.821V14.624C167.127 15.68 166.119 16.208 164.797 16.208C163.677 16.208 162.722 15.8027 161.933 14.992C161.143 14.1707 160.749 13.1733 160.749 12C160.749 10.8267 161.143 9.83467 161.933 9.024C162.722 8.20267 163.677 7.792 164.797 7.792C166.119 7.792 167.127 8.32 167.821 9.376V8ZM164.973 14.864C165.783 14.864 166.461 14.592 167.005 14.048C167.549 13.4933 167.821 12.8107 167.821 12C167.821 11.1893 167.549 10.512 167.005 9.968C166.461 9.41333 165.783 9.136 164.973 9.136C164.173 9.136 163.501 9.41333 162.957 9.968C162.413 10.512 162.141 11.1893 162.141 12C162.141 12.8107 162.413 13.4933 162.957 14.048C163.501 14.592 164.173 14.864 164.973 14.864ZM172.506 10.16C172.506 10.4693 172.661 10.72 172.97 10.912C173.279 11.0933 173.653 11.2427 174.09 11.36C174.527 11.4667 174.965 11.5947 175.402 11.744C175.839 11.8827 176.213 12.128 176.522 12.48C176.831 12.8213 176.986 13.264 176.986 13.808C176.986 14.5333 176.703 15.1147 176.138 15.552C175.583 15.9893 174.869 16.208 173.994 16.208C173.215 16.208 172.549 16.0373 171.994 15.696C171.439 15.3547 171.045 14.9013 170.81 14.336L172.01 13.648C172.138 14.032 172.378 14.336 172.73 14.56C173.082 14.784 173.503 14.896 173.994 14.896C174.453 14.896 174.831 14.8107 175.13 14.64C175.429 14.4587 175.578 14.1813 175.578 13.808C175.578 13.4987 175.423 13.2533 175.114 13.072C174.805 12.88 174.431 12.7307 173.994 12.624C173.557 12.5067 173.119 12.3733 172.682 12.224C172.245 12.0747 171.871 11.8293 171.562 11.488C171.253 11.1467 171.098 10.7093 171.098 10.176C171.098 9.48267 171.365 8.912 171.898 8.464C172.442 8.016 173.119 7.792 173.93 7.792C174.581 7.792 175.157 7.94133 175.658 8.24C176.17 8.528 176.554 8.93333 176.81 9.456L175.642 10.112C175.354 9.42933 174.783 9.088 173.93 9.088C173.535 9.088 173.199 9.184 172.922 9.376C172.645 9.55733 172.506 9.81867 172.506 10.16ZM182.674 9.344H180.546V13.68C180.546 14.0747 180.62 14.3573 180.77 14.528C180.93 14.688 181.17 14.7733 181.49 14.784C181.81 14.784 182.204 14.7733 182.674 14.752V16C181.458 16.16 180.567 16.064 180.002 15.712C179.436 15.3493 179.154 14.672 179.154 13.68V9.344H177.57V8H179.154V6.176L180.546 5.76V8H182.674V9.344ZM191.441 16L187.441 4.8H189.041L192.289 14.144L195.521 4.8H197.137L193.121 16H191.441ZM204.105 14.992C203.284 15.8027 202.286 16.208 201.113 16.208C199.94 16.208 198.942 15.8027 198.121 14.992C197.31 14.1813 196.905 13.184 196.905 12C196.905 10.816 197.31 9.81867 198.121 9.008C198.942 8.19733 199.94 7.792 201.113 7.792C202.286 7.792 203.284 8.19733 204.105 9.008C204.926 9.81867 205.337 10.816 205.337 12C205.337 13.184 204.926 14.1813 204.105 14.992ZM201.113 14.848C201.913 14.848 202.585 14.576 203.129 14.032C203.673 13.488 203.945 12.8107 203.945 12C203.945 11.1893 203.673 10.512 203.129 9.968C202.585 9.424 201.913 9.152 201.113 9.152C200.324 9.152 199.657 9.424 199.113 9.968C198.569 10.512 198.297 11.1893 198.297 12C198.297 12.8107 198.569 13.488 199.113 14.032C199.657 14.576 200.324 14.848 201.113 14.848ZM211.158 9.344H209.03V13.68C209.03 14.0747 209.105 14.3573 209.254 14.528C209.414 14.688 209.654 14.7733 209.974 14.784C210.294 14.784 210.689 14.7733 211.158 14.752V16C209.942 16.16 209.051 16.064 208.486 15.712C207.921 15.3493 207.638 14.672 207.638 13.68V9.344H206.054V8H207.638V6.176L209.03 5.76V8H211.158V9.344ZM213.376 12.64C213.514 13.3547 213.84 13.9093 214.352 14.304C214.874 14.6987 215.514 14.896 216.272 14.896C217.328 14.896 218.096 14.5067 218.576 13.728L219.76 14.4C218.981 15.6053 217.808 16.208 216.24 16.208C214.97 16.208 213.936 15.8133 213.136 15.024C212.346 14.224 211.952 13.216 211.952 12C211.952 10.7947 212.341 9.792 213.12 8.992C213.898 8.192 214.906 7.792 216.144 7.792C217.317 7.792 218.272 8.208 219.008 9.04C219.754 9.86133 220.128 10.8533 220.128 12.016C220.128 12.2187 220.112 12.4267 220.08 12.64H213.376ZM216.144 9.104C215.397 9.104 214.778 9.31733 214.288 9.744C213.797 10.16 213.493 10.72 213.376 11.424H218.72C218.602 10.6667 218.304 10.0907 217.824 9.696C217.344 9.30133 216.784 9.104 216.144 9.104ZM222.615 10.16C222.615 10.4693 222.77 10.72 223.079 10.912C223.389 11.0933 223.762 11.2427 224.199 11.36C224.637 11.4667 225.074 11.5947 225.511 11.744C225.949 11.8827 226.322 12.128 226.631 12.48C226.941 12.8213 227.095 13.264 227.095 13.808C227.095 14.5333 226.813 15.1147 226.247 15.552C225.693 15.9893 224.978 16.208 224.103 16.208C223.325 16.208 222.658 16.0373 222.103 15.696C221.549 15.3547 221.154 14.9013 220.919 14.336L222.119 13.648C222.247 14.032 222.487 14.336 222.839 14.56C223.191 14.784 223.613 14.896 224.103 14.896C224.562 14.896 224.941 14.8107 225.239 14.64C225.538 14.4587 225.687 14.1813 225.687 13.808C225.687 13.4987 225.533 13.2533 225.223 13.072C224.914 12.88 224.541 12.7307 224.103 12.624C223.666 12.5067 223.229 12.3733 222.791 12.224C222.354 12.0747 221.981 11.8293 221.671 11.488C221.362 11.1467 221.207 10.7093 221.207 10.176C221.207 9.48267 221.474 8.912 222.007 8.464C222.551 8.016 223.229 7.792 224.039 7.792C224.69 7.792 225.266 7.94133 225.767 8.24C226.279 8.528 226.663 8.93333 226.919 9.456L225.751 10.112C225.463 9.42933 224.893 9.088 224.039 9.088C223.645 9.088 223.309 9.184 223.031 9.376C222.754 9.55733 222.615 9.81867 222.615 10.16Z"
      fill="white"
    />
  </svg>
));

const GovernancePage: NextPage = () => {
  const { account } = useWeb3React();
  const [activeProposals, setActiveProposals] = useState<
    ProposalData[] | undefined
  >();
  const [pastProposals, setPastProposals] = useState<
    ProposalData[] | undefined
  >();

  const { data, revalidate } = useSWR([account], fetchProposals);

  useEffect(() => {
    if (!data) {
      return;
    }

    const [_pastProposals, _activeProposals] = partition(
      data.proposals,
      (prop) => prop.status === 'closed',
    );
    setActiveProposals(_activeProposals);
    setPastProposals(_pastProposals);
  }, [data]);

  useEffect(() => {
    if (!account) {
      return;
    }

    revalidate().catch((err) => {
      console.error(err);
    });
  }, [account, revalidate]);

  return (
    <>
      <GovernancePageWrapper>
        <HeaderContainer>
          <StyledH1 fontSize="48px">Govern the ZOO</StyledH1>
          <StyledHeaderP style={{ maxWidth: '390px', fontSize: '18px' }}>
            ZOO holders can use their tokens to vote on how the 3,000 tokens in
            the{' '}
            <StyledLink external href={ZOOTOKEN_COMMUNITY_TREASURY_URL}>
              community treasury
            </StyledLink>{' '}
            are spent. Each ZOO token is equivalent to 1 vote.
          </StyledHeaderP>
        </HeaderContainer>
        <VotesContainer>
          {activeProposals === undefined && pastProposals === undefined && (
            <StyledProposalP
              style={{
                textAlign: 'center',
                paddingTop: '30px',
              }}
            >
              Loading...
            </StyledProposalP>
          )}

          <ProposalSection>
            <CurrentVote />
            {!activeProposals ||
              (activeProposals && activeProposals?.length === 0 && (
                <p style={{ color: 'white' }}>
                  There are no current active proposals.{' '}
                  <a
                    href={ZOOTOKEN_EARN_ZOO_FORM_URL}
                    style={{ color: 'white' }}
                  >
                    Suggest one!
                  </a>
                </p>
              ))}
            {activeProposals &&
              activeProposals?.length > 0 &&
              activeProposals.map((prop, i) => (
                <Proposal
                  prop={prop}
                  key={`current-prop-${i}`}
                  refetch={revalidate}
                />
              ))}
          </ProposalSection>
          {pastProposals && pastProposals?.length > 0 && (
            <ProposalSection>
              <PastVotes />
              {pastProposals.map((prop, i) => (
                <Proposal prop={prop} key={`past-prop-${i}`} />
              ))}
            </ProposalSection>
          )}
        </VotesContainer>
      </GovernancePageWrapper>
      <Footer />
    </>
  );
};

const MemoizedGovernancePage = React.memo(GovernancePage);

export default MemoizedGovernancePage;
