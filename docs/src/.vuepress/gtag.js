export default function setGtag() {
  const gaId = 'G-RJ8BDV2B2D';

  ;(function(d, s, id){
    var js, head = d.head
    if (d.getElementById(id)) {return}
    js = d.createElement(s); js.id = id
    js.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    head.appendChild(js)
  }(document, 'script', 'google-gtag'));

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', gaId);
}