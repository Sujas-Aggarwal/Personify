const rightMenu = document.querySelector(".ytp-right-controls");
rightMenu.style.display = "flex";
console.log(rightMenu);
const speedButton = document.createElement("button");
speedButton.innerHTML = "1x";
speedButton.className = "ytp-button";
speedButton.title = "Adjust Video Speed";
speedButton.ariaKeyShortcuts = "s";
speedButton.style.cssText = `
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  height: 100%;
  padding: 0 6px;
  outline: none;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

rightMenu.prepend(speedButton);
const miniplayerButton = document.querySelector(".ytp-miniplayer-button");
if (miniplayerButton) {
  miniplayerButton.remove();
}
//speed control functionality
let currentSpeed = 1;
const speedVariants = [1, 2, 4, 8, 16];
const videoEle = document.querySelector(".html5-main-video");
//initializing speed control
if (
  localStorage.getItem("yt-video-speed") &&
  speedVariants.includes(parseInt(localStorage.getItem("yt-video-speed")))
) {
  currentSpeed = parseInt(localStorage.getItem("yt-video-speed"));
  speedButton.innerHTML = `${currentSpeed}x`;
  videoEle.playbackRate = currentSpeed;
}
function speedControl() {
  currentSpeed =
    speedVariants[
      (speedVariants.indexOf(currentSpeed) + 1) % speedVariants.length
    ] || speedVariants[0];
  videoEle.playbackRate = currentSpeed;
  localStorage.setItem("yt-video-speed", currentSpeed.toString());
  speedButton.innerHTML = `${currentSpeed}x`;
}
document.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    speedControl();
  }
});
speedButton.addEventListener("click", speedControl);
