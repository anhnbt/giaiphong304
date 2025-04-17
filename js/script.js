document.addEventListener('DOMContentLoaded', () => {
  const tank = document.querySelector('.tank');
  const barrel = document.querySelector('.tank-barrel');
  const shootSound = new Audio('sounds/shoot.mp3'); // Đường dẫn đến tệp âm thanh
  let shootCount = 0; // Biến đếm số lần bắn
  const maxShots = 3; // Số lần bắn tối đa
  let hasShot = false; // Trạng thái để kiểm tra xem đã bắn trong vòng lặp này chưa

  function checkTankPosition() {
    const tankRect = tank.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // Kiểm tra nếu chưa đạt số lần bắn tối đa và xe tăng ở giữa màn hình
    if (
      shootCount < maxShots &&
      !hasShot &&
      tankRect.left + tankRect.width / 2 >= screenWidth / 2
    ) {
      // Tạm dừng xe tăng
      tank.classList.add('paused');

      // Hiệu ứng bắn
      barrel.classList.add('shoot');
      shootSound.play(); // Phát âm thanh bắn

      // Kích hoạt hiệu ứng confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }, // Vị trí giữa màn hình
        colors: ['#FF0000', '#FFD700', '#FFFFFF'], // Màu sắc phù hợp với chủ đề 30/04
      });

      // Tăng số lần bắn
      shootCount++;
      hasShot = true; // Đánh dấu đã bắn

      // Sau 1 giây (thời gian bắn), tiếp tục di chuyển
      setTimeout(() => {
        barrel.classList.remove('shoot'); // Reset hiệu ứng bắn
        tank.classList.remove('paused'); // Tiếp tục di chuyển
        hasShot = false; // Cho phép bắn lần tiếp theo
      }, 1000);
    }

    // Tiếp tục kiểm tra vị trí
    if (shootCount < maxShots) {
      requestAnimationFrame(checkTankPosition);
    }
  }

  // Bắt đầu kiểm tra vị trí
  requestAnimationFrame(checkTankPosition);

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
