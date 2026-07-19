const container = document.getElementById("timeline-container");

timelineEvents.forEach((event) => {
  const row = document.createElement("div");
  row.className = "timeline-row";

  const dot = document.createElement("div");
  dot.className = "timeline-dot";
  row.appendChild(dot);

  const card = document.createElement("div");
  card.className = "timeline-card";

  const imageHTML = event.image && event.image.trim() !== ""
    ? `<img class="card-image" src="${event.image}" alt="${event.title}" />`
    : `<div class="image-placeholder">Event Image</div>`;

  card.innerHTML = `
    <div class="card-image-wrap">${imageHTML}</div>
    <span class="card-year">${event.year}</span>
    <span class="card-tag">${event.tag}</span>
    <h3 class="card-title">${event.title}</h3>
    <p class="card-short">${event.short}</p>
    <p class="card-full-details">${event.details}</p>
  `;

  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-image")) {
      openImageModal(e.target.src);
    }
  });

  row.appendChild(card);
  container.appendChild(row);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });

document.querySelectorAll(".timeline-row").forEach((row) => observer.observe(row));

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModalBtn = document.getElementById("closeModal");

function openImageModal(src) {
  modalImg.src = src;
  modal.classList.add("active");
}

closeModalBtn.addEventListener("click", () => modal.classList.remove("active"));

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});