const lFM = require('lautfm');

const fm = new lFM();
const stationList = document.getElementById('station-list');
const audioSrc = document.getElementById('audio-source');

let filter = {
  by: 'letter',
  term: 'b',
};

const playAudioStream = (streamLink, selected) => {
  reset();
  selected.classList.add('active');
  audioSrc.setAttribute('src', streamLink);
  audioSrc.play();
};

const reset = () => {
  let getAllItem = document.querySelectorAll('.list-group-item');
  getAllItem.forEach((ele) => ele.classList.remove('active'));
};

fm.getStations(filter)
  .then((data) => {
    console.log(data);
    if (data) {
      data.map((station) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.setAttribute(
          'ondblclick',
          `playAudioStream('${station.stream_url}', this)`
        );
        listItem.innerHTML = `            
        <img class="media-object pull-left" src=${station.images.station} width="50" height="50">
        <div class="media-body">
            <strong>${station.name}</strong>
            <p>${station.description}</p>
        </div>`;
        stationList.appendChild(listItem);
      });
    }
  })
  .catch((err) => console.log(err));
