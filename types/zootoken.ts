export interface EmailSubscribeRequestBody {
  email: string;
  userAgent: string;
}

export interface EmailSubscribeResponse {
  success: boolean;
  message?: string;
}

export interface ProposalData {
  proposal: {
    name: string;
    description: string;
    zpNumber: number;
  };
  numVotesYes: number;
  numVotesNo: number;
  uniqueVoters?: string[];
  status: 'open' | 'closed';
}

export interface GetProposalsResponseBody {
  proposals: ProposalData[];
}
