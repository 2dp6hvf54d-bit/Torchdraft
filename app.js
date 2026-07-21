const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const line1=$("#line1"), line2=$("#line2"), previewLine1=$("#previewLine1"), previewLine2=$("#previewLine2");
const fontSelect=$("#fontSelect"), fontSize=$("#fontSize"), letterSpace=$("#letterSpace");
const width=$("#width"), height=$("#height"), material=$("#material"), price=$("#price");
const rotation=$("#rotation"), rotationRange=$("#rotationRange"), bottomDistance=$("#bottomDistance");
const frameMode=$("#frameMode"), frameThickness=$("#frameThickness"), mountHole=$("#mountHole"), toggleHoles=$("#toggleHoles");
const previewText=$(".preview-text"), previewImage=$("#previewImage"), toast=$("#toast");
const manufacturingStatus=$("#manufacturingStatus"), manufacturingText=$("#manufacturingText");
let basePrice=799, selectedColor="#cfd4d7", holesEnabled=true;

const GLYPHS={
"0":["01110","10001","10011","10101","11001","10001","01110"],
"1":["00100","01100","00100","00100","00100","00100","01110"],
"2":["01110","10001","00001","00010","00100","01000","11111"],
"3":["11110","00001","00001","01110","00001","00001","11110"],
"4":["00010","00110","01010","10010","11111","00010","00010"],
"5":["11111","10000","10000","11110","00001","00001","11110"],
"6":["01110","10000","10000","11110","10001","10001","01110"],
"7":["11111","00001","00010","00100","01000","01000","01000"],
"8":["01110","10001","10001","01110","10001","10001","01110"],
"9":["01110","10001","10001","01111","00001","00001","01110"],
"A":["01110","10001","10001","11111","10001","10001","10001"],
"B":["11110","10001","10001","11110","10001","10001","11110"],
"C":["01111","10000","10000","10000","10000","10000","01111"],
"D":["11110","10001","10001","10001","10001","10001","11110"],
"E":["11111","10000","10000","11110","10000","10000","11111"],
"F":["11111","10000","10000","11110","10000","10000","10000"],
"G":["01111","10000","10000","10111","10001","10001","01111"],
"H":["10001","10001","10001","11111","10001","10001","10001"],
"I":["11111","00100","00100","00100","00100","00100","11111"],
"J":["00111","00010","00010","00010","10010","10010","01100"],
"K":["10001","10010","10100","11000","10100","10010","10001"],
"L":["10000","10000","10000","10000","10000","10000","11111"],
"M":["10001","11011","10101","10101","10001","10001","10001"],
"N":["10001","11001","10101","10011","10001","10001","10001"],
"O":["01110","10001","10001","10001","10001","10001","01110"],
"P":["11110","10001","10001","11110","10000","10000","10000"],
"Q":["01110","10001","10001","10001","10101","10010","01101"],
"R":["11110","10001","10001","11110","10100","10010","10001"],
"S":["01111","10000","10000","01110","00001","00001","11110"],
"T":["11111","00100","00100","00100","00100","00100","00100"],
"U":["10001","10001","10001","10001","10001","10001","01110"],
"V":["10001","10001","10001","10001","10001","01010","00100"],
"W":["10001","10001","10001","10101","10101","11011","10001"],
"X":["10001","10001","01010","00100","01010","10001","10001"],
"Y":["10001","10001","01010","00100","00100","00100","00100"],
"Z":["11111","00001","00010","00100","01000","10000","11111"],
" ":["00000","00000","00000","00000","00000","00000","00000"],
"-":["00000","00000","00000","11111","00000","00000","00000"],
".":["00000","00000","00000","00000","00000","00110","00110"]
};

