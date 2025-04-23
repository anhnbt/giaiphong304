document.addEventListener('DOMContentLoaded', () => {
  // Make all family members visible from the start
  const familyMembers = [
    '.son',
    '.daughter',
    '.father',
    '.mother',
    '.grandmother',
    '.grandfather',
  ];

  // Show all family members
  familyMembers.forEach((selector) => {
    const member = document.querySelector(selector);
    if (member) {
      member.style.visibility = 'visible';
      member.style.opacity = '1';
    }
  });

  // Regular fireworks function
  function launchRegularFireworks() {
    // Create fireworks at semi-random positions
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.3 + Math.random() * 0.4, y: 0.3 + Math.random() * 0.3 },
      colors: ['#FF0000', '#FFD700', '#0096FF'], // Red, Gold, Blue colors
      startVelocity: 30,
      gravity: 0.5,
      shapes: ['circle', 'square'],
      scalar: 1,
    });
  }

  // Launch fireworks every 3 seconds
  setInterval(launchRegularFireworks, 3000);
  // Initial fireworks
  launchRegularFireworks();

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
