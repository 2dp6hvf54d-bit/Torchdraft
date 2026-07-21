function pair(c,v){return`${c}\n${v}\n`}
export function makeDxf(g){
 let e="";const L=(x1,y1,x2,y2)=>e+=pair(0,"LINE")+pair(8,"CUT")+pair(10,x1.toFixed(4))+pair(20,(g.h-y1).toFixed(4))+pair(30,0)+pair(11,x2.toFixed(4))+pair(21,(g.h-y2).toFixed(4))+pair(31,0);
 const C=(x,y,r)=>e+=pair(0,"CIRCLE")+pair(8,"CUT")+pair(10,x.toFixed(4))+pair(20,(g.h-y).toFixed(4))+pair(30,0)+pair(40,r.toFixed(4));
 g.rects.forEach(o=>{L(o.x,o.y,o.x+o.w,o.y);L(o.x+o.w,o.y,o.x+o.w,o.y+o.h);L(o.x+o.w,o.y+o.h,o.x,o.y+o.h);L(o.x,o.y+o.h,o.x,o.y)});
 g.circles.forEach(o=>C(o.x,o.y,o.r));g.lines.forEach(o=>L(o.x1,o.y1,o.x2,o.y2));g.paths.forEach(o=>{for(let i=0;i<o.p.length-1;i++)L(...o.p[i],...o.p[i+1]);if(o.closed)L(...o.p.at(-1),...o.p[0])});
 return pair(0,"SECTION")+pair(2,"HEADER")+pair(9,"$ACADVER")+pair(1,"AC1009")+pair(9,"$INSUNITS")+pair(70,4)+pair(0,"ENDSEC")+pair(0,"SECTION")+pair(2,"ENTITIES")+e+pair(0,"ENDSEC")+pair(0,"EOF")
}
export function download(name,data,type){let b=new Blob([data],{type}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}