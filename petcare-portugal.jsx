import { useState, useEffect } from "react";

const VETS = [
  { id:1,  name:"Clínica Veterinária de Sintra",         type:"clinica",  city:"Sintra",   address:"Rua Visconde de Monserrate, 12, Sintra",               phone:"219 230 450", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–13:00", rating:4.5, reviews:128 },
  { id:2,  name:"Hospital Veterinário de Sintra",         type:"hospital", city:"Sintra",   address:"Av. Movimento das Forças Armadas, 3, Sintra",           phone:"219 107 040", hours:"Aberto 24 horas / 7 dias",                 rating:4.7, reviews:203, emergency:true },
  { id:3,  name:"VetSintra — Queluz",                    type:"clinica",  city:"Sintra",   address:"Rua Dr. Alfredo Costa, 45, Queluz",                     phone:"214 358 900", hours:"Seg–Sex 09:00–19:00  |  Sáb 09:00–13:00", rating:4.3, reviews:87  },
  { id:4,  name:"Clínica Veterinária Rio de Mouro",       type:"clinica",  city:"Sintra",   address:"Rua da Igreja, 22, Rio de Mouro",                       phone:"219 150 330", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–14:00", rating:4.2, reviews:64  },
  { id:5,  name:"PetVet Agualva-Cacém",                   type:"clinica",  city:"Sintra",   address:"Av. José Afonso, 8, Agualva-Cacém",                     phone:"219 266 100", hours:"Seg–Sex 09:00–20:00  |  Sáb 10:00–14:00", rating:4.4, reviews:110 },
  { id:6,  name:"Hospital Veterinário do Restelo",        type:"hospital", city:"Lisboa",   address:"Rua do Restelo, 55, Lisboa",                            phone:"213 010 780", hours:"Aberto 24 horas / 7 dias",                 rating:4.8, reviews:512, emergency:true },
  { id:7,  name:"Clínica Veterinária de Alvalade",        type:"clinica",  city:"Lisboa",   address:"Av. das Forças Armadas, 41, Lisboa",                    phone:"217 970 880", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–13:00", rating:4.6, reviews:234 },
  { id:8,  name:"VetMais Lisboa Centro",                  type:"clinica",  city:"Lisboa",   address:"Rua Morais Soares, 17, Lisboa",                         phone:"218 400 190", hours:"Seg–Sex 09:00–20:00",                      rating:4.3, reviews:176 },
  { id:9,  name:"Hospital Escolar FMV Lisboa",            type:"hospital", city:"Lisboa",   address:"Av. da Universidade Técnica, Lisboa",                   phone:"213 652 800", hours:"Seg–Sex 08:00–20:00  |  Urgências 24h",   rating:4.7, reviews:389, emergency:true },
  { id:10, name:"Clínica VetLuz Benfica",                 type:"clinica",  city:"Lisboa",   address:"Rua Helena Vaz da Silva, 3, Benfica",                   phone:"217 160 120", hours:"Seg–Sex 09:00–19:00  |  Sáb 09:00–13:00", rating:4.5, reviews:143 },
  { id:11, name:"Hospital Veterinário do Porto",          type:"hospital", city:"Porto",    address:"Rua de Santos Pousada, 190, Porto",                     phone:"225 074 000", hours:"Aberto 24 horas / 7 dias",                 rating:4.8, reviews:445, emergency:true },
  { id:12, name:"Clínica Veterinária Boavista",           type:"clinica",  city:"Porto",    address:"Av. da Boavista, 1212, Porto",                          phone:"226 095 130", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–14:00", rating:4.5, reviews:198 },
  { id:13, name:"VetPorto Campo Alegre",                  type:"clinica",  city:"Porto",    address:"Rua do Campo Alegre, 45, Porto",                        phone:"226 069 540", hours:"Seg–Sex 09:00–20:00",                      rating:4.4, reviews:122 },
  { id:14, name:"Hospital Veterinário de Cascais",        type:"hospital", city:"Cascais",  address:"Av. Marginal, 2610, Cascais",                           phone:"214 822 050", hours:"Aberto 24 horas / 7 dias",                 rating:4.7, reviews:287, emergency:true },
  { id:15, name:"Clínica Veterinária Estoril",            type:"clinica",  city:"Cascais",  address:"Av. de Nice, 14, Estoril",                              phone:"214 681 040", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–13:00", rating:4.4, reviews:95  },
  { id:16, name:"Clínica Veterinária de Setúbal",         type:"clinica",  city:"Setúbal",  address:"Av. Luísa Todi, 234, Setúbal",                          phone:"265 232 890", hours:"Seg–Sex 09:00–19:00  |  Sáb 09:00–13:00", rating:4.2, reviews:78  },
  { id:17, name:"Hospital Veterinário de Braga",          type:"hospital", city:"Braga",    address:"Rua do Carmo, 45, Braga",                               phone:"253 202 980", hours:"Aberto 24 horas / 7 dias",                 rating:4.6, reviews:201, emergency:true },
  { id:18, name:"Clínica VetBraga Centro",                type:"clinica",  city:"Braga",    address:"Av. Central, 12, Braga",                                phone:"253 617 450", hours:"Seg–Sex 09:00–20:00",                      rating:4.3, reviews:88  },
  { id:19, name:"Hospital Veterinário do Algarve",        type:"hospital", city:"Faro",     address:"Rua de Santo António, 102, Faro",                       phone:"289 803 700", hours:"Aberto 24 horas / 7 dias",                 rating:4.6, reviews:167, emergency:true },
  { id:20, name:"Clínica Veterinária Faro",               type:"clinica",  city:"Faro",     address:"Av. 5 de Outubro, 22, Faro",                            phone:"289 824 400", hours:"Seg–Sex 09:00–19:00  |  Sáb 09:00–13:00", rating:4.3, reviews:92  },
  { id:21, name:"Hospital Veterinário Universitário",     type:"hospital", city:"Coimbra",  address:"Av. Bissaya Barreto, Coimbra",                          phone:"239 802 470", hours:"Seg–Sex 08:00–20:00  |  Urgências 24h",   rating:4.7, reviews:312, emergency:true },
  { id:22, name:"Clínica VetCoimbra",                     type:"clinica",  city:"Coimbra",  address:"Rua João de Ruão, 15, Coimbra",                         phone:"239 710 530", hours:"Seg–Sex 09:00–20:00",                      rating:4.4, reviews:105 },
  { id:23, name:"Clínica Veterinária de Aveiro",          type:"clinica",  city:"Aveiro",   address:"Rua do Tenente Resende, 8, Aveiro",                     phone:"234 420 880", hours:"Seg–Sex 09:00–19:00  |  Sáb 09:00–13:00", rating:4.3, reviews:71  },
  { id:24, name:"Hospital Veterinário de Leiria",         type:"hospital", city:"Leiria",   address:"Rua Mestre de Avis, 12, Leiria",                        phone:"244 820 660", hours:"Seg–Sex 09:00–20:00  |  Urgências 24h",   rating:4.5, reviews:134, emergency:true },
  { id:25, name:"Clínica Veterinária de Évora",           type:"clinica",  city:"Évora",    address:"Rua de Avis, 55, Évora",                                phone:"266 748 140", hours:"Seg–Sex 09:00–19:00  |  Sáb 09:00–13:00", rating:4.2, reviews:63  },
  { id:26, name:"Clínica Veterinária do Funchal",         type:"clinica",  city:"Funchal",  address:"Rua 31 de Janeiro, 45, Funchal",                        phone:"291 741 320", hours:"Seg–Sex 09:00–19:00",                      rating:4.4, reviews:89  },
  { id:27, name:"Clínica VetViseu",                       type:"clinica",  city:"Viseu",    address:"Av. Alberto Sampaio, 33, Viseu",                        phone:"232 411 920", hours:"Seg–Sex 09:00–19:00",                      rating:4.2, reviews:56  },
  { id:28, name:"Clínica Veterinária da Amadora",         type:"clinica",  city:"Amadora",  address:"Rua Elias Garcia, 34, Amadora",                         phone:"214 984 430", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–13:00", rating:4.3, reviews:94  },
  { id:29, name:"Hospital Veterinário de Almada",         type:"hospital", city:"Almada",   address:"Av. dos Náufragos, 8, Almada",                          phone:"212 760 970", hours:"Aberto 24 horas / 7 dias",                 rating:4.6, reviews:178, emergency:true },
  { id:30, name:"Clínica VetOeiras",                      type:"clinica",  city:"Oeiras",   address:"Rua dos Bombeiros, 12, Oeiras",                         phone:"214 410 250", hours:"Seg–Sex 09:00–20:00  |  Sáb 09:00–13:00", rating:4.4, reviews:112 },
];

const GROOMERS = [
  { id:1, name:"PetSpa Sintra",             city:"Sintra",   address:"Rua Consiglieri Pedroso, 8, Sintra",      phone:"219 241 150", hours:"Ter–Sáb 09:00–18:00", services:["Tosquia","Banho","Hidratação","Corte de unhas"],         rating:4.6, reviews:89  },
  { id:2, name:"GlamPet Lisboa",            city:"Lisboa",   address:"Rua Morais Soares, 65, Lisboa",           phone:"218 133 400", hours:"Seg–Sáb 09:00–19:00", services:["Tosquia","Banho","SPA","Dentisteria"],                   rating:4.7, reviews:212 },
  { id:3, name:"TopPet Grooming Porto",     city:"Porto",    address:"Rua de Cedofeita, 102, Porto",            phone:"222 010 340", hours:"Ter–Sáb 10:00–19:00", services:["Tosquia","Banho","Corte de unhas","Limpeza de ouvidos"], rating:4.5, reviews:134 },
  { id:4, name:"Tosquia & Companhia",       city:"Cascais",  address:"Av. 25 de Abril, 34, Cascais",            phone:"214 864 110", hours:"Seg–Sáb 09:00–18:00", services:["Tosquia","Banho","Hidratação"],                         rating:4.4, reviews:77  },
  { id:5, name:"PetStyle Braga",            city:"Braga",    address:"Rua Dom Paio Mendes, 15, Braga",          phone:"253 614 780", hours:"Ter–Sáb 09:00–18:00", services:["Tosquia","Banho","Corte de unhas"],                      rating:4.3, reviews:58  },
  { id:6, name:"FurFriends Coimbra",        city:"Coimbra",  address:"Rua da Sofia, 22, Coimbra",               phone:"239 826 110", hours:"Seg–Sex 09:00–18:00", services:["Tosquia","Banho","SPA"],                                 rating:4.5, reviews:93  },
  { id:7, name:"PawGrooming Setúbal",       city:"Setúbal",  address:"Av. 22 de Dezembro, 5, Setúbal",          phone:"265 520 440", hours:"Ter–Sáb 09:00–18:00", services:["Tosquia","Banho"],                                      rating:4.2, reviews:45  },
  { id:8, name:"BonPet Grooming Faro",      city:"Faro",     address:"Rua do Alportel, 14, Faro",               phone:"289 822 150", hours:"Seg–Sáb 09:00–18:00", services:["Tosquia","Banho","Perfumaria"],                         rating:4.4, reviews:67  },
];

const WALKERS = [
  { id:1, name:"PawWalkers Sintra",              city:"Sintra",  address:"Sintra e arredores",                      phone:"911 234 567", hours:"Todos os dias 07:00–20:00",           services:["Passeios individuais","Passeios em grupo","Visitas domiciliárias"], rating:4.8, reviews:145 },
  { id:2, name:"Dog Walker Lisboa — João Silva", city:"Lisboa",  address:"Alvalade · Areeiro · Benfica",            phone:"962 345 678", hours:"Todos os dias 07:00–19:00",           services:["Passeios individuais","Cuidados em casa"],                          rating:4.9, reviews:203 },
  { id:3, name:"Happy Tails Porto",              city:"Porto",   address:"Porto e Vila Nova de Gaia",               phone:"932 456 789", hours:"Seg–Sáb 07:00–20:00",                services:["Passeios individuais","Passeios em grupo","Hotel pet"],               rating:4.7, reviews:178 },
  { id:4, name:"Pet Sitter Cascais",             city:"Cascais", address:"Cascais e Estoril",                       phone:"916 567 890", hours:"Todos os dias 08:00–20:00",           services:["Passeios","Pet sitting","Visitas domiciliárias"],                    rating:4.6, reviews:112 },
  { id:5, name:"WalkMyDog Braga",                city:"Braga",   address:"Braga centro e arredores",                phone:"925 678 901", hours:"Seg–Sex 07:00–19:00  |  Sáb 08:00–18:00", services:["Passeios individuais","Passeios em grupo"],                  rating:4.5, reviews:67  },
  { id:6, name:"PetWalk Coimbra",                city:"Coimbra", address:"Coimbra centro",                          phone:"918 901 234", hours:"Seg–Sáb 08:00–19:00",                services:["Passeios","Pet sitting","Visitas domiciliárias"],                    rating:4.6, reviews:88  },
];

const TRAINERS = [
  { id:1, name:"Academia Canina de Sintra",  city:"Sintra",  address:"Quinta da Beloura, Sintra",            phone:"219 249 700", hours:"Seg–Sáb 09:00–18:00",     services:["Obediência básica","Obediência avançada","Comportamento","Filhotes"], rating:4.8, reviews:156 },
  { id:2, name:"Lisboa Dog Training",        city:"Lisboa",  address:"Parque Eduardo VII, Lisboa",           phone:"213 880 040", hours:"Todos os dias 08:00–18:00", services:["Obediência","Agility","Comportamento","Reabilitação"],               rating:4.9, reviews:289 },
  { id:3, name:"Escola Canina do Porto",     city:"Porto",   address:"Rua do Ouro, 12, Porto",               phone:"225 090 230", hours:"Seg–Sáb 09:00–18:00",     services:["Obediência básica e avançada","Agility","Filhotes"],                  rating:4.7, reviews:198 },
  { id:4, name:"Treino Positivo Cascais",    city:"Cascais", address:"Alameda dos Combatentes, Cascais",     phone:"214 869 050", hours:"Ter–Dom 09:00–17:00",      services:["Obediência","Comportamento","Classes em grupo"],                     rating:4.6, reviews:134 },
  { id:5, name:"CãoTreino Coimbra",          city:"Coimbra", address:"Av. Elísio de Moura, 30, Coimbra",    phone:"239 490 110", hours:"Seg–Sáb 09:00–18:00",     services:["Obediência básica","Filhotes","Comportamento"],                       rating:4.5, reviews:88  },
  { id:6, name:"Alpha Dog Training Braga",   city:"Braga",   address:"Rua Frei Caetano Brandão, 5, Braga",  phone:"253 619 780", hours:"Ter–Sáb 09:00–18:00",     services:["Obediência","Agility","Filhotes"],                                    rating:4.7, reviews:113 },
  { id:7, name:"TrainPet Faro",              city:"Faro",    address:"Rua Poeta Bernardo Passos, 8, Faro",  phone:"289 818 730", hours:"Seg–Sáb 09:00–17:00",     services:["Obediência básica","Comportamento"],                                  rating:4.4, reviews:72  },
];

const SYMPTOMS = [
  { category:"Vómito", sub:"Cor e consistência",
    items:[
      { label:"Vómito amarelo / bile",            detail:"Estômago vazio por período prolongado. Reduza os intervalos entre refeições.", level:"low" },
      { label:"Vómito branco / espumoso",          detail:"Refluxo ácido ou ingestão de substância irritante. Observe durante 12–24 h.", level:"low" },
      { label:"Vómito verde",                      detail:"Ingestão de erva ou presença de bile. Pode indicar obstrução intestinal parcial.", level:"mid" },
      { label:"Vómito com sangue vivo",            detail:"Situação de urgência. Pode indicar úlcera, envenenamento ou lesão interna. Consulte imediatamente.", level:"high" },
      { label:"Vómito castanho escuro",            detail:"Possível hemorragia do trato digestivo superior. Urgência veterinária.", level:"high" },
      { label:"Vómito com parasitas visíveis",     detail:"Infestação activa de vermes. Consulta urgente e desparasitação imediata.", level:"high" },
    ]
  },
  { category:"Comportamento", sub:"Energia e estado mental",
    items:[
      { label:"Letargia extrema",                  detail:"O animal não se levanta ou não responde a estímulos habituais. Pode indicar dor intensa ou doença grave.", level:"high" },
      { label:"Agitação ou ansiedade súbita",      detail:"Possível origem em stress, dor aguda ou distúrbio neurológico. Avalie outros sintomas.", level:"mid" },
      { label:"Desorientação / andar em círculos", detail:"Potencial problema neurológico ou do ouvido interno. Consulta urgente.", level:"high" },
      { label:"Perda de apetite superior a 24 h",  detail:"Pode indicar doença sistémica, dor dentária ou stress. Monitorize e consulte se persistir.", level:"mid" },
      { label:"Ingestão excessiva de água",         detail:"Sinal possível de diabetes mellitus, insuficiência renal crónica ou síndrome de Cushing.", level:"mid" },
      { label:"Isolamento persistente",             detail:"Comportamento de fuga associado a dor ou mal-estar. Observe outros sintomas.", level:"mid" },
    ]
  },
  { category:"Sinais Físicos", sub:"Indicadores corporais",
    items:[
      { label:"Abdómen distendido e rígido",       detail:"Urgência imediata. Possível torção gástrica — fatal sem intervenção cirúrgica rápida, especialmente em raças grandes.", level:"high" },
      { label:"Dificuldade respiratória",           detail:"Urgência imediata. Dirija-se ao hospital veterinário sem demora.", level:"high" },
      { label:"Olhos vermelhos ou com secreção",   detail:"Conjuntivite, alergia ou corpo estranho. Consulta não urgente mas recomendada.", level:"low" },
      { label:"Prurido auricular constante",        detail:"Infecção otológica, ácaros ou alergia alimentar.", level:"mid" },
      { label:"Claudicação / não apoia um membro", detail:"Possível entorse, fractura ou patologia articular. Requer exame radiológico.", level:"mid" },
      { label:"Fezes com sangue ou muco",          detail:"Possível parvovírus, parasitose grave ou lesão intestinal. Consulta urgente.", level:"high" },
      { label:"Convulsões ou tremores",             detail:"Urgência. Epilepsia, envenenamento ou hipoglicemia são causas possíveis.", level:"high" },
    ]
  },
  { category:"Alimentação Segura", sub:"O que pode oferecer",
    items:[
      { label:"Frango cozido sem sal",             detail:"Proteína de fácil digestão. Ideal em fases de recuperação ou estômago sensível.", level:"ok" },
      { label:"Arroz branco cozido",               detail:"Carbohidrato de baixo índice glicémico. Recomendado em episódios de diarreia.", level:"ok" },
      { label:"Cenoura cozida ou crua",            detail:"Rica em betacaroteno. Beneficia a saúde ocular e dentária.", level:"ok" },
      { label:"Batata-doce cozida",                detail:"Fonte de fibra e energia de absorção gradual. Boa tolerância digestiva.", level:"ok" },
      { label:"Abóbora cozida simples",            detail:"Regula o trânsito intestinal. Eficaz tanto em diarreia como em obstipação.", level:"ok" },
      { label:"Maçã sem sementes nem caroço",      detail:"Fonte de vitaminas A e C. Remova sempre as sementes, que contêm cianeto.", level:"ok" },
    ]
  },
  { category:"Alimentos Proibidos", sub:"Nunca deve oferecer",
    items:[
      { label:"Chocolate",                         detail:"Contém teobromina e cafeína. Tóxico em qualquer quantidade — pode ser fatal.", level:"high" },
      { label:"Uvas e passas",                     detail:"Causam insuficiência renal aguda. O mecanismo tóxico não está totalmente identificado.", level:"high" },
      { label:"Cebola, alho e alho-francês",       detail:"Destroem os glóbulos vermelhos provocando anemia hemolítica.", level:"high" },
      { label:"Xilitol (adoçante E967)",           detail:"Presente em pastilhas, gomas e alimentos diet. Provoca hipoglicemia fulminante.", level:"high" },
      { label:"Ossos cozinhados",                  detail:"Fragmentam em estilhaços pontiagudos que podem perfurar o trato digestivo.", level:"high" },
      { label:"Abacate",                           detail:"A persina presente na polpa e na casca é tóxica para cães e gatos.", level:"high" },
      { label:"Cafeína",                           detail:"Afecta o sistema nervoso central. Presente em café, chá, chocolate e alguns medicamentos.", level:"high" },
      { label:"Álcool",                            detail:"Extremamente tóxico. Mesmo quantidades mínimas podem causar danos hepáticos irreversíveis.", level:"high" },
      { label:"Nozes de macadâmia",                detail:"Causam fraqueza muscular, hipertermia e tremores.", level:"high" },
    ]
  },
];

// Design tokens
const C = {
  bg:"#F5F4F0", surface:"#FFFFFF", ink:"#1C1C1E", sub:"#6E6E73", line:"#E5E5EA",
  accent:"#1A3A2A", accentL:"#2D5A3D", teal:"#0A7B6C", warm:"#C8A96E",
  danger:"#C0392B", warn:"#B8651A", ok:"#1A6B3C",
};
const F = { display:"'Playfair Display', Georgia, serif", body:"'DM Sans', 'Helvetica Neue', Arial, sans-serif" };

const Stars = ({ n }) => (
  <span style={{ letterSpacing:1, fontSize:11 }}>
    {Array.from({length:5}).map((_,i)=>(<span key={i} style={{ color:i<Math.floor(n)?C.warm:C.line }}>★</span>))}
    <span style={{ color:C.sub, marginLeft:4, fontFamily:F.body, fontSize:11 }}>{n}</span>
  </span>
);

const LevelPill = ({ level }) => {
  const m = { high:[C.danger,"Urgente"], mid:[C.warn,"Atenção"], low:["#4A7C4E","Normal"], ok:[C.teal,"Seguro"] };
  const [bg,label] = m[level]||[C.sub,"—"];
  return <span style={{ display:"inline-block", background:bg, color:"#fff", padding:"2px 9px", borderRadius:3, fontSize:10, fontWeight:700, letterSpacing:0.6, textTransform:"uppercase", fontFamily:F.body }}>{label}</span>;
};

function Card({ item }) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{ background:C.surface, borderRadius:10, marginBottom:8, border:`1px solid ${C.line}`, overflow:"hidden", boxShadow: open?"0 4px 20px rgba(0,0,0,0.08)":"0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ padding:"15px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:F.body, fontWeight:600, fontSize:14, color:C.ink, lineHeight:1.3 }}>{item.name}</div>
            {item.type && <div style={{ marginTop:2 }}><span style={{ fontFamily:F.body, fontSize:10, color:item.type==="hospital"?C.danger:C.teal, fontWeight:700, textTransform:"uppercase", letterSpacing:0.6 }}>{item.type==="hospital"?"Hospital":"Clínica"}</span></div>}
            <div style={{ fontFamily:F.body, fontSize:12, color:C.sub, marginTop:6, lineHeight:1.55 }}>
              <div>{item.address}</div>
              <div style={{ marginTop:1 }}>{item.hours}</div>
            </div>
            <div style={{ marginTop:7 }}>
              <Stars n={item.rating}/>
              <span style={{ fontFamily:F.body, fontSize:11, color:C.sub, marginLeft:5 }}>({item.reviews} avaliações)</span>
            </div>
          </div>
          {item.emergency && <span style={{ background:C.danger, color:"#fff", padding:"3px 8px", borderRadius:3, fontSize:10, fontWeight:700, letterSpacing:0.6, textTransform:"uppercase", whiteSpace:"nowrap", fontFamily:F.body }}>24 H</span>}
        </div>
        {item.services && (
          <div style={{ marginTop:10, display:"flex", flexWrap:"wrap", gap:4 }}>
            {item.services.map((s,i)=><span key={i} style={{ background:C.bg, color:C.sub, padding:"2px 8px", borderRadius:3, fontSize:11, fontFamily:F.body, border:`1px solid ${C.line}` }}>{s}</span>)}
          </div>
        )}
        <button onClick={()=>setOpen(!open)} style={{ marginTop:11, width:"100%", background:open?C.ink:C.accent, color:"#fff", border:"none", borderRadius:6, padding:"9px", fontFamily:F.body, fontWeight:600, fontSize:12, cursor:"pointer", letterSpacing:0.3 }}>
          {open?"Fechar":"Ver contacto e ligar"}
        </button>
      </div>
      {open && (
        <div style={{ borderTop:`1px solid ${C.line}`, padding:"13px 16px", background:"#FAFAF8" }}>
          <div style={{ fontFamily:F.body, fontSize:17, fontWeight:700, color:C.ink, letterSpacing:0.3 }}>{item.phone}</div>
          <a href={`tel:${item.phone.replace(/\s/g,"")}`} style={{ display:"block", marginTop:9, background:C.teal, color:"#fff", textAlign:"center", padding:"9px", borderRadius:6, textDecoration:"none", fontFamily:F.body, fontWeight:600, fontSize:13 }}>Ligar agora</a>
        </div>
      )}
    </div>
  );
}

function ListTab({ data, title, subtitle, hasTypeFilter }) {
  const [q,setQ] = useState("");
  const [tf,setTf] = useState("todos");

  const filtered = data.filter(item => {
    const m = !q||[item.city,item.name,item.address].some(s=>s.toLowerCase().includes(q.toLowerCase()));
    const t = tf==="todos"||item.type===tf;
    return m&&t;
  });

  const grouped = {};
  filtered.forEach(item=>{ if(!grouped[item.city]) grouped[item.city]=[]; grouped[item.city].push(item); });

  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ padding:"22px 0 16px", borderBottom:`1px solid ${C.line}`, marginBottom:16 }}>
        <div style={{ fontFamily:F.display, fontSize:24, fontWeight:700, color:C.ink }}>{title}</div>
        <div style={{ fontFamily:F.body, fontSize:13, color:C.sub, marginTop:3 }}>{subtitle}</div>
      </div>
      <div style={{ position:"relative", marginBottom:12 }}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pesquisar por cidade, nome ou morada…"
          style={{ width:"100%", padding:"10px 13px 10px 36px", borderRadius:7, border:`1.5px solid ${C.line}`, fontFamily:F.body, fontSize:13, color:C.ink, background:C.surface, outline:"none", boxSizing:"border-box" }}/>
        <svg style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", opacity:0.3 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </div>
      {hasTypeFilter && (
        <div style={{ display:"flex", gap:7, marginBottom:14 }}>
          {[["todos","Todos"],["clinica","Clínicas"],["hospital","Hospitais"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTf(v)} style={{ padding:"6px 13px", borderRadius:20, border:tf===v?"none":`1.5px solid ${C.line}`, background:tf===v?C.ink:C.surface, color:tf===v?"#fff":C.sub, fontFamily:F.body, fontWeight:600, cursor:"pointer", fontSize:12 }}>{l}</button>
          ))}
        </div>
      )}
      {Object.keys(grouped).length===0 ? (
        <div style={{ textAlign:"center", padding:"50px 0", color:C.sub, fontFamily:F.body, fontSize:13 }}>Sem resultados para "{q}"</div>
      ) : Object.entries(grouped).map(([city,items])=>(
        <div key={city}>
          <div style={{ fontFamily:F.body, fontWeight:700, fontSize:11, color:C.sub, textTransform:"uppercase", letterSpacing:1.2, margin:"16px 0 9px", display:"flex", alignItems:"center", gap:8 }}>
            {city} <span style={{ flex:1, height:1, background:C.line, display:"block" }}/> <span style={{ fontWeight:400 }}>{items.length}</span>
          </div>
          {items.map(item=><Card key={item.id} item={item}/>)}
        </div>
      ))}
    </div>
  );
}