function updatePreview(){
  previewLine1.textContent=(line1.value||"DIN TEXT").toUpperCase();
  previewLine2.textContent=(line2.value||"").toUpperCase();
  previewText.className="preview-text "+fontSelect.value;
  previewLine1.style.fontSize=Math.max(20,Math.min(46,+fontSize.value/3.8))+"px";
  previewLine1.style.letterSpacing=(+letterSpace.value)+"px";
  previewText.style.bottom=Math.max(8,Math.min(85,+bottomDistance.value/2))+"px";
  previewText.style.transform=`translateX(-50%) rotate(${+rotation.value}deg)`;
  previewText.style.color=selectedColor;
  calculatePrice(); validateManufacturing();
}
function calculatePrice(){
  const area=(+width.value||600)*(+height.value||400)/240000;
  const materialExtra=material.value.includes("3 mm")?100:material.value.includes("Corten")?180:material.value.includes("Rostfritt")?260:0;
  price.textContent=Math.round(basePrice*area+materialExtra)+" kr";
}
[line1,line2,fontSelect,fontSize,letterSpace,width,height,material,rotation,bottomDistance,frameMode,frameThickness,mountHole].forEach(el=>el.addEventListener("input",updatePreview));
rotationRange.addEventListener("input",()=>{rotation.value=rotationRange.value;updatePreview()});
rotation.addEventListener("input",()=>{rotationRange.value=rotation.value;updatePreview()});
toggleHoles.addEventListener("click",()=>{holesEnabled=!holesEnabled;toggleHoles.classList.toggle("on",holesEnabled);toggleHoles.textContent=holesEnabled?"4 hål":"Inga hål";validateManufacturing()});
toggleHoles.classList.add("on");
$$(".swatches button").forEach(b=>b.addEventListener("click",()=>{$$(".swatches button").forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedColor=b.dataset.color;updatePreview()}));

$$(".product-card").forEach(card=>card.addEventListener("click",()=>{
  basePrice=+card.dataset.price; previewImage.src=card.dataset.image;
  $(".studio-title h2").textContent="DESIGN STUDIO – "+card.dataset.product.toUpperCase();
  document.querySelector("#studio").scrollIntoView({behavior:"smooth"}); calculatePrice();
}));
const thumbImages=["studio-hjortfamilj.jpg","prod-alg.jpg","prod-gadda.jpg","prod-ram.jpg","prod-orn.jpg"];
$$(".thumbs button").forEach((b,i)=>b.addEventListener("click",()=>{$$(".thumbs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");previewImage.src=thumbImages[i]}));
$("#addCart").addEventListener("click",()=>showToast(`${line1.value||"Design"} tillagd i kundvagnen`));
$("#addText").addEventListener("click",()=>line2.focus());
$$(".category-card").forEach(c=>c.addEventListener("click",()=>showToast(c.dataset.category+" öppnas i nästa katalogsteg")));
$("#menuButton").addEventListener("click",()=>document.body.classList.toggle("menu-open"));

function validateManufacturing(){
  const warnings=[];
  const w=+width.value||0,h=+height.value||0,fs=+fontSize.value||0,ft=+frameThickness.value||0,hd=+mountHole.value||0;
  if(w<100||h<80) warnings.push("mycket liten skylt");
  if(fs<25) warnings.push("texten kan bli för liten");
  if(ft<5 && frameMode.value!=="none") warnings.push("ramen är tunnare än 5 mm");
  if(holesEnabled && hd<5) warnings.push("monteringshålen är små");
  if(Math.abs(+rotation.value)>0.01) warnings.push("DXF-textrotation stöds inte ännu");
  if(fontSelect.value!=="cut-stencil") warnings.push("DXF använder Cut Stencil oavsett valt förhandsvisningstypsnitt");
  manufacturingStatus.classList.toggle("warn",warnings.length>0);
  manufacturingText.textContent=warnings.length?warnings.join(" • "):"Slutna konturer, millimeterenheter och inga lösa bokstavsöar.";
}

