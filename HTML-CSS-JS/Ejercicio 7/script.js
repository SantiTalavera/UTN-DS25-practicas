/* ========== JavaScript puro (Ej 1–5, 11–14) ========== */

// 1. Sumar 5
function ej1() {
  const v = Number(document.getElementById('e1-input').value);
  document.getElementById('e1-out').textContent = v + 5;
}
document.getElementById('e1-btn').addEventListener('click', ej1);

// 2. Concatenar cadenas
function ej2() {
  const a = document.getElementById('e2-a').value;
  const b = document.getElementById('e2-b').value;
  document.getElementById('e2-out').textContent = `${a} ${b}`;
}
document.getElementById('e2-btn').addEventListener('click', ej2);

// 3. Comparar dos números
function ej3() {
  const a = Number(document.getElementById('e3-a').value);
  const b = Number(document.getElementById('e3-b').value);
  let msg;
  if (a === b) msg = 'Son iguales';
  else if (a > b) msg = `${a} es mayor que ${b}`;
  else msg = `${a} es menor que ${b}`;
  document.getElementById('e3-out').textContent = msg;
}
document.getElementById('e3-btn').addEventListener('click', ej3);

// 4. Grupo según 1–10 (prompt + switch)
document.getElementById('e4-btn').addEventListener('click', () => {
  const n = Number(prompt('Ingresa un número 1–10'));
  let msg;
  switch (true) {
    case n >=1 && n<=3: msg = 'Grupo 1'; break;
    case n>=4 && n<=6:  msg = 'Grupo 2'; break;
    case n>=7 && n<=10: msg = 'Grupo 3'; break;
    default:            msg = 'Fuera de rango';
  }
  document.getElementById('e4-out').textContent = msg;
});

// 5. Sumatoria 0–10
document.getElementById('e5-btn').addEventListener('click', () => {
  let s=0; for(let i=0;i<=10;i++) s+=i;
  document.getElementById('e5-out').textContent = s;
});

// 11. Descuento según monto y método
function ej11() {
  const m = Number(document.getElementById('e11-monto').value);
  const medio = document.getElementById('e11-metodo').value;
  let final = m;
  if (m >=200 && m<=400) {
    if (medio==='E') final = m * 0.7;
    else if (medio==='D') final = m * 0.8;
    else if (medio==='C') final = m * 0.9;
  } else if (m>400) {
    final = m * 0.6;
  }
  document.getElementById('e11-out').textContent =
    `Total a pagar: $${final.toFixed(2)}`;
}
document.getElementById('e11-btn').addEventListener('click', ej11);

// 12. Medio-árbol (función)
function dibujarArbol(n, selector) {
  const cont = document.querySelector(selector);
  cont.innerHTML = '';
  let line = '';
  for(let i=1;i<=n;i++){
    line += '* ';
    cont.innerHTML += `<p>${line}</p>`;
  }
}
document.getElementById('e12-btn').addEventListener('click', () => {
  const h = Number(document.getElementById('e12-altura').value);
  if (h>0) dibujarArbol(h,'#e12-out');
});

// 13. Día de la semana
function ej13() {
  const d = Number(document.getElementById('e13-dia').value);
  let dias = ['lunes','martes','miércoles','jueves','viernes'];
  let msg = (d>=1 && d<=5)
    ? dias[d-1]
    : (d===6||d===7) ? 'Fin de semana'
    : 'Valor inválido';
  document.getElementById('e13-out').textContent = msg;
}
document.getElementById('e13-btn').addEventListener('click', ej13);

// 14. Promedio via prompt
document.getElementById('e14-btn').addEventListener('click', () => {
  const entrada = prompt('Ingresa números separados por comas');
  const nums = entrada.split(',').map(s=>Number(s.trim())).filter(n=>!isNaN(n));
  const prom = nums.reduce((a,b)=>a+b,0)/nums.length;
  document.getElementById('e14-out').textContent = `Promedio: ${prom.toFixed(2)}`;
});

/* ========== jQuery (Ej 6–10, 15–17) ========== */
$(function(){
  // 6. Producto de array [1…10]
  $('#e6-btn').click(()=>{
    const arr = [1,2,3,4,5,6,7,8,9,10];
    const prod = arr.reduce((p,v)=>p*v,1);
    $('#e6-out').text(`Producto: ${prod}`);
  });

  // 7. producto(a,b)
  $('#e7-btn').click(()=>{
    const a=Number($('#e7-a').val()), b=Number($('#e7-b').val());
    $('#e7-out').text(`Producto: ${a*b}`);
  });

  // 8. concatena
  $('#e8-btn').click(()=>{
    $('#e8-out').text(`Concat: ${$('#e8-a').val()} ${$('#e8-b').val()}`);
  });

  // 9. mayor de dos
  $('#e9-btn').click(()=>{
    const x=Number($('#e9-a').val()), y=Number($('#e9-b').val());
    let msg = x===y ? 'Iguales' : x>y ? `${x} > ${y}` : `${y} > ${x}`;
    $('#e9-out').text(msg);
  });

  // 10. medio-árbol
  $('#e10-btn').click(()=>{
    const n=Number($('#e10-input').val());
    $('#e10-out').empty();
    for(let i=1,line='';i<=n;i++){
      line += '* ';
      $('#e10-out').append(`<p>${line}</p>`);
    }
  });

  // 15. prompt + árbol
  $('#e15-btn').click(()=>{
    const h=Number(prompt('Altura del árbol'));
    if(h>0) dibujarArbol(h,'#e15-out');
  });

  // 16. portero eléctrico via prompt
  $('#e16-btn').click(()=>{
    const piso = prompt('Piso (00–48)').padStart(2,'0');
    const dept = prompt('Depto (1–6)');
    let msg;
    if(!/^(0\d|[1-4]\d)$/.test(piso) || Number(piso)>48 || Number(dept)<1 || Number(dept)>6) {
      msg = 'Piso/depto inválido';
    } else {
      msg = `Llamando a piso ${piso}, depto ${dept}`;
    }
    $('#e16-out').text(msg);
  });

  // 17. teclado en pantalla
  const filas = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['0','Backspace']
  ];
  // crear botones
  filas.forEach(fila=>{
    const $div = $('<div/>').css({margin:'0.2em'});
    fila.forEach(tecla=>{
      $('<button/>')
        .text(tecla)
        .css({width:'3em',margin:'0.1em'})
        .on('click',()=>{
          let val = $('#e17-display').text();
          if(tecla==='Backspace') {
            $('#e17-display').text(val.slice(0,-1));
          } else {
            $('#e17-display').text(val + tecla);
          }
        })
        .appendTo($div);
    });
    $('#e17-keyboard').append($div);
  });
  // limpiar display
  $('#e17-clear').click(()=>{
    $('#e17-display').text('');
  });
});
