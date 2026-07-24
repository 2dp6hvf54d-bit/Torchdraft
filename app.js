const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const line1=$("#line1"),line2=$("#line2"),fontSelect=$("#fontSelect"),fontSize=$("#fontSize"),letterSpace=$("#letterSpace");
const width=$("#width"),height=$("#height"),material=$("#material"),price=$("#price"),rotation=$("#rotation"),rotationRange=$("#rotationRange"),bottomDistance=$("#bottomDistance");
const frameMode=$("#frameMode"),frameThickness=$("#frameThickness"),mountHole=$("#mountHole"),toggleHoles=$("#toggleHoles");
const motifSelect=$("#motifSelect"),motifScale=$("#motifScale"),motifY=$("#motifY"),mirrorMotif=$("#mirrorMotif"),motifPreview=$("#motifPreview");
const previewLine1=$("#previewLine1"),previewLine2=$("#previewLine2"),previewText=$(".preview-text"),previewImage=$("#previewImage"),toast=$("#toast");
const manufacturingStatus=$("#manufacturingStatus"),manufacturingText=$("#manufacturingText"),designMetrics=$("#designMetrics");
let basePrice=799,selectedColor="#cfd4d7",holesEnabled=true,mirror=false;

const GLYPHS={
"0":["01110","10001","10011","10101","11001","10001","01110"],"1":["00100","01100","00100","00100","00100","00100","01110"],"2":["01110","10001","00001","00010","00100","01000","11111"],"3":["11110","00001","00001","01110","00001","00001","11110"],"4":["00010","00110","01010","10010","11111","00010","00010"],"5":["11111","10000","10000","11110","00001","00001","11110"],"6":["01110","10000","10000","11110","10001","10001","01110"],"7":["11111","00001","00010","00100","01000","01000","01000"],"8":["01110","10001","10001","01110","10001","10001","01110"],"9":["01110","10001","10001","01111","00001","00001","01110"],
"A":["01110","10001","10001","11111","10001","10001","10001"],"B":["11110","10001","10001","11110","10001","10001","11110"],"C":["01111","10000","10000","10000","10000","10000","01111"],"D":["11110","10001","10001","10001","10001","10001","11110"],"E":["11111","10000","10000","11110","10000","10000","11111"],"F":["11111","10000","10000","11110","10000","10000","10000"],"G":["01111","10000","10000","10111","10001","10001","01111"],"H":["10001","10001","10001","11111","10001","10001","10001"],"I":["11111","00100","00100","00100","00100","00100","11111"],"J":["00111","00010","00010","00010","10010","10010","01100"],"K":["10001","10010","10100","11000","10100","10010","10001"],"L":["10000","10000","10000","10000","10000","10000","11111"],"M":["10001","11011","10101","10101","10001","10001","10001"],"N":["10001","11001","10101","10011","10001","10001","10001"],"O":["01110","10001","10001","10001","10001","10001","01110"],"P":["11110","10001","10001","11110","10000","10000","10000"],"Q":["01110","10001","10001","10001","10101","10010","01101"],"R":["11110","10001","10001","11110","10100","10010","10001"],"S":["01111","10000","10000","01110","00001","00001","11110"],"T":["11111","00100","00100","00100","00100","00100","00100"],"U":["10001","10001","10001","10001","10001","10001","01110"],"V":["10001","10001","10001","10001","10001","01010","00100"],"W":["10001","10001","10001","10101","10101","11011","10001"],"X":["10001","10001","01010","00100","01010","10001","10001"],"Y":["10001","10001","01010","00100","00100","00100","00100"],"Z":["11111","00001","00010","00100","01000","10000","11111"]," ":["00000","00000","00000","00000","00000","00000","00000"],"-":["00000","00000","00000","11111","00000","00000","00000"],".":["00000","00000","00000","00000","00000","00110","00110"]};

const MOTIFS={
none:[],
deer:[[[6,72],[15,52],[29,42],[47,42],[60,48],[70,42],[77,30],[84,18],[89,28],[95,14],[99,27],[94,39],[87,47],[91,55],[83,62],[72,59],[65,72],[51,78],[31,78],[17,84]],[[76,31],[70,20],[67,8],[73,16],[77,5],[80,19],[86,8],[84,26]],[[28,75],[26,98],[34,98],[38,75]],[[61,74],[62,98],[70,98],[70,70]]],
moose:[[[8,68],[20,48],[39,42],[60,45],[72,55],[82,51],[89,40],[95,44],[92,60],[82,66],[68,63],[58,77],[34,79],[18,84]],[[82,50],[77,35],[69,28],[74,22],[83,31],[87,18],[93,24],[89,39]],[[26,77],[25,98],[33,98],[37,77]],[[58,75],[60,98],[68,98],[68,72]]],
fish:[[[4,50],[16,34],[34,25],[59,25],[79,34],[95,50],[79,66],[58,75],[33,73],[17,64]],[[5,50],[0,28],[0,72]],[[60,26],[69,10],[77,28]],[[60,74],[69,90],[77,71]],[[77,41],[84,44],[80,50]],[[28,36],[36,50],[27,64]]],
excavator:[[[5,72],[76,72],[94,87],[12,87]],[[25,68],[25,39],[58,39],[58,68]],[[31,39],[39,18],[56,18],[65,39]],[[57,22],[76,6],[84,12],[70,27]],[[80,11],[98,24],[92,36],[74,27]]],
mountains:[[[0,72],[15,53],[26,62],[42,36],[55,53],[72,26],[100,71]],[[12,72],[18,44],[24,72]],[[18,44],[11,58],[18,52],[25,60],[18,44]],[[73,72],[80,39],[87,72]],[[80,39],[72,56],[80,49],[89,59],[80,39]]],
flame:[[[48,3],[57,24],[51,40],[64,28],[78,49],[74,71],[61,89],[37,97],[17,85],[6,64],[13,42],[29,27],[29,49],[39,57],[36,34]]],
gear:[[[50,0],[58,8],[70,5],[75,17],[88,18],[89,31],[100,38],[94,50],[100,62],[89,69],[88,82],[75,83],[70,95],[58,92],[50,100],[42,92],[30,95],[25,83],[12,82],[11,69],[0,62],[6,50],[0,38],[11,31],[12,18],[25,17],[30,5],[42,8]],[[50,30],[64,36],[70,50],[64,64],[50,70],[36,64],[30,50],[36,36]]],
paw:[[[25,47],[18,64],[25,82],[50,91],[75,82],[82,64],[75,47],[62,40],[50,50],[38,40]],[[13,18],[7,31],[13,42],[25,37],[27,24]],[[37,9],[31,23],[38,36],[50,32],[51,17]],[[63,9],[52,18],[53,33],[65,38],[73,25]],[[87,18],[74,26],[75,40],[88,43],[95,31]]],
eagle:[[[5,54],[20,34],[37,24],[50,38],[63,24],[80,34],[95,54],[75,48],[60,61],[50,84],[40,61],[25,48]],[[37,24],[31,8],[43,20]],[[63,24],[69,8],[57,20]]]
};

