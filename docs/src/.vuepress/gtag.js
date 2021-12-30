export default function setGtag() {
  const gaId = 'G-B1QJSJW3P3';

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', gaId);
}