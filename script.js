function generateInventory() {
  const container = document.getElementById('content');
  for (let sectionName in inventory) {
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.textContent = sectionName;
    section.appendChild(h2);

    inventory[sectionName].forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = "item";
      div.innerHTML = `
        <span>${item.name} (attendu : ${item.expected})</span>
        <input type="number" min="0" id="${sectionName}-${idx}" />
      `;
      section.appendChild(div);
    });

    container.appendChild(section);
  }
}

function checkInventory() {
  let missing = [];
  let i = 0;
  for (let sectionName in inventory) {
    inventory[sectionName].forEach((item, idx) => {
      const value = parseInt(document.getElementById(`${sectionName}-${idx}`).value);
      if (isNaN(value) || value < item.expected) {
        missing.push(`${item.name} (${value || 0}/${item.expected})`);
      }
    });
  }

  const result = document.getElementById('result');
  result.innerHTML = missing.length === 0
    ? "✅ Tout est présent."
    : `<strong>❌ Manquant :</strong><ul>${missing.map(m => `<li>${m}</li>`).join('')}</ul>`;
}

generateInventory();
