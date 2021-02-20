const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

// 현재 시간을 가져오는 함수
function getTime(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  clockTitle.innerHTML = `${
    hours < 10 ? `0${hours}` : `${hours}`
  }:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }:${
    seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();