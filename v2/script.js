// Tạo hiệu ứng lá cờ rơi
function createFallingFlag() {
  let flag = document.createElement('img');
  flag.src = 'flag.webp';
  flag.className = 'flag-falling';
  // Giới hạn vị trí rơi để tránh tạo thanh cuộn ngang
  let safeWidth = window.innerWidth - 30;
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
// Tạo cờ rơi định kỳ
setInterval(createFallingFlag, 800);

// Hiệu ứng pháo hoa khi click
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

// Hiệu ứng pháo hoa tự động
function randomFirework() {
  const colors = ['#ff0000', '#ffcc00', '#ffff00', '#ff9933'];
  confetti({
    particleCount: Math.floor(Math.random() * 70) + 30,
    spread: Math.random() * 70 + 30,
    origin: {
      x: Math.random() * 0.8 + 0.1,
      y: Math.random() * 0.5 + 0.1,
    },
    colors: [colors[Math.floor(Math.random() * colors.length)]],
    ticks: 150,
    gravity: 0.8,
    scalar: Math.random() + 0.5,
    shapes: ['circle', 'square'],
    disableForReducedMotion: true,
  });
}

// Tạo pháo hoa tự động
setInterval(randomFirework, 4000);

// Tạo hiệu ứng các ngôi sao
function createStars() {
  // Xóa các ngôi sao cũ
  const oldStars = document.querySelectorAll('.star');
  oldStars.forEach((star) => star.remove());

  // Tạo các ngôi sao mới
  const numberOfStars = Math.min(window.innerWidth / 80, 10);

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    // Vị trí ngẫu nhiên tránh khu vực giữa màn hình
    const x = Math.random();
    const y = Math.random();

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

// Khởi tạo các ngôi sao
createStars();

// Cập nhật vị trí sao khi thay đổi kích thước màn hình
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    createStars();
    window.requestAnimationFrame(() => {
      const countdown = document.querySelector('.countdown');
      if (countdown) {
        countdown.style.width = '80%';
        countdown.style.maxWidth = '600px';
      }
    });
  }, 300);
});

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
        setTimeout(() => randomFirework(), i * 200);
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
