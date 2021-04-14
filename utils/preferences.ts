const DISABLE_EAGER_CONNECT_LOCAL_STORAGE_KEY =
  'zootoken.disable-eager-connect';

/**
 * Checks if the app should prefer to eagerly connect to the user's wallet
 * Defaults to true (prefer eager connect) unless there is a key in localStorage indicating it should be disabled
 */
const getEagerWalletPreference = async (): Promise<boolean> => {
  const res = window.localStorage.getItem(
    DISABLE_EAGER_CONNECT_LOCAL_STORAGE_KEY,
  );
  const shouldSkip = res?.toLowerCase() === 'true';
  if (shouldSkip) {
    return false;
  } else {
    return true;
  }
};

const reenableEagerWalletConnectPreferenceIfDisabled = () => {
  return window.localStorage.removeItem(
    DISABLE_EAGER_CONNECT_LOCAL_STORAGE_KEY,
  );
};

const disableEagerWalletConnectPreference = async (): Promise<void> => {
  // entry in local storage
  return window.localStorage.setItem(
    DISABLE_EAGER_CONNECT_LOCAL_STORAGE_KEY,
    'true',
  );
};

export {
  getEagerWalletPreference,
  reenableEagerWalletConnectPreferenceIfDisabled,
  disableEagerWalletConnectPreference,
};
