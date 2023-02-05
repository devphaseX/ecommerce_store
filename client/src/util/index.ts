function createBrowserComplianceUrl(
  url: string,
  whiteList: Array<string | RegExp>
): string {
  if (whiteList.some((ignore) => new RegExp(ignore).test(url))) return url;
  return url
    .replace(/^(https?:\/{2})?/i, String.raw`${location.protocol}//`)
    .replace(/localhost/i, '127.0.0.1');
}

export { createBrowserComplianceUrl, ignoreScrRefPath };

const ignoreScrRefPath = (url: string) =>
  createBrowserComplianceUrl(url, [/^\/?src/i]);
