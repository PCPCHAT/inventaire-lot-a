# Recréer le fichier script.js après reset de l'environnement

script_js = '''function generateInventory() {
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
        const inputId = `${sac}-${poche}-${idx}`.replace(/[^a-zA-Z0-9_-]/g, "_");
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
  let missingBySac = {};

  for (let sac in inventory) {
    const poches = inventory[sac];

    for (let poche in poches) {
      poches[poche].forEach((item, idx) => {
        const inputId = `${sac}-${poche}-${idx}`.replace(/[^a-zA-Z0-9_-]/g, "_");
        const value = parseInt(document.getElementById(inputId).value);

        if (isNaN(value) || value < item.expected) {
          if (!missingBySac[sac]) missingBySac[sac] = {};
          if (!missingBySac[sac][poche]) missingBySac[sac][poche] = [];
          const missingQty = item.expected - (value || 0);
          missingBySac[sac][poche].push(`${item.name} (${value || 0}/${item.expected}) — manquant : ${missingQty}`);
        }
      });
    }
  }

  const result = document.getElementById('result');
  if (Object.keys(missingBySac).length === 0) {
    result.innerHTML = "✅ Tout est présent.";
    return;
  }

  let html = "<strong>❌ Matériel manquant :</strong><br><br>";
  for (let sac in missingBySac) {
    html += `<strong>🟧 ${sac}</strong><br>`;
    for (let poche in missingBySac[sac]) {
      html += `&nbsp;&nbsp;<u>▸ ${poche}</u><ul>`;
      missingBySac[sac][poche].forEach(itemLine => {
        html += `<li>${itemLine}</li>`;
      });
      html += `</ul>`;
    }
  }

  result.innerHTML = html;
}

generateInventory();'''

script_path = "/mnt/data/script.js"
with open(script_path, "w") as f:
    f.write(script_js)

script_path
