const models={
 'GPT-5':{input:1.25,output:10,cached:.125},'GPT-5 mini':{input:.25,output:2,cached:.025},'GPT-5 nano':{input:.05,output:.4,cached:.005},
 'GPT-4.1':{input:2,output:8,cached:.5},'GPT-4.1 mini':{input:.4,output:1.6,cached:.1},'GPT-4.1 nano':{input:.1,output:.4,cached:.025},
 'GPT-4o':{input:2.5,output:10,cached:1.25},'GPT-4o mini':{input:.15,output:.6,cached:.075}
};
const $=id=>document.getElementById(id), model=$('model');
Object.keys(models).forEach(name=>model.add(new Option(name,name)));
const euro=n=>n.toLocaleString('es-ES',{minimumFractionDigits:6,maximumFractionDigits:6})+' $';
// Heurística útil para simulaciones: caracteres no ASCII suelen requerir algo más de tokens.
function estimate(text){if(!text)return 0;const words=text.trim().split(/\s+/).filter(Boolean).length;const chars=[...text].length;const nonAscii=[...text].filter(c=>c.charCodeAt(0)>127).length;return Math.max(1,Math.ceil(words*1.25+chars/18+nonAscii/10));}
function markCost(element,value){element.classList.remove('cost-low','cost-high');if(value>0.000001)element.classList.add('cost-high');else if(value<0.0000001)element.classList.add('cost-low')}
function calculate(){const p=$('prompt').value,c=$('completion').value,m=models[model.value],it=estimate(p),ot=estimate(c),ip=$('cached').checked?m.cached:m.input,ic=it*ip/1e6,oc=ot*m.output/1e6;$('promptChars').textContent=`${p.length} caracteres`;$('completionChars').textContent=`${c.length} caracteres`;$('inputTokens').textContent=it.toLocaleString('es-ES');$('outputTokens').textContent=ot.toLocaleString('es-ES');$('inputCost').textContent=euro(ic);$('outputCost').textContent=euro(oc);$('totalCost').textContent=euro(ic+oc);markCost($('inputCost'),ic);markCost($('outputCost'),oc);markCost($('totalCost'),ic+oc);$('pricing').textContent=`Entrada $${ip}/1M · Salida $${m.output}/1M`;$('formula').textContent=`Coste de entrada: ${it.toLocaleString('es-ES')} × $${ip} / 1.000.000. Coste de salida: ${ot.toLocaleString('es-ES')} × $${m.output} / 1.000.000.`}
document.querySelectorAll('textarea,input,select').forEach(el=>el.addEventListener('input',calculate));calculate();
