function createBrowserComplianceUrl(url: string): string {
  if (/\/?src/.test(url)) return url;
  return url
    .replace(/localhost/i, '127.0.0.1')
    .replace(/^(?:http(?:|s))?(.*)/, String.raw`${location.protocol}//$1`);
}

export { createBrowserComplianceUrl };
