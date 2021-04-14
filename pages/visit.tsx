import React, { useEffect } from 'react';

import { CRYPTO_VOXELS_ZOO_VISIT_URL } from '../utils/config';

const Visit: React.FC = () => {
  useEffect(() => {
    window.location.replace(CRYPTO_VOXELS_ZOO_VISIT_URL);
  }, []);

  return null;
};

export default Visit;
