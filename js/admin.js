let storyData;
let currentPage = 0;

const pageImage =
document.getElementById("pageImage");

const overlayLayer =
document.getElementById("overlayLayer");

fetch("data/story1.json")
.then(res => res.json())
.then(data => {

  storyData = data;

  renderPage();

});

function renderPage(){

  const page =
  storyData.pages[currentPage];

  pageImage.src = page.image;

  document.getElementById(
    "pageLabel"
  ).innerText =
  `Page ${currentPage + 1}`;

  overlayLayer.innerHTML = "";

  page.overlays.forEach(
    (overlay,index)=>{

      createOverlayElement(
        overlay,
        index
      );

    }
  );
}

function createOverlayElement(
overlay,
index
){

  const div =
  document.createElement("div");

  div.classList.add("overlay");
  div.classList.add(overlay.type);

  div.contentEditable = true;

  div.innerText =
  overlay.text;

  div.style.left =
  overlay.x + "%";

  div.style.top =
  overlay.y + "%";

  makeDraggable(
    div,
    overlay
  );

  div.addEventListener(
    "input",
    ()=>{

      overlay.text =
      div.innerText;

    }
  );

  overlayLayer.appendChild(div);
}

function makeDraggable(
element,
overlay
){

  let dragging=false;

  let offsetX=0;
  let offsetY=0;

  element.addEventListener(
    "mousedown",
    e=>{

      dragging=true;

      offsetX=e.offsetX;
      offsetY=e.offsetY;

    }
  );

  document.addEventListener(
    "mousemove",
    e=>{

      if(!dragging) return;

      const rect =
      overlayLayer.getBoundingClientRect();

      const x =
      ((e.clientX-rect.left-offsetX)
      /rect.width)*100;

      const y =
      ((e.clientY-rect.top-offsetY)
      /rect.height)*100;

      overlay.x=x;
      overlay.y=y;

      element.style.left =
      x+"%";

      element.style.top =
      y+"%";

    }
  );

  document.addEventListener(
    "mouseup",
    ()=>{

      dragging=false;

    }
  );
}

document.getElementById(
"addNarration"
).onclick=()=>{

  storyData.pages[currentPage]
  .overlays.push({

    type:"narration",

    text:"New Narration",

    x:10,
    y:10

  });

  renderPage();
};

document.getElementById(
"addSpeech"
).onclick=()=>{

  storyData.pages[currentPage]
  .overlays.push({

    type:"speech",

    text:"New Speech",

    x:20,
    y:20

  });

  renderPage();
};

document.getElementById(
"prevPage"
).onclick=()=>{

  if(currentPage>0){

    currentPage--;

    renderPage();
  }
};

document.getElementById(
"nextPage"
).onclick=()=>{

  if(
    currentPage <
    storyData.pages.length-1
  ){

    currentPage++;

    renderPage();
  }
};

document.getElementById(
"exportBtn"
).onclick=()=>{

  const data =
  JSON.stringify(
    storyData,
    null,
    2
  );

  const blob =
  new Blob(
    [data],
    {
      type:"application/json"
    }
  );

  const url =
  URL.createObjectURL(blob);

  const a =
  document.createElement("a");

  a.href=url;

  a.download="story1.json";

  a.click();
};