function transformMotif(){
 const polys=MOTIFS[motifSelect.value]||[],W=+width.value||600,H=+height.value||400,k=(+motifScale.value||58)/100*Math.min(W,H)/100,top=H*(+motifY.value||12)/100;
 return polys.map(poly=>poly.map(([x,y])=>[W/2+(mirror?-(x-50):(x-50))*k,top+y*k]));
}
function updateMotifPreview(){const W=+width.value||600,H=+height.value||400;motifPreview.setAttribute("viewBox",`0 0 ${W} ${H}`);motifPreview.innerHTML="";transformMotif().forEach(p=>{const e=document.createElementNS("http://www.w3.org/2000/svg","polygon");e.setAttribute("points",p.map(q=>q.join(",")).join(" "));motifPreview.appendChild(e)})}
function updatePreview(){previewLine1.textContent=(line1.value||"DIN TEXT").toUpperCase();previewLine2.textContent=(line2.value||"").toUpperCase();previewText.className="preview-text "+fontSelect.value;previewLine1.style.fontSize=Math.max(20,Math.min(46,+fontSize.value/3.8))+"px";previewLine1.style.letterSpacing=(+letterSpace.value)+"px";previewText.style.bottom=Math.max(8,Math.min(85,+bottomDistance.value/2))+"px";previewText.style.transform=`translateX(-50%) rotate(${+rotation.value}deg)`;previewText.style.color=selectedColor;updateMotifPreview();calculatePrice();validate()}
function calculatePrice(){const area=(+width.value||600)*(+height.value||400)/240000,extra=material.value.includes("3 mm")?100:material.value.includes("Corten")?180:material.value.includes("Rostfritt")?260:0,motif=motifSelect.value==="none"?0:120;price.textContent=Math.round(basePrice*area+extra+motif)+" kr"}
[line1,line2,fontSelect,fontSize,letterSpace,width,height,material,rotation,bottomDistance,frameMode,frameThickness,mountHole,motifSelect,motifScale,motifY].forEach(el=>el&&el.addEventListener("input",updatePreview));
rotationRange.addEventListener("input",()=>{rotation.value=rotationRange.value;updatePreview()});rotation.addEventListener("input",()=>{rotationRange.value=rotation.value;updatePreview()});
toggleHoles.addEventListener("click",()=>{holesEnabled=!holesEnabled;toggleHoles.classList.toggle("on",holesEnabled);toggleHoles.textContent=holesEnabled?"4 hål":"Inga hål";updatePreview()});toggleHoles.classList.add("on");
mirrorMotif.addEventListener("click",()=>{mirror=!mirror;mirrorMotif.classList.toggle("active",mirror);updatePreview()});
$$(".swatches button").forEach(b=>b.addEventListener("click",()=>{$$(".swatches button").forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedColor=b.dataset.color;updatePreview()}));
$$(".product-card").forEach(card=>card.addEventListener("click",()=>{basePrice=+card.dataset.price;previewImage.src=card.dataset.image;$(".studio-title h2").textContent="DESIGN STUDIO – "+card.dataset.product.toUpperCase();document.querySelector("#studio").scrollIntoView({behavior:"smooth"});calculatePrice()}));
const thumbs=["studio-hjortfamilj.jpg","prod-alg.jpg","prod-gadda.jpg","prod-ram.jpg","prod-orn.jpg"];$$(".thumbs button").forEach((b,i)=>b.addEventListener("click",()=>{$$(".thumbs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");previewImage.src=thumbs[i]}));
$("#addCart").addEventListener("click",()=>showToast(`${line1.value||"Design"} tillagd i kundvagnen`));$("#addText").addEventListener("click",()=>line2.focus());$$(".category-card").forEach(c=>c.addEventListener("click",()=>showToast(c.dataset.category+" öppnas i nästa katalogsteg")));$("#menuButton").addEventListener("click",()=>document.body.classList.toggle("menu-open"));

function addTextRects(out,text,cx,y,size,space){text=text.replace(/[^A-Z0-9 .-]/g," ");const cw=size*.58,ch=size/7,gap=Math.max(2,space),total=text.length*cw+(text.length-1)*gap,scale=Math.min(1,(+width.value-50)/Math.max(total,1));let ox=cx-total*scale/2;for(const c of text){const glyph=GLYPHS[c]||GLYPHS[" "];for(let r=0;r<7;r++)for(let col=0;col<5;col++)if(glyph[r][col]==="1"){const cellW=cw/5*scale,cellH=ch*scale,inset=Math.min(cellW,cellH)*.12;out.push({x:ox+col*cellW+inset,y:y+r*cellH+inset,w:cellW-2*inset,h:cellH-2*inset})}ox+=(cw+gap)*scale}}
function geometry(){const W=+width.value||600,H=+height.value||400,frame=+frameThickness.value||12,holeD=+mountHole.value||8,rects=[],circles=[],textRects=[];if(frameMode.value==="outer")rects.push({x:0,y:0,w:W,h:frame},{x:0,y:H-frame,w:W,h:frame},{x:0,y:frame,w:frame,h:H-2*frame},{x:W-frame,y:frame,w:frame,h:H-2*frame});else if(frameMode.value==="plate")rects.push({x:0,y:0,w:W,h:H,plate:true});if(holesEnabled){const m=Math.max(18,holeD*1.5);[[m,m],[W-m,m],[m,H-m],[W-m,H-m]].forEach(([x,y])=>circles.push({x,y,r:holeD/2}))}addTextRects(textRects,(line1.value||"108").toUpperCase(),W/2,H*.62,+fontSize.value||120,+letterSpace.value||5);if(line2.value.trim())addTextRects(textRects,line2.value.toUpperCase(),W/2,H*.82,(+fontSize.value||120)*.45,(+letterSpace.value||5)*.7);return{W,H,rects,circles,textRects,polylines:transformMotif(),plate:frameMode.value==="plate"}}
function distance(a,b){return Math.hypot(b[0]-a[0],b[1]-a[1])}
function metrics(g){let contours=g.rects.length+g.circles.length+g.textRects.length+g.polylines.length,len=0;[...g.rects,...g.textRects].forEach(o=>len+=2*(o.w+o.h));g.circles.forEach(o=>len+=2*Math.PI*o.r);g.polylines.forEach(p=>{for(let i=0;i<p.length;i++)len+=distance(p[i],p[(i+1)%p.length])});return{contours,len}}
function validate(){const g=geometry(),warn=[];if(g.W<100||g.H<80)warn.push("mycket liten skylt");if(+fontSize.value<25)warn.push("liten text");if(+frameThickness.value<5&&frameMode.value!=="none")warn.push("tunn ram");if(holesEnabled&&+mountHole.value<5)warn.push("små hål");if(Math.abs(+rotation.value)>.01)warn.push("rotation visas men exporteras inte");g.polylines.flat().forEach(([x,y])=>{if(x<0||y<0||x>g.W||y>g.H)warn.push("motiv utanför plåt")});const m=metrics(g),score=Math.max(20,100-warn.length*14-(m.contours>180?10:0));manufacturingStatus.classList.toggle("warn",warn.length>0);manufacturingText.textContent=warn.length?[...new Set(warn)].join(" • "):"Slutna konturer, millimeter och kombinerad text + motiv.";designMetrics.innerHTML=`<span>Konturer: ${m.contours}</span><span>Skärlängd: ${(m.len/1000).toFixed(2)} m</span><span>Poäng: ${score}/100</span>`}
function pair(c,v){return`${c}\n${v}\n`}function line(H,x1,y1,x2,y2){return pair(0,"LINE")+pair(8,"CUT")+pair(10,x1.toFixed(4))+pair(20,(H-y1).toFixed(4))+pair(30,0)+pair(11,x2.toFixed(4))+pair(21,(H-y2).toFixed(4))+pair(31,0)}function rectDxf(H,o){return line(H,o.x,o.y,o.x+o.w,o.y)+line(H,o.x+o.w,o.y,o.x+o.w,o.y+o.h)+line(H,o.x+o.w,o.y+o.h,o.x,o.y+o.h)+line(H,o.x,o.y+o.h,o.x,o.y)}function polyDxf(H,p){let s=pair(0,"LWPOLYLINE")+pair(8,"CUT")+pair(90,p.length)+pair(70,1);p.forEach(([x,y])=>s+=pair(10,x.toFixed(4))+pair(20,(H-y).toFixed(4)));return s}
function makeDxf(){const g=geometry();let e="";if(g.plate)e+=rectDxf(g.H,{x:0,y:0,w:g.W,h:g.H});else g.rects.forEach(o=>e+=rectDxf(g.H,o));g.textRects.forEach(o=>e+=rectDxf(g.H,o));g.polylines.forEach(p=>e+=polyDxf(g.H,p));g.circles.forEach(o=>e+=pair(0,"CIRCLE")+pair(8,"CUT")+pair(10,o.x.toFixed(4))+pair(20,(g.H-o.y).toFixed(4))+pair(30,0)+pair(40,o.r.toFixed(4)));return pair(0,"SECTION")+pair(2,"HEADER")+pair(9,"$ACADVER")+pair(1,"AC1015")+pair(9,"$INSUNITS")+pair(70,4)+pair(0,"ENDSEC")+pair(0,"SECTION")+pair(2,"ENTITIES")+e+pair(0,"ENDSEC")+pair(0,"EOF")}
function makeSvg(){const g=geometry(),p=[`<svg xmlns="http://www.w3.org/2000/svg" width="${g.W}mm" height="${g.H}mm" viewBox="0 0 ${g.W} ${g.H}">`],r=o=>p.push(`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="none" stroke="black"/>`);if(g.plate)r({x:0,y:0,w:g.W,h:g.H});else g.rects.forEach(r);g.textRects.forEach(r);g.polylines.forEach(q=>p.push(`<polygon points="${q.map(x=>x.join(",")).join(" ")}" fill="none" stroke="black"/>`));g.circles.forEach(o=>p.push(`<circle cx="${o.x}" cy="${o.y}" r="${o.r}" fill="none" stroke="black"/>`));p.push("</svg>");return p.join("\n")}
function project(){return{version:"7.0",line1:line1.value,line2:line2.value,font:fontSelect.value,fontSize:fontSize.value,letterSpace:letterSpace.value,width:width.value,height:height.value,material:material.value,rotation:rotation.value,bottom:bottomDistance.value,frame:frameMode.value,frameThickness:frameThickness.value,hole:mountHole.value,holesEnabled,motif:motifSelect.value,motifScale:motifScale.value,motifY:motifY.value,mirror,color:selectedColor}}
function applyProject(d){if(!d)return;const map={line1,line2,font:fontSelect,fontSize,letterSpace,width,height,material,rotation,bottom:bottomDistance,frame:frameMode,frameThickness,hole:mountHole,motif:motifSelect,motifScale,motifY};Object.entries(map).forEach(([k,e])=>{if(d[k]!=null)e.value=d[k]});holesEnabled=d.holesEnabled!==false;mirror=!!d.mirror;selectedColor=d.color||selectedColor;rotationRange.value=rotation.value;toggleHoles.textContent=holesEnabled?"4 hål":"Inga hål";toggleHoles.classList.toggle("on",holesEnabled);mirrorMotif.classList.toggle("active",mirror);updatePreview()}
function save(name,data,type){const b=new Blob([data],{type}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),800)}function slug(){return(line1.value||"design").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
$("#exportDxf").addEventListener("click",()=>{save(`torchdraft-${slug()}.dxf`,makeDxf(),"application/dxf");showToast("Kombinerad DXF skapad")});$("#exportSvg").addEventListener("click",()=>{save(`torchdraft-${slug()}.svg`,makeSvg(),"image/svg+xml");showToast("SVG skapad")});$("#exportProject").addEventListener("click",()=>save(`torchdraft-${slug()}.torchdraft.json`,JSON.stringify(project(),null,2),"application/json"));$("#importProject").addEventListener("click",()=>$("#importProjectFile").click());$("#importProjectFile").addEventListener("change",async e=>{try{applyProject(JSON.parse(await e.target.files[0].text()));showToast("Projekt importerat")}catch{showToast("Projektfilen kunde inte läsas")}e.target.value=""});
const saveBtn=$("#saveProject"),loadBtn=$("#loadProject");if(saveBtn)saveBtn.addEventListener("click",()=>{localStorage.setItem("torchdraft-v7",JSON.stringify(project()));showToast("Projekt sparat")});if(loadBtn)loadBtn.addEventListener("click",()=>{applyProject(JSON.parse(localStorage.getItem("torchdraft-v7")||"null"));showToast("Projekt laddat")});
function showToast(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2000)}updatePreview();

