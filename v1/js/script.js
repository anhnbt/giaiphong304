document.addEventListener('DOMContentLoaded', () => {
  const tank = document.querySelector('.tank');
  const screenWidth = window.innerWidth;
  const TANK_X_POSITION = screenWidth / 2; // Vị trí giữa màn hình (điều chỉnh theo kích thước xe tăng)
  const tankSpeed = 2; // Tốc độ di chuyển của xe tăng (px/frame)
  let tankPosition = 0; // Vị trí hiện tại của xe tăng (px)
  let shootCount = 0; // Biến đếm số lần bắn
  const maxShots = 3; // Số lần bắn tối đa
  let hasShot = false; // Trạng thái để kiểm tra xem đã bắn trong vòng lặp này chưa
  let gateDestroyed = false; // Trạng thái cổng bị húc đổ

  function showMemeText() {
    const memeText = document.createElement('div');
    memeText.textContent = 'Húc đổ cổng rồi!';
    memeText.style.position = 'absolute';
    memeText.style.bottom = '20%'; // Đặt cao hơn để nằm trên đứa bé
    memeText.style.left = '50%';
    memeText.style.transform = 'translate(-50%, -50%)';
    memeText.style.color = '#FFD700';
    memeText.style.fontSize = '24px';
    memeText.style.fontWeight = 'bold';
    memeText.style.textShadow = '2px 2px 2px #000';
    document.body.appendChild(memeText);

    setTimeout(() => {
      memeText.remove();
    }, 3000); // Hiển thị trong 3 giây
  }

  function showChildEffect() {
    const child = document.createElement('div');
    child.classList.add('child'); // Thêm class để áp dụng CSS
    document.body.appendChild(child);

    child.style.left = `${TANK_X_POSITION - 150 / 2}px`; // Đồng bộ vị trí x với xe tăng
  }

  function updateTank() {
    const tankRect = tank.getBoundingClientRect();
    if (tankPosition < TANK_X_POSITION - tankRect.width / 2) {
      tankPosition += tankSpeed;
      tank.style.left = `${tankPosition}px`;
    }
    // Kiểm tra va chạm với cổng
    const gate = document.querySelector('.gate');
    const gateRect = gate.getBoundingClientRect();

    if (
      tankRect.right >= gateRect.left &&
      tankRect.left <= gateRect.right &&
      tankRect.bottom >= gateRect.top &&
      !gateDestroyed
    ) {
      gate.classList.add('destroyed');
      gateDestroyed = true;
    }

    // Kiểm tra điều kiện bắn
    if (
      shootCount < maxShots &&
      !hasShot &&
      tankPosition >= TANK_X_POSITION - tankRect.width / 2
    ) {
      showChildEffect();
      showMemeText();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF0000', '#FFD700', '#FFFFFF'],
      });
      shootCount++;
      hasShot = true;

      setTimeout(() => {
        hasShot = false;
      }, 1000);
    }

    // Tiếp tục cập nhật nếu chưa đạt số lần bắn tối đa
    if (tankPosition < TANK_X_POSITION - tankRect.width / 2 || !gateDestroyed) {
      requestAnimationFrame(updateTank);
    }
  }

  updateTank(); // Bắt đầu cập nhật xe tăng

  const quoteElement = document.querySelector('.quote');
  const quotes = [
    'Hòa bình và phát triển - 30/04/1975',
    'Độc lập - Tự do - Hạnh phúc',
    'Việt Nam muôn năm!',
    'Tự hào dân tộc Việt Nam',
  ]; // Mảng các câu quote
  let quoteIndex = 0; // Chỉ số của câu quote hiện tại
  let charIndex = 0; // Chỉ số ký tự trong câu quote hiện tại

  function typeEffect() {
    if (charIndex < quotes[quoteIndex].length) {
      // Hiển thị từng ký tự
      quoteElement.textContent += quotes[quoteIndex][charIndex];
      charIndex++;
      setTimeout(typeEffect, 100); // Tốc độ gõ phím
    } else {
      // Sau khi hoàn thành một câu, chuyển sang câu tiếp theo
      setTimeout(() => {
        quoteElement.textContent = ''; // Xóa nội dung hiện tại
        charIndex = 0; // Reset chỉ số ký tự
        quoteIndex = (quoteIndex + 1) % quotes.length; // Chuyển sang câu tiếp theo, quay lại đầu nếu hết
        typeEffect();
      }, 2000); // Thời gian chờ trước khi chuyển sang câu tiếp theo
    }
  }

  typeEffect(); // Bắt đầu hiệu ứng
});
