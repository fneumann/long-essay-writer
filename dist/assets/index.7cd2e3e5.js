import{l as z,d as V,a as D,D as me,m as le,b as p,w as m,v as g,u as a,o as h,c as w,e as o,f as r,V as _,g as l,t as x,h as y,i as I,j as $,k as ie,n as B,p as K,q as H,F as O,r as te,s as M,x as ge,y as ce,z as k,A as fe,B as de,C as U,E as re,G as se,H as pe,I as _e,J as ye,K as we,L as J,M as ne,N as ue,O as he,P as ve,Q as Se,R as ke,S as Ie,T as xe}from"./vendor.08b318ad.js";const be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerpolicy&&(c.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?c.credentials="include":s.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}};be();const Z=z.createInstance({storeName:"writer-settings",description:"Settings data"}),q=V("settings",{state:()=>({headline_scheme:null,formatting_options:null,notice_boards:null,copy_allowed:null,primary_color:null,primary_text_color:null}),getters:{primaryColorCss:e=>e.primary_color?"#"+e.primary_color:"",primaryTextColorCss:e=>e.primary_text_color?"#"+e.primary_text_color:"",primaryTextColorFullCss:e=>e.primary_text_color?"color: #"+e.primary_text_color+";":""},actions:{setData(e){this.headline_scheme=e.headline_scheme,this.formatting_options=e.formatting_options,this.notice_boards=e.notice_boards,this.copy_allowed=e.copy_allowed,this.primary_color=e.primary_color,this.primary_text_color=e.primary_text_color},async clearStorage(){try{await Z.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await Z.getItem("settings");this.setData(e)}catch(e){console.log(e)}},async loadFromData(e){try{await Z.setItem("settings",e),this.setData(e)}catch(t){console.log(t)}}}}),Q=z.createInstance({storeName:"writer-layout",description:"Layout data"}),j=V("layout",{state:()=>({expandedColumn:"left",leftContent:"instructions",rightContent:"essay",showTimer:!0}),getters:{isLeftExpanded:e=>e.expandedColumn=="left",isRightExpanded:e=>e.expandedColumn=="right",isLeftVisible:e=>e.expandedColumn!="right",isRightVisible:e=>e.expandedColumn!="left",isInstructionsSelected:e=>e.leftContent=="instructions",isResourcesSelected:e=>e.leftContent=="resources",isInstructionsVisible:e=>e.expandedColumn!="right"&&e.leftContent=="instructions",isResourcesVisible:e=>e.expandedColumn!="right"&&e.leftContent=="resources",isEssayVisible:e=>e.expandedColumn!="left"&&e.rightContent=="essay"},actions:{async clearStorage(){try{await Q.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await Q.getItem("layout");e&&(this.expandedColumn=e.expandedColumn,this.rightContent=e.rightContent,this.showTimer=e.showTimer)}catch(e){console.log(e)}},async saveToStorage(){try{await Q.setItem("layout",{expandedColumn:this.expandedColumn,leftContent:this.leftContent,rightContent:this.rightContent,showTimer:this.showTimer})}catch(e){console.log(e)}},showInstructions(){this.setLeftVisible(),this.leftContent="instructions",this.saveToStorage()},showResources(){this.setLeftVisible(),this.leftContent="resources",this.saveToStorage()},showEssay(){this.setRightVisible(),this.rightContent="essay",this.saveToStorage()},setLeftVisible(){this.isLeftVisible||(this.expandedColumn="left",this.saveToStorage())},setRightVisible(){this.isRightVisible||(this.expandedColumn="right",this.saveToStorage())},setLeftExpanded(e){this.expandedColumn=e?"left":"none",this.saveToStorage()},setRightExpanded(e){this.expandedColumn=e?"right":"none",this.saveToStorage()},toggleTimer(){this.showTimer=!this.showTimer,this.saveToStorage()}}}),b=z.createInstance({storeName:"writer-resources",description:"Resource data"}),N=V("resources",{state:()=>({keys:[],resources:[],activeKey:""}),getters:{hasResources:e=>e.resources.length>0,activeTitle(e){const t=e.resources.find(n=>n.key==e.activeKey);return t?t.title:""},getResource(e){return t=>e.resources.find(n=>n.key==t)},isActive(e){return t=>e.activeKey==t.key}},actions:{async clearStorage(){try{await b.clear()}catch(e){console.log(e)}},async loadFromStorage(){var e;try{const t=await b.getItem("resourceKeys");t&&(this.keys=JSON.parse(t)),this.activeKey=(e=await b.getItem("activeKey"))!=null?e:[],this.resources=[];let n=0;for(;n<this.keys.length;){let i=await b.getItem(this.keys[n]);this.resources.push(i),n++}await this.loadFiles()}catch(t){console.log(t)}},async loadFromData(e){const t=E();try{await b.clear(),this.keys=[],this.resources=[];let n=0;for(;n<e.length;){let i=e[n];i.url=t.resourceUrl(i.key),this.resources.push(i),this.keys.push(i.key),await b.setItem(i.key,i),n++}await b.setItem("resourceKeys",JSON.stringify(this.keys)),await b.setItem("activeKey",this.activeKey),await this.loadFiles()}catch(n){console.log(n)}},async selectResource(e){this.activeKey=e.key,await b.setItem("activeKey",this.activeKey)},async loadFiles(){let e=0;for(;e<this.keys.length;){let t=this.getResource(this.keys[e]),n=null;if(t.type=="file")try{console.log("preload "+t.title+"..."),n=await D(t.url,{responseType:"blob",timeout:6e4}),t.objectUrl=URL.createObjectURL(n.data),console.log("finished. ")}catch(i){return console.error(i),!1}e++}}}}),f=z.createInstance({storeName:"writer-essay",description:"Essay data"}),R=new me,X=1e3,Ce=5e3,Te=5e3,Ee=10,Le=1e3,Y={storedContent:"",storedHash:"",history:[],lastStoredIndex:-1,lastSentIndex:-1,lastSentHash:"",currentContent:"",sumOfDistances:0,lastCheck:0,lastSave:0,lastSending:0};let A=0,oe=0;const F=V("essay",{state:()=>Y,getters:{hasHistory:e=>e.history.length>0,historyLength:e=>e.history.length,openSendings:e=>e.lastStoredIndex-e.lastSentIndex,unsentHistory(e){let t=[],n=e.lastSentIndex+1;for(;n<e.history.length;)t.push(e.history[n]),n++;return t},formatTimestamp(){return e=>new Date(e).toISOString().slice(0,19).replace("T"," ")},formatIndex(){return e=>e.toString().padStart(9,"0")},makeHash(){return(e,t)=>le(e+t)}},actions:{async clearStorage(){try{await f.clear()}catch(e){console.log(e)}},addToHistory(e,t=0){let n=this.history.push(e)-1;return e.is_delta?this.sumOfDistances+=t:this.sumOfDistances=0,n},async loadFromData(e){var t,n,i;A=1;try{this.$state=Y,this.currentContent=(t=e.content)!=null?t:"",this.storedContent=(n=e.content)!=null?n:"",this.storedHash=(i=e.hash)!=null?i:"",await f.clear(),await f.setItem("storedContent",this.storedContent),await f.setItem("storedHash",this.storedHash);let s=0;for(;s<e.steps.length;){let c=e.steps[s],d={is_delta:c.is_delta,timestamp:c.timestamp,content:c.content,hash_before:c.hash_before,hash_after:c.hash_after};this.addToHistory(d),await f.setItem(this.formatIndex(s),d),s++}this.lastStoredIndex=this.history.length-1,this.lastSentIndex=this.history.length-1,this.lastSentHash=this.storedHash,await f.setItem("lastStoredIndex",this.lastStoredIndex),await f.setItem("lastSentIndex",this.lastSentIndex),await f.setItem("lastSentHash",this.lastSentHash)}catch(s){console.log(s)}A=0,setInterval(this.updateContent,X)},async loadFromStorage(){var e,t,n,i,s;A=1;try{this.$state=Y,this.lastStoredIndex=(e=await f.getItem("lastStoredIndex"))!=null?e:-1,this.lastSentIndex=(t=await f.getItem("lastSentIndex"))!=null?t:-1,this.lastSentHash=(n=await f.getItem("lastSentHash"))!=null?n:"",this.storedContent=(i=await f.getItem("storedContent"))!=null?i:"",this.storedHash=(s=await f.getItem("storedHash"))!=null?s:"",this.currentContent=this.storedContent;let c=0;for(;c<=this.lastStoredIndex;){let d=await f.getItem(this.formatIndex(c));if(d==null)break;this.addToHistory(d),c++}}catch(c){console.log(c)}A=0,setInterval(this.updateContent,X)},async updateContent(e=!1){const t=E(),n=Date.now();if(!(n-this.lastCheck<X||A++||C().writingEndReached)){try{const s=this.currentContent+"";let c=null;if(s!=this.storedContent){const d=this.makeHash(s,t.serverTime(n));let u=R.diff_main(this.storedContent,s);R.diff_cleanupEfficiency(u);const v=R.diff_levenshtein(u),S=R.patch_toText(R.patch_make(this.storedContent,u)),G=R.patch_apply(R.patch_fromText(S),this.storedContent);this.history.length==0||S.length>s.length||this.sumOfDistances+v>Le||G[0]!=s?c={is_delta:0,timestamp:t.serverTime(n),content:s,hash_before:this.storedHash,hash_after:d}:(v>=Ee||n-this.lastSave>Ce)&&(c={is_delta:1,timestamp:t.serverTime(n),content:S,hash_before:this.storedHash,hash_after:d}),c!==null&&(this.lastStoredIndex=this.addToHistory(c,v),this.lastSave=n,this.storedContent=s,this.storedHash=d,await f.setItem("storedContent",this.storedContent),await f.setItem("storedHash",this.storedHash),await f.setItem(this.formatIndex(this.lastStoredIndex),c),await f.setItem("lastStoredIndex",this.lastStoredIndex),console.log("Delta:",c.is_delta,"| Distance (sum): ",v,"(",this.sumOfDistances,")","| Editor: ",e,"| Duration:",Date.now()-n,"ms"))}this.lastCheck=n,this.sendUpdate()}catch(s){console.error(s)}A=0}},async sendUpdate(){if(Date.now()-this.lastSending<Te||oe++)return;let e=[],t=this.lastSentIndex,n=this.lastSentHash,i=this.lastSentIndex+1;for(;i<this.history.length;)e.push(this.history[i]),n=this.history[i].hash_after,t=i++;e.length>0&&(await E().saveWritingStepsToBackend(e)&&(this.lastSentIndex=t,await f.setItem("lastSentIndex",t),await f.setItem("lastSentHash",n)),this.lastSending=Date.now()),oe=!1},async hasUnsentSavingsInStorage(){var e,t;return this.lastStoredIndex=(e=await f.getItem("lastStoredIndex"))!=null?e:-1,this.lastSentIndex=(t=await f.getItem("lastSentIndex"))!=null?t:-1,this.lastStoredIndex>this.lastSentIndex},async hasHashInStorage(e){var t;return this.lastSentHash=(t=await f.getItem("lastSentHash"))!=null?t:"",e==this.lastSentHash}}}),T=z.createInstance({storeName:"writer-alerts",description:"Alert Messages"}),ae=V("alerts",{state:()=>({keys:[],alerts:[],activeKey:"",showAllAlerts:!1}),getters:{countAlerts:e=>e.alerts.length,hasAlerts:e=>e.alerts.length>0,hasActiveAlert:e=>e.activeKey!="",activeMessage(e){const t=e.alerts.find(n=>n.key==e.activeKey);return t?t.message:""},getAlert(e){return t=>e.alerts.find(n=>n.key==t)},formatTimestamp(){return e=>new Date(e*1e3).toLocaleString()}},actions:{showAlerts(){this.showAllAlerts=!0},hideAlert(){this.activeKey="",this.showAllAlerts=!1},async clearStorage(){try{await T.clear()}catch(e){console.log(e)}},async loadFromStorage(){var e;try{const t=await T.getItem("alertKeys");t&&(this.keys=JSON.parse(t)),this.activeKey=(e=await T.getItem("activeKey"))!=null?e:"",this.alerts=[];let n=0;for(;n<this.alerts.length;){let i=await T.getItem(this.keys[n]);this.alerts.push(i),n++}}catch(t){console.log(t)}},async loadFromData(e){try{await T.clear();let t=[],n=[],i=0;for(;i<e.length;){let s=e[i];typeof this.getAlert(s.key)=="undefined"&&(this.activeKey=s.key),n.push(s),t.push(s.key),await T.setItem(s.key,s),i++}this.keys=t,this.alerts=n,await T.setItem("alertKeys",JSON.stringify(this.keys)),await T.setItem("activeKey",this.activeKey)}catch(t){console.log(t)}}}}),E=V("api",{state:()=>({backendUrl:"",returnUrl:"",userKey:"",environmentKey:"",dataToken:"",fileToken:"",timeOffset:0,initialized:!1,review:!1,showInitFailure:!1,showReplaceConfirmation:!1,showReloadConfirmation:!1,showFinalizeFailure:!1,showAuthorizeFailure:!1}),getters:{requestConfig(e){return function(t){let n=e.backendUrl,i=new URLSearchParams,s=n.search(/\?+/);return s!=-1&&(i=new URLSearchParams(n.substr(s)),n=n.substr(0,s)),i.append("LongEssayUser",e.userKey),i.append("LongEssayEnvironment",e.environmentKey),i.append("LongEssaySignature",le(e.userKey+e.environmentKey+t)),{baseURL:n,params:i,timeout:3e4,responseType:"json",responseEncoding:"utf8"}}},resourceUrl(){return function(e){const t=this.requestConfig(this.fileToken);return t.baseURL+"/file/"+e+"?"+t.params.toString()}},serverTime(e){return t=>t==0?0:Math.floor((t-e.timeOffset)/1e3)}},actions:{async init(){var i;let e=!1,t=p.get("LongEssayHash");if(this.backendUrl=localStorage.getItem("writerBackendUrl"),this.returnUrl=localStorage.getItem("writerReturnUrl"),this.userKey=localStorage.getItem("writerUserKey"),this.environmentKey=localStorage.getItem("writerEnvironmentKey"),this.dataToken=localStorage.getItem("writerDataToken"),this.fileToken=localStorage.getItem("writerFileToken"),this.timeOffset=Math.floor((i=localStorage.getItem("writerTimeOffset"))!=null?i:0),!!p.get("LongEssayUser")&&p.get("LongEssayUser")!==this.userKey&&(this.userKey=p.get("LongEssayUser"),e=!0),!!p.get("LongEssayEnvironment")&&p.get("LongEssayEnvironment")!==this.environmentKey&&(this.environmentKey=p.get("LongEssayEnvironment"),e=!0),!!p.get("LongEssayBackend")&&p.get("LongEssayBackend")!==this.backendUrl&&(this.backendUrl=p.get("LongEssayBackend")),!!p.get("LongEssayReturn")&&p.get("LongEssayReturn")!==this.returnUrl&&(this.returnUrl=p.get("LongEssayReturn")),!!p.get("LongEssayToken")&&p.get("LongEssayToken")!==this.dataToken&&(this.dataToken=p.get("LongEssayToken")),!this.backendUrl||!this.returnUrl||!this.userKey||!this.environmentKey||!this.dataToken){this.showInitFailure=!0;return}const n=F();e?await n.hasUnsentSavingsInStorage()?(console.log("init: new context, open savings"),this.showReplaceConfirmation=!0):(console.log("init: new context, no open savings"),await this.loadDataFromBackend()):t?await n.hasHashInStorage(t)?(console.log("init: same context, same hash"),await this.loadDataFromStorage()):await n.hasUnsentSavingsInStorage()?(console.log("init: same context, hashes differ, open savings"),this.showReloadConfirmation=!0):(console.log("init: same context, hashes differ, no open savings"),await this.loadDataFromBackend()):await n.hasUnsentSavingsInStorage()?(console.log("init: same context, no server hash, open savings"),await this.loadDataFromStorage()):(console.log("init: same context, no server hash, no open savings"),await this.loadDataFromBackend()),setInterval(this.checkUpdate,5e3)},async loadDataFromStorage(){console.log("loadDataFromStorage..."),this.updateConfig();const e=q(),t=C(),n=N(),i=F(),s=j();await e.loadFromStorage(),await t.loadFromStorage(),await n.loadFromStorage(),await i.loadFromStorage(),await s.loadFromStorage(),this.initialized=!0},async loadDataFromBackend(){console.log("loadDataFromBackend..."),this.updateConfig();let e={};try{e=await D.get("/data",this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e)}catch(c){console.error(c),this.showInitFailure=!0;return}const t=q(),n=C(),i=N(),s=F();await t.loadFromData(e.data.settings),await n.loadFromData(e.data.task),await i.loadFromData(e.data.resources),await s.loadFromData(e.data.essay),e.data.essay.started||await this.sendStart(),this.initialized=!0},async checkUpdate(){let e={};try{e=await D.get("/update",this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e)}catch(i){return console.error(i),!1}await C().loadFromData(e.data.task),await ae().loadFromData(e.data.alerts)},async sendStart(){let e={},t={started:this.serverTime(Date.now())};try{return e=await D.put("/start",t,this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e),!0}catch(n){return console.error(n),this.showInitFailure=!0,!1}},async saveWritingStepsToBackend(e){let t={},n={steps:e};try{return t=await D.put("/steps",n,this.requestConfig(this.dataToken)),this.setTimeOffset(t),this.refreshToken(t),!0}catch(i){return console.error(i),!1}},async saveFinalContentToBackend(e,t,n,i){let s={},c={steps:e,content:t,hash:n,authorized:i};try{return s=await D.put("/final",c,this.requestConfig(this.dataToken)),this.refreshToken(s),!0}catch(d){return console.error(d),!1}},updateConfig(){p.remove("LongEssayBackend"),p.remove("LongEssayReturn"),p.remove("LongEssayUser"),p.remove("LongEssayEnvironment"),p.remove("LongEssayToken"),p.remove("LongEssayHash"),localStorage.setItem("writerBackendUrl",this.backendUrl),localStorage.setItem("writerReturnUrl",this.returnUrl),localStorage.setItem("writerUserKey",this.userKey),localStorage.setItem("writerEnvironmentKey",this.environmentKey),localStorage.setItem("writerDataToken",this.dataToken),localStorage.setItem("writerFileToken",this.fileToken)},setTimeOffset(e){const t=e.headers.longessaytime*1e3,n=Date.now();this.timeOffset=n-t,localStorage.setItem("writerTimeOffset",this.timeOffset)},refreshToken(e){e.headers.longessaydatatoken&&(this.dataToken=e.headers.longessaydatatoken,localStorage.setItem("writerDataToken",this.dataToken)),e.headers.longessayfiletoken&&(this.fileToken=e.headers.longessayfiletoken,localStorage.setItem("writerFileToken",this.fileToken))},async finalize(e){const t=q(),n=C(),i=N(),s=F(),c=j();if((e||s.openSendings>0)&&!await this.saveFinalContentToBackend(s.unsentHistory,s.storedContent,s.storedHash,e)){this.showFinalizeFailure=!0,this.showAuthorizeFailure=e;return}await t.clearStorage(),await n.clearStorage(),await i.clearStorage(),await s.clearStorage(),await c.clearStorage(),localStorage.clear(),window.location=this.returnUrl}}}),ee=z.createInstance({storeName:"writer-task",description:"Task data"}),C=V("task",{state:()=>({title:null,writer_name:null,instructions:null,writing_end:null,remaining_time:null}),getters:{hasWritingEnd:e=>!!e.writing_end,writingEndReached:e=>e.remaining_time===0},actions:{setData(e){this.title=e.title,this.instructions=e.instructions,this.writer_name=e.writer_name,this.writing_end=e.writing_end},async clearStorage(){try{await ee.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await ee.getItem("task");this.setData(e)}catch(e){console.log(e)}this.updateRemainingTime(),setInterval(this.updateRemainingTime,1e3)},async loadFromData(e){try{await ee.setItem("task",e),this.setData(e)}catch(t){console.log(t)}this.updateRemainingTime(),setInterval(this.updateRemainingTime,1e3)},updateRemainingTime(){const e=E();this.writing_end?this.remaining_time=Math.max(0,this.writing_end-e.serverTime(Date.now())):this.remaining_time=null,this.writingEndReached&&(e.review=!0)}}}),Re={setup(e){const t=C(),n=j();function i(s){const c=("00"+Math.floor(s)%60).slice(-2),d=("00"+Math.floor(s/60)%60).slice(-2),u=("00"+Math.floor(s/3600)%24).slice(-2),v=Math.floor(s/86400);return v>1?v+" Tage "+u+" Stunden":v>0?v+" Tag "+u+" Stunden":u!="00"?u+":"+d+":"+c+" Stunden":d!="00"?d+":"+c+" Minuten":c+" Sekunden"}return(s,c)=>m((h(),w(y,{onClick:c[0]||(c[0]=d=>a(n).toggleTimer())},{default:o(()=>[r(_,{left:"",icon:"mdi-clock-outline"}),m(l("span",null,x(i(a(t).remaining_time)),513),[[g,a(n).showTimer]])]),_:1},512)),[[g,!a(t).writingEndReached]])}},Fe=M(" Nachricht der Aufsicht: "),$e=l("span",null,"OK",-1),Ve=M(" Nachrichten der Aufsicht: "),Ae=l("br",null,null,-1),De=l("span",null,"OK",-1),Ue={setup(e){const t=ae();return(n,i)=>(h(),I(O,null,[m(r(y,{onClick:i[0]||(i[0]=s=>a(t).showAlerts())},{default:o(()=>[r(_,{left:"",icon:"mdi-bell-outline"}),m(l("span",null,"1 Nachricht",512),[[g,a(t).countAlerts==1]]),m(l("span",null,x(a(t).countAlerts)+" Nachrichten",513),[[g,a(t).countAlerts>1]])]),_:1},512),[[g,a(t).hasAlerts]]),r(H,{persistent:"",modelValue:a(t).hasActiveAlert,"onUpdate:modelValue":i[2]||(i[2]=s=>a(t).hasActiveAlert=s)},{default:o(()=>[r($,null,{default:o(()=>[r(ie,null,{default:o(()=>[Fe]),_:1}),r(B,null,{default:o(()=>[l("p",null,x(a(t).activeMessage),1)]),_:1}),r(K,null,{default:o(()=>[r(y,{onClick:i[1]||(i[1]=s=>a(t).hideAlert())},{default:o(()=>[r(_,{left:"",icon:"mdi-check"}),$e]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(H,{persistent:"",modelValue:a(t).showAllAlerts,"onUpdate:modelValue":i[4]||(i[4]=s=>a(t).showAllAlerts=s)},{default:o(()=>[r($,null,{default:o(()=>[r(ie,null,{default:o(()=>[Ve]),_:1}),r(B,null,{default:o(()=>[(h(!0),I(O,null,te(a(t).alerts,s=>(h(),I(O,{key:s.key},[l("p",null,[l("strong",null,x(a(t).formatTimestamp(s.time)),1)]),l("p",null,x(s.message),1),Ae],64))),128))]),_:1}),r(K,null,{default:o(()=>[r(y,{onClick:i[3]||(i[3]=s=>a(t).hideAlert())},{default:o(()=>[r(_,{left:"",icon:"mdi-check"}),De]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}},Be=l("span",null,"Beenden ...",-1),Ke=M("Unterbrechen"),He=M("Vorschau / Abgabe ..."),Oe={setup(e){const t=E(),n=C(),i=ae();function s(){var c;return(n.writer_name==null?"":n.writer_name+", ")+((c=n.title)!=null?c:"")}return(c,d)=>(h(),w(se,{elevation:"1",color:"white",density:"compact"},{default:o(()=>[r(ge,null,{default:o(()=>[M(x(s()),1)]),_:1}),r(ce),a(i).hasAlerts?(h(),w(Ue,{key:0})):k("",!0),a(n).hasWritingEnd?(h(),w(Re,{key:1})):k("",!0),m(r(y,null,{default:o(()=>[r(_,{left:"",icon:"mdi-logout-variant"}),Be,r(fe,{activator:"parent",anchor:"bottom end",origin:"end top"},{default:o(()=>[r($,null,{default:o(()=>[r(de,null,{default:o(()=>[r(U,{href:a(t).returnUrl},{default:o(()=>[r(re,null,{default:o(()=>[Ke]),_:1})]),_:1},8,["href"]),r(U,{onClick:d[0]||(d[0]=u=>a(t).review=!0)},{default:o(()=>[r(re,null,{default:o(()=>[He]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512),[[g,!a(t).review]])]),_:1}))}};var P=(e,t)=>{const n=e.__vccOpts||e;for(const[i,s]of t)n[i]=s;return n};const Ne={setup(e){const t=j(),n=N();function i(){document.getElementById("app-navigation-drawer").dispatchEvent(new Event("mouseenter"))}function s(){document.getElementById("app-navigation-drawer").dispatchEvent(new Event("mouseleave"))}function c(u){u.type=="url"?window.open(u.source,"long-essay-writer-resource-"+u.key):(n.selectResource(u),t.showResources())}function d(u){switch(u.type){case"url":return n.isActive(u)&&t.isResourcesVisible?"mdi-file-link":"mdi-file-link-outline";default:return n.isActive(u)&&t.isResourcesVisible?"mdi-file":"mdi-file-outline"}}return(u,v)=>(h(),w(ye,{id:"app-navigation-drawer",elevation:"2",color:"grey-lighten-4",width:"500",permanent:"",rail:"","expand-on-hover":""},{default:o(()=>[r(de,{color:"grey-lighten-4"},{default:o(()=>[r(U,{onClick:v[0]||(v[0]=S=>{a(t).showInstructions(),s()}),"prepend-icon":a(t).isInstructionsVisible?"mdi-text-box":"mdi-text-box-outline",title:"Aufgabenstellung"},null,8,["prepend-icon"]),r(U,{onClick:v[1]||(v[1]=S=>{a(t).showEssay(),s()}),"prepend-icon":a(t).isEssayVisible?"mdi-file-edit":"mdi-file-edit-outline",title:"Essay schreiben"},null,8,["prepend-icon"]),m(r(pe,null,{activator:o(({props:S})=>[r(U,_e(S,{onMouseenter:v[2]||(v[2]=G=>i()),"prepend-icon":a(t).isResourcesVisible?"mdi-book-open":"mdi-book-open-outline",title:"Material"}),null,16,["prepend-icon"])]),default:o(()=>[(h(!0),I(O,null,te(a(n).resources,S=>(h(),w(U,{onClick:G=>{c(S),s()},"prepend-icon":d(S),title:S.title,key:S.key},null,8,["onClick","prepend-icon","title"]))),128))]),_:1},512),[[g,a(n).hasResources]])]),_:1})]),_:1}))}};var ze=P(Ne,[["__scopeId","data-v-bbfa5284"]]);const Me={setup(e){const t=F();return(n,i)=>(h(),w(se,{position:"bottom",height:"48",color:"grey-lighten-5",elevation:"1"},{default:o(()=>[M(" \xC4nderungen: "+x(a(t).historyLength)+" | Zu senden: "+x(a(t).openSendings),1)]),_:1}))}};const qe=["innerHTML"],je={setup(e){const t=C();return(n,i)=>(h(),I("div",{id:"app-instructions",innerHTML:a(t).instructions},null,8,qe))}};var Pe=P(je,[["__scopeId","data-v-e8fd4a6e"]]);const Je={class:"resources"},We={key:0},Ge=["data"],Ze={setup(e){const t=N();return(n,i)=>(h(),I("div",Je,[(h(!0),I(O,null,te(a(t).resources,s=>(h(),I(O,{key:s.key},[s.type=="file"?m((h(),I("div",We,[s.mimetype=="application/pdf"?(h(),I("object",{key:0,type:"application/pdf",data:s.objectUrl,width:"100%",height:"100%"},null,8,Ge)):k("",!0)],512)),[[g,a(t).isActive(s)]]):k("",!0)],64))),128))]))}};var Qe=P(Ze,[["__scopeId","data-v-2e61ae4e"]]);const Xe={setup(e){const t=F(),n=q();function i(){switch(n.formatting_options){case"full":return"undo redo | formatselect | bold italic underline | bullist numlist | removeformat | charmap";case"medium":return"undo redo | bold italic underline | bullist numlist | removeformat | charmap";case"minimal":return"undo redo | bold italic underline | removeformat | charmap";case"none":default:return"undo redo | charmap"}}const s="essay";return(c,d)=>(h(),w(a(we),{id:s,modelValue:a(t).currentContent,"onUpdate:modelValue":d[0]||(d[0]=u=>a(t).currentContent=u),onChange:d[1]||(d[1]=u=>a(t).updateContent(!0)),onKeyup:d[2]||(d[2]=u=>a(t).updateContent(!0)),"api-key":"no-api-key",init:{height:"100%",menubar:!1,plugins:"lists charmap",toolbar:i(),custom_undo_redo_levels:10}},null,8,["modelValue","init"]))}};const W=e=>(ue("data-v-439538ca"),e=e(),he(),e),Ye={class:"container"},et={class:"col-header"},tt={class:"text-h6"},st={class:"col-content"},nt=W(()=>l("span",null,"Mein Text",-1)),at=W(()=>l("span",null,"Erweitern",-1)),it=W(()=>l("div",{class:"col-header"},[l("h2",{class:"text-h6"},"Mein Text")],-1)),rt={class:"col-content"},ot=W(()=>l("span",null,"Erweitern",-1)),lt={setup(e){const t=j(),n=N();return(i,s)=>(h(),w(ne,{"fill-height":""},{default:o(()=>[l("div",Ye,[m(l("div",{class:J(["column",{colExpanded:a(t).isLeftExpanded,colNormal:!a(t).isLeftExpanded}])},[l("div",et,[m(l("h2",tt,"Aufgabenstellung",512),[[g,a(t).isInstructionsVisible]]),m(l("h2",{class:"text-h6"},x(a(n).activeTitle),513),[[g,a(t).isResourcesVisible]])]),l("div",st,[m(r(Pe,null,null,512),[[g,a(t).isInstructionsVisible]]),m(r(Qe,null,null,512),[[g,a(t).isResourcesVisible]])]),l("div",{class:J(["col-footer text-right",{footerExpanded:a(t).isLeftExpanded,footerNormal:!a(t).isLeftExpanded}])},[m(r(y,{class:"ma-2",onClick:s[0]||(s[0]=c=>a(t).setLeftExpanded(!1))},{default:o(()=>[r(_,{icon:"mdi-chevron-left"}),nt]),_:1},512),[[g,a(t).isLeftExpanded]]),m(r(y,{class:"ma-2",onClick:s[1]||(s[1]=c=>a(t).setLeftExpanded(!0))},{default:o(()=>[at,r(_,{icon:"mdi-chevron-right"})]),_:1},512),[[g,!a(t).isLeftExpanded]])],2)],2),[[g,a(t).isLeftVisible]]),m(l("div",{class:J(["column",{colExpanded:a(t).isRightExpanded,colNormal:!a(t).isRightExpanded}])},[it,l("div",rt,[r(Xe)]),l("div",{class:J(["col-footer text-left",{footerExpanded:a(t).isRightExpanded,footerNormal:!a(t).isRightExpanded}])},[m(r(y,{class:"ma-2",onClick:s[2]||(s[2]=c=>a(t).setRightExpanded(!0))},{default:o(()=>[r(_,{icon:"mdi-chevron-left"}),ot]),_:1},512),[[g,!a(t).isRightExpanded]]),m(r(y,{class:"ma-2",onClick:s[3]||(s[3]=c=>a(t).setRightExpanded(!1))},{default:o(()=>[m(l("span",null,"Aufgabenstellung",512),[[g,a(t).isInstructionsSelected]]),m(l("span",null,x(a(n).activeTitle),513),[[g,a(t).isResourcesSelected]]),r(_,{icon:"mdi-chevron-right"})]),_:1},512),[[g,a(t).isRightExpanded]])],2)],2),[[g,a(t).isRightVisible]])])]),_:1}))}};var ct=P(lt,[["__scopeId","data-v-439538ca"]]);const dt=l("p",null,"Lade Daten...",-1),ut=l("span",null,"Beenden ...",-1),ht=l("p",null,"Beim Laden der Daten ist ein Fehler aufgetreten. Die Anwendung kann nicht gestartet werden.",-1),mt=l("span",null,"Beenden",-1),gt=l("p",null,"In Ihrem Browser sind Eingaben eines anderen Benutzers oder einer anderen Aufgabe vorhanden, die noch nicht \xFCbertragen wurden. Durch das Laden werden diese Eingaben gel\xF6scht.",-1),ft=l("p",null,"M\xF6chten Sie die neue Aufgabe laden?",-1),pt=l("span",null,"Laden",-1),_t=l("span",null,"Abbrechen",-1),yt=l("p",null,"In Ihrem Browser sind Eingaben vorhanden, die noch nicht \xFCbertragen wurden. Die letzte im System gespeicherte Eingabe scheint aber nicht aus diesem Browser zu stammen. Das kann z.B. passieren, wenn Ihre Netzverbindung unterbrochen wurde und Sie anschlie\xDFend in einem anderen Browser weitergearbeitet haben. Durch das Laden werden Ihre Eingaben im Browser \xFCberschrieben.",-1),wt=l("p",null,"M\xF6chten Sie die Eingabe vom System laden?",-1),vt=l("span",null,"Laden",-1),St=l("span",null,"Abbrechen",-1),kt={setup(e){const t=E();return(n,i)=>(h(),w(ne,{"fill-height":""},{default:o(()=>[r(se,{elevation:"1",color:"white",density:"compact"},{default:o(()=>[dt,r(ce),r(y,{href:a(t).returnUrl},{default:o(()=>[r(_,{left:"",icon:"mdi-logout-variant"}),ut]),_:1},8,["href"])]),_:1}),r(H,{persistent:"",modelValue:a(t).showInitFailure,"onUpdate:modelValue":i[0]||(i[0]=s=>a(t).showInitFailure=s)},{default:o(()=>[r($,null,{default:o(()=>[r(B,null,{default:o(()=>[ht]),_:1}),r(K,null,{default:o(()=>[r(y,{href:a(t).returnUrl},{default:o(()=>[r(_,{left:"",icon:"mdi-logout-variant"}),mt]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(H,{persistent:"",modelValue:a(t).showReplaceConfirmation,"onUpdate:modelValue":i[2]||(i[2]=s=>a(t).showReplaceConfirmation=s)},{default:o(()=>[r($,null,{default:o(()=>[r(B,null,{default:o(()=>[gt,ft]),_:1}),r(K,null,{default:o(()=>[r(y,{onClick:i[1]||(i[1]=s=>a(t).loadDataFromBackend())},{default:o(()=>[r(_,{left:"",icon:"mdi-reload"}),pt]),_:1}),r(y,{href:a(t).returnUrl},{default:o(()=>[r(_,{left:"",icon:"mdi-logout-variant"}),_t]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(H,{persistent:"",modelValue:a(t).showReloadConfirmation,"onUpdate:modelValue":i[4]||(i[4]=s=>a(t).showReloadConfirmation=s)},{default:o(()=>[r($,null,{default:o(()=>[r(B,null,{default:o(()=>[yt,wt]),_:1}),r(K,null,{default:o(()=>[r(y,{onClick:i[3]||(i[3]=s=>a(t).loadDataFromBackend())},{default:o(()=>[r(_,{left:"",icon:"mdi-reload"}),vt]),_:1}),r(y,{href:a(t).returnUrl},{default:o(()=>[r(_,{left:"",icon:"mdi-logout-variant"}),St]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};const L=e=>(ue("data-v-efa91f96"),e=e(),he(),e),It={class:"container"},xt={class:"column"},bt={class:"col-header bg-grey-lighten-4"},Ct=L(()=>l("h2",{class:"text-h6"},"Ihre Bearbeitungszeit ist beendet",-1)),Tt=L(()=>l("p",null,"Es ist keine weitere Eingabe m\xF6glich. Bitte \xFCberpr\xFCfen Sie, ob Sie den Text in dieser Form zur Bewertung abgeben m\xF6chten.",-1)),Et=[Ct,Tt],Lt={class:"col-header bg-grey-lighten-4"},Rt=L(()=>l("h2",{class:"text-h6"},"Abgabe-Text",-1)),Ft=L(()=>l("p",null,"Bitte \xFCberpr\xFCfen Sie, ob Sie den Text in dieser Form zur Bwertung abgeben m\xF6chten. Nach der Abgabe ist keine weitere Bearbeitung mehr m\xF6glich!",-1)),$t=[Rt,Ft],Vt={class:"col-content"},At=["innerHTML"],Dt={class:"col-footer text-right bg-grey-lighten-4"},Ut=L(()=>l("span",null,"Ohne Abgabe beenden",-1)),Bt=L(()=>l("span",null,"Weiter bearbeiten",-1)),Kt=L(()=>l("span",null,"Sp\xE4ter versuchen",-1)),Ht=L(()=>l("span",null,"Ohne Speichern beenden",-1)),Ot={setup(e){const t=E(),n=F(),i=C(),s=q();return(c,d)=>(h(),w(ne,{"fill-height":""},{default:o(()=>[l("div",It,[l("div",xt,[m(l("div",bt,Et,512),[[g,a(i).writingEndReached]]),m(l("div",Lt,$t,512),[[g,!a(i).writingEndReached]]),l("div",Vt,[l("div",{class:"review-text",innerHTML:a(n).storedContent},null,8,At)]),l("div",Dt,[r(y,{class:"ma-2",onClick:d[0]||(d[0]=u=>a(t).finalize(!0)),color:a(s).primaryColorCss},{default:o(()=>[r(_,{color:a(s).primaryTextColorCss,icon:"mdi-file-send-outline"},null,8,["color"]),l("span",{style:ve(a(s).primaryTextColorFullCss)},"Zur Bewertung abgeben",4)]),_:1},8,["color"]),m(r(y,{class:"ma-2",onClick:d[1]||(d[1]=u=>a(t).finalize(!1))},{default:o(()=>[r(_,{icon:"mdi-logout-variant"}),Ut]),_:1},512),[[g,a(i).writingEndReached]]),m(r(y,{class:"ma-2",onClick:d[2]||(d[2]=u=>a(t).review=!1)},{default:o(()=>[r(_,{icon:"mdi-file-edit-outline"}),Bt]),_:1},512),[[g,!a(i).writingEndReached]])])])]),r(H,{persistent:"",modelValue:a(t).showFinalizeFailure,"onUpdate:modelValue":d[4]||(d[4]=u=>a(t).showFinalizeFailure=u)},{default:o(()=>[r($,null,{default:o(()=>[r(B,null,{default:o(()=>[m(l("p",null,"Beim Speichern der Abgabe ist ein Fehler aufgetreten. Bitte versuchen Sie es sp\xE4ter noch einmal.",512),[[g,a(t).showAuthorizeFailure]]),m(l("p",null,"Beim Speichern Ihrer letzten \xC4nderungen ist ein Fehler aufgetreten. Bitte versuchen Sie es sp\xE4ter noch einmal.",512),[[g,!a(t).showFinalizeFailure]])]),_:1}),r(K,null,{default:o(()=>[r(y,{onClick:d[3]||(d[3]=u=>a(t).showFinalizeFailure=!1)},{default:o(()=>[r(_,{left:"",icon:"mdi-close"}),Kt]),_:1}),r(y,{href:a(t).returnUrl},{default:o(()=>[r(_,{left:"",icon:"mdi-logout-variant"}),Ht]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};var Nt=P(Ot,[["__scopeId","data-v-efa91f96"]]);const zt={setup(e){const t=E();return t.init(),(n,i)=>(h(),w(Se,{"fill-height":""},{default:o(()=>[a(t).initialized?k("",!0):(h(),w(kt,{key:0})),a(t).initialized?(h(),w(Oe,{key:1})):k("",!0),a(t).initialized?(h(),w(Me,{key:2})):k("",!0),a(t).initialized&&!a(t).review?(h(),w(ze,{key:3})):k("",!0),a(t).initialized&&!a(t).review?(h(),w(ct,{key:4})):k("",!0),a(t).initialized&&a(t).review?(h(),w(Nt,{key:5})):k("",!0)]),_:1}))}};var Mt=ke();Ie(zt).use(xe()).use(Mt).mount("#app");