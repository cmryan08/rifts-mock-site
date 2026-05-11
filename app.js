const CALENDLY_URL = "https://calendly.com/christopher-_-ryan/free-consultation";

const TYPE = {
  simple_blog: { cpu: 0.6, ram: 0.6, storage: 10, pageKB: 300, cache: 0.95, tDefault: 0.2, mMB: 128 },
  news_magazine: { cpu: 1.0, ram: 1.0, storage: 15, pageKB: 500, cache: 0.8, tDefault: 0.2, mMB: 128 },
  portfolio_gallery: { cpu: 0.8, ram: 0.8, storage: 15, pageKB: 800, cache: 0.9, tDefault: 0.2, mMB: 128 },
  media_heavy: { cpu: 1.2, ram: 1.2, storage: 30, pageKB: 1500, cache: 0.7, tDefault: 0.2, mMB: 128 },
  woocommerce: { cpu: 2.0, ram: 2.0, storage: 20, pageKB: 800, cache: 0.6, tDefault: 0.2, mMB: 128 },
  ecommerce_other: { cpu: 1.6, ram: 1.6, storage: 20, pageKB: 700, cache: 0.7, tDefault: 0.2, mMB: 128 },
  membership_community: { cpu: 1.6, ram: 1.6, storage: 20, pageKB: 600, cache: 0.65, tDefault: 0.2, mMB: 128 },
  lms_courses: { cpu: 1.8, ram: 1.8, storage: 25, pageKB: 1000, cache: 0.65, tDefault: 0.2, mMB: 128 },
  multisite_network: { cpu: 1.4, ram: 1.4, storage: 20, pageKB: 500, cache: 0.75, tDefault: 0.2, mMB: 128 },
  custom_other: { cpu: 1.0, ram: 1.0, storage: 15, pageKB: 600, cache: 0.75, tDefault: 0.2, mMB: 128 },
};

const PLANS = [
  { provider: "AWS Lightsail", name: "Linux/Unix 1 GB", vCPU: 2, cpuType: "shared", cpuDetail: "burstable", RAM: 1, SSD: 40, transfer: 2, price: 7 },
  { provider: "AWS Lightsail", name: "Linux/Unix 2 GB", vCPU: 2, cpuType: "shared", cpuDetail: "burst", RAM: 2, SSD: 60, transfer: 3, price: 12 },
  { provider: "AWS Lightsail", name: "Linux/Unix 4 GB", vCPU: 2, cpuType: "shared", RAM: 4, SSD: 80, transfer: 4, price: 24 },
  { provider: "AWS Lightsail", name: "Linux/Unix 8 GB", vCPU: 2, cpuType: "shared", RAM: 8, SSD: 160, transfer: 5, price: 44 },
  { provider: "DigitalOcean (Basic)", name: "2 GB", vCPU: 1, cpuType: "shared", RAM: 2, SSD: 50, transfer: 2, price: 12 },
  { provider: "DigitalOcean (Basic)", name: "4 GB", vCPU: 2, cpuType: "shared", RAM: 4, SSD: 80, transfer: 4, price: 24 },
  { provider: "DigitalOcean (CPU-Optimized)", name: "c-2 vCPU/4 GB", vCPU: 2, cpuType: "dedicated", RAM: 4, SSD: 25, transfer: 4, price: 42 },
  { provider: "Linode (Shared CPU)", name: "Linode 2 GB", vCPU: 1, cpuType: "shared", RAM: 2, SSD: 50, transfer: 2, price: 12 },
  { provider: "Linode (Shared CPU)", name: "Linode 4 GB", vCPU: 2, cpuType: "shared", RAM: 4, SSD: 80, transfer: 4, price: 24 },
  { provider: "Linode (Dedicated CPU)", name: "Dedicated 4 GB", vCPU: 2, cpuType: "dedicated", RAM: 4, SSD: 80, transfer: 4, price: 36 },
  { provider: "Linode (Dedicated CPU)", name: "Dedicated 8 GB", vCPU: 4, cpuType: "dedicated", RAM: 8, SSD: 160, transfer: 5, price: 72 },
  { provider: "Vultr", name: "VC2 2 GB", vCPU: 1, cpuType: "shared", RAM: 2, SSD: 55, transfer: 2, price: 10 },
  { provider: "Google Cloud", name: "e2-small", vCPU: 0.5, cpuType: "shared", cpuDetail: "burst", RAM: 2, SSD: 10, transfer: 0, price: 12.23, notes: "Storage and transfer billed separately." },
  { provider: "Google Cloud", name: "e2-medium", vCPU: 1, cpuType: "shared", cpuDetail: "burst", RAM: 4, SSD: 10, transfer: 0, price: 24.46, notes: "Storage and transfer billed separately." },
  { provider: "Google Cloud", name: "e2-standard-2", vCPU: 2, cpuType: "shared", RAM: 8, SSD: 10, transfer: 0, price: 48.91, notes: "Storage and transfer billed separately." },
  { provider: "Microsoft Azure", name: "Basic B1", vCPU: 1, cpuType: "shared PaaS", RAM: 1.75, SSD: 10, transfer: 0, price: 13.14, notes: "Transfer billed separately." },
  { provider: "Microsoft Azure", name: "Basic B2", vCPU: 2, cpuType: "shared PaaS", RAM: 3.5, SSD: 10, transfer: 0, price: 25.55, notes: "Transfer billed separately." },
];

