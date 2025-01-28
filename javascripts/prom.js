const urls = [
    "https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_128x128.png",
    "https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_128x128.png",
    "https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_128x128.png",
    "https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_128x128.png",
    "https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_128x128.png"
]

const canvas = document.getElementById("myCanvas");
canvas.width = canvas.height = 300;
const ctx = canvas.getContext("2d");

function combineImages(urls) {
    urls = urls.map(url => {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = url;
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                resolve(img);
            }
          })
    });

    return Promise.all(urls).then(image => {
        image.forEach(img => ctx.drawImage(img, Math.floor(Math.random()*150), Math.floor(Math.random()*150)))
        return canvas.toDataURL();
    })
}

combineImages(urls).then(image => {
    document.documentElement.style.backgroundImage = `url(${image})`;
})
