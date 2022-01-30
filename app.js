const inputEl = document.querySelector('form>input');
const giphySection = document.querySelector('.giphies');
const searchBtn = document.querySelector('.input-search');

const fetchGiphy = function(search='') {
   const endpoint = 'https://api.giphy.com/v1/gifs/trending';

   const apiKey = 'jlCVdI1L8rfcVNgSZqU1NYDtS1B4XNGN';
   const limit = '10';
   let url;
   if(search) {
       url = endpoint + '?api_key=' + apiKey + '&limit=' + limit + '&search=' + search;
       console.log(url);
   } else {
       url = endpoint + '?api_key=' + apiKey + '&limit=' + limit;
   }
   console.log(url);
   const req = new XMLHttpRequest();
   
   req.open('GET', url);
   
   req.onload = function () {
      const response = req.response;
      // console.log(response); 
      const data = JSON.parse(response)
      console.log(data);
      const gipArray = data.data;
      gipArray.forEach(function (gip) {
         const gipUrl = gip.images.downsized_medium.url;
         const gipTitle = gip.title;
         console.log(gipTitle);
         console.log(gipUrl);
         const divEl = document.createElement('div');
         divEl.innerHTML = `
         <div class="giphy">
         <img src="${gipUrl}" alt="${gipTitle}" />
      </div>
         `
         giphySection.appendChild(divEl);
      });
   };
   req.send();
}

// first Display 
fetchGiphy();


console.dir(inputEl);
searchBtn.addEventListener('click', (e) => {
   e.preventDefault();
   const inputValue = inputEl.value;
   console.log(inputValue);
   // clean the dom
   giphySection.innerHTML = '';

   fetchGiphy(inputValue)
})


