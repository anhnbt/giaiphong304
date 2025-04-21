// // Tạo lá cờ rơi
function createFallingFlag() {
  let flag = document.createElement('img');
  flag.src = 'flag.webp';
  flag.className = 'flag-falling';
  flag.style.left = Math.random() * window.innerWidth + 'px';
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
setInterval(createFallingFlag, 500);

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
    particleCount: Math.floor(Math.random() * 100) + 50,
    spread: Math.random() * 70 + 30,
    origin: { x: Math.random(), y: Math.random() },
    colors: [colors[Math.floor(Math.random() * colors.length)]],
    ticks: 200,
    gravity: 0.8,
    scalar: Math.random() + 0.5,
    shapes: ['circle', 'square'],
  });
}

setInterval(randomFirework, 3000);

// Cập nhật lại phần tạo sao
function createStars() {
  // Xóa các ngôi sao cũ nếu có
  const oldStars = document.querySelectorAll('.star');
  oldStars.forEach((star) => star.remove());

  // Tạo số lượng sao phù hợp
  const numberOfStars = Math.min(window.innerWidth / 50, 15); // Giới hạn số lượng sao

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
  resizeTimeout = setTimeout(createStars, 300);
});
