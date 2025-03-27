const cameraView = document.getElementById('camera-view');
const pcNameDisplay = document.getElementById('pc-name');
const datetimeDisplay = document.getElementById('datetime');

// PC名の取得
const pcName = window.prompt('PC名を入力してください');
pcNameDisplay.textContent = pcName;

// カメラ映像の取得と表示
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true })
  .then(stream => {
    cameraView.srcObject = stream;
    // 音声の再生（ハウリング対策）
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const destination = audioContext.destination;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0; // 音量を0に設定
    source.connect(gainNode);
    gainNode.connect(destination);
  })
  .catch(error => {
    console.error('カメラまたは音声へのアクセスに失敗しました:', error);
  });

// 日時表示の更新
function updateDatetime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  datetimeDisplay.textContent = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

updateDatetime();
setInterval(updateDatetime, 1000); // 1秒ごとに更新