const SITE_TYPE_OPTIONS = [
  { value: "simple_blog", label: "Simple Blog / Brochure" },
  { value: "news_magazine", label: "News / Magazine Site" },
  { value: "portfolio_gallery", label: "Portfolio / Showcase" },
  { value: "media_heavy", label: "Media-Heavy (Podcast / Video)" },
  { value: "woocommerce", label: "WooCommerce Store" },
  { value: "ecommerce_other", label: "Other E-commerce Plugin (EDD, Shopify Buy Button)" },
  { value: "membership_community", label: "Membership / Community" },
  { value: "lms_courses", label: "LMS / Online Courses" },
  { value: "multisite_network", label: "Multisite Network" },
  { value: "custom_other", label: "Custom / Other" },
];

function initNavigation() {
  const button = document.querySelector(".menu-toggle");
  if (!button) return;
  button.addEventListener("click", () => {
    const open = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", open);
    button.setAttribute("aria-expanded", String(open));
  });
}

function initFaq() {
  document.querySelectorAll("[data-faq]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".faq-item")?.classList.toggle("is-open");
    });
  });
}

async function initModel() {
  const canvas = document.querySelector("#modelCanvas");
  if (!canvas) return;

  const status = document.querySelector("#modelStatus");
  const THREE = await import("three");
  const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
  const { MTLLoader } = await import("three/addons/loaders/MTLLoader.js");
  const { OBJLoader } = await import("three/addons/loaders/OBJLoader.js");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 5000);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.autoRotate = false;
  canvas.style.pointerEvents = "none";

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd5d2cc, 2.9));

  const key = new THREE.DirectionalLight(0xffffff, 4.6);
  key.position.set(80, -110, 130);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xffffff, 2.2);
  rim.position.set(-90, 80, 80);
  scene.add(rim);

  const charcoal = new THREE.MeshPhysicalMaterial({
    color: 0x2d2d2d,
    roughness: 0.65,
    metalness: 0,
    reflectivity: 0.04,
    clearcoat: 0,
  });

  const steel = new THREE.MeshPhysicalMaterial({
    color: 0xa3a3a3,
    roughness: 0.26,
    metalness: 0.6,
  });

  let modelRoot;
  let modelBaseY = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function frameModel(root) {
    resize();
    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    root.position.sub(center);

    const scale = 122 / Math.max(size.x, size.y, size.z);
    root.scale.multiplyScalar(scale);
    root.rotation.set(0, 2.16, 0);

    let fittedBox = new THREE.Box3().setFromObject(root);
    const fittedCenter = fittedBox.getCenter(new THREE.Vector3());
    root.position.sub(fittedCenter);

    fittedBox = new THREE.Box3().setFromObject(root);
    const sphere = fittedBox.getBoundingSphere(new THREE.Sphere());
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const distance = (sphere.radius / Math.sin(fov / 2)) * 0.98;
    const cameraDirection = new THREE.Vector3(0.04, 0.18, 1).normalize();
    camera.position.copy(cameraDirection.multiplyScalar(distance));
    camera.near = Math.max(0.01, distance / 100);
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    controls.minDistance = distance * 0.65;
    controls.maxDistance = distance * 1.8;
    controls.target.set(0, 0, 0);
    controls.update();
    modelBaseY = root.position.y;
  }

  function applyFallbackMaterials(root) {
    root.traverse((node) => {
      if (!node.isMesh) return;
      const name = `${node.name} ${node.material?.name || ""}`.toLowerCase();
      node.castShadow = true;
      node.receiveShadow = true;
      if (!node.material || name.includes("abs") || name.includes("plastic")) {
        node.material = charcoal;
      } else if (name.includes("steel") || name.includes("satin") || name.includes("metal")) {
        node.material = steel;
      }
    });
  }

  async function loadModel() {
    const loader = new OBJLoader();
    try {
      const materials = await new MTLLoader().loadAsync("./assets/rifts-web.mtl");
      materials.preload();
      loader.setMaterials(materials);
      modelRoot = await loader.loadAsync("./assets/rifts-web.obj");
    } catch (error) {
      console.warn("Using fallback model material", error);
      modelRoot = await loader.loadAsync("./assets/rifts-web.obj");
      modelRoot.traverse((node) => {
        if (node.isMesh) node.material = charcoal;
      });
    }
    applyFallbackMaterials(modelRoot);
    frameModel(modelRoot);
    scene.add(modelRoot);
    if (status) status.textContent = "Rifts enclosure loaded";
  }

  function animate() {
    resize();
    if (modelRoot) {
      const bob = Math.sin(performance.now() * 0.0012) * 3.2;
      modelRoot.position.y = modelBaseY + bob;
    }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  await loadModel();
  animate();
}

