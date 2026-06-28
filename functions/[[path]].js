const NODES = [
  {name:"阿里云-明月",server:"47.79.251.76",port:51831,uuid:"0f79b4a3-6d8e-4568-a57b-112fb6f94502",net:"tcp"},
  {name:"RackNerd-美国",server:"107.172.39.190",port:443,uuid:"4d0e1d5d-dc00-45d8-ae95-493033e095fc",net:"tcp"}
];

function b64(s){return btoa(unescape(encodeURIComponent(s)))}

function vmess(n){
  return "vmess://"+b64(JSON.stringify({v:"2",ps:n.name,add:n.server,port:n.port,id:n.uuid,aid:0,scy:"auto",net:n.net,type:"none",tls:"none"}));
}

export async function onRequest(context) {
  const u = new URL(context.request.url);
  if(u.pathname==="/sub"){
    return new Response(b64(NODES.map(vmess).join("\n")),{headers:{"Content-Type":"text/plain"}});
  }
  return new Response("OK - /sub for subscribe",{headers:{"Content-Type":"text/plain"}});
}
