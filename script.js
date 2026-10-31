
const documents = [
   {
    titre: "Attestation de fin d'étude en économie",
    categorie: "Diplôme",
    organisme: "Faculté de Droit et des Sciences Économiques (FDSE), Université d'État d'Haïti (UEH)",
    date: "2024",  
    description: "Cette attestion de fin d'étude en Sciences Économiques a été délivré par la Faculté de Droit et des Sciences Économiques (FDSE) en attente de ma soutenance sur le  rôle de la mobilité dans le developpement local .",
    fichier: "ATTESTATION.pdf",
    apercu: ""
  },
  { 
    titre: "Certificat en analyse de données",
    categorie: "Certificat",
    organisme: "Cisco Networking Academy",
    date: "Juin 2026",
    description: "Au cours de cette formation en analyse de données, j'ai appris a transformer les données, gérer les doublons et les outliers",
    fichier: "Certificat_Cisco_Netcad.pdf",
    apercu: ""
  },
  { 
    titre: " Relevés de notes Universitaires",
    categorie: " Relevés de notes",
    organisme: "Cisco Networking Academy",
    date: "Juin 2026",
    description: "Ces relevés de notes témoignent de ma formation en économie",
    fichier: "Releve de notes.pdf",
    apercu: ""
  },
  { 
    titre: "Certificat en Science de données",
    categorie: "Certificat",
    organisme: " Coursera",
    date: " Octobre 2026",
    description: "Au cours de cette formation en analyse de données, j'ai acquis des compétences essentielles dans l'utilisation de R, Jupyter, Colab",
    fichier: "Coursera EYA24M47076O.pdf",
    apercu: ""
  },
  {
    titre: "Mon CV",
    categorie: "Curriculum vitae",
    organisme: "Curriculum vitae de Lolincia",
    date: "2026",
    description: " Ce document retrace mon parcours professionnel comme stagiaire analyste de projet au Ministère des Haitiens Vivant à l'Étranger, stagiaire au Ministère du Commerce et de l'Industrie,à Solidarité International  ",
    fichier: "Lolincia JEAN LUC- Nationalité-France.pdf",
    apercu: ""
  },
  {
    titre: "Attestation de travail",
    categorie: "Attestation",
    organisme: "Ministère des Haïtiens Vivant à l'Étranger (MHAVE)",
    date: "2024",
    description: "Précisez le contexte de l'enquête, votre rôle ou la nature de votre participation.",
    fichier: "documents/exemple-attestation-enquete.pdf",
    apercu: ""
  },
];

const grid = document.getElementById("documentGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let activeFilter = "Tous";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function renderDocuments() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const results = documents.filter(doc => {
    const categoryOK = activeFilter === "Tous" || doc.categorie === activeFilter;
    const text = `${doc.titre} ${doc.categorie} ${doc.organisme} ${doc.description}`.toLocaleLowerCase("fr");
    return categoryOK && text.includes(query);
  });

  grid.innerHTML = results.map(doc => `
    <article class="doc-card">
      <div class="doc-preview">
        ${doc.apercu
          ? `<img src="${escapeHTML(doc.apercu)}" alt="Aperçu : ${escapeHTML(doc.titre)}">`
          : `<span aria-hidden="true">▤</span>`}
      </div>
      <div class="doc-body">
        <span class="doc-category">${escapeHTML(doc.categorie)}</span>
        <h3>${escapeHTML(doc.titre)}</h3>
        <p>${escapeHTML(doc.description)}</p>
        <div class="doc-meta">${escapeHTML(doc.organisme)} · ${escapeHTML(doc.date)}</div>
        <div class="doc-actions">
          <a class="doc-link" href="${escapeHTML(doc.fichier)}" target="_blank" rel="noopener">Consulter </a>
          <a class="doc-link" href="${escapeHTML(doc.fichier)}" download>Télécharger </a>
        </div>
      </div>
    </article>`).join("");

  emptyState.hidden = results.length > 0;
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
    renderDocuments();
  });
});
searchInput.addEventListener("input", renderDocuments);

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
renderDocuments();
