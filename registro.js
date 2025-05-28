let user = { email: "", password: "" };
let votos = [];

let candidatos = [
  { nombre: "Luis Arce", imagen: "img/arce.jpg" },
  { nombre: "Evo Morales", imagen: "img/evo.jpg" },
  { nombre: "Carlos Mesa", imagen: "img/mesa.png" },
  { nombre: "Fernando Camacho", imagen: "img/camacho.jpg" },
  { nombre: "Andrónico Rodríguez", imagen: "img/andronico.jpg" },
  { nombre: "Samuel Doria Medina", imagen: "img/samuel.jpg" },
  { nombre: "Manfred Reyes Villa", imagen: "img/manfred.jpg" },
  { nombre: "Jorge Quiroga", imagen: "img/tuto.jpg" },
  { nombre: "Chi Hyun Chung", imagen: "img/chi.png" },
  { nombre: "Waldo Albarracín", imagen: "img/waldo.jpg" }
];

// Mostrar candidatos
const candidatosDiv = document.getElementById("candidatos");
candidatos.forEach((c, i) => {
  const div = document.createElement("div");
  div.classList = "col";
  div.innerHTML = `
    <div class="candidato-card">
      <input type="radio" name="candidato" class="form-check-input" value="${i}" required />
      <img src="${c.imagen}" alt="${c.nombre}" />
      <label>${c.nombre}</label>
    </div>`;
  candidatosDiv.appendChild(div);
});

// Validación de contraseña segura
function esContrasenaSegura(pass) {
  return /[A-Z]/.test(pass) && /[0-9]/.test(pass);
}

// Registro
document.getElementById("formRegistro").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("correoRegistro").value;
  const pass = document.getElementById("passRegistro").value;

  if (!esContrasenaSegura(pass)) {
    alert("❌ La contraseña debe tener al menos una mayúscula y un número.");
    return;
  }

  user.email = email;
  user.password = pass;

  document.getElementById("registro").classList.add("d-none");
  document.getElementById("login").classList.remove("d-none");
});

// Login
document.getElementById("formLogin").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("correoLogin").value;
  const pass = document.getElementById("passLogin").value;

  if (email === user.email && pass === user.password) {
    document.getElementById("login").classList.add("d-none");
    document.getElementById("votacion").classList.remove("d-none");
  } else {
    alert("❌ Correo o contraseña incorrectos.");
  }
});

// Votación
document.getElementById("formVoto").addEventListener("submit", e => {
  e.preventDefault();
  const seleccionado = document.querySelector('input[name="candidato"]:checked');
  if (seleccionado) {
    const index = parseInt(seleccionado.value);
    votos.push(index);
    actualizarResultados();
    alert("✅ Voto registrado");
    e.target.reset();
  }
});

// Mostrar resultados
function actualizarResultados() {
  const resultados = new Array(candidatos.length).fill(0);
  votos.forEach(v => resultados[v]++);

  const stats = document.getElementById("estadisticas");
  stats.innerHTML = "";
  candidatos.forEach((c, i) => {
    const li = document.createElement("li");
    li.classList = "list-group-item";
    li.textContent = `${c.nombre}: ${resultados[i]} voto(s)`;
    stats.appendChild(li);
  });
}
