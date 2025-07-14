function generateInventory() {
  const container = document.getElementById('content');
  container.innerHTML = "";

  for (let sac in inventory) {
    const sacDiv = document.createElement('div');
    const h1 = document.createElement('h2');
    h1.textContent = sac;
    sacDiv.appendChild(h1);

    const poches = inventory[sac];
    for (let poche in poches) {
      const section = document.createElement('section');
      const h2 = document.createElement('h3');
      h2.textContent = poche;
      section.appendChild(h2);

      poches[poche].forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = "item";
        const inputId = `${sac}-${poche}-${idx}`;
        div.innerHTML = `
          <span>${item.name} (attendu : ${item.expected})</span>
          <input type="number" min="0" id="${inputId}" />
        `;
        section.appendChild(div);
      });

      sacDiv.appendChild(section);
    }

    container.appendChild(sacDiv);
  }
}

function checkInventory() {
  let missing = [];
  for (let sac in inventory) {
    const poches = inventory[sac];
    for (let poche in poches) {
      poches[poche].forEach((item, idx) => {
        const inputId = `${sac}-${poche}-${idx}`;
        const value = parseInt(document.getElementById(inputId).value);
        if (isNaN(value) || value < item.expected) {
          missing.push(`${sac} > ${poche} > ${item.name} (${value || 0}/${item.expected})`);
        }
      });
    }
  }

  const result = document.getElementById('result');
  result.innerHTML = missing.length === 0
    ? "✅ Tout est présent."
    : `<strong>❌ Manquant :</strong><ul>${missing.map(m => `<li>${m}</li>`).join('')}</ul>`;
}

generateInventory();

