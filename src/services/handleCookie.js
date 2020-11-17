const handleCookie = (string) => {
    const nameobj = string.slice(string.indexOf('access_token') + 13, string.length);
    return nameobj;
}
export default handleCookie;