function geometry(){
  const W=+width.value||600,H=+height.value||400,frame=+frameThickness.value||12,holeD=+mountHole.value||8;
  const rects=[],circles=[];
  if(frameMode.value==="outer"){
    rects.push({x:0,y:0,w:W,h:frame},{x:0,y:H-frame,w:W,h:frame},{x:0,y:frame,w:frame,h:H-2*frame},{x:W-frame,y:frame,w:frame,h:H-2*frame});
  } else if(frameMode.value==="plate"){
    rects.push({x:0,y:0,w:W,h:H,plate:true});
  }
  if(holesEnabled){
    const m=Math.max(18,holeD*1.5);
    [[m,m],[W-m,m],[m,H-m],[W-m,H-m]].forEach(([x,y])=>circles.push({x,y,r:holeD/2}));
  }
  const textRects=[];
  addTextRects(textRects,(line1.value||"108").toUpperCase(),W/2,H*0.35,+fontSize.value||120,+letterSpace.value||5);
  if(line2.value.trim()) addTextRects(textRects,line2.value.toUpperCase(),W/2,H*0.68,(+fontSize.value||120)*0.45,(+letterSpace.value||5)*0.7);
  return {W,H,rects,circles,textRects,plate:frameMode.value==="plate"};
}
function addTextRects(out,text,cx,y,size,space){
  text=text.replace(/[^A-Z0-9 .-]/g," ");
  const cw=size*.58, ch=size/7, gap=Math.max(2,space), total=text.length*cw+(text.length-1)*gap;
  const scale=Math.min(1,(+width.value-50)/Math.max(total,1)); let ox=cx-total*scale/2;
  for(const c of text){
    const glyph=GLYPHS[c]||GLYPHS[" "];
    for(let r=0;r<7;r++)for(let col=0;col<5;col++)if(glyph[r][col]==="1"){
      const cellW=cw/5*scale, cellH=ch*scale, inset=Math.min(cellW,cellH)*.12;
      out.push({x:ox+col*cellW+inset,y:y+r*cellH+inset,w:cellW-2*inset,h:cellH-2*inset});
    }
    ox+=(cw+gap)*scale;
  }
}

function pair(c,v){return`${c}\n${v}\n`}
function dxfLine(H,x1,y1,x2,y2){return pair(0,"LINE")+pair(8,"CUT")+pair(10,x1.toFixed(4))+pair(20,(H-y1).toFixed(4))+pair(30,0)+pair(11,x2.toFixed(4))+pair(21,(H-y2).toFixed(4))+pair(31,0)}
function rectLines(H,o){return dxfLine(H,o.x,o.y,o.x+o.w,o.y)+dxfLine(H,o.x+o.w,o.y,o.x+o.w,o.y+o.h)+dxfLine(H,o.x+o.w,o.y+o.h,o.x,o.y+o.h)+dxfLine(H,o.x,o.y+o.h,o.x,o.y)}
function makeDxf(){
  const g=geometry(); let e="";
  if(g.plate) e+=rectLines(g.H,{x:0,y:0,w:g.W,h:g.H});
  else g.rects.forEach(o=>e+=rectLines(g.H,o));
  g.textRects.forEach(o=>e+=rectLines(g.H,o));
  g.circles.forEach(o=>e+=pair(0,"CIRCLE")+pair(8,"CUT")+pair(10,o.x.toFixed(4))+pair(20,(g.H-o.y).toFixed(4))+pair(30,0)+pair(40,o.r.toFixed(4)));
  return pair(0,"SECTION")+pair(2,"HEADER")+pair(9,"$ACADVER")+pair(1,"AC1009")+pair(9,"$INSUNITS")+pair(70,4)+pair(0,"ENDSEC")+pair(0,"SECTION")+pair(2,"ENTITIES")+e+pair(0,"ENDSEC")+pair(0,"EOF");
}
function makeSvg(){
  const g=geometry(), parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${g.W}mm" height="${g.H}mm" viewBox="0 0 ${g.W} ${g.H}">`];
  const addRect=o=>parts.push(`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="none" stroke="black" stroke-width="0.5"/>`);
  if(g.plate)addRect({x:0,y:0,w:g.W,h:g.H}); else g.rects.forEach(addRect);
  g.textRects.forEach(addRect); g.circles.forEach(o=>parts.push(`<circle cx="${o.x}" cy="${o.y}" r="${o.r}" fill="none" stroke="black" stroke-width="0.5"/>`));
  parts.push("</svg>"); return parts.join("\n");
}
function save(name,data,type){const blob=new Blob([data],{type}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function slug(){return (line1.value||"design").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
$("#exportDxf").addEventListener("click",()=>{save(`torchdraft-${slug()}.dxf`,makeDxf(),"application/dxf");showToast("Riktig DXF skapad – torrkör alltid i ArcDroid först")});
$("#exportSvg").addEventListener("click",()=>{save(`torchdraft-${slug()}.svg`,makeSvg(),"image/svg+xml");showToast("SVG skapad")});
function showToast(text){toast.textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
updatePreview();