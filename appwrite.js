/* Gabon Vote Star — couche Appwrite (API REST, aucune dépendance externe) */
(()=>{
const C={endpoint:'https://fra.cloud.appwrite.io/v1',project:'6b0a25f1003ce08324f1',db:'6b0a2ecf0012fce47e5a',bucket:'gvs_media'};
const COLS=['settings','posts','transactions','payouts','artists'];
const JSONH={'Content-Type':'application/json'};
let session=sessionStorage.getItem('gvs_session')||'',fallback=sessionStorage.getItem('gvs_fallback')||'',admin=false,pullP=null,queue=Promise.resolve();
const known={},fileOf={};

function headers(extra){const h={'X-Appwrite-Project':C.project,...extra};if(session)h['X-Appwrite-Session']=session;if(fallback)h['X-Fallback-Cookies']=fallback;return h}
async function api(path,opt={}){
  const r=await fetch(C.endpoint+path,{...opt,headers:headers(opt.headers)});
  const fb=r.headers.get('X-Fallback-Cookies');if(fb){fallback=fb;sessionStorage.setItem('gvs_fallback',fb)}
  const j=r.status===204?{}:await r.json().catch(()=>({}));
  if(!r.ok)throw Object.assign(new Error(j.message||('Erreur '+r.status)),{code:r.status});
  return j}
const docs=c=>`/databases/${C.db}/collections/${c}/documents`;
const hash=s=>{let h=5381;for(const ch of s)h=((h<<5)+h+ch.charCodeAt(0))>>>0;return h.toString(36)};
const artistId=a=>'a'+hash(String(a.name).toLowerCase());

async function list(col){
  const out=[];
  for(let off=0;;off+=100){
    const q=[{method:'limit',values:[100]},{method:'offset',values:[off]}].map(x=>'queries[]='+encodeURIComponent(JSON.stringify(x))).join('&');
    const r=await api(docs(col)+'?'+q);out.push(...r.documents);if(r.documents.length<100)return out}}

async function put(col,id,obj){
  const body=JSON.stringify({data:JSON.stringify(obj)}),k=col+'/'+id;
  if(known[k]===body)return;
  const payload=JSON.stringify({data:{data:JSON.stringify(obj)}});
  if(k in known){await api(`${docs(col)}/${id}`,{method:'PATCH',headers:JSONH,body:payload})}
  else{
    try{await api(docs(col),{method:'POST',headers:JSONH,body:JSON.stringify({documentId:id,data:{data:JSON.stringify(obj)}})})}
    catch(e){if(e.code!==409)throw e;await api(`${docs(col)}/${id}`,{method:'PATCH',headers:JSONH,body:payload})}}
  known[k]=body;if(obj&&obj.fileId)fileOf[k]=obj.fileId}

async function remove(k){
  const [col,id]=k.split('/');
  await api(`${docs(col)}/${id}`,{method:'DELETE'});
  if(fileOf[k])await api(`/storage/buckets/${C.bucket}/files/${fileOf[k]}`,{method:'DELETE'}).catch(()=>{});
  delete known[k];delete fileOf[k]}

function desired(state){
  const m={posts:{},transactions:{},payouts:{},artists:{}};
  (state.posts||[]).forEach(p=>m.posts[String(p.id)]=p);
  (state.transactions||[]).forEach(t=>m.transactions[String(t.id)]=t);
  (state.payouts||[]).forEach(p=>m.payouts[String(p.id)]=p);
  Object.values(state.artists||{}).forEach(a=>{const{password,...pub}=a;m.artists[artistId(a)]=pub});
  return m}

async function doSync(state){
  if(pullP)await pullP.catch(()=>{});
  const want=desired(state);
  if(admin)await put('settings','main',state.settings);
  for(const col of Object.keys(want))for(const[id,obj]of Object.entries(want[col])){
    try{await put(col,id,obj)}catch(e){console.warn('Appwrite',col,id,e.message)}}
  if(admin)for(const k of Object.keys(known)){
    const[col,id]=k.split('/');
    if(col!=='settings'&&!(id in want[col])){try{await remove(k)}catch(e){console.warn('Appwrite suppression',k,e.message)}}}}

async function doPull(){
  if(session||fallback){
    try{const me=await api('/account');admin=(me.labels||[]).includes('admin');if(!admin)throw 0}
    catch(e){admin=false;session=fallback='';sessionStorage.removeItem('gvs_session');sessionStorage.removeItem('gvs_fallback')}}
  const res={admin},cols=admin?COLS:['settings','posts'];
  await Promise.all(cols.map(async col=>{
    try{
      const items=await list(col);
      const parsed=items.map(d=>{const o=JSON.parse(d.data);known[col+'/'+d.$id]=JSON.stringify({data:d.data});if(o&&o.fileId)fileOf[col+'/'+d.$id]=o.fileId;return[d.$id,o]});
      if(col==='settings'){if(parsed.length)res.settings=parsed[0][1]}
      else if(col==='artists'){res.artists={};parsed.forEach(([,o])=>res.artists[String(o.name).toLowerCase()]=o)}
      else res[col]=parsed.map(x=>x[1])
    }catch(e){console.warn('Appwrite lecture',col,e.message)}}));
  return res}

async function uploadVideo(file){
  const size=file.size,CH=5*1024*1024;let id='unique()',out=null;
  for(let start=0;start<size||start===0;start+=CH){
    const end=Math.min(start+CH,size),fd=new FormData();
    fd.append('fileId','unique()');fd.append('permissions[]','read("any")');
    fd.append('file',file.slice(start,end),file.name||'video.mp4');
    const h={};if(size>CH){h['Content-Range']=`bytes ${start}-${end-1}/${size}`;if(out)h['x-appwrite-id']=out.$id}
    out=await api(`/storage/buckets/${C.bucket}/files`,{method:'POST',headers:h,body:fd});
    if(end>=size)break}
  return{id:out.$id,url:viewUrl(out.$id)}}
const viewUrl=id=>`${C.endpoint}/storage/buckets/${C.bucket}/files/${id}/view?project=${C.project}`;
const downloadUrl=id=>`${C.endpoint}/storage/buckets/${C.bucket}/files/${id}/download?project=${C.project}`;

window.GVS={
  config:C,
  pull(){return pullP=doPull()},
  flush(){return queue},
  sync(state){const snap=JSON.parse(JSON.stringify(state));queue=queue.then(()=>doSync(snap)).catch(e=>console.warn('Appwrite sync',e.message));return queue},
  async login(email,password){
    const s=await api('/account/sessions/email',{method:'POST',headers:JSONH,body:JSON.stringify({email,password})});
    if(s.secret){session=s.secret;sessionStorage.setItem('gvs_session',session)}
    const me=await api('/account');
    if(!(me.labels||[]).includes('admin')){await this.logout();throw new Error('Ce compte n’a pas le label « admin ».')}
    admin=true},
  async logout(){try{await api('/account/sessions/current',{method:'DELETE'})}catch(e){}session=fallback='';admin=false;sessionStorage.removeItem('gvs_session');sessionStorage.removeItem('gvs_fallback')},
  uploadVideo,viewUrl,downloadUrl,isAdmin:()=>admin
};
})();
