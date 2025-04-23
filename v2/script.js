// // Tạo lá cờ rơi
function createFallingFlag() {
  let flag = document.createElement('img');
  flag.src = 'flag.webp';
  flag.className = 'flag-falling';
  // Giới hạn vị trí rơi trong phạm vi an toàn để tránh scroll bar
  let safeWidth = window.innerWidth - 30; // trừ đi 30px để đảm bảo không vượt quá chiều rộng màn hình
  flag.style.left = Math.min(Math.random() * safeWidth, safeWidth - 30) + 'px';
  flag.style.top = '-50px';
  flag.style.transform = `rotate(${Math.random() * 360}deg) scale(${
    0.5 + Math.random() * 0.5
  })`;

  document.body.appendChild(flag);
  flag.addEventListener('mouseover', () => {
    flag.style.animation = 'none';
    flag.style.transform = 'scale(1.5) rotate(0deg)';
    setTimeout(() => flag.remove(), 1000);
  });
  setTimeout(() => flag.remove(), 5000);
}
// Giảm tần suất tạo cờ rơi để tránh gây giật màn hình
setInterval(createFallingFlag, 800);

// Thêm hiệu ứng pháo hoa khi click
document.addEventListener('click', (e) => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    },
    colors: ['#ff0000', '#ffcc00', '#ffff00', '#ff9933'],
    gravity: 0.8,
    scalar: 1.2,
    ticks: 100,
  });
});

// Tối ưu hiệu ứng pháo hoa tự động
function randomFirework() {
  const colors = ['#ff0000', '#ffcc00', '#ffff00', '#ff9933'];
  confetti({
    particleCount: Math.floor(Math.random() * 70) + 30, // Giảm số lượng hạt
    spread: Math.random() * 70 + 30,
    origin: {
      x: Math.random() * 0.8 + 0.1, // Giới hạn trong khoảng 0.1-0.9 để tránh overflow
      y: Math.random() * 0.5 + 0.1, // Giới hạn trong khoảng 0.1-0.6 để tránh overflow
    },
    colors: [colors[Math.floor(Math.random() * colors.length)]],
    ticks: 150, // Giảm thời gian hiệu ứng
    gravity: 0.8,
    scalar: Math.random() + 0.5,
    shapes: ['circle', 'square'],
    disableForReducedMotion: true, // Tắt hiệu ứng cho người dùng có cài đặt giảm chuyển động
  });
}

// Giảm tần suất pháo hoa tự động để tránh gây hiệu ứng giật
setInterval(randomFirework, 4000);

// Cập nhật lại phần tạo sao
function createStars() {
  // Xóa các ngôi sao cũ nếu có
  const oldStars = document.querySelectorAll('.star');
  oldStars.forEach((star) => star.remove());

  // Giảm số lượng sao để tránh gây nặng trình duyệt
  const numberOfStars = Math.min(window.innerWidth / 80, 10); // Giới hạn số lượng sao

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    // Đặt vị trí ngẫu nhiên nhưng tránh khu vực giữa màn hình
    const x = Math.random();
    const y = Math.random();

    // Tránh khu vực giữa màn hình (30% đến 70%)
    star.style.left =
      (x < 0.3
        ? x * 100
        : x > 0.7
        ? x * 100
        : x < 0.5
        ? x * 30
        : x * 100 + 70) + '%';
    star.style.top =
      (y < 0.3
        ? y * 100
        : y > 0.7
        ? y * 100
        : y < 0.5
        ? y * 30
        : y * 100 + 70) + '%';

    star.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(star);
  }
}

// Tạo sao ban đầu
createStars();

// Cập nhật sao khi thay đổi kích thước màn hình
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    createStars();
    // Đảm bảo các phần tử đã được vẽ lại trước khi cập nhật lại layout
    window.requestAnimationFrame(() => {
      const countdownContainer = document.getElementById('countdown-container');
      if (countdownContainer) {
        const countdown = countdownContainer.querySelector('.countdown');
        if (countdown) {
          countdown.style.width = '80%';
          countdown.style.maxWidth = '600px';
        }
      }
    });
  }, 300);
});

// Thêm đếm ngược đến ngày kỷ niệm 50 năm (30/04/2025)
function setupCountdown() {
  // Tạo phần tử đếm ngược
  const countdownContainer = document.getElementById('countdown-container');
  if (!countdownContainer) return;

  const countdownElement = document.createElement('div');
  countdownElement.className = 'countdown';

  // Thêm em bé vào trong bộ đếm ngược
  const emBeElement = document.createElement('div');
  emBeElement.className = 'countdown-embe';

  // Sử dụng requestAnimationFrame để tối ưu hóa hiệu suất
  const animateEmBe = () => {
    // Cải thiện hiệu suất render cho trình duyệt
    emBeElement.style.willChange = 'transform';
    countdownElement.appendChild(emBeElement);
  };

  // Gọi hàm tối ưu animation cho em bé
  window.requestAnimationFrame(animateEmBe);

  // Căn giữa bộ đếm ngược
  countdownElement.style.left = '50%';
  countdownElement.style.transform = 'translateX(-50%)';
  countdownElement.style.width = '80%';
  countdownElement.style.maxWidth = '600px';

  countdownContainer.appendChild(countdownElement);

  // Cập nhật đồng hồ đếm ngược
  function updateCountdown() {
    const targetDate = new Date('2025-04-30T00:00:00');
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    // Nếu đã qua ngày kỷ niệm
    if (timeDifference <= 0) {
      countdownElement.innerHTML =
        "<div class='celebration'>CHÀO MỪNG 50 NĂM GIẢI PHÓNG!</div><div class='countdown-embe'></div>";
      // Bắn pháo hoa đặc biệt
      for (let i = 0; i < 10; i++) {
        setTimeout(() => randomFirework(), i * 200);
      }
      return;
    }

    // Tính toán ngày, giờ, phút, giây
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Lấy phần tử em bé hiện tại nếu có
    const currentEmBe = countdownElement.querySelector('.countdown-embe');
    const emBeHtml = currentEmBe
      ? currentEmBe.outerHTML
      : '<div class="countdown-embe"></div>';

    // Cập nhật HTML với giữ emBeElement nhưng không tạo lại
    countdownElement.innerHTML = `
      <div class='countdown-title'>ĐẾM NGƯỢC ĐẾN 50 NĂM GIẢI PHÓNG</div>
      <div class='countdown-time'>
        <div class='countdown-item'>${days}<span>ngày</span></div>
        <div class='countdown-item'>${hours}<span>giờ</span></div>
        <div class='countdown-item'>${minutes}<span>phút</span></div>
        <div class='countdown-item'>${seconds}<span>giây</span></div>
      </div>
      ${emBeHtml}
    `;
  }

  // Cập nhật mỗi giây sử dụng requestAnimationFrame để làm mượt animation
  let lastUpdate = 0;
  function animateCountdown(timestamp) {
    // Chỉ cập nhật mỗi giây
    if (timestamp - lastUpdate >= 1000) {
      updateCountdown();
      lastUpdate = timestamp;
    }
    requestAnimationFrame(animateCountdown);
  }

  // Khởi chạy animation loop
  requestAnimationFrame(animateCountdown);
}

// Chạy đếm ngược
setupCountdown();
