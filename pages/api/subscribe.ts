import { NextApiRequest, NextApiResponse } from 'next';

const SUBSTACK_BASE_URL = 'https://zootoken.substack.com/api/v1/free';

import {
  EmailSubscribeRequestBody,
  EmailSubscribeResponse,
} from '../../types/zootoken';

const handleEmailSubscribe = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { email, userAgent } = req.body as EmailSubscribeRequestBody;

    // Fake subscription from embedded iframe
    // Iframe is too ugly to use and there is no public API
    const response = await fetch(SUBSTACK_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authority': 'zootoken.substack.com',
        'origin': 'https://zootoken.substack.com',
        'referer': 'https://zootoken.substack.com/embed',
        'user-agent': userAgent,
      },
      body: JSON.stringify({
        email,
        first_url: 'https://zootoken.substack.com/embed',
        first_referrer: '',
        current_url: 'https://zootoken.substack.com/embed',
        current_referrer: '',
        referral_code: '',
        source: 'embed',
      }),
    });

    if (response.status === 400) {
      res.status(400).json({
        success: false,
        message: 'BAD_REQUEST',
      } as EmailSubscribeResponse);
      return;
    } else if (response.status !== 200) {
      res.status(500).json({
        success: false,
        message: 'UNEXPECTED_ERROR',
      } as EmailSubscribeResponse);
      return;
    }

    res.status(201).json({ success: true } as EmailSubscribeResponse);
  } catch (err) {
    console.error(err);
    const errResponse: EmailSubscribeResponse = {
      success: false,
      message: 'UNEXPECTED_ERROR',
    };
    res.status(500).json(errResponse);
  }
};

export default handleEmailSubscribe;