function formatVisitors(count) {
  if (count === 0) return "0";
  if (count < 1000) return String(count);
  if (count < 10000) return `${(count / 1000).toFixed(2)}k`;
  if (count < 1000000) return `${Math.round(count / 1000)}k`;
  return `${(count / 1000000).toFixed(1)}M`;
}

function getVisitorsFromSlider(value) {
  if (value === 0) return 0;
  const maxVisitors = 1000000;
  const midPoint = 50;
  const midVisitors = 10000;
  if (value <= midPoint) {
    const ratio = value / midPoint;
    return Math.round(Math.pow(ratio, 2.2) * midVisitors);
  }
  const ratio = (value - midPoint) / (100 - midPoint);
  return Math.round(midVisitors + Math.pow(ratio, 1.8) * (maxVisitors - midVisitors));
}

function getSliderFromVisitors(visitors) {
  if (visitors === 0) return 0;
  if (visitors >= 1000000) return 100;
  const midVisitors = 10000;
  if (visitors <= midVisitors) {
    return Math.pow(visitors / midVisitors, 1 / 2.2) * 50;
  }
  return 50 + Math.pow((visitors - midVisitors) / (1000000 - midVisitors), 1 / 1.8) * 50;
}

function validateForm(data) {
  const errors = {};
  if (!data.type) errors.type = "Site type is required.";
  if (!data.name) errors.name = "Name is required.";
  if (!data.costNow || Number(data.costNow) <= 0) errors.costNow = "Hosting cost must be positive.";
  if (!data.email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email address.";
  if (!data.websiteUrl) errors.websiteUrl = "Website URL is required.";
  else {
    try {
      new URL(data.websiteUrl.startsWith("http") ? data.websiteUrl : `https://${data.websiteUrl}`);
    } catch {
      errors.websiteUrl = "Invalid URL.";
    }
  }
  if (data.hasCurrentSpecs) {
    if (!data.currentSpecs.vCPU || Number(data.currentSpecs.vCPU) <= 0) errors.vCPU = "vCPU is required.";
    if (!data.currentSpecs.RAM || Number(data.currentSpecs.RAM) <= 0) errors.RAM = "RAM is required.";
    if (!data.currentSpecs.SSD || Number(data.currentSpecs.SSD) <= 0) errors.SSD = "SSD is required.";
  }
  return errors;
}

async function evaluateProbe(input) {
  const type = TYPE[input.type];
  const costNowNumber = Number(input.costNow) || 0;
  let probe = {};
  try {
    const response = await fetch(`/api/probe?url=${encodeURIComponent(input.websiteUrl)}`);
    if (response.ok) probe = await response.json();
  } catch {
    probe = {};
  }

  const t = probe.t ?? type.tDefault ?? 0.2;
  const c = probe.c ?? type.cache;
  const mMB = probe.mMB ?? type.mMB ?? 128;
  const pageK = probe.pageKB ?? type.pageKB;
  const peakRPS = (input.visitors / 30 / 3600) * 0.15;
  const uncachedRPS = peakRPS * (1 - c);
  const workers = Math.max(1, Math.ceil(uncachedRPS * t * 1.5));

  let vCPU = Math.ceil(workers / 5);
  let RAM = Math.ceil((workers * mMB) / 1024 + 0.5);
  let SSD = Math.ceil(10 + input.visitors / 6000);
  let XFER = Math.ceil((input.visitors * pageK) / 1.024e9 / Math.max(0.05, 1 - c));

  const specVCPU = Number(input.currentSpecs.vCPU) || 0;
  const specRAM = Number(input.currentSpecs.RAM) || 0;
  const specSSD = Number(input.currentSpecs.SSD) || 0;

  if (input.hasCurrentSpecs && specVCPU > 0 && specRAM > 0) {
    vCPU = Math.max(vCPU, Math.max(1, Math.round(specVCPU * 0.8)));
    RAM = Math.max(RAM, Math.max(1, Math.round(specRAM * 0.8)));
    if (specSSD > 0) SSD = Math.max(SSD, Math.round(specSSD * 0.8));
  }

  const candidates = PLANS.filter((plan) => (
    plan.vCPU >= vCPU
    && plan.RAM >= RAM
    && plan.SSD >= SSD
    && (plan.transfer >= XFER || plan.transfer === 0)
  ));
  const needsDedicated = workers >= 3 || uncachedRPS > 0.1;
  let planList = candidates.length ? candidates : PLANS;
  if (needsDedicated) {
    const dedicated = planList.filter((plan) => plan.cpuType === "dedicated");
    if (dedicated.length) planList = dedicated;
  }

  let plan;
  if (input.hasCurrentSpecs && specVCPU > 0 && specRAM > 0) {
    plan = planList.map((candidate) => {
      const cpuDiff = Math.abs(candidate.vCPU - specVCPU) / Math.max(candidate.vCPU, specVCPU);
      const ramDiff = Math.abs(candidate.RAM - specRAM) / Math.max(candidate.RAM, specRAM);
      const ssdDiff = specSSD > 0 ? Math.abs(candidate.SSD - specSSD) / Math.max(candidate.SSD, specSSD) : 0;
      const specsSimilarity = (cpuDiff + ramDiff + ssdDiff) / (specSSD > 0 ? 3 : 2);
      const priceFactor = candidate.price / 100;
      return { plan: candidate, score: specsSimilarity * 0.7 + priceFactor * 0.3 };
    }).sort((a, b) => a.score - b.score)[0]?.plan;
  } else {
    plan = [...planList].sort((a, b) => a.price - b.price)[0];
  }

  plan = plan ?? PLANS[PLANS.length - 1];
  const overpay = Math.max(0, costNowNumber - plan.price);
  const savings10yr = overpay * 12 * 10;
  return { vCPU, RAM, SSD, XFER, plan, overpay, savings10yr };
}

function orderedPlans(results) {
  const enhanced = [...PLANS];
  const cheapest = PLANS.reduce((min, plan) => (plan.price < min.price ? plan : min), PLANS[0]);
  const mark1 = {
    provider: "Rifts",
    name: "Mark 1",
    vCPU: 4,
    cpuType: "dedicated",
    RAM: 16,
    SSD: 200,
    transfer: 0,
    price: 0,
    isHardware: true,
  };
  enhanced.splice(enhanced.indexOf(cheapest) + 1, 0, mark1);

  const markIndex = enhanced.findIndex((plan) => plan.isHardware);
  const markPlan = enhanced.splice(markIndex, 1)[0];
  const recommendedIndex = enhanced.findIndex((plan) => (
    plan.provider === results.plan.provider && plan.name === results.plan.name
  ));
  if (recommendedIndex > -1) {
    enhanced.unshift(enhanced.splice(recommendedIndex, 1)[0]);
  }
  enhanced.splice(1, 0, markPlan);
  return enhanced;
}

function renderPlanCard(plan, results) {
  const recommended = !plan.isHardware && plan.provider === results.plan.provider && plan.name === results.plan.name;
  const price = plan.isHardware
    ? `$<span class="blurred-price">XXX</span><span class="price-suffix"> one time</span>`
    : `<span class="price-amount">$${plan.price}</span><span class="price-suffix">/mo</span>`;
  const transferLabel = plan.isHardware ? "Unlimited Transfer" : `${plan.transfer} TB Transfer`;
  const cpuTypeLabel = plan.cpuType.replace("PaaS", "PaaS");
  const tooltip = `
    <span class="cpu-info" tabindex="0" aria-label="CPU type explainer">
      <span class="cpu-info-mark" aria-hidden="true">i</span>
      <span class="cpu-tooltip" role="tooltip">
        <strong>Dedicated</strong> CPUs guarantee 100% of the core to your workload.
        <strong>Shared</strong> CPUs are split across other tenants and can throttle under load.
      </span>
    </span>`;
  return `
    <article class="plan-card ${recommended ? "is-recommended" : ""} ${plan.isHardware ? "is-hardware" : ""}">
      ${plan.isHardware ? `<span class="badge animate-badge">Own for Less</span>` : ""}
      ${recommended ? `<span class="badge badge-recommended">Recommended</span>` : ""}
      <div class="plan-provider">${plan.provider}</div>
      <h3>${plan.name}</h3>
      <div class="plan-price">${price}</div>
      <div class="plan-specs">
        <span class="cpu-spec">${plan.vCPU} vCPU (${cpuTypeLabel})${tooltip}</span>
        <span>${plan.RAM} GB RAM${plan.isHardware ? " (1-16GB range)" : ""}</span>
        <span>${plan.SSD} GB SSD</span>
        <span>${transferLabel}</span>
      </div>
      ${plan.notes ? `<p class="plan-note">${plan.notes}</p>` : ""}
    </article>
  `;
}

function initCalculator() {
  const form = document.querySelector("#hostingCalculator");
  if (!form) return;

  const siteType = document.querySelector("#siteType");
  const visitorsRange = document.querySelector("#visitorsRange");
  const visitorLabel = document.querySelector("#visitorLabel");
  const costNow = document.querySelector("#costNow");
  const costLabel = document.querySelector("#costLabel");
  const leadEmail = document.querySelector("#leadEmail");
  const gdprRow = document.querySelector("#gdprRow");
  const hasCurrentSpecs = document.querySelector("#hasCurrentSpecs");
  const specFields = document.querySelector("#specFields");
  const probeStatus = document.querySelector("#probeStatus");
  const analyzeButton = document.querySelector("#analyzeButton");

  SITE_TYPE_OPTIONS.forEach((option) => {
    const item = document.createElement("option");
    item.value = option.value;
    item.textContent = option.label;
    siteType.append(item);
  });

  function currentData() {
    return {
      type: siteType.value,
      visitors: getVisitorsFromSlider(Number(visitorsRange.value)),
      costNow: costNow.value,
      websiteUrl: document.querySelector("#websiteUrl").value.trim(),
      name: document.querySelector("#leadName").value.trim(),
      email: leadEmail.value.trim(),
      gdprConsent: document.querySelector("#gdprConsent").checked,
      hasCurrentSpecs: hasCurrentSpecs.checked,
      currentSpecs: {
        vCPU: document.querySelector("#currentVCPU").value,
        RAM: document.querySelector("#currentRAM").value,
        SSD: document.querySelector("#currentSSD").value,
      },
    };
  }

  function updateLabels() {
    visitorLabel.textContent = formatVisitors(getVisitorsFromSlider(Number(visitorsRange.value)));
    costLabel.textContent = `$${costNow.value || 0}/mo`;
    gdprRow.hidden = !leadEmail.value.trim();
    specFields.hidden = !hasCurrentSpecs.checked;
  }

  function showErrors(errors) {
    document.querySelectorAll("[data-error-for]").forEach((node) => {
      node.textContent = errors[node.dataset.errorFor] || "";
    });
  }

  function renderResults(data, results) {
    const resultsBox = document.querySelector("#results");
    const headline = document.querySelector("#resultHeadline");
    const specRows = document.querySelector("#specRows");
    const plansGrid = document.querySelector("#plansGrid");

    const planName = `${results.plan.provider} ${results.plan.name}`;
    headline.innerHTML = results.overpay > 0
      ? `<h2>You could save <strong>$${results.overpay.toFixed(0)}/mo</strong> by switching to <span class="result-pill">${planName}</span>.</h2><p>Estimated 10-year savings: <strong>$${results.savings10yr.toLocaleString()}</strong></p>`
      : `<h2>You're getting a great deal. Our recommended <span class="result-pill">${planName}</span> would cost <strong>$${results.plan.price}/mo</strong>.</h2>`;

    headline.insertAdjacentHTML("beforeend", `
      <div class="hardware-save">
        <h3>Save more by owning your hardware</h3>
        <a class="primary-action" href="https://calendly.com/christopher-_-ryan/cut-your-hosting-costs-strategy-call" target="_blank" rel="noopener noreferrer">Book a Consultation</a>
      </div>
    `);

    specRows.innerHTML = `
      <tr><td>vCPU</td><td>${results.vCPU}</td><td>${data.hasCurrentSpecs && data.currentSpecs.vCPU ? data.currentSpecs.vCPU : "unknown"}</td></tr>
      <tr><td>RAM</td><td>${results.RAM} GB</td><td>${data.hasCurrentSpecs && data.currentSpecs.RAM ? `${data.currentSpecs.RAM} GB` : "unknown"}</td></tr>
      <tr><td>SSD</td><td>${results.SSD} GB</td><td>${data.hasCurrentSpecs && data.currentSpecs.SSD ? `${data.currentSpecs.SSD} GB` : "unknown"}</td></tr>
      <tr><td>Transfer</td><td>${results.XFER} TB/mo</td><td>unknown</td></tr>
      <tr><td>Cost</td><td><strong>$${results.plan.price}</strong></td><td>$${Number(data.costNow) || 0}</td></tr>
    `;

    const allPlans = orderedPlans(results);
    const PAGE_SIZE = 6;
    const pagination = document.querySelector("#plansPagination");
    const totalPages = Math.max(1, Math.ceil(allPlans.length / PAGE_SIZE));
    let currentPage = 0;

    function renderPlanPage() {
      const start = currentPage * PAGE_SIZE;
      const slice = allPlans.slice(start, start + PAGE_SIZE);
      plansGrid.innerHTML = slice.map((plan) => renderPlanCard(plan, results)).join("");
      if (pagination) {
        const info = pagination.querySelector("[data-page-info]");
        const prev = pagination.querySelector("[data-page-prev]");
        const next = pagination.querySelector("[data-page-next]");
        if (info) info.textContent = `${currentPage + 1} / ${totalPages}`;
        if (prev) prev.disabled = currentPage === 0;
        if (next) next.disabled = currentPage >= totalPages - 1;
        pagination.hidden = totalPages <= 1;
      }
    }

    if (pagination) {
      const prev = pagination.querySelector("[data-page-prev]");
      const next = pagination.querySelector("[data-page-next]");
      if (prev) prev.onclick = () => { if (currentPage > 0) { currentPage--; renderPlanPage(); } };
      if (next) next.onclick = () => { if (currentPage < totalPages - 1) { currentPage++; renderPlanPage(); } };
    }

    renderPlanPage();

    resultsBox.hidden = false;
    resultsBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  [visitorsRange, costNow, leadEmail, hasCurrentSpecs].forEach((node) => {
    node.addEventListener("input", updateLabels);
    node.addEventListener("change", updateLabels);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = currentData();
    const errors = validateForm(data);
    showErrors(errors);
    if (Object.keys(errors).length) return;

    probeStatus.hidden = false;
    analyzeButton.disabled = true;
    try {
      await fetch("/api/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // The calculator should still work if local submission storage is unavailable.
    }
    const results = await evaluateProbe(data);
    renderResults(data, results);
    probeStatus.hidden = true;
    analyzeButton.disabled = false;
  });

  visitorsRange.value = String(Math.round(getSliderFromVisitors(10000)));
  updateLabels();
}

function initContact() {
  const form = document.querySelector("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#contactEmail").value.trim();
    const message = document.querySelector("#contactMessage").value.trim();
    const status = document.querySelector("#contactStatus");
    if (!email || !message) {
      status.textContent = "Add your email and message first.";
      return;
    }
    status.innerHTML = `Message ready. Email <a href="mailto:hello@rifts.cloud">hello@rifts.cloud</a> or book a call for the fastest reply.`;
  });
}

initNavigation();
initFaq();
initCalculator();
initContact();
initModel().catch((error) => {
  console.error(error);
  const status = document.querySelector("#modelStatus");
  if (status) status.textContent = "3D model failed to load";
});