// ----- TorchDraft v8 interactivity -----
const cartButton=$("#cartButton"),accountButton=$("#accountButton"),cartDrawer=$("#cartDrawer"),accountDrawer=$("#accountDrawer"),overlay=$("#overlay");
const cartItemsEl=$("#cartItems"),cartTotalEl=$("#cartTotal"),cartCountEl=$("#cartCount");
let cart=JSON.parse(localStorage.getItem("torchdraft-cart")||"[]");
const defaultReviews=[
 {name:"Anders",rating:5,text:"Mycket enkel studio och snygg förhandsvisning."},
 {name:"Maria",rating:5,text:"Kul att kunna göra en personlig skylt direkt i mobilen."}
];
let reviews=JSON.parse(localStorage.getItem("torchdraft-reviews")||JSON.stringify(defaultReviews));
function openPanel(el){overlay.classList.add("show");el.classList.add("show");el.setAttribute("aria-hidden","false")}
function closePanels(){overlay.classList.remove("show");$$(".drawer,.modal").forEach(x=>{x.classList.remove("show");x.setAttribute("aria-hidden","true")})}
overlay.addEventListener("click",closePanels);$$("[data-close]").forEach(b=>b.addEventListener("click",closePanels));
cartButton.addEventListener("click",()=>{renderCart();openPanel(cartDrawer)});
accountButton.addEventListener("click",()=>openPanel(accountDrawer));
function saveCart(){localStorage.setItem("torchdraft-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 cartCountEl.textContent=cart.reduce((s,x)=>s+x.qty,0);
 cartItemsEl.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><img src="${x.image}"><div><b>${x.name}</b><span>${x.details}</span><strong>${x.price} kr × ${x.qty}</strong></div><button data-remove="${i}">×</button></div>`).join(""):'<div class="empty-state">Kundvagnen är tom.</div>';
 cartTotalEl.textContent=cart.reduce((s,x)=>s+x.price*x.qty,0)+" kr";
 cartItemsEl.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);saveCart()});
}
$("#addCart").onclick=()=>{
 const item={name:(line1.value||"Personlig design"),details:`${width.value}×${height.value} mm · ${material.value} · ${motifSelect.value}`,price:parseInt(price.textContent)||799,qty:1,image:previewImage.src.split("/").pop()};
 const existing=cart.find(x=>x.name===item.name&&x.details===item.details&&x.price===item.price);
 existing?existing.qty++:cart.push(item);saveCart();showToast("Tillagt i kundvagnen");openPanel(cartDrawer)
};
$("#clearCart").addEventListener("click",()=>{cart=[];saveCart()});
$("#checkoutButton").addEventListener("click",()=>cart.length?openPanel($("#checkoutModal")):showToast("Kundvagnen är tom"));
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();const order={id:"TD-"+Date.now().toString().slice(-6),date:new Date().toISOString(),customer:$("#checkoutName").value,email:$("#checkoutEmail").value,items:cart,total:cart.reduce((s,x)=>s+x.price*x.qty,0)};const orders=JSON.parse(localStorage.getItem("torchdraft-orders")||"[]");orders.unshift(order);localStorage.setItem("torchdraft-orders",JSON.stringify(orders));cart=[];saveCart();closePanels();showToast("Testorder "+order.id+" skapad")});

function info(title,html){$("#infoModalTitle").textContent=title;$("#infoModalBody").innerHTML=html;openPanel($("#infoModal"))}
$("#paymentInfo").onclick=()=>info("SÄKER BETALNING","<h3>Early Access</h3><p>Swish, kort, Klarna och faktura är planerade. Just nu skapar kassan endast testordrar och tar aldrig betalt.</p>");
$("#shippingInfo").onclick=()=>info("LEVERANS","<h3>Planerade alternativ</h3><p>Spårbar frakt i Sverige samt hämtning i verkstad. Fraktpriser kopplas in när shoppen öppnas.</p>");
$("#customerGallery").onclick=()=>document.querySelector("#inspiration").scrollIntoView({behavior:"smooth"});
$("#supportButton").onclick=()=>openPanel($("#supportModal"));
$("#reviewButton").onclick=()=>{renderReviews();openPanel($("#reviewModal"))};
$("#supportForm").addEventListener("submit",e=>{e.preventDefault();const tickets=JSON.parse(localStorage.getItem("torchdraft-support")||"[]");tickets.unshift({id:"SUP-"+Date.now().toString().slice(-5),name:$("#supportName").value,email:$("#supportEmail").value,subject:$("#supportSubject").value,message:$("#supportMessage").value,date:new Date().toISOString()});localStorage.setItem("torchdraft-support",JSON.stringify(tickets));e.target.reset();closePanels();showToast("Supportärende sparat")});
function renderReviews(){$("#reviewList").innerHTML=reviews.map(r=>`<div class="review-card"><b>${r.name}</b> <span class="rating">${"★".repeat(r.rating)}</span><p>${r.text}</p></div>`).join("")}
$("#reviewForm").addEventListener("submit",e=>{e.preventDefault();reviews.unshift({name:$("#reviewName").value,rating:+$("#reviewRating").value,text:$("#reviewText").value});localStorage.setItem("torchdraft-reviews",JSON.stringify(reviews));e.target.reset();renderReviews();showToast("Tack för ditt omdöme")});

$("#accountProjects").onclick=()=>{closePanels();document.querySelector("#studio").scrollIntoView({behavior:"smooth"});showToast("Öppna eller importera projekt i studion")};
$("#accountFavorites").onclick=()=>info("FAVORITER","<p>Favoriter sparas i nästa steg. Produktkorten kan redan öppnas i studion.</p>");
$("#accountOrders").onclick=()=>{const orders=JSON.parse(localStorage.getItem("torchdraft-orders")||"[]");info("BESTÄLLNINGAR",orders.length?orders.map(o=>`<p><b>${o.id}</b> · ${new Date(o.date).toLocaleDateString("sv-SE")} · ${o.total} kr</p>`).join(""):"<p>Inga testordrar ännu.</p>")};
$("#accountDownloads").onclick=()=>info("MINA DXF-FILER","<p>DXF-filer laddas ned direkt till enheten. Projekt kan exporteras separat som TorchDraft JSON.</p>");

$$(".studio-tool").forEach(b=>b.addEventListener("click",()=>{$$(".studio-tool").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");const tool=b.dataset.tool;if(tool==="text")line1.focus();if(tool==="design")motifSelect.focus();if(tool==="frame")frameMode.focus();if(tool==="material")material.focus();if(tool==="color")$$(".swatches button")[0].focus();if(tool==="info")info("DESIGN STUDIO","<p>Studio skapar kombinerad DXF med ram, monteringshål, skärbar stenciltext och valda vektormotiv.</p>")}));
let zoom=1,is3d=false;
$("#view3dButton").onclick=()=>{is3d=!is3d;$(".preview-stage").classList.toggle("preview-3d",is3d);$("#view3dButton").textContent=is3d?"2D VY":"3D VY"};
$("#zoomInButton").onclick=()=>{zoom=Math.min(1.5,zoom+.1);previewImage.style.scale=zoom;motifPreview.style.scale=zoom};
$("#zoomOutButton").onclick=()=>{zoom=Math.max(.7,zoom-.1);previewImage.style.scale=zoom;motifPreview.style.scale=zoom};
$("#fullscreenButton").onclick=()=>{const el=$(".preview-stage");document.fullscreenElement?document.exitFullscreen():el.requestFullscreen?.()};
renderCart();


// ----- TorchDraft v9 Studio Pro -----
const productType=$("#productType"),aiPrompt=$("#aiPrompt"),aiSuggestButton=$("#aiSuggestButton"),aiStatus=$("#aiStatus");
const canvasStage=$("#canvasStage"),workpiece=$("#workpiece"),canvasGrid=$("#canvasGrid"),gridToggle=$("#gridToggle"),measureToggle=$("#measureToggle");
const dimensionTop=$("#dimensionTop"),dimensionSide=$("#dimensionSide"),resetViewButton=$("#resetViewButton"),zoomLabel=$("#zoomLabel");
let studioZoom=1,panX=0,panY=0,isPanning=false,startX=0,startY=0;

function applyStudioTransform(){
  workpiece.style.transform=`translate(${panX}px,${panY}px) scale(${studioZoom})`;
  zoomLabel.textContent=Math.round(studioZoom*100)+"%";
}
if($("#zoomInButton")) $("#zoomInButton").onclick=()=>{studioZoom=Math.min(1.8,studioZoom+.1);applyStudioTransform()};
if($("#zoomOutButton")) $("#zoomOutButton").onclick=()=>{studioZoom=Math.max(.5,studioZoom-.1);applyStudioTransform()};
if(resetViewButton) resetViewButton.onclick=()=>{studioZoom=1;panX=0;panY=0;applyStudioTransform()};
if(gridToggle) gridToggle.onclick=()=>{canvasGrid.classList.toggle("hidden");gridToggle.classList.toggle("active")};
if(measureToggle) measureToggle.onclick=()=>{dimensionTop.classList.toggle("hidden");dimensionSide.classList.toggle("hidden");measureToggle.classList.toggle("active")};
if(canvasStage){
  canvasStage.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;isPanning=true;startX=e.clientX-panX;startY=e.clientY-panY;canvasStage.setPointerCapture(e.pointerId)});
  canvasStage.addEventListener("pointermove",e=>{if(!isPanning)return;panX=e.clientX-startX;panY=e.clientY-startY;applyStudioTransform()});
  canvasStage.addEventListener("pointerup",()=>isPanning=false);
}
if(width) width.addEventListener("input",()=>dimensionTop.textContent=(width.value||600)+" mm");
if(height) height.addEventListener("input",()=>dimensionSide.textContent=(height.value||400)+" mm");

const AI_RULES=[
  {keys:["dodge","ram","pickup","truck"],motif:"gear",text:"HALLGREN GARAGE",sub:"DODGE RAM"},
  {keys:["hjort","rådjur","jakt"],motif:"deer",text:"JAKTSTUGAN",sub:"JÄMTLAND"},
  {keys:["älg"],motif:"moose",text:"ÄLGMARKEN",sub:"EST. 2026"},
  {keys:["gädda","fiske","fisk"],motif:"fish",text:"FISKESTUGAN",sub:"JÄMTLAND"},
  {keys:["grävmaskin","maskin","entreprenad"],motif:"excavator",text:"HALLGREN ENTREPRENAD",sub:"EST. 2026"},
  {keys:["fjäll","åre","järpen","gran"],motif:"mountains",text:"FJÄLLGÅRDEN",sub:"JÄMTLAND"},
  {keys:["eld","eldkorg","brasa"],motif:"flame",text:"FIRE PIT",sub:"CUSTOM STEEL"},
  {keys:["hund","tass"],motif:"paw",text:"HUNDAR VÄLKOMNA",sub:"MÄNNISKOR TOLERERAS"},
  {keys:["örn","eagle"],motif:"eagle",text:"FREEDOM",sub:"CUSTOM STEEL"}
];
function aiPrototype(prompt){
  const p=prompt.toLowerCase();
  let rule=AI_RULES.find(r=>r.keys.some(k=>p.includes(k)))||{motif:"mountains",text:"DIN DESIGN",sub:"TORCHDRAFT"};
  const quoted=[...prompt.matchAll(/["“](.*?)["”]/g)].map(m=>m[1]);
  const nameMatch=prompt.match(/text(?:en)?\s+([a-zåäö0-9 ]{3,35})/i);
  return{
    motif:rule.motif,
    line1:(quoted[0]||nameMatch?.[1]||rule.text).trim().toUpperCase(),
    line2:(quoted[1]||rule.sub).trim().toUpperCase(),
    product:p.includes("eldkorg")?"firebasket":p.includes("husnummer")?"house-number":p.includes("vägg")?"wallart":"sign"
  };
}
if(aiSuggestButton) aiSuggestButton.addEventListener("click",()=>{
  const prompt=aiPrompt.value.trim();
  if(!prompt){showToast("Skriv först vad du vill skapa");return}
  aiStatus.textContent="Analyserar idé…";
  aiSuggestButton.disabled=true;
  setTimeout(()=>{
    const idea=aiPrototype(prompt);
    motifSelect.value=idea.motif;line1.value=idea.line1;line2.value=idea.line2;productType.value=idea.product;
    updatePreview();
    aiStatus.textContent="Förslag skapat lokalt. Riktig generativ AI kopplas in när API är aktivt.";
    aiSuggestButton.disabled=false;
    showToast("AI-förslag skapat");
  },700)
});
if(productType) productType.addEventListener("change",()=>{
  const type=productType.value;
  if(type==="firebasket"){width.value=500;height.value=500;frameMode.value="plate"}
  if(type==="house-number"){width.value=400;height.value=250;line1.value="108";line2.value="";motifSelect.value="none"}
  if(type==="wallart"){width.value=700;height.value=500;frameMode.value="outer"}
  updatePreview();
});
applyStudioTransform();

// === TorchDraft v10 completion layer ===
(()=>{
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const toast=q('#toast'); function note(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(note.t);note.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function open(el){if(!el)return;q('#overlay')?.classList.add('show');el.classList.add('show')}
function close(){q('#overlay')?.classList.remove('show');qa('.drawer,.modal').forEach(x=>x.classList.remove('show'))}
qa('[data-close]').forEach(b=>b.onclick=close);q('#overlay')&&(q('#overlay').onclick=close);
const ids=['line1','line2','fontSelect','fontSize','letterSpace','width','height','material','rotation','bottomDistance','frameMode','frameThickness','mountHole','motifSelect','motifScale','motifY','productType'];
const el=Object.fromEntries(ids.map(x=>[x,q('#'+x)])); let current=null;
function snap(){return{id:current||crypto.randomUUID?.()||String(Date.now()),name:el.line1?.value||'Projekt',updated:new Date().toISOString(),values:Object.fromEntries(ids.map(x=>[x,el[x]?.value])),mirror:q('#mirrorMotif')?.classList.contains('active'),holes:q('#toggleHoles')?.textContent!=='Inga hål'}}
function apply(p){if(!p)return;current=p.id;Object.entries(p.values||{}).forEach(([k,v])=>{if(el[k]){el[k].value=v;el[k].dispatchEvent(new Event('input',{bubbles:true}))}});note('Projekt öppnat')}
function all(){try{return JSON.parse(localStorage.getItem('td-projects-v10')||'[]')}catch{return[]}}
function store(a){localStorage.setItem('td-projects-v10',JSON.stringify(a))}
function save(){let p=snap(),a=all(),i=a.findIndex(x=>x.id===p.id);i>=0?a.splice(i,1,p):a.unshift(p);current=p.id;store(a);localStorage.setItem('td-current-v10',JSON.stringify(p));note('Projekt sparat')}
function render(){let box=q('#projectList'),a=all();if(!box)return;box.innerHTML=a.length?a.map(p=>`<article class="saved-project-card"><h3>${String(p.name).replace(/[<>]/g,'')}</h3><p>${new Date(p.updated).toLocaleString('sv-SE')}</p><div class="card-actions"><button class="primary" data-po="${p.id}">ÖPPNA</button><button class="outline-btn" data-pd="${p.id}">RADERA</button></div></article>`).join(''):'<div class="empty-state">Inga projekt sparade.</div>';qa('[data-po]').forEach(b=>b.onclick=()=>{apply(all().find(x=>x.id===b.dataset.po));close()});qa('[data-pd]').forEach(b=>b.onclick=()=>{store(all().filter(x=>x.id!==b.dataset.pd));render()})}
q('#saveProject')&&(q('#saveProject').onclick=save);q('#loadProject')&&(q('#loadProject').onclick=()=>{try{apply(JSON.parse(localStorage.getItem('td-current-v10')))}catch{note('Inget sparat projekt')}});
q('#openProjectsButton')&&(q('#openProjectsButton').onclick=()=>{render();open(q('#projectBrowserModal'))});q('#projectsNav')&&(q('#projectsNav').onclick=e=>{e.preventDefault();render();open(q('#projectBrowserModal'))});q('#accountProjects')&&(q('#accountProjects').onclick=()=>{close();render();open(q('#projectBrowserModal'))});
q('#newProjectButton')&&(q('#newProjectButton').onclick=()=>{current=null;if(el.line1)el.line1.value='108';if(el.line2)el.line2.value='';if(el.motifSelect)el.motifSelect.value='none';ids.forEach(k=>el[k]?.dispatchEvent(new Event('input',{bubbles:true})));close();note('Nytt projekt')});q('#duplicateProjectButton')&&(q('#duplicateProjectButton').onclick=()=>{current=null;if(el.line1)el.line1.value=(el.line1.value||'Projekt')+' KOPIA';save();render()});
q('#helpButton')&&(q('#helpButton').onclick=()=>open(q('#helpModal')));
const imgs=['prod-hjortfamilj.jpg','prod-alg.jpg','prod-gadda.jpg','prod-ram.jpg','prod-orn.jpg','prod-108.jpg','cat-jakt.jpg','cat-fiske.jpg','cat-fordon.jpg','cat-maskiner.jpg','cat-eldkorg.jpg','cat-husnummer.jpg'];
function gallery(){let g=q('#galleryGrid');g.innerHTML=imgs.map(s=>`<button data-img="${s}"><img src="${s}"></button>`).join('');qa('[data-img]').forEach(b=>b.onclick=()=>{let im=q('#previewImage');if(im)im.src=b.dataset.img;close();note('Förhandsbild vald')});open(q('#galleryModal'))}
q('#customerGallery')&&(q('#customerGallery').onclick=gallery);
q('#pricesNav')&&(q('#pricesNav').onclick=e=>{e.preventDefault();q('#infoModalTitle').textContent='PRISER';q('#infoModalBody').innerHTML='<p>Priset räknas efter mått, material, motiv och komplexitet direkt i Design Studio.</p>';open(q('#infoModal'))});
q('#aboutNav')&&(q('#aboutNav').onclick=e=>{e.preventDefault();q('#infoModalTitle').textContent='OM TORCHDRAFT';q('#infoModalBody').innerHTML='<p>TorchDraft är en Early Access-studio för personliga plasmaskurna produkter och skärfiler.</p>';open(q('#infoModal'))});
q('#accountFavorites')&&(q('#accountFavorites').onclick=()=>{q('#infoModalTitle').textContent='FAVORITER';q('#infoModalBody').innerHTML='<p>Tryck på hjärtat på ett produktkort för att spara favoriter på enheten.</p>';open(q('#infoModal'))});
qa('.product-card').forEach((c,i)=>{let heart=[...c.querySelectorAll('button')].find(b=>b.textContent.includes('♡'));if(heart)heart.onclick=e=>{e.stopPropagation();let fav=JSON.parse(localStorage.getItem('td-favs')||'[]'),id=c.dataset.product||String(i);fav.includes(id)?fav=fav.filter(x=>x!==id):fav.push(id);localStorage.setItem('td-favs',JSON.stringify(fav));heart.textContent=fav.includes(id)?'♥':'♡';note(fav.includes(id)?'Sparad som favorit':'Favorit borttagen')}});
q('#exportDxf')?.addEventListener('click',e=>{if(!q('#confirmDryRun')?.checked){e.stopImmediatePropagation();e.preventDefault();note('Markera först att filen ska simuleras och torrköras.')}},true);q('#exportSvg')?.addEventListener('click',e=>{if(!q('#confirmDryRun')?.checked){e.stopImmediatePropagation();e.preventDefault();note('Markera först torrkörningsrutan.')}},true);
q('#menuButton')&&(q('#menuButton').onclick=()=>document.body.classList.toggle('menu-open'));
})();


// ----- TorchDraft v11 workflow -----
const HISTORY_LIMIT=50;
let history=[],historyIndex=-1,historyLock=false,autosaveTimer=null,deferredInstallPrompt=null;

function snapshot(){
  return JSON.stringify(projectData());
}
function pushHistory(){
  if(historyLock) return;
  const snap=snapshot();
  if(history[historyIndex]===snap) return;
  history=history.slice(0,historyIndex+1);
  history.push(snap);
  if(history.length>HISTORY_LIMIT) history.shift();
  historyIndex=history.length-1;
  updateHistoryButtons();
}
function updateHistoryButtons(){
  const u=byId("undoButton"),r=byId("redoButton");
  if(u)u.disabled=historyIndex<=0;
  if(r)r.disabled=historyIndex<0||historyIndex>=history.length-1;
}
function restoreHistory(index){
  if(index<0||index>=history.length)return;
  historyLock=true;
  try{applyProject(JSON.parse(history[index]));historyIndex=index}
  finally{historyLock=false;updateHistoryButtons()}
}
byId("undoButton")?.addEventListener("click",()=>restoreHistory(historyIndex-1));
byId("redoButton")?.addEventListener("click",()=>restoreHistory(historyIndex+1));
document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"){
    e.preventDefault();
    e.shiftKey?restoreHistory(historyIndex+1):restoreHistory(historyIndex-1);
  }
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){
    e.preventDefault();saveCurrent();
  }
});

function scheduleAutosave(){
  const status=byId("autosaveStatus");
  if(status){status.textContent="SPARAR…";status.className="saving"}
  clearTimeout(autosaveTimer);
  autosaveTimer=setTimeout(()=>{
    try{
      const p=projectData();
      localStorage.setItem("torchdraft-autosave-v11",JSON.stringify(p));
      if(status){status.textContent="AUTOSPARAD";status.className=""}
    }catch{
      if(status){status.textContent="FEL VID SPARNING";status.className="error"}
    }
  },450);
}
Object.values(controls).filter(Boolean).forEach(e=>e.addEventListener("input",()=>{pushHistory();scheduleAutosave()}));
["toggleHoles","mirrorMotif"].forEach(id=>byId(id)?.addEventListener("click",()=>{pushHistory();scheduleAutosave()}));
$$(".swatches button").forEach(b=>b.addEventListener("click",()=>{pushHistory();scheduleAutosave()}));

const autosaved=safeJson("torchdraft-autosave-v11",null);
if(autosaved){
  applyProject(autosaved);
  showToast("Autosparat projekt återställt");
}
pushHistory();

function setLayer(id,target,visible){
  byId(target)?.classList.toggle("layer-hidden",!visible);
}
byId("layerBackground")?.addEventListener("change",e=>setLayer("layerBackground","previewImage",e.target.checked));
byId("layerMotif")?.addEventListener("change",e=>setLayer("layerMotif","motifPreview",e.target.checked));
byId("layerText")?.addEventListener("change",e=>document.querySelector(".workpiece .preview-text")?.classList.toggle("layer-hidden",!e.target.checked));
byId("layerFrame")?.addEventListener("change",e=>{
  if(!e.target.checked){
    controls.frameMode.dataset.previous=controls.frameMode.value;
    controls.frameMode.value="none";
  }else{
    controls.frameMode.value=controls.frameMode.dataset.previous||"outer";
  }
  updatePreview();pushHistory();scheduleAutosave();
});

function snapValue(v,step=5){return Math.round(v/step)*step}
byId("canvasStage")?.addEventListener("pointerup",()=>{
  if(byId("snapToggle")?.checked){
    state.panX=snapValue(state.panX,10);
    state.panY=snapValue(state.panY,10);
    updateTransform();
  }
});

function jobData(){
  const g=geometry(),m=metrics(g),v=validate(),priceValue=calculatePrice();
  const areaM2=(g.W*g.H/1_000_000);
  const thicknessMatch=String(val("material","")).match(/(\d+(?:[.,]\d+)?)\s*mm/i);
  const thickness=thicknessMatch?parseFloat(thicknessMatch[1].replace(",",".")):2;
  const density=String(val("material","")).includes("Rostfritt")?8000:7850;
  const estimatedWeight=areaM2*(thickness/1000)*density;
  const speed=String(val("material","")).includes("3 mm")?1200:1800;
  const cutMinutes=(m.len/speed)+m.contours*0.045;
  return{
    project:val("line1","Projekt"),
    created:new Date().toISOString(),
    productType:val("productType","sign"),
    dimensions:{width:g.W,height:g.H},
    material:val("material",""),
    motif:val("motifSelect","none"),
    frame:val("frameMode","none"),
    mountingHoles:state.holes?4:0,
    kerf:val("kerfWidth",1.4),
    contours:m.contours,
    cutLengthMeters:+(m.len/1000).toFixed(2),
    estimatedCutMinutes:+cutMinutes.toFixed(1),
    estimatedWeightKg:+estimatedWeight.toFixed(2),
    designScore:v.score,
    warnings:[...v.hard,...v.warnings],
    priceSEK:priceValue
  };
}
function jobSheetText(){
  const j=jobData();
  return[
    "TORCHDRAFT PRODUKTIONSRAPPORT",
    "============================",
    `Projekt: ${j.project}`,
    `Skapad: ${new Date(j.created).toLocaleString("sv-SE")}`,
    `Produkt: ${j.productType}`,
    `Mått: ${j.dimensions.width} × ${j.dimensions.height} mm`,
    `Material: ${j.material}`,
    `Motiv: ${j.motif}`,
    `Ram: ${j.frame}`,
    `Monteringshål: ${j.mountingHoles}`,
    `Kerf: ${j.kerf} mm`,
    `Konturer: ${j.contours}`,
    `Skärlängd: ${j.cutLengthMeters} m`,
    `Uppskattad skärtid: ${j.estimatedCutMinutes} min`,
    `Uppskattad vikt: ${j.estimatedWeightKg} kg`,
    `Designpoäng: ${j.designScore}/100`,
    `Pris: ${j.priceSEK} kr`,
    "",
    "VARNINGAR",
    j.warnings.length?j.warnings.map(x=>"- "+x).join("\n"):"Inga registrerade varningar.",
    "",
    "KONTROLL",
    "[ ] DXF öppnad i ArcDroid",
    "[ ] Mått verifierade",
    "[ ] Skärordning kontrollerad",
    "[ ] Torrkörning genomförd",
    "[ ] Material och munstycke kontrollerade"
  ].join("\n");
}
byId("exportJobSheet")?.addEventListener("click",()=>{
  saveFile(`torchdraft-${slug()}-produktionsrapport.txt`,jobSheetText(),"text/plain");
  saveFile(`torchdraft-${slug()}-produktionsdata.json`,JSON.stringify(jobData(),null,2),"application/json");
  showToast("Produktionsrapport skapad");
});

function createPrintSheet(){
  document.querySelector(".print-sheet")?.remove();
  const j=jobData(),sheet=document.createElement("section");
  sheet.className="print-sheet";
  sheet.innerHTML=`<h1>TorchDraft – ${escapeHtml(j.project)}</h1>
  <p>Produktionsunderlag skapat ${new Date(j.created).toLocaleString("sv-SE")}</p>
  <table>
   <tr><th>Mått</th><td>${j.dimensions.width} × ${j.dimensions.height} mm</td></tr>
   <tr><th>Material</th><td>${escapeHtml(j.material)}</td></tr>
   <tr><th>Motiv</th><td>${escapeHtml(j.motif)}</td></tr>
   <tr><th>Konturer</th><td>${j.contours}</td></tr>
   <tr><th>Skärlängd</th><td>${j.cutLengthMeters} m</td></tr>
   <tr><th>Skärtid, uppskattad</th><td>${j.estimatedCutMinutes} min</td></tr>
   <tr><th>Vikt, uppskattad</th><td>${j.estimatedWeightKg} kg</td></tr>
   <tr><th>Designpoäng</th><td>${j.designScore}/100</td></tr>
  </table>
  <h2>Förhandsvisning</h2>${makeSvg()}
  <h2>Kontroll</h2><p>□ Simulerad i ArcDroid &nbsp; □ Torrkörd &nbsp; □ Mått verifierade</p>`;
  document.body.appendChild(sheet);
}
byId("printPreview")?.addEventListener("click",()=>{createPrintSheet();window.print()});

window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();deferredInstallPrompt=e;
  byId("installAppButton")?.removeAttribute("hidden");
});
byId("installAppButton")?.addEventListener("click",async()=>{
  if(!deferredInstallPrompt)return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  byId("installAppButton").hidden=true;
});


// TorchDraft v12 object editor
const objControls={selected:byId("selectedObject"),x:byId("objectX"),y:byId("objectY"),scale:byId("objectScale"),rotation:byId("objectRotation")};
const objectState={text:{x:50,y:75,scale:100,rotation:0,locked:false,visible:true},motif:{x:50,y:42,scale:100,rotation:0,locked:false,visible:true}};
let activeObject="text",objectDragging=false,objectStart=null,resizeMode=false;
function selectedState(){return objectState[activeObject]}
function setActiveObject(type){activeObject=type;if(objControls.selected)objControls.selected.value=type;byId("textObject")?.classList.toggle("selected",type==="text");byId("motifSelection")?.classList.toggle("active",type==="motif");syncObjectInputs()}
function syncObjectInputs(){const o=selectedState();objControls.x.value=o.x.toFixed(1);objControls.y.value=o.y.toFixed(1);objControls.scale.value=o.scale.toFixed(1);objControls.rotation.value=o.rotation.toFixed(1);const b=byId("lockObjectButton");if(b){b.textContent=o.locked?"LÅS UPP":"LÅS";b.classList.toggle("active",o.locked)}}
function applyObjectTransforms(){const t=objectState.text,m=objectState.motif,txt=byId("textObject"),motif=byId("motifPreview"),sel=byId("motifSelection");if(txt){txt.style.left=t.x+"%";txt.style.top=t.y+"%";txt.style.bottom="auto";txt.style.transform=`translate(-50%,-50%) scale(${t.scale/100}) rotate(${t.rotation}deg)`;txt.classList.toggle("object-locked",t.locked);txt.style.display=t.visible?"block":"none"}if(motif){motif.style.transformOrigin="center";motif.style.transform=`translate(${m.x-50}%,${m.y-50}%) scale(${m.scale/100}) rotate(${m.rotation}deg)`;motif.style.display=m.visible?"block":"none"}if(sel){const w=Math.max(22,Math.min(80,55*m.scale/100)),h=Math.max(18,Math.min(75,52*m.scale/100));sel.style.width=w+"%";sel.style.height=h+"%";sel.style.left=(m.x-w/2)+"%";sel.style.top=(m.y-h/2)+"%";sel.style.transform=`rotate(${m.rotation}deg)`;sel.classList.toggle("object-locked",m.locked)}}
function updateObjectFromInputs(){const o=selectedState();o.x=Math.max(0,Math.min(100,+objControls.x.value||0));o.y=Math.max(0,Math.min(100,+objControls.y.value||0));o.scale=Math.max(10,Math.min(300,+objControls.scale.value||100));o.rotation=Math.max(-180,Math.min(180,+objControls.rotation.value||0));applyObjectTransforms();pushHistory();scheduleAutosave()}
Object.values(objControls).filter(Boolean).forEach(e=>e.addEventListener("input",updateObjectFromInputs));objControls.selected?.addEventListener("change",()=>setActiveObject(objControls.selected.value));
function startObjectDrag(e,type){setActiveObject(type);const o=objectState[type];if(o.locked)return showToast("Objektet är låst");e.stopPropagation();e.preventDefault();objectDragging=true;objectStart={x:e.clientX,y:e.clientY,ox:o.x,oy:o.y,scale:o.scale};resizeMode=e.target.classList?.contains("handle")}
byId("textObject")?.addEventListener("pointerdown",e=>startObjectDrag(e,"text"));byId("motifSelection")?.addEventListener("pointerdown",e=>startObjectDrag(e,"motif"));byId("motifPreview")?.addEventListener("pointerdown",e=>startObjectDrag(e,"motif"));
document.addEventListener("pointermove",e=>{if(!objectDragging||!objectStart)return;const rect=byId("workpiece")?.getBoundingClientRect();if(!rect)return;const o=selectedState();if(resizeMode){const d=((e.clientX-objectStart.x)+(e.clientY-objectStart.y))/2;o.scale=Math.max(10,Math.min(300,objectStart.scale+d/rect.width*180))}else{o.x=Math.max(0,Math.min(100,objectStart.ox+(e.clientX-objectStart.x)/rect.width*100));o.y=Math.max(0,Math.min(100,objectStart.oy+(e.clientY-objectStart.y)/rect.height*100))}applyObjectTransforms();syncObjectInputs()});
document.addEventListener("pointerup",()=>{if(objectDragging){objectDragging=false;resizeMode=false;pushHistory();scheduleAutosave()}});
byId("lockObjectButton")?.addEventListener("click",()=>{const o=selectedState();o.locked=!o.locked;syncObjectInputs();applyObjectTransforms();pushHistory();scheduleAutosave()});byId("centerObjectButton")?.addEventListener("click",()=>{const o=selectedState();o.x=50;o.y=50;syncObjectInputs();applyObjectTransforms();pushHistory();scheduleAutosave()});byId("deleteObjectButton")?.addEventListener("click",()=>{selectedState().visible=false;applyObjectTransforms();pushHistory();scheduleAutosave();showToast("Objekt dolt")});byId("duplicateObjectButton")?.addEventListener("click",()=>{const o=selectedState();o.visible=true;o.scale=Math.max(10,o.scale*.9);o.x=Math.min(90,o.x+8);o.y=Math.min(90,o.y+8);syncObjectInputs();applyObjectTransforms();pushHistory();scheduleAutosave();showToast("Objekt duplicerat")});
const aligns={alignLeft:["x",15],alignCenter:["x",50],alignRight:["x",85],alignTop:["y",15],alignMiddle:["y",50],alignBottom:["y",85]};Object.entries(aligns).forEach(([id,[k,v]])=>byId(id)?.addEventListener("click",()=>{selectedState()[k]=v;syncObjectInputs();applyObjectTransforms();pushHistory();scheduleAutosave()}));
document.addEventListener("keydown",e=>{if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;const o=selectedState(),s=e.shiftKey?5:1;if(e.key==="ArrowLeft")o.x-=s;else if(e.key==="ArrowRight")o.x+=s;else if(e.key==="ArrowUp")o.y-=s;else if(e.key==="ArrowDown")o.y+=s;else if(e.key==="Delete"||e.key==="Backspace")o.visible=false;else return;e.preventDefault();o.x=Math.max(0,Math.min(100,o.x));o.y=Math.max(0,Math.min(100,o.y));syncObjectInputs();applyObjectTransforms();pushHistory();scheduleAutosave()});
const prevProjectData=projectData;projectData=function(){const p=prevProjectData();p.objectState=JSON.parse(JSON.stringify(objectState));p.activeObject=activeObject;return p};const prevApplyProject=applyProject;applyProject=function(p){prevApplyProject(p);if(p?.objectState){Object.assign(objectState.text,p.objectState.text||{});Object.assign(objectState.motif,p.objectState.motif||{})}setActiveObject(p?.activeObject||"text");applyObjectTransforms()};
function updateCutOrder(){const g=geometry(),steps=[];if(g.circles.length)steps.push(g.circles.length+" hål");if(g.textRects.length)steps.push(g.textRects.length+" textdetaljer");if(g.polylines.length)steps.push(g.polylines.length+" motivkonturer");if(g.rects.length)steps.push(g.rects.length+" ramkonturer");byId("cutOrderText").textContent=steps.join(" → ")||"Ingen geometri"}
const prevUpdatePreview=updatePreview;updatePreview=function(){prevUpdatePreview();applyObjectTransforms();updateCutOrder()};updatePreview();setActiveObject("text");


// ----- TorchDraft v13 simple/pro experience -----
const launcher=byId("studioLauncher"),simpleModeButton=byId("simpleModeButton"),proModeButton=byId("proModeButton");
function showLauncher(){launcher?.classList.add("show")}
function enterStudio(mode="simple"){
  launcher?.classList.remove("show");
  document.body.dataset.view="studio";
  setStudioMode(mode);
  document.querySelector("#studio")?.scrollIntoView({behavior:"instant"});
}
function exitStudio(){
  document.body.dataset.view="site";
  document.body.classList.remove("simple-mode","pro-mode");
  window.scrollTo({top:0,behavior:"smooth"});
}
function setStudioMode(mode){
  document.body.classList.toggle("simple-mode",mode==="simple");
  document.body.classList.toggle("pro-mode",mode==="pro");
  simpleModeButton?.classList.toggle("active",mode==="simple");
  proModeButton?.classList.toggle("active",mode==="pro");
  if(mode==="simple")syncSimpleFromPro(); else syncProFromSimple();
}
simpleModeButton?.addEventListener("click",()=>setStudioMode("simple"));
proModeButton?.addEventListener("click",()=>setStudioMode("pro"));
byId("openProFromSimple")?.addEventListener("click",()=>setStudioMode("pro"));
byId("exitStudioButton")?.addEventListener("click",exitStudio);
byId("launcherClose")?.addEventListener("click",()=>launcher?.classList.remove("show"));
byId("studioHelpTop")?.addEventListener("click",()=>openPanel(byId("helpModal")));
$$('a[href="#studio"],[data-go="studio"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();showLauncher()}));

const simple={
 line1:byId("simpleLine1"),line2:byId("simpleLine2"),motif:byId("simpleMotif"),
 width:byId("simpleWidth"),height:byId("simpleHeight"),material:byId("simpleMaterial"),
 image:byId("simplePreviewImage"),svg:byId("simpleMotifPreview"),
 preview1:byId("simplePreviewLine1"),preview2:byId("simplePreviewLine2"),price:byId("simplePrice")
};
function simpleTransformMotif(){
 const polys=MOTIFS[simple.motif.value]||[],W=+simple.width.value||600,H=+simple.height.value||400,k=.58*Math.min(W,H)/100,top=H*.12;
 return polys.map(poly=>poly.map(([x,y])=>[W/2+(x-50)*k,top+y*k]));
}
function updateSimple(){
 simple.preview1.textContent=(simple.line1.value||"DIN TEXT").toUpperCase();
 simple.preview2.textContent=(simple.line2.value||"").toUpperCase();
 const W=+simple.width.value||600,H=+simple.height.value||400;
 simple.svg.setAttribute("viewBox",`0 0 ${W} ${H}`);simple.svg.innerHTML="";
 simpleTransformMotif().forEach(p=>{const e=document.createElementNS("http://www.w3.org/2000/svg","polygon");e.setAttribute("points",p.map(q=>q.join(",")).join(" "));simple.svg.appendChild(e)});
 const area=W*H/240000,extra=simple.material.value.includes("3 mm")?100:simple.material.value.includes("Corten")?180:simple.material.value.includes("Rostfritt")?260:0,motif=simple.motif.value==="none"?0:120;
 simple.price.textContent=Math.max(299,Math.round(799*area+extra+motif))+" kr";
}
Object.values(simple).filter(e=>e?.addEventListener).forEach(e=>e.addEventListener("input",updateSimple));
function syncSimpleFromPro(){
 simple.line1.value=controls.line1.value;simple.line2.value=controls.line2.value;simple.motif.value=controls.motifSelect.value;
 simple.width.value=controls.width.value;simple.height.value=controls.height.value;simple.material.value=controls.material.value;
 simple.image.src=preview.image.src;updateSimple();
}
function syncProFromSimple(){
 controls.line1.value=simple.line1.value;controls.line2.value=simple.line2.value;controls.motifSelect.value=simple.motif.value;
 controls.width.value=simple.width.value;controls.height.value=simple.height.value;controls.material.value=simple.material.value;
 preview.image.src=simple.image.src;updatePreview();
}
byId("simpleAddCart")?.addEventListener("click",()=>{syncProFromSimple();byId("addCart")?.click()});
$$("[data-launch-type]").forEach(b=>b.addEventListener("click",()=>{
 const type=b.dataset.launchType;controls.productType.value=type;
 if(type==="house-number"){simple.line1.value="108";simple.line2.value="";simple.motif.value="none";simple.width.value=400;simple.height.value=250}
 else if(type==="firebasket"){simple.line1.value="HALLGREN";simple.line2.value="";simple.motif.value="flame";simple.width.value=500;simple.height.value=500}
 else if(type==="vehicle"){simple.line1.value="HALLGREN GARAGE";simple.line2.value="";simple.motif.value="gear";simple.width.value=700;simple.height.value=400}
 else if(type==="machine"){simple.line1.value="HALLGREN ENTREPRENAD";simple.line2.value="";simple.motif.value="excavator";simple.width.value=700;simple.height.value=420}
 else if(type==="wallart"){simple.line1.value="HALLGREN";simple.line2.value="";simple.motif.value="deer";simple.width.value=700;simple.height.value=500}
 else{simple.line1.value="DIN TEXT";simple.line2.value="";simple.motif.value="none";simple.width.value=600;simple.height.value=400}
 updateSimple();enterStudio("simple");
}));
byId("launcherAiButton")?.addEventListener("click",()=>{
 const prompt=byId("launcherPrompt").value.trim();if(!prompt)return showToast("Beskriv först vad du vill skapa");
 const r=localAi(prompt);simple.line1.value=r.line1;simple.line2.value=r.line2;simple.motif.value=r.motif;updateSimple();enterStudio("simple");
});
$$(".product-card,.category-card").forEach(card=>card.addEventListener("click",e=>{
 e.preventDefault();if(card.dataset.image)simple.image.src=card.dataset.image;if(card.dataset.product)simple.line1.value=card.dataset.product.toUpperCase();updateSimple();enterStudio("simple");
}));
updateSimple();
