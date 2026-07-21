const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const line1=$("#line1"), line2=$("#line2"), previewLine1=$("#previewLine1"), previewLine2=$("#previewLine2");
const fontSelect=$("#fontSelect"), fontSize=$("#fontSize"), letterSpace=$("#letterSpace");
const width=$("#width"), height=$("#height"), material=$("#material"), price=$("#price");
const rotation=$("#rotation"), rotationRange=$("#rotationRange"), bottomDistance=$("#bottomDistance");
const previewText=$(".preview-text"), previewImage=$("#previewImage"), toast=$("#toast");
let basePrice=799, selectedColor="#cfd4d7";

function updatePreview(){
  previewLine1.textContent=(line1.value||"DIN TEXT").toUpperCase();
  previewLine2.textContent=(line2.value||"").toUpperCase();
  previewText.className="preview-text "+fontSelect.value;
  previewLine1.style.fontSize=Math.max(20,Math.min(46,+fontSize.value/3.8))+"px";
  previewLine1.style.letterSpacing=(+letterSpace.value)+"px";
  previewText.style.bottom=Math.max(8,Math.min(85,+bottomDistance.value/2))+"px";
  previewText.style.transform=`translateX(-50%) rotate(${+rotation.value}deg)`;
  previewText.style.color=selectedColor;
  calculatePrice();
}
function calculatePrice(){
  const area=(+width.value||600)*(+height.value||400)/240000;
  const materialExtra=material.value.includes("3 mm")?100:material.value.includes("Corten")?180:material.value.includes("Rostfritt")?260:0;
  price.textContent=Math.round(basePrice*area+materialExtra)+" kr";
}
[line1,line2,fontSelect,fontSize,letterSpace,width,height,material,rotation,bottomDistance].forEach(el=>el.addEventListener("input",updatePreview));
rotationRange.addEventListener("input",()=>{rotation.value=rotationRange.value;updatePreview()});
rotation.addEventListener("input",()=>{rotationRange.value=rotation.value;updatePreview()});
$$(".swatches button").forEach(b=>b.addEventListener("click",()=>{$$(".swatches button").forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedColor=b.dataset.color;updatePreview()}));

$$(".product-card").forEach(card=>card.addEventListener("click",()=>{
  basePrice=+card.dataset.price;
  previewImage.src=card.dataset.image;
  $(".studio-title h2").textContent="DESIGN STUDIO – "+card.dataset.product.toUpperCase();
  document.querySelector("#studio").scrollIntoView({behavior:"smooth"});
  calculatePrice();
}));
const thumbImages=["studio-hjortfamilj.jpg","prod-alg.jpg","prod-gadda.jpg","prod-ram.jpg","prod-orn.jpg"];
$$(".thumbs button").forEach((b,i)=>b.addEventListener("click",()=>{$$(".thumbs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");previewImage.src=thumbImages[i]}));

$("#addCart").addEventListener("click",()=>{toast.textContent=`${line1.value||"Design"} tillagd i kundvagnen`;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)});
$("#addText").addEventListener("click",()=>line2.focus());

function dxfLine(x1,y1,x2,y2){return `0\nLINE\n8\nCUT\n10\n${x1}\n20\n${y1}\n30\n0\n11\n${x2}\n21\n${y2}\n31\n0\n`}
function simpleDxf(){
  const w=+width.value||600,h=+height.value||400,m=18;
  let e=dxfLine(0,0,w,0)+dxfLine(w,0,w,h)+dxfLine(w,h,0,h)+dxfLine(0,h,0,0);
  // A safe geometric reference rectangle for the customizable text area.
  e+=dxfLine(m,m,w-m,m)+dxfLine(w-m,m,w-m,m+70)+dxfLine(w-m,m+70,m,m+70)+dxfLine(m,m+70,m,m);
  return `0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1009\n9\n$INSUNITS\n70\n4\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n${e}0\nENDSEC\n0\nEOF\n`;
}
$("#exportDxf").addEventListener("click",()=>{
  const blob=new Blob([simpleDxf()],{type:"application/dxf"}),a=document.createElement("a");
  a.href=URL.createObjectURL(blob);a.download=`torchdraft-${(line1.value||"design").toLowerCase().replace(/[^a-z0-9]+/g,"-")}.dxf`;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  toast.textContent="DXF skapad – kontrollera alltid i ArcDroid före skärning";toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600);
});
$$(".category-card").forEach(c=>c.addEventListener("click",()=>{toast.textContent=c.dataset.category+" öppnas i nästa katalogsteg";toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}));
$("#menuButton").addEventListener("click",()=>document.body.classList.toggle("menu-open"));
updatePreview();