document.addEventListener('DOMContentLoaded', () => {
  const tank = document.querySelector('.tank');
  const screenWidth = window.innerWidth;
  const TANK_X_POSITION = screenWidth / 2; // Vị trí giữa màn hình (điều chỉnh theo kích thước xe tăng)
  const tankSpeed = 2; // Tốc độ di chuyển của xe tăng (px/frame)
  let tankPosition = 0; // Vị trí hiện tại của xe tăng (px)
  let shootCount = 0; // Biến đếm số lần bắn
  const maxShots = 3; // Số lần bắn tối đa
  let hasShot = false; // Trạng thái để kiểm tra xem đã bắn trong vòng lặp này chưa

  // Hide child initially
  const child = document.querySelector('.child');
  if (child) {
    child.style.visibility = 'hidden';
    child.style.opacity = '0';
  }

  function showChildEffect() {
    if (!child) return;

    // Reset animation
    child.style.animation = 'none';
    child.offsetHeight; // Trigger reflow

    // Reapply animation and show child
    child.style.visibility = 'visible';
    child.style.opacity = '1';
    // child.style.animation = 'riseUp 3s ease-out forwards';

    // Position the child near the tank
    child.style.left = `${TANK_X_POSITION - 50}px`; // Center relative to tank
  }

  function updateTank() {
    const tankRect = tank.getBoundingClientRect();
    if (tankPosition < TANK_X_POSITION - tankRect.width / 2) {
      tankPosition += tankSpeed;
      tank.style.left = `${tankPosition}px`;
    }

    // Kiểm tra điều kiện bắn
    if (
      shootCount < maxShots &&
      !hasShot &&
      tankPosition >= TANK_X_POSITION - tankRect.width / 2
    ) {
      // Trigger tank shooting effect
      const tankGun = document.querySelector('.tank-gun');
      if (tankGun) {
        tankGun.style.animation = 'none';
        setTimeout(() => {
          tankGun.style.animation = 'shootEffect 0.3s';
        }, 10);
      }

      showChildEffect();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF0000', '#FFD700', '#0096FF'], // Updated colors
      });

      shootCount++;
      hasShot = true;

      setTimeout(() => {
        hasShot = false;
      }, 1000);
    }

    // Tiếp tục cập nhật nếu chưa đạt số lần bắn tối đa
    if (tankPosition < TANK_X_POSITION - tankRect.width / 2) {
      requestAnimationFrame(updateTank);
    }
  }

  updateTank(); // Bắt đầu cập nhật xe tăng

  // Thiết lập đếm ngược đến 30/04/2025
  function setupCountdown() {
    // Cập nhật đồng hồ đếm ngược
    function updateCountdown() {
      const targetDate = new Date('2025-04-30T00:00:00');
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      const countdownElement = document.querySelector('.countdown');

      if (!countdownElement) return;

      if (timeDifference <= 0) {
        // Nếu đã tới ngày mục tiêu, hiển thị thông báo chúc mừng
        countdownElement.innerHTML =
          "<div class='celebration'>CHÀO MỪNG 50 NĂM GIẢI PHÓNG!</div>";

        // Bắn pháo hoa đặc biệt
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: Math.random(), y: Math.random() * 0.5 },
              colors: ['#FF0000', '#FFD700', '#0096FF'],
            });
          }, i * 200);
        }
        return;
      }

      // Tính thời gian còn lại
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Update countdown values in existing elements
      document.getElementById(
        'days-count'
      ).innerHTML = `${days}<span>ngày</span>`;
      document.getElementById(
        'hours-count'
      ).innerHTML = `${hours}<span>giờ</span>`;
      document.getElementById(
        'minutes-count'
      ).innerHTML = `${minutes}<span>phút</span>`;
      document.getElementById(
        'seconds-count'
      ).innerHTML = `${seconds}<span>giây</span>`;
    }

    // Cập nhật đếm ngược mỗi giây
    let lastUpdate = 0;
    function animateCountdown(timestamp) {
      if (timestamp - lastUpdate >= 1000) {
        updateCountdown();
        lastUpdate = timestamp;
      }
      requestAnimationFrame(animateCountdown);
    }

    // Khởi động bộ đếm ngược
    requestAnimationFrame(animateCountdown);
  }

  // Khởi động đếm ngược
  setupCountdown();

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
