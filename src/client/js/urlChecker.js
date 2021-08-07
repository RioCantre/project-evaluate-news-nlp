function checkForURL(inputURL) {
    const urlRegex = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})/igm;
    const url = new RegExp (urlRegex);
    return url.test(inputURL);
 }

 export { checkForURL }