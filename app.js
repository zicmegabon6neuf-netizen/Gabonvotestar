const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let settings={price:100,commission:10,moov:"*555*2*062098889"};
let transactions=[
{id:1,name:"M. Ella",artist:"Shanel",ref:"MV-836492",amount:100,status:"pending",votes:1},
{id:2,name:"Patrick",artist:"J-Rio",ref:"MV-836511",amount:200,status:"pending",votes:2},
{id:3,name:"Ariane",artist:"Shanel",ref:"MV-836440",amount:100,status:"approved",votes:1}
];
let posts=[
{id:1,artist:"Shanel",caption:"Nouveau clip — vibes du week-end ✨",likes:248,favs:51,comments:18,cover:"c1",emoji:"🎤"},
{id:2,artist:"J-Rio",caption:"Afrobeat du bled, on est ensemble 🇬🇦",likes:193,favs:34,comments:12,cover:"c2",emoji:"🎧"},
{id:3,artist:"Mina",caption:"Un extrait inédit pour la famille !",likes:152,favs:29,comments:8,cover:"c3",emoji:"🎶"}
];
let pendingVoteArtist="Shanel", localPosts=[], nextId=10;
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),2600)}
function showView(view){$$(".view").forEach(v=>v.classList.add("hidden"));$("#"+view+"View").classList.remove("hidden");$$(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===view));}
$$("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
function renderFeed(){let all=[...localPosts,...posts];if($("#sortFeed").value==="popular")all.sort((a,b)=>b.likes-a.likes);else all.sort((a,b)=>b.id-a.id);
$("#feed").innerHTML=all.map(p=>`<article class="video-card"><div class="video-cover ${p.cover||"c1"}">${p.video?`<video src="${p.video}" controls></video>`:`<div class="play">▶</div><span>${p.emoji||"🎵"}</span>`}<span class="cliptag">#GabonVoteStar</span></div><div class="video-info"><h3>${escapeHtml(p.artist)}</h3><p>${escapeHtml(p.caption)}</p><div class="actions"><button class="action" onclick="likePost(${p.id})">♥ ${p.likes}</button><button class="action" onclick="favPost(${p.id})">☆ Favoris</button><button class="action" onclick="commentPost(${p.id})">💬 ${p.comments}</button></div></div></article>`).join("")}
function findPost(id){return [...localPosts,...posts].find(p=>p.id===id)}
function likePost(id){let p=findPost(id);p.likes++;renderFeed()}
function favPost(id){let p=findPost(id);p.favs++;toast("Ajouté aux favoris (démo)")}
function commentPost(id){let p=findPost(id);let c=prompt("Écris ton commentaire :");if(c&&c.trim()){p.comments++;toast("Commentaire ajouté (démo)");renderFeed()}}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("#sortFeed").addEventListener("change",renderFeed);
$("#openUpload").onclick=()=>$("#uploadModal").classList.remove("hidden");
$$("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal").classList.add("hidden"));
let chosenFile=null;
$("#videoFile").addEventListener("change",e=>{chosenFile=e.target.files[0];$("#preview").innerHTML="";if(chosenFile){let v=document.createElement("video");v.controls=true;v.src=URL.createObjectURL(chosenFile);$("#preview").append(v)}});
$("#publish").onclick=()=>{let name=$("#artistName").value.trim();if(!name||!chosenFile){toast("Ajoute le nom de l’artiste et une vidéo");return}localPosts.unshift({id:nextId++,artist:name,caption:"Nouvelle publication",likes:0,favs:0,comments:0,cover:"c3",emoji:"🎬",video:URL.createObjectURL(chosenFile)});renderFeed();$("#uploadModal").classList.add("hidden");$("#artistName").value="";$("#videoFile").value="";chosenFile=null;toast("Vidéo publiée dans cette session")};
function openVote(artist){pendingVoteArtist=artist;$("#selectedArtist").textContent=artist;$("#votePrice").textContent=settings.price;$("#moovCode").textContent=settings.moov;$("#voteModal").classList.remove("hidden")}
window.openVote=openVote;
$("#copyCode").onclick=()=>{navigator.clipboard?.writeText(settings.moov).then(()=>toast("Code copié")).catch(()=>toast("Code : "+settings.moov))};
$("#submitVote").onclick=()=>{let ref=$("#voteRef").value.trim(),qty=Math.max(1,Math.min(20,parseInt($("#voteQty").value)||1));if(!ref){toast("Saisis la référence de transaction");return}transactions.unshift({id:Date.now(),name:"Votant (non renseigné)",artist:pendingVoteArtist,ref,amount:settings.price*qty,status:"pending",votes:qty});$("#voteModal").classList.add("hidden");$("#voteRef").value="";renderAdmin();toast("Demande envoyée — en attente de vérification")};
function renderAdmin(){let approved=transactions.filter(t=>t.status==="approved"),pending=transactions.filter(t=>t.status==="pending"),net=approved.reduce((s,t)=>s+t.amount*settings.commission/100,0),votes=approved.reduce((s,t)=>s+t.votes,0);$("#net").textContent=net.toLocaleString("fr-FR")+" FCFA";$("#approved").textContent=approved.length;$("#pending").textContent=pending.length;$("#voteCount").textContent=votes;$("#transactions").innerHTML=transactions.length?transactions.map(t=>`<div class="tx"><div><b>${escapeHtml(t.artist)} — ${t.amount} FCFA</b><small>${escapeHtml(t.name)} · réf. ${escapeHtml(t.ref)} · ${t.status==="approved"?"Approuvé":t.status==="rejected"?"Refusé":"À vérifier"}</small></div><div>${t.status==="pending"?`<button class="primary" onclick="approveTx(${t.id})">Valider</button><button class="secondary" onclick="rejectTx(${t.id})">Refuser</button>`:`<small>${t.status==="approved"?"✓":"—"}</small>`}</div></div>`).join(""):"<p class='small'>Aucune transaction.</p>";$("#price").value=settings.price;$("#commission").value=settings.commission;$("#moov").value=settings.moov;$("#votePriceLabel").textContent=settings.price+" FCFA"}
window.approveTx=id=>{let t=transactions.find(x=>x.id===id);if(t&&t.status==="pending"){t.status="approved";renderAdmin();toast("Transaction approuvée (démo)")}};
window.rejectTx=id=>{let t=transactions.find(x=>x.id===id);if(t&&t.status==="pending"){t.status="rejected";renderAdmin();toast("Transaction refusée")}};
$("#saveSettings").onclick=()=>{settings.price=Math.max(1,Number($("#price").value)||100);settings.commission=Math.max(0,Math.min(100,Number($("#commission").value)||0));settings.moov=$("#moov").value.trim()||"*555*2*062098889";renderAdmin();toast("Paramètres mis à jour")};
$("#addTx").onclick=()=>{let name=$("#txName").value.trim(),artist=$("#txArtist").value.trim(),ref=$("#txRef").value.trim();if(!name||!artist||!ref){toast("Remplis les trois champs");return}transactions.unshift({id:Date.now(),name,artist,ref,amount:settings.price,status:"pending",votes:1});$("#txName").value=$("#txArtist").value=$("#txRef").value="";renderAdmin();toast("Transaction ajoutée")};
$("#exportCsv").onclick=()=>{let rows=[["Nom","Artiste","Référence","Montant FCFA","Votes","Statut"],...transactions.map(t=>[t.name,t.artist,t.ref,t.amount,t.votes,t.status])];let csv=rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(",")).join("\n");let a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));a.download="gabon-vote-star-transactions.csv";a.click()};
renderFeed();renderAdmin();
