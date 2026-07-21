(()=>{
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const sel=$('#motifSelect'),scale=$('#motifScale'),ypos=$('#motifY'),mirrorBtn=$('#mirrorMotif'),svg=$('#motifPreview');
let mirror=false;
const M={
none:[],
deer:[[[8,74],[18,55],[31,46],[46,44],[58,49],[68,46],[76,34],[83,24],[88,31],[94,18],[98,29],[94,39],[88,47],[91,55],[84,61],[75,60],[68,72],[52,77],[34,78],[20,82]],[[76,34],[70,24],[66,14],[72,20],[76,10],[79,23],[84,13],[83,28]],[[29,76],[27,95],[34,95],[38,76]],[[61,76],[62,95],[69,95],[70,71]]],
fish:[[[5,50],[17,35],[34,26],[58,25],[78,34],[93,49],[78,65],[57,75],[33,72],[18,64]],[[5,50],[0,30],[0,70]],[[60,27],[70,12],[76,29]],[[60,73],[70,88],[76,70]],[[78,41],[83,44],[80,49]],[[28,36],[36,50],[27,64]]],
excavator:[[[7,72],[76,72],[92,86],[14,86]],[[26,68],[26,40],[59,40],[59,68]],[[32,40],[39,20],[56,20],[64,40]],[[58,23],[76,8],[83,13],[70,26]],[[79,12],[96,24],[91,34],[74,26]]],
mountains:[[[0,72],[16,54],[26,62],[42,37],[55,53],[72,27],[100,70]],[[12,72],[18,45],[24,72]],[[73,72],[80,40],[87,72]]],
flame:[[[48,4],[57,25],[51,40],[64,29],[77,48],[74,70],[61,88],[37,96],[17,84],[7,64],[13,43],[29,28],[29,48],[39,56],[36,34]]],
gear:[[[50,0],[58,8],[70,5],[75,17],[88,18],[89,31],[100,38],[94,50],[100,62],[89,69],[88,82],[75,83],[70,95],[58,92],[50,100],[42,92],[30,95],[25,83],[12,82],[11,69],[0,62],[6,50],[0,38],[11,31],[12,18],[25,17],[30,5],[42,8]],[[50,30],[64,36],[70,50],[64,64],[50,70],[36,64],[30,50],[36,36]]]
};
function dims(){return {W:+$('#width').value||600,H:+$('#height').value||400}}
function polys(){const {W,H}=dims(), k=(+scale.value||62)/100*Math.min(W,H)*.95/100, top=H*(+ypos.value||18)/100;return (M[sel.value]||[]).map(p=>p.map(([x,y])=>[W/2+(mirror?-(x-50):(x-50))*k,top+y*k]))}
function draw(){const {W,H}=dims();svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML='';polys().forEach((p,i)=>{const e=document.createElementNS('http://www.w3.org/2000/svg','polygon');e.setAttribute('points',p.map(q=>q.join(',')).join(' '));e.setAttribute('class',i?'motif-cutout':'motif-shape');svg.appendChild(e)})}
[sel,scale,ypos,$('#width'),$('#height')].forEach(e=>e&&e.addEventListener('input',draw));mirrorBtn.addEventListener('click',()=>{mirror=!mirror;mirrorBtn.classList.toggle('active',mirror);draw()});
function pair(c,v){return `${c}\n${v}\n`}
function pline(H,p){let s=pair(0,'LWPOLYLINE')+pair(8,'CUT')+pair(90,p.length)+pair(70,1);p.forEach(([x,y])=>s+=pair(10,x.toFixed(3))+pair(20,(H-y).toFixed(3)));return s}
function dxf(){const {W,H}=dims();let e='';polys().forEach(p=>e+=pline(H,p));return pair(0,'SECTION')+pair(2,'HEADER')+pair(9,'$ACADVER')+pair(1,'AC1015')+pair(9,'$INSUNITS')+pair(70,4)+pair(0,'ENDSEC')+pair(0,'SECTION')+pair(2,'ENTITIES')+e+pair(0,'ENDSEC')+pair(0,'EOF')}
function save(name,data,type){const b=new Blob([data],{type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),800)}
const ex=$('#exportDxf');ex.addEventListener('click',e=>{if(sel.value==='none')return;e.preventDefault();e.stopImmediatePropagation();save(`torchdraft-${sel.value}.dxf`,dxf(),'application/dxf')},true);
$('#saveProject').addEventListener('click',()=>{localStorage.setItem('torchdraft-v6',JSON.stringify({motif:sel.value,scale:scale.value,y:ypos.value,mirror}));});
$('#loadProject').addEventListener('click',()=>{const d=JSON.parse(localStorage.getItem('torchdraft-v6')||'null');if(!d)return;sel.value=d.motif;scale.value=d.scale;ypos.value=d.y;mirror=!!d.mirror;mirrorBtn.classList.toggle('active',mirror);draw()});
draw();
})();
