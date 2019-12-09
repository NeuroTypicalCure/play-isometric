let c = document.getElementById('c');
let ctx = c.getContext('2d');

c.width = 800;
c.height = 600;

const tileW = 32;
const tileH = 32;
const rotationX = 0.8;

ctx.translate(c.width/2, 100)

function drawTiles(mapX,mapY,rows,cols){
    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            let z = Math.floor(Math.random()*5);
            let color = {};
            color.r = Math.floor(Math.random()*255);
            color.g = Math.floor(Math.random()*255);
            color.b = Math.floor(Math.random()*255);
            drawBlock(mapX+i,mapY+j,z,tileW,rotationX*tileH,toRGBString(color));
        }
    }
}

function toRGBString(color){
    return `rgb(${color.r},${color.g},${color.b})`;
}

const pSBC=(p,c0,c1,l)=>{
    // https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function drawBlock(x,y,z,w,h,color){
    let top = color;
    let right = pSBC(0.2,color,false,true);
    let left = pSBC(-0.2,color,false,true);

    ctx.save();
    ctx.translate((x - y) * w / 2, (x + y) * h / 2);

    // top
    ctx.beginPath();
    ctx.moveTo(0, -z * h);
    ctx.lineTo(w / 2, h / 2 - z * h);
    ctx.lineTo(0, h - z * h);
    ctx.lineTo(-w / 2, h / 2 - z * h);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();

    // left
    ctx.beginPath();
    ctx.moveTo(-w / 2, h / 2 - z * h);
    ctx.lineTo(0, h - z * h);
    ctx.lineTo(0, h);
    ctx.lineTo(-w / 2, h / 2);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();

    // right
    ctx.beginPath();
    ctx.moveTo(w / 2, h / 2 - z * h);
    ctx.lineTo(0, h - z * h);
    ctx.lineTo(0, h);
    ctx.lineTo(w / 2, h / 2);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();

    ctx.restore();		
}

drawTiles(0,0,16,16);