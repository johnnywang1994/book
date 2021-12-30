export default function setAdsense() {
  ;(function(d, s, id){
    var js, head = d.head
    if (d.getElementById(id)) {return}
    js = d.createElement(s); js.id = id
    js.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5050343387449103'
    head.appendChild(js)
  }(document, 'script', 'google-adsense'));
}