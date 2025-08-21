const photos = [
  'photos/images/20250404-DSC_8700-已增强-降噪.jpg',
  'photos/images/DSC_7846.jpg',
  'photos/images/DSC_7853.jpg',
  'photos/images/DSC_7877.jpg',
  'photos/images/DSC_8084.jpg',
  'photos/images/DSC_8105.jpg',
  'photos/images/DSC_8704-已增强-降噪.jpg',
  'photos/images/法喜寺-55.jpg',
  'photos/images/法喜寺15-.jpg',
  'photos/images/法喜寺19-.jpg'
];

const grid = document.getElementById('photoGrid');
photos.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.dataset.index = i;
  img.addEventListener('click', openLightbox);
  grid.appendChild(img);
});

// 创建 Lightbox 结构
const lb = document.createElement('div');
lb.className = 'lightbox-overlay';
lb.innerHTML = `
  <span class="lightbox-nav prev">&#10094;</span>
  <img src="" alt="Preview">
  <span class="lightbox-nav next">&#10095;</span>
  <span class="lightbox-close">&times;</span>
`;
document.body.appendChild(lb);

const lbImg = lb.querySelector('img');
const prev = lb.querySelector('.prev');
const next = lb.querySelector('.next');
const closeBtn = lb.querySelector('.lightbox-close');
let currentIndex = 0;

function openLightbox(e) {
  currentIndex = +e.target.dataset.index;
  lbImg.src = photos[currentIndex];
  lb.classList.add('visible');
}

function closeLightbox() {
  lb.classList.remove('visible');
}

function showNext(offset) {
  currentIndex = (currentIndex + offset + photos.length) % photos.length;
  lbImg.src = photos[currentIndex];
}

prev.addEventListener('click', () => showNext(-1));
next.addEventListener('click', () => showNext(1));
closeBtn.addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});