function SymptomsTab() {
  const [openCat,setOpenCat] = useState(null);
  const [openItem,setOpenItem] = useState(null);
  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ padding:"22px 0 16px", borderBottom:`1px solid ${C.line}`, marginBottom:16 }}>
        <div style={{ fontFamily:F.display, fontSize:24, fontWeight:700, color:C.ink }}>Guia de Sintomas</div>
        <div style={{ fontFamily:F.body, fontSize:13, color:C.sub, marginTop:3 }}>Referência clínica para proprietários de animais de companhia</div>
      </div>
      {SYMPTOMS.map((cat,ci)=>(
        <div key={ci} style={{ marginBottom:7, border:`1.5px solid ${C.line}`, borderRadius:9, overflow:"hidden" }}>
          <button onClick={()=>{ setOpenCat(openCat===ci?null:ci); setOpenItem(null); }} style={{ width:"100%", background:openCat===ci?C.ink:C.surface, border:"none", padding:"13px 15px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontFamily:F.body, fontWeight:700, fontSize:13, color:openCat===ci?"#fff":C.ink }}>{cat.category}</div>
              <div style={{ fontFamily:F.body, fontSize:11, color:openCat===ci?"rgba(255,255,255,0.55)":C.sub, marginTop:1 }}>{cat.sub}</div>
            </div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={openCat===ci?"#fff":C.sub} strokeWidth="2.5" strokeLinecap="round" style={{ transform:openCat===ci?"rotate(180deg)":"none", transition:"transform .2s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {openCat===ci && (
            <div style={{ background:C.surface }}>
              {cat.items.map((item,ii)=>(
                <div key={ii} onClick={()=>setOpenItem(openItem===`${ci}-${ii}`?null:`${ci}-${ii}`)} style={{ padding:"12px 15px", borderTop:`1px solid ${C.line}`, cursor:"pointer", background:openItem===`${ci}-${ii}`?"#FAFAF8":C.surface }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
                    <div style={{ fontFamily:F.body, fontWeight:600, fontSize:13, color:C.ink, flex:1 }}>{item.label}</div>
                    <LevelPill level={item.level}/>
                  </div>
                  {openItem===`${ci}-${ii}` && (
                    <div style={{ fontFamily:F.body, fontSize:13, color:C.sub, marginTop:7, lineHeight:1.65, paddingRight:6 }}>
                      {item.detail}
                      {item.level==="high" && <div style={{ marginTop:6, fontFamily:F.body, fontSize:12, color:C.danger, fontWeight:600 }}>Consulte um veterinário com urgência.</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function HomeTab({ setTab }) {
  const services = [
    { id:"vets",     label:"Veterinários",  desc:"Clínicas e hospitais em todo o país" },
    { id:"symptoms", label:"Sintomas",      desc:"Guia de referência clínica" },
    { id:"grooming", label:"Tosquia",       desc:"Grooming e cuidados estéticos" },
    { id:"walkers",  label:"Passeios",      desc:"Passeadores certificados" },
    { id:"training", label:"Treino",        desc:"Obediência e comportamento" },
  ];
  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ background:C.accent, borderRadius:13, padding:"26px 22px", margin:"18px 0 18px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-30, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
        <div style={{ fontFamily:F.display, fontSize:11, color:"rgba(255,255,255,0.45)", letterSpacing:2.5, textTransform:"uppercase", marginBottom:7 }}>PetCare Portugal</div>
        <div style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:"#fff", lineHeight:1.25, marginBottom:8 }}>O seu guia de<br/>saúde animal</div>
        <div style={{ fontFamily:F.body, fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.65, maxWidth:260 }}>Criado por um proprietário de três cães que conhece as dificuldades de encontrar cuidados de qualidade perto de casa.</div>
      </div>

      <div onClick={()=>setTab("vets")} style={{ border:`1.5px solid ${C.danger}`, borderRadius:9, padding:"13px 15px", marginBottom:18, display:"flex", alignItems:"center", gap:13, cursor:"pointer", background:`${C.danger}08` }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:C.danger, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:F.body, fontWeight:700, fontSize:14, color:C.danger }}>Urgência veterinária</div>
          <div style={{ fontFamily:F.body, fontSize:12, color:C.sub, marginTop:1 }}>Aceder aos hospitais veterinários 24 horas</div>
        </div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.danger} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>

      <div style={{ fontFamily:F.body, fontWeight:700, fontSize:11, color:C.sub, textTransform:"uppercase", letterSpacing:1.2, marginBottom:10 }}>Serviços</div>
      {services.map(s=>(
        <div key={s.id} onClick={()=>setTab(s.id)} style={{ background:C.surface, borderRadius:9, padding:"13px 15px", marginBottom:7, border:`1.5px solid ${C.line}`, display:"flex", alignItems:"center", gap:13, cursor:"pointer" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:F.body, fontWeight:600, fontSize:14, color:C.ink }}>{s.label}</div>
            <div style={{ fontFamily:F.body, fontSize:12, color:C.sub, marginTop:1 }}>{s.desc}</div>
          </div>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.line} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      ))}

      <div style={{ background:C.surface, borderRadius:9, padding:"13px 15px", marginTop:12, border:`1.5px solid ${C.warm}44` }}>
        <div style={{ fontFamily:F.body, fontWeight:700, fontSize:10, color:C.warm, textTransform:"uppercase", letterSpacing:1.2, marginBottom:5 }}>Nota informativa</div>
        <div style={{ fontFamily:F.body, fontSize:13, color:C.sub, lineHeight:1.65 }}>Em Portugal, a vacina antirrábica é <strong style={{color:C.ink}}>legalmente obrigatória</strong> para cães com mais de 3 meses de idade. Mantenha o boletim sanitário sempre actualizado.</div>
      </div>
    </div>
  );
}

function Welcome({ onContinue }) {
  return (
    <div style={{ minHeight:"100vh", background:C.accent, display:"flex", flexDirection:"column", justifyContent:"flex-end", fontFamily:F.body, padding:24, position:"relative", overflow:"hidden" }}>
      {[300,210,130].map((s,i)=>(<div key={i} style={{ position:"absolute", top:"32%", left:"50%", transform:"translate(-50%,-50%)", width:s, height:s, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)" }}/>))}
      <div style={{ position:"absolute", top:"26%", left:"50%", transform:"translate(-50%,-50%)" }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.05)"/>
          <ellipse cx="26" cy="30" rx="9" ry="7" fill="rgba(255,255,255,0.65)"/>
          <circle cx="20" cy="20" r="3.5" fill="rgba(255,255,255,0.65)"/>
          <circle cx="32" cy="20" r="3.5" fill="rgba(255,255,255,0.65)"/>
          <circle cx="14" cy="25" r="2.5" fill="rgba(255,255,255,0.45)"/>
          <circle cx="38" cy="25" r="2.5" fill="rgba(255,255,255,0.45)"/>
        </svg>
      </div>
      <div style={{ position:"relative", zIndex:2 }}>
        <div style={{ fontFamily:F.display, fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:3, textTransform:"uppercase", marginBottom:11 }}>PetCare Portugal</div>
        <div style={{ fontFamily:F.display, fontSize:32, fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:14 }}>Cuidados veterinários,<br/>sem complicações.</div>
        <div style={{ fontFamily:F.body, fontSize:13, color:"rgba(255,255,255,0.58)", lineHeight:1.7, marginBottom:28 }}>Uma plataforma criada por um proprietário de três cães. Encontrar um bom veterinário perto, com avaliações reais e horários actualizados, não devia ser difícil.</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:28 }}>
          {["Veterinários em todo Portugal","Hospitais 24 horas","Guia de sintomas clínicos","Tosquia · Passeios · Treino"].map((f,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:C.warm, flexShrink:0, marginTop:4 }}/>
              <span style={{ fontFamily:F.body, fontSize:12, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>{f}</span>
            </div>
          ))}
        </div>
        <button onClick={onContinue} style={{ width:"100%", padding:15, background:"#fff", border:"none", borderRadius:9, fontFamily:F.body, fontWeight:700, fontSize:15, color:C.accent, cursor:"pointer", letterSpacing:0.3 }}>
          Continuar
        </button>
        <div style={{ fontFamily:F.body, fontSize:11, color:"rgba(255,255,255,0.25)", textAlign:"center", marginTop:11 }}>Sem registo. Sem dados pessoais.</div>
      </div>
    </div>
  );
}

const TABS = [
  { id:"home",     label:"Início" },
  { id:"vets",     label:"Veterinários" },
  { id:"symptoms", label:"Sintomas" },
  { id:"grooming", label:"Tosquia" },
  { id:"walkers",  label:"Passeios" },
  { id:"training", label:"Treino" },
];

export default function App() {
  const [screen,setScreen] = useState("welcome");
  const [tab,setTab] = useState("home");

  useEffect(()=>{
    const l = document.createElement("link");
    l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  },[]);

  if(screen==="welcome") return <Welcome onContinue={()=>setScreen("app")}/>;

  return (
    <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", background:C.bg, fontFamily:F.body }}>
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.line}`, padding:"13px 18px", position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontFamily:F.display, fontWeight:700, fontSize:17, color:C.accent, letterSpacing:-0.3 }}>
          PetCare <span style={{ fontWeight:400, color:C.sub, fontFamily:F.body, fontSize:12, letterSpacing:0 }}>Portugal</span>
        </div>
        <button onClick={()=>setScreen("welcome")} style={{ background:"none", border:"none", fontFamily:F.body, fontSize:12, color:C.sub, cursor:"pointer" }}>Início</button>
      </div>

      {tab==="home"     && <HomeTab setTab={setTab}/>}
      {tab==="vets"     && <ListTab data={VETS}     title="Veterinários" subtitle="Clínicas e hospitais em Portugal continental e ilhas" hasTypeFilter/>}
      {tab==="symptoms" && <SymptomsTab/>}
      {tab==="grooming" && <ListTab data={GROOMERS} title="Tosquia & Grooming" subtitle="Centros de estética e bem-estar animal"/>}
      {tab==="walkers"  && <ListTab data={WALKERS}  title="Passeadores" subtitle="Profissionais de passeio e pet sitting"/>}
      {tab==="training" && <ListTab data={TRAINERS} title="Treino Canino" subtitle="Obediência, comportamento e agility"/>}

      <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:C.surface, borderTop:`1px solid ${C.line}`, display:"flex", zIndex:200 }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"9px 0 11px", background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, borderTop:tab===t.id?`2px solid ${C.accent}`:"2px solid transparent", color:tab===t.id?C.accent:C.sub }}>
            <span style={{ fontFamily:F.body, fontSize:10, fontWeight:tab===t.id?700:500, letterSpacing:0.3, textTransform:"uppercase" }}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
