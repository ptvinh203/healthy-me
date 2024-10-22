export const setAccountToSession = (account) => {
    sessionStorage.setItem('account', JSON.stringify(account));
}
export const getAccountFromSession = () => {
    return JSON.parse(sessionStorage.getItem('account'));
}