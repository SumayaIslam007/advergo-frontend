import { useState } from "react";
import { Heart, Upload, Star, Phone, Mail, MapPin, MessageCircle, ArrowRight, Check, ChevronDown } from "lucide-react";
//import logo from "./assets/logo.png";
import logo from "./assets/logo1.png";
// =============================================================================
//  🎨  BRAND COLORS
// =============================================================================
const R  = "#eb2127";   // brand red
const B  = "#010101";   // brand black
const W  = "#ffffff";   // white
const LG = "#f8f8f8";   // light grey background
const MG = "#6b7280";   // mid grey (body text)
const DG = "#374151";   // dark grey (sub-headings / body)
const BD = "#e5e7eb";   // border / divider
const SH = "0 2px 16px rgba(0,0,0,0.07)";  // card shadow (replaces borders)

// =============================================================================
//  📋  SITE DATA  — edit here, never in the page code below
// =============================================================================

// ── Company info (from Business Profile 2026) ─────────────────────────────────
const COMPANY = {
  name:       "Advergo Sports & Fashion Wear Ltd.",
  tagline:    "Quality with commitment",
  phone:      "+880 1732 687982",
  email:      "info@advergoltd.com",
  emailAlt:   "advergo.sportswear@gmail.com",
  website:    "www.advergo.org",
  headOffice: "Flat # B-5, House # 33, Road # 13, Sector # 10, Uttara, Dhaka-1230",
  factory:    "Near Pukurpar Mosjid, Razabari, Kamarpara, Turag, Uttara, Dhaka-1230",
  founded:    "2019",
  md:         "Md. Ashikul Islam",
  chairman:   "Ariful Islam",
};

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { n:"90,000", l:"Pieces / month" },
  { n:"200+",   l:"Skilled employees" },
  { n:"$3M",    l:"Yearly turnover" },
  { n:"6,000",  l:"SFT facility" },
];

// ── Sport categories ─────────────────────────────────────────────────────────
const CATS = [
  { id:"football",  name:"Football",  icon:"⚽", desc:"Jersey · Trouser · Shorts" },
  { id:"cycling",   name:"Cycling",   icon:"🚴", desc:"Pro Jersey · Bandana" },
  { id:"cricket",   name:"Cricket",   icon:"🏏", desc:"Shirt · Trouser · Cap" },
  { id:"marathon",  name:"Marathon",  icon:"🏃", desc:"Jersey · Shorts" },
  { id:"corporate", name:"Corporate", icon:"👔", desc:"Polo · T-Shirt · Jacket" },
];

// ── Products ─────────────────────────────────────────────────────────────────
const PRODS = [
  { id:1, name:"Tournament Jersey",      cat:"Football",  range:"৳450–৳650",   fabric:"Polyester Dry-Fit",   rating:4.8, reviews:124, col:"#1d4ed8" },
  { id:2, name:"Cricket Playing Shirt",  cat:"Cricket",   range:"৳550–৳800",   fabric:"Premium Cotton Blend", rating:4.7, reviews:89,  col:"#065f46" },
  { id:3, name:"Cycling Pro Jersey",     cat:"Cycling",   range:"৳600–৳900",   fabric:"Lycra Spandex",        rating:4.9, reviews:56,  col:R },
  { id:4, name:"Marathon Running Top",   cat:"Marathon",  range:"৳380–৳520",   fabric:"Mesh Dry-Fit",         rating:4.6, reviews:43,  col:"#7c3aed" },
  { id:5, name:"Corporate Polo Shirt",   cat:"Corporate", range:"৳500–৳750",   fabric:"Piqué Cotton",         rating:4.7, reviews:201, col:"#374151" },
  { id:6, name:"Winter Hoodie",          cat:"Corporate", range:"৳700–৳1,000", fabric:"Fleece Interlock",     rating:4.8, reviews:67,  col:"#92400e" },
];

// ── Fabrics (real names from PDF p.10) ───────────────────────────────────────
const FABRICS = [
  { name:"Pin Mesh Fabric",        grade:"China Premium",  use:"Football · Marathon",  desc:"Ultra-lightweight open-weave fabric for maximum airflow during high-intensity sport." },
  { name:"Sugar Mesh Fabric",      grade:"China Premium",  use:"Football · Cricket",   desc:"Soft textured mesh with superior moisture management and colour fastness." },
  { name:"Brush Jacquard Fabric",  grade:"China Spandex",  use:"Cycling · Marathon",   desc:"Four-way stretch jacquard — aerodynamic fit with a premium textured surface." },
  { name:"Honeycomb Fabric",       grade:"China Premium",  use:"Corporate · Casual",   desc:"Structured honeycomb weave — durable, breathable, and professional in finish." },
  { name:"Nylon Spandex Fabric",   grade:"China Premium",  use:"Cycling · Swimming",   desc:"Lightweight nylon blend with elastic recovery — ideal for skin-tight performance kits." },
  { name:"Lurex Box Mesh Fabric",  grade:"China Premium",  use:"Fashion · Corporate",  desc:"Shimmer-weave mesh combining style with ventilation for fashion-forward activewear." },
];

// ── Reviews ──────────────────────────────────────────────────────────────────
const REVS = [
  { name:"Rafiqul Islam",  org:"Dhaka Premier FC",        rating:5, text:"Ordered 25 jerseys for our season. Exceptional quality and precise sizing. The custom print came out perfectly." },
  { name:"Tanvir Hossain", org:"Corporate Solutions Ltd.",rating:5, text:"Branded polo shirts for our 80-person team. Professional finish, great fabric. Ordering again next quarter." },
  { name:"Sabbir Rahman",  org:"Chittagong Cycling Club", rating:4, text:"Custom cycling jerseys with our logo. Lycra quality is top-notch. The team absolutely loves them." },
];

// ── Gallery
// src: "" → shows placeholder. Replace with real URL when client provides photos.
// Dummy Unsplash URLs are used so the gallery looks realistic right now.
const GALLERY = [
  { id:1,  src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop", label:"Design section",     category:"factory",     desc:"Design & artwork studio" },
  { id:2,  src:"https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=400&h=280&fit=crop", label:"Printing section",  category:"factory",     desc:"62-inch sublimation printing" },
  { id:3,  src:"https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=280&fit=crop", label:"Cutting section",   category:"factory",     desc:"Precision fabric cutting" },
  { id:4,  src:"https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=280&fit=crop", label:"Sewing section",    category:"factory",     desc:"60–70 industrial sewing machines" },
  { id:5,  src:"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=280&fit=crop", label:"QC section",       category:"factory",     desc:"Quality inspection & standards" },
  { id:6,  src:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=280&fit=crop", label:"Packing section",   category:"factory",     desc:"Professional packing & dispatch" },
  { id:7,  src:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=280&fit=crop", label:"Football kit delivery",  category:"clients",  desc:"Tournament kit — Dhaka Premier FC" },
  { id:8,  src:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=280&fit=crop", label:"Corporate polo delivery", category:"clients",  desc:"Corporate order — 200 units" },
  { id:9,  src:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=280&fit=crop", label:"Cycling kit showcase",      category:"clients",  desc:"Cycling pro jersey — BCF" },
];

// ── Achievements ──────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { src:"", icon:"🏛️", title:"Trade License",            year:"2022", org:"TRAD/DNCC/027440/2022" },
  { src:"", icon:"📜", title:"TIN Certificate",          year:"2021", org:"National Board of Revenue" },
  { src:"", icon:"✅", title:"BIN VAT Certificate",      year:"2019", org:"Customs, Excise & VAT — Dhaka North" },
  { src:"", icon:"🏢", title:"Certificate of Inc.",      year:"2021", org:"Registrar of Joint Stock Companies" },
];

// ── Clients (from PDF p.20-21) ────────────────────────────────────────────────
// logo: Clearbit URL auto-fetches the brand logo from their domain.
// If a logo fails to load, the card falls back to showing the name as text.
// To add/swap a logo: update the "logo" field with any image URL.
const CLIENTS = [
  { name:"ONE Bank",               logo:"https://logo.clearbit.com/onebank.com.bd" },
  { name:"Prime Bank",             logo:"https://logo.clearbit.com/primebank.com.bd" },
  { name:"MetLife",                logo:"https://logo.clearbit.com/metlife.com" },
  { name:"Southeast Bank",         logo:"https://logo.clearbit.com/southeastbank.com.bd" },
  { name:"BRAC Bank",              logo:"https://logo.clearbit.com/bracbank.com" },
  { name:"Green Delta Insurance",  logo:"https://logo.clearbit.com/greendeltainsurance.com" },
  { name:"Bangladesh Krishi Bank", logo:"https://logo.clearbit.com/krishibank.org.bd" },
  { name:"Unilever",               logo:"https://logo.clearbit.com/unilever.com" },
  { name:"PRAN",                   logo:"https://logo.clearbit.com/pranfoods.com" },
  { name:"RFL",                    logo:"https://logo.clearbit.com/rflbd.com" },
  { name:"Robi",                   logo:"https://logo.clearbit.com/robi.com.bd" },
  { name:"bKash",                  logo:"https://logo.clearbit.com/bkash.com" },
  { name:"Nagad",                  logo:"https://logo.clearbit.com/nagad.com.bd" },
  { name:"Syngenta",               logo:"https://logo.clearbit.com/syngenta.com" },
  { name:"BRAC University",        logo:"https://logo.clearbit.com/bracu.ac.bd" },
  { name:"ULAB",                   logo:"https://logo.clearbit.com/ulab.edu.bd" },
  { name:"Walton",                 logo:"https://logo.clearbit.com/waltonbd.com" },
  { name:"Orion Pharma",           logo:"https://logo.clearbit.com/orionpharma.com" },
  { name:"bdjobs.com",             logo:"https://logo.clearbit.com/bdjobs.com" },
  { name:"ACI",                    logo:"https://logo.clearbit.com/aci-bd.com" },
  { name:"Incepta Pharma",         logo:"https://logo.clearbit.com/inceptapharma.com" },
  { name:"Walton Hi-Tech",         logo:"https://logo.clearbit.com/waltonhitech.com" },
  { name:"SK+F",                   logo:"https://logo.clearbit.com/skfbd.com" },
  { name:"LankaBangla",            logo:"https://logo.clearbit.com/lankabangla.com" },
  { name:"CRP Bangladesh",         logo:"https://logo.clearbit.com/crp-bangladesh.org" },
  { name:"Green University",       logo:"https://logo.clearbit.com/green.edu.bd" },
  { name:"WUB",                    logo:"https://logo.clearbit.com/wub.edu.bd" },
  { name:"BDCyclists",             logo:"https://logo.clearbit.com/bdcyclists.com" },
  { name:"Run Bangladesh",         logo:"https://logo.clearbit.com/runbangladesh.org" },
];

// ── How it works ──────────────────────────────────────────────────────────────
const STEPS = [
  { n:"01", title:"Requirement submission", desc:"Share your design concepts, quantity, fabric preferences, and specifications with our team.", emoji:"📋" },
  { n:"02", title:"Consultation & quotation", desc:"Our experts analyse your requirements, provide technical recommendations, and offer a competitive price.", emoji:"💬" },
  { n:"03", title:"Sampling", desc:"Upon approval, we develop a prototype sample for your review to confirm design and quality.", emoji:"🧵" },
  { n:"04", title:"Production", desc:"Once sample is approved, our skilled team initiates large-scale manufacturing with strict quality control.", emoji:"⚙️" },
  { n:"05", title:"QA & packing", desc:"Every garment undergoes final inspection to meet our quality standards before being professionally packed.", emoji:"🔍" },
  { n:"06", title:"Delivery", desc:"Prompt, secure delivery of your order — for local distribution or international export.", emoji:"🚚" },
];

// =============================================================================
//  🔧  MICRO COMPONENTS
// =============================================================================

function Stars({ n }) {
  return (
    <span style={{ display:"inline-flex", gap:2 }}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={12} strokeWidth={1.5}
          fill={i<=Math.round(n)?"#f59e0b":"none"}
          color={i<=Math.round(n)?"#f59e0b":"#d1d5db"} />
      ))}
    </span>
  );
}

// Red eyebrow label
function Eyebrow({ children, center=false }) {
  return (
    <p style={{ color:R, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
      textTransform:"uppercase", margin:"0 0 10px", textAlign:center?"center":"left" }}>
      {children}
    </p>
  );
}

// Main section heading — RED, large
function H2({ children, center=false }) {
  return (
    <h2 style={{ fontSize:30, fontWeight:800, color:R, margin:"0 0 8px",
      letterSpacing:"-0.4px", lineHeight:1.15, textAlign:center?"center":"left" }}>
      {children}
    </h2>
  );
}

// Sub-text below heading
function Lead({ children, center=false, maxW=540 }) {
  return (
    <p style={{ color:DG, fontSize:14, lineHeight:1.75, margin:"0 auto",
      maxWidth:center?maxW:"100%", textAlign:center?"center":"left" }}>
      {children}
    </p>
  );
}

// Red filled button
function BtnRed({ children, onClick, style={} }) {
  const [h,sh]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{ background:h?"#c8151b":R, color:W, border:"none", borderRadius:6,
        padding:"9px 18px", fontSize:12, fontWeight:700, cursor:"pointer",
        transition:"background .18s, transform .12s", display:"inline-flex",
        alignItems:"center", gap:6, transform:h?"translateY(-1px)":"none", ...style }}>
      {children}
    </button>
  );
}

// Outline button
function BtnOut({ children, onClick, style={} }) {
  const [h,sh]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{ background:h?R:"transparent", color:h?W:R, border:`1.5px solid ${R}`,
        borderRadius:6, padding:"8px 18px", fontSize:12, fontWeight:700, cursor:"pointer",
        transition:"all .18s", transform:h?"translateY(-1px)":"none", ...style }}>
      {children}
    </button>
  );
}

// Ghost dark outline
function BtnGhost({ children, onClick, style={} }) {
  const [h,sh]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{ background:h?DG:"transparent", color:h?W:DG, border:`1.5px solid ${BD}`,
        borderRadius:6, padding:"7px 16px", fontSize:12, fontWeight:600, cursor:"pointer",
        transition:"all .18s", ...style }}>
      {children}
    </button>
  );
}

// Jersey SVG placeholder (used until real product photos are provided)
function Jersey({ col=R }) {
  return (
    <div style={{ width:"100%", height:180, background:"#f3f4f6",
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="90" height="110" viewBox="0 0 88 108">
        <path d="M17 17L31 7L44 15L57 7L71 17L81 41L61 47L61 100L27 100L27 47L7 41Z"
          fill={col} opacity="0.78"/>
        <path d="M31 7L44 15L57 7L57 23L44 27L31 23Z" fill="white" opacity="0.2"/>
        <text x="44" y="80" textAnchor="middle" fill="white" fontSize="17"
          fontWeight="bold" opacity="0.5" fontFamily="sans-serif">AG</text>
      </svg>
    </div>
  );
}

// Image with fallback placeholder
function Img({ src, alt="", height=220, radius=10 }) {
  if (src) return (
    <img src={src} alt={alt}
      style={{ width:"100%", height, objectFit:"cover", borderRadius:radius, display:"block" }}/>
  );
  return (
    <div style={{ width:"100%", height, background:"#f3f4f6", borderRadius:radius,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      border:`1.5px dashed ${BD}` }}>
      <span style={{ fontSize:26, marginBottom:6 }}>🖼️</span>
      <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Photo coming soon</p>
    </div>
  );
}

// Form field
function Field({ label, value, onChange, placeholder, type="text" }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:12, fontWeight:600, color:DG, marginBottom:5 }}>
        {label}
      </label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${BD}`,
          borderRadius:7, fontSize:13, color:B, boxSizing:"border-box",
          fontFamily:"inherit", outline:"none", background:W }}
        onFocus={e=>e.target.style.borderColor=R}
        onBlur={e=>e.target.style.borderColor=BD} />
    </div>
  );
}

// Product card
function PCard({ p, setPage }) {
  const [wished,setWished]=useState(false);
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:W, borderRadius:12, overflow:"hidden",
        boxShadow:hov?"0 8px 32px rgba(0,0,0,0.11)":SH,
        transition:"box-shadow .2s, transform .2s", transform:hov?"translateY(-3px)":"none" }}>
      <div style={{ position:"relative" }}>
        <Jersey col={p.col}/>
        <button onClick={()=>setWished(!wished)}
          style={{ position:"absolute", top:10, right:10, background:W, border:"none",
            borderRadius:"50%", width:30, height:30, display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer", boxShadow:SH }}>
          <Heart size={13} fill={wished?R:"none"} color={wished?R:MG}/>
        </button>
        <span style={{ position:"absolute", top:10, left:10, background:R, color:W,
          fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4 }}>
          {p.cat}
        </span>
      </div>
      <div style={{ padding:"16px 18px 20px" }}>
        <p style={{ fontWeight:700, fontSize:14, color:B, margin:"0 0 3px" }}>{p.name}</p>
        <p style={{ color:MG, fontSize:12, margin:"0 0 8px" }}>{p.fabric}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <Stars n={p.rating}/>
          <span style={{ fontSize:11, color:MG }}>{p.rating} ({p.reviews})</span>
        </div>
        <p style={{ fontWeight:800, fontSize:15, color:R, margin:"0 0 14px" }}>{p.range}</p>
        <div style={{ display:"flex", gap:8 }}>
          <BtnRed onClick={()=>setPage("quote")}
            style={{ flex:1, justifyContent:"center", padding:"8px 0", fontSize:11 }}>
            Order now
          </BtnRed>
          <BtnOut onClick={()=>setPage("quote")} style={{ fontSize:11, padding:"6px 12px" }}>
            Quote
          </BtnOut>
        </div>
      </div>
    </div>
  );
}

// Client logo card — shows logo image, falls back to styled name if logo fails
function ClientCard({ c }) {
  const [err, setErr] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background: W,
        borderRadius: 10,
        padding: "18px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        minHeight: 90,
        boxShadow: hov ? "0 6px 24px rgba(0,0,0,0.10)" : SH,
        border: hov ? `1.5px solid ${R}` : `1.5px solid transparent`,
        transition: "all .2s",
        transform: hov ? "translateY(-2px)" : "none",
        cursor: "default",
      }}
    >
      {!err ? (
        <img
          src={c.logo}
          alt={c.name}
          onError={() => setErr(true)}
          style={{
            maxWidth: 90,
            maxHeight: 38,
            objectFit: "contain",
            filter: hov ? "none" : "grayscale(40%)",
            opacity: hov ? 1 : 0.78,
            transition: "all .2s",
          }}
        />
      ) : (
        // Fallback when logo can't load
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: hov ? R : DG,
          textAlign: "center",
          lineHeight: 1.4,
          transition: "color .2s",
        }}>
          {c.name}
        </span>
      )}
      <p style={{
        fontSize: 10,
        color: hov ? R : MG,
        margin: 0,
        textAlign: "center",
        fontWeight: 500,
        lineHeight: 1.4,
        transition: "color .2s",
      }}>
        {c.name}
      </p>
    </div>
  );
}

// Section wrapper with consistent spacing
function Section({ children, bg=W, py=72 }) {
  return (
    <section style={{ background:bg, padding:`${py}px 24px` }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>{children}</div>
    </section>
  );
}

// =============================================================================
//  🧭  NAVBAR
// =============================================================================
function Nav({ page, setPage }) {
  const links=[
    { l:"Home",         p:"home" },
    { l:"About",        p:"about" },
    { l:"Products",     p:"products" },
    { l:"Fabric guide", p:"fabric" },
    { l:"Gallery",      p:"gallery" },
    { l:"Contact",      p:"contact" },
  ];
  return (
    <nav style={{ background:W, position:"sticky", top:0, zIndex:50,
      borderBottom:`1px solid ${BD}`, boxShadow:"0 1px 8px rgba(0,0,0,0.05)" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", height:62,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <div onClick={()=>setPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:56, height:56, borderRadius:10, overflow:"hidden", flexShrink:0 }}>
            <img src={logo} alt="Advergo logo" style={{ width:"100%", height:"100%", objectFit:"contain" }} />
          </div>
          <div>
            <div style={{ color:B, fontWeight:800, fontSize:14, letterSpacing:"0.04em" }}>
              ADVERGO
            </div>
            <div style={{ color:MG, fontSize:9, letterSpacing:"0.1em" }}>
              SPORTS & FASHION WEAR LTD.
            </div>
          </div>
        </div>
        {/* Links */}
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          {links.map(l=>(
            <span key={l.p} onClick={()=>setPage(l.p)}
              style={{ color:page===l.p?R:DG, fontSize:13, fontWeight:600,
                cursor:"pointer", paddingBottom:2,
                borderBottom:page===l.p?`2px solid ${R}`:"2px solid transparent",
                transition:"color .15s" }}>
              {l.l}
            </span>
          ))}
          <BtnRed onClick={()=>setPage("quote")} style={{ padding:"8px 16px", fontSize:12 }}>
            Get a quote
          </BtnRed>
        </div>
      </div>
    </nav>
  );
}

// =============================================================================
//  🦶  FOOTER
// =============================================================================
function Footer({ setPage }) {
  return (
    <footer style={{ background:"#0f1117", color:W, padding:"56px 24px 28px" }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.4fr", gap:36, marginBottom:40 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:10, overflow:"hidden", flexShrink:0 }}>
                <img src={logo} alt="Advergo logo" style={{ width:"100%", height:"100%", objectFit:"contain" }} />
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:13, letterSpacing:"0.04em" }}>ADVERGO</div>
                <div style={{ color:"#6b7280", fontSize:9, letterSpacing:"0.1em" }}>
                  SPORTS & FASHION WEAR LTD.
                </div>
              </div>
            </div>
            <p style={{ color:"#9ca3af", fontSize:13, lineHeight:1.75, maxWidth:240, margin:"0 0 14px" }}>
              Premium custom sportswear manufacturer since 2019. Serving 10,000+ local and international buyers with quality and commitment.
            </p>
            <p style={{ color:"#6b7280", fontSize:11, margin:0 }}>{COMPANY.website}</p>
          </div>
          {[
            { title:"Pages", items:[["Home","home"],["About","about"],["Products","products"],["Fabric guide","fabric"],["Gallery","gallery"],["Contact","contact"]] },
            { title:"Categories", items:[["Football","products"],["Cricket","products"],["Cycling","products"],["Marathon","products"],["Corporate","products"]] },
          ].map(col=>(
            <div key={col.title}>
              <p style={{ color:R, fontSize:10, fontWeight:700, letterSpacing:"0.12em",
                textTransform:"uppercase", margin:"0 0 14px" }}>{col.title}</p>
              {col.items.map(([label,p])=>(
                <p key={label} onClick={()=>setPage(p)}
                  style={{ color:"#9ca3af", fontSize:13, margin:"0 0 10px", cursor:"pointer" }}>
                  {label}
                </p>
              ))}
            </div>
          ))}
          <div>
            <p style={{ color:R, fontSize:10, fontWeight:700, letterSpacing:"0.12em",
              textTransform:"uppercase", margin:"0 0 14px" }}>Contact</p>
            {[
              [<Phone key="ph" size={13}/>, COMPANY.phone],
              [<Mail key="ml" size={13}/>,  COMPANY.email],
              [<MapPin key="mp" size={13}/>, "Uttara, Dhaka-1230"],
            ].map(([icon,val],i)=>(
              <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", marginBottom:12 }}>
                <span style={{ color:R, marginTop:1 }}>{icon}</span>
                <span style={{ color:"#9ca3af", fontSize:13, lineHeight:1.5 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid #1f2937", paddingTop:20,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ color:"#4b5563", fontSize:11, margin:0 }}>
            © 2025 Advergo Sports & Fashion Wear Ltd. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:18 }}>
            {["Privacy policy","Terms & conditions","Return policy"].map(l=>(
              <span key={l} style={{ color:"#4b5563", fontSize:11, cursor:"pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp button
function WABtn() {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:999, width:50, height:50,
      borderRadius:"50%", background:"#25d366", display:"flex", alignItems:"center",
      justifyContent:"center", cursor:"pointer",
      boxShadow:"0 4px 18px rgba(37,211,102,0.45)" }}>
      <MessageCircle size={22} color={W} fill={W}/>
    </div>
  );
}

// Page header banner
function PageHdr({ eyebrow, title, sub }) {
  return (
    <div style={{ background:LG, padding:"52px 24px 44px", borderBottom:`1px solid ${BD}` }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ fontSize:34, fontWeight:800, color:R, margin:"0 0 8px", letterSpacing:"-0.5px" }}>
          {title}
        </h1>
        {sub && <p style={{ color:DG, fontSize:14, margin:0 }}>{sub}</p>}
      </div>
    </div>
  );
}

// =============================================================================
//  📄  HOME PAGE
// =============================================================================
function HomePage({ setPage }) {
  return <>

    {/* ── Hero ── */}
    <section style={{ position:"relative", minHeight:520, overflow:"hidden",
      display:"flex", alignItems:"center" }}>
      {/* Dummy hero image — replace with real photo */}
      <img
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=600&fit=crop"
        alt="Sportswear hero"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center" }}/>
      {/* Dark overlay */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(90deg,rgba(1,1,1,0.82) 48%,rgba(1,1,1,0.3) 100%)" }}/>
      {/* Content */}
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"80px 24px",
        position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:520 }}>
          <Eyebrow>Premium custom sportswear · Bangladesh</Eyebrow>
          <h1 style={{ color:W, fontSize:46, fontWeight:900, lineHeight:1.1,
            margin:"0 0 16px", letterSpacing:"-1px" }}>
            Built for champions.<br/>
            <span style={{ color:R }}>Made your way.</span>
          </h1>
          <p style={{ color:"#d1d5db", fontSize:15, lineHeight:1.75, margin:"0 0 28px" }}>
            Custom jersey & sportswear manufacturing for football clubs, cricket teams,
            cycling squads, and corporates — since 2019.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <BtnRed onClick={()=>setPage("products")}>
              Explore products <ArrowRight size={14}/>
            </BtnRed>
            <button onClick={()=>setPage("quote")}
              style={{ background:"transparent", color:W, border:"1.5px solid rgba(255,255,255,0.6)",
                borderRadius:6, padding:"8px 18px", fontSize:12, fontWeight:700,
                cursor:"pointer", transition:"border-color .18s" }}
              onMouseEnter={e=>e.target.style.borderColor=W}
              onMouseLeave={e=>e.target.style.borderColor="rgba(255,255,255,0.6)"}>
              Get a custom quote
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* ── Stats bar ── */}
    <div style={{ background:R }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"20px 24px",
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
        {STATS.map(s=>(
          <div key={s.l} style={{ textAlign:"center", borderRight:`1px solid rgba(255,255,255,0.25)` }}
            onMouseEnter={e=>{}} >
            <p style={{ color:W, fontSize:22, fontWeight:900, margin:"0 0 2px" }}>{s.n}</p>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:11, margin:0,
              letterSpacing:"0.06em", textTransform:"uppercase" }}>{s.l}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── Categories ── */}
    <Section bg={W}>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <Eyebrow center>What we make</Eyebrow>
        <H2 center>Sport categories</H2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
        {CATS.map(c=>{
          const [h,sh]=useState(false);
          return (
            <div key={c.id} onClick={()=>setPage("products")}
              onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
              style={{ background:h?R:LG, borderRadius:12, padding:"26px 16px",
                textAlign:"center", cursor:"pointer",
                boxShadow:h?"0 6px 24px rgba(235,33,39,0.18)":SH,
                transition:"all .2s", transform:h?"translateY(-3px)":"none" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{c.icon}</div>
              <p style={{ fontWeight:700, fontSize:14, color:h?W:B, margin:"0 0 4px",
                transition:"color .2s" }}>{c.name}</p>
              <p style={{ color:h?"rgba(255,255,255,0.78)":MG, fontSize:11, margin:0,
                lineHeight:1.5, transition:"color .2s" }}>{c.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>

    {/* ── Featured products ── */}
    <Section bg={LG}>
      <div style={{ display:"flex", justifyContent:"space-between",
        alignItems:"flex-end", marginBottom:36 }}>
        <div>
          <Eyebrow>Our collection</Eyebrow>
          <H2>Featured products</H2>
        </div>
        <BtnGhost onClick={()=>setPage("products")}>View all products →</BtnGhost>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {PRODS.map(p=><PCard key={p.id} p={p} setPage={setPage}/>)}
      </div>
    </Section>

    {/* ── How it works ── */}
    <Section bg={W}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <Eyebrow center>Simple process</Eyebrow>
        <H2 center>How to order</H2>
        <div style={{ marginTop:10 }}>
          <Lead center>No payment required upfront — submit your request and we contact you.</Lead>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {STEPS.map(s=>(
          <div key={s.n} style={{ background:LG, borderRadius:12, padding:"28px 24px",
            boxShadow:SH, borderTop:`3px solid ${R}` }}>
            <div style={{ fontSize:26, marginBottom:14 }}>{s.emoji}</div>
            <p style={{ color:R, fontSize:10, fontWeight:700, letterSpacing:"0.14em",
              textTransform:"uppercase", margin:"0 0 6px" }}>Step {s.n}</p>
            <p style={{ color:B, fontWeight:700, fontSize:15, margin:"0 0 10px" }}>{s.title}</p>
            <p style={{ color:DG, fontSize:13, lineHeight:1.7, margin:0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* ── Custom CTA ── */}
    <section style={{ background:R, padding:"72px 24px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-24, top:"50%", transform:"translateY(-50%)",
        fontSize:180, fontWeight:900, color:W, opacity:0.06, userSelect:"none",
        lineHeight:1 }}>CUSTOM</div>
      <div style={{ maxWidth:1140, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <p style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:700,
          letterSpacing:"0.16em", textTransform:"uppercase", margin:"0 0 12px" }}>
          No payment required
        </p>
        <h2 style={{ color:W, fontSize:32, fontWeight:900, margin:"0 0 14px",
          letterSpacing:"-0.4px" }}>Have your own design?</h2>
        <p style={{ color:"rgba(255,255,255,0.82)", fontSize:15, margin:"0 auto 28px",
          maxWidth:460, lineHeight:1.7 }}>
          Upload your design file (.ai, .jpg, .png) and get a quote. We contact you directly to confirm and arrange payment.
        </p>
        <button onClick={()=>setPage("quote")}
          style={{ background:W, color:R, border:"none", borderRadius:6,
            padding:"12px 28px", fontSize:13, fontWeight:800, cursor:"pointer",
            transition:"transform .15s" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          Request a custom quote →
        </button>
      </div>
    </section>

    {/* ── Achievements ── */}
    <Section bg={LG}>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <Eyebrow center>Legal & certifications</Eyebrow>
        <H2 center>Our official documents</H2>
        <div style={{ marginTop:10 }}>
          <Lead center>Fully registered, certified, and compliant — established in Bangladesh since 2019.</Lead>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
        {ACHIEVEMENTS.map((a,i)=>(
          <div key={i} style={{ background:W, borderRadius:12, overflow:"hidden",
            boxShadow:SH, textAlign:"center", padding:0 }}>
            <div style={{ height:120, display:"flex", alignItems:"center",
              justifyContent:"center", background:"#f0f0f0",
              borderBottom:`3px solid ${R}` }}>
              <span style={{ fontSize:44 }}>{a.icon}</span>
            </div>
            <div style={{ padding:"18px 16px" }}>
              <p style={{ fontWeight:700, fontSize:13, color:B, margin:"0 0 4px",
                lineHeight:1.3 }}>{a.title}</p>
              <p style={{ color:R, fontSize:11, fontWeight:600, margin:"0 0 4px" }}>{a.year}</p>
              <p style={{ color:MG, fontSize:11, margin:0, lineHeight:1.4 }}>{a.org}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* ── Reviews ── */}
    <Section bg={W}>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <Eyebrow center>Testimonials</Eyebrow>
        <H2 center>What our clients say</H2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {REVS.map((r,i)=>(
          <div key={i} style={{ background:LG, borderRadius:12, padding:28, boxShadow:SH }}>
            <div style={{ marginBottom:14 }}><Stars n={r.rating}/></div>
            <p style={{ color:DG, fontSize:13, lineHeight:1.8, margin:"0 0 20px",
              fontStyle:"italic" }}>"{r.text}"</p>
            <p style={{ fontWeight:700, fontSize:14, color:B, margin:"0 0 2px" }}>{r.name}</p>
            <p style={{ color:MG, fontSize:12, margin:0 }}>{r.org}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* ── Gallery preview ── */}
    <Section bg={LG}>
      <div style={{ display:"flex", justifyContent:"space-between",
        alignItems:"flex-end", marginBottom:34 }}>
        <div>
          <Eyebrow>Factory & clients</Eyebrow>
          <H2>Gallery preview</H2>
        </div>
        <BtnGhost onClick={()=>setPage("gallery")}>View full gallery →</BtnGhost>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {GALLERY.slice(0,6).map(item=>(
          <div key={item.id} style={{ borderRadius:10, overflow:"hidden",
            boxShadow:SH, cursor:"pointer", transition:"transform .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <Img src={item.src} alt={item.label} height={200} radius={0}/>
            <div style={{ background:W, padding:"10px 14px" }}>
              <p style={{ fontSize:12, fontWeight:700, color:B, margin:"0 0 2px" }}>{item.label}</p>
              <p style={{ fontSize:11, color:MG, margin:0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* ── Client logos ── */}
    <Section bg={LG}>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <Eyebrow center>Trusted by 10,000+ buyers</Eyebrow>
        <H2 center>Our respected clients</H2>
        <div style={{ marginTop:10 }}>
          <Lead center>Banks · Universities · Corporates · Sports federations · FMCG brands</Lead>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:14 }}>
        {CLIENTS.map(c=><ClientCard key={c.name} c={c}/>)}
      </div>
    </Section>
  </>;
}

// =============================================================================
//  📄  ABOUT PAGE
// =============================================================================
function AboutPage({ setPage }) {
  return (
    <div style={{ background:W }}>
      <PageHdr eyebrow="Company" title="About Advergo"
        sub="Premium sportswear manufacturer from Bangladesh — since 2019."/>

      {/* Welcome */}
      <Section bg={W}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <H2>Quality with commitment</H2>
            <p style={{ color:DG, fontSize:14, lineHeight:1.8, margin:"16px 0 20px" }}>
              Founded in 2019 under the visionary leadership of Managing Director <strong>Md. Ashikul Islam</strong>, Advergo Sports & Fashion Wear Ltd. has rapidly emerged as a reliable name in the apparel manufacturing industry.
            </p>
            <p style={{ color:DG, fontSize:14, lineHeight:1.8, margin:"0 0 24px" }}>
              Operating from a dedicated 6,000 SFT facility, we blend modern technology with skilled craftsmanship to produce premium Sports Jerseys, Trousers, Jackets, ID Card Ribbons, and Caps — for both local and international markets.
            </p>
            <BtnRed onClick={()=>setPage("quote")}>Get a custom quote</BtnRed>
          </div>
          <Img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=440&fit=crop"
            alt="Factory" height={360} radius={12}/>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section bg={LG}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          {[
            { label:"Our mission", title:"Empowering athletes & organisations",
              text:"To provide high-quality, innovative, and durable sports and fashion apparel that empowers athletes and organisations to perform at their best. We are committed to excellence in manufacturing, timely delivery, and building lasting partnerships through superior craftsmanship and personalised service." },
            { label:"Our vision", title:"A leading global name in sportswear",
              text:"To become a leading global name in the sports and fashion apparel industry, recognised for our innovation, sustainable practices, and unwavering commitment to quality. We aim to set new benchmarks in textile manufacturing, ensuring every garment reflects the spirit of excellence." },
          ].map(mv=>(
            <div key={mv.label} style={{ background:W, borderRadius:12, padding:32,
              boxShadow:SH, borderTop:`3px solid ${R}` }}>
              <Eyebrow>{mv.label}</Eyebrow>
              <h3 style={{ color:B, fontWeight:700, fontSize:18, margin:"0 0 14px",
                lineHeight:1.3 }}>{mv.title}</h3>
              <p style={{ color:DG, fontSize:13, lineHeight:1.8, margin:0 }}>{mv.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Production capability */}
      <Section bg={W}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <Eyebrow center>Infrastructure</Eyebrow>
          <H2 center>Production capability</H2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
          {[
            { icon:"👷", label:"Skilled workforce", val:"200+ workers" },
            { icon:"🖨️", label:"Printing machine", val:"62-inch precision" },
            { icon:"🧵", label:"Sewing machines", val:"60–70 industrial units" },
            { icon:"📦", label:"Daily capacity", val:"2,000+ pieces" },
          ].map(s=>(
            <div key={s.label} style={{ background:LG, borderRadius:12, padding:24,
              textAlign:"center", boxShadow:SH }}>
              <div style={{ fontSize:30, marginBottom:12 }}>{s.icon}</div>
              <p style={{ color:MG, fontSize:11, fontWeight:600, textTransform:"uppercase",
                letterSpacing:"0.1em", margin:"0 0 6px" }}>{s.label}</p>
              <p style={{ color:R, fontWeight:800, fontSize:16, margin:0 }}>{s.val}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
//  📄  PRODUCTS PAGE
// =============================================================================
function ProductsPage({ setPage }) {
  const [filter,setFilter]=useState("all");
  const cats=["all","football","cricket","cycling","marathon","corporate"];
  const filtered=filter==="all"?PRODS:PRODS.filter(p=>p.cat.toLowerCase()===filter);
  return (
    <div style={{ background:LG, minHeight:"100vh" }}>
      <PageHdr eyebrow="Catalogue" title="All products"
        sub="Custom-manufactured sportswear across 5 sport categories."/>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap" }}>
          {cats.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{ background:filter===f?R:W, color:filter===f?W:DG,
                border:`1.5px solid ${filter===f?R:BD}`, borderRadius:20,
                padding:"7px 18px", fontSize:12, fontWeight:600, cursor:"pointer",
                textTransform:"capitalize", transition:"all .15s" }}>
              {f==="all"?"All products":f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
        {filtered.length>0
          ?<div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {filtered.map(p=><PCard key={p.id} p={p} setPage={setPage}/>)}
          </div>
          :<p style={{ color:MG, textAlign:"center", padding:"56px 0" }}>
            No products in this category yet.
          </p>
        }
      </div>
    </div>
  );
}

// =============================================================================
//  📄  CUSTOM QUOTE PAGE
// =============================================================================
function QuotePage() {
  const [done,setDone]=useState(false);
  const [file,setFile]=useState(null);
  const [f,setF]=useState({ name:"",phone:"",email:"",category:"",product:"",qty:"",size:"",notes:"" });
  const up=(k,v)=>setF(p=>({...p,[k]:v}));

  if (done) return (
    <div style={{ minHeight:"72vh", display:"flex", alignItems:"center",
      justifyContent:"center", background:LG, padding:24 }}>
      <div style={{ background:W, borderRadius:14, padding:56, textAlign:"center",
        maxWidth:400, boxShadow:SH }}>
        <div style={{ width:60, height:60, background:R+"15", borderRadius:"50%",
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
          <Check size={28} color={R}/>
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, color:B, margin:"0 0 10px" }}>
          Request submitted!
        </h2>
        <p style={{ color:DG, fontSize:13, lineHeight:1.75, margin:"0 0 24px" }}>
          Our team will contact you within 24 hours at your phone/WhatsApp to confirm details. No payment is required at this stage.
        </p>
        <BtnRed onClick={()=>setDone(false)}>Submit another request</BtnRed>
      </div>
    </div>
  );

  return (
    <div style={{ background:LG, minHeight:"100vh" }}>
      <PageHdr eyebrow="No payment required" title="Get a custom quote"
        sub="Submit your requirements — we'll contact you directly to confirm and finalise."/>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ background:W, borderRadius:14, padding:36, boxShadow:SH }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Full name *"        value={f.name}     onChange={v=>up("name",v)}     placeholder="Your name"/>
            <Field label="Phone / WhatsApp *" value={f.phone}    onChange={v=>up("phone",v)}    placeholder="+880 1XXX-XXXXXX"/>
            <Field label="Email address"       value={f.email}    onChange={v=>up("email",v)}    placeholder="your@email.com" type="email"/>
            <Field label="Sport category *"    value={f.category} onChange={v=>up("category",v)} placeholder="Football, Cricket, Cycling…"/>
            <Field label="Product type *"      value={f.product}  onChange={v=>up("product",v)}  placeholder="Jersey, Trouser, Polo…"/>
            <Field label="Quantity *"          value={f.qty}      onChange={v=>up("qty",v)}      placeholder="e.g. 25 pieces"/>
          </div>
          <div style={{ marginTop:16 }}>
            <Field label="Size breakdown" value={f.size} onChange={v=>up("size",v)}
              placeholder="e.g. 5×S, 10×M, 8×L, 2×XL"/>
          </div>
          {/* File upload */}
          <div style={{ marginTop:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:DG, marginBottom:5 }}>
              Upload design file
            </label>
            <div onClick={()=>document.getElementById("fi-upload").click()}
              style={{ border:`1.5px dashed ${BD}`, borderRadius:8, padding:"28px 20px",
                textAlign:"center", cursor:"pointer", background:LG, transition:"border-color .15s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=R}
              onMouseLeave={e=>e.currentTarget.style.borderColor=BD}>
              <Upload size={22} color={MG} style={{ margin:"0 auto 8px", display:"block" }}/>
              <p style={{ fontWeight:600, fontSize:13, color:DG, margin:"0 0 3px" }}>
                {file?file.name:"Click to upload your design"}
              </p>
              <p style={{ color:MG, fontSize:11, margin:0 }}>
                Supports .ai · .jpg · .png · .pdf (max 20 MB)
              </p>
              <input id="fi-upload" type="file" style={{ display:"none" }}
                accept=".ai,.jpg,.jpeg,.png,.pdf"
                onChange={e=>setFile(e.target.files[0])}/>
            </div>
          </div>
          {/* Notes */}
          <div style={{ marginTop:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:DG, marginBottom:5 }}>
              Additional notes
            </label>
            <textarea value={f.notes} onChange={e=>up("notes",e.target.value)}
              placeholder="Colour preferences, deadline, special requirements…" rows={4}
              style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${BD}`,
                borderRadius:7, fontSize:13, color:B, boxSizing:"border-box",
                fontFamily:"inherit", resize:"vertical", outline:"none" }}
              onFocus={e=>e.target.style.borderColor=R}
              onBlur={e=>e.target.style.borderColor=BD}/>
          </div>
          {/* Note */}
          <div style={{ background:LG, borderRadius:8, padding:14, marginTop:16,
            display:"flex", gap:10, alignItems:"flex-start" }}>
            <Check size={14} color={R} style={{ flexShrink:0, marginTop:1 }}/>
            <p style={{ fontSize:12, color:DG, lineHeight:1.65, margin:0 }}>
              <strong>No payment required to submit.</strong> After reviewing your request, our team will contact you by phone or WhatsApp to confirm details and discuss payment.
            </p>
          </div>
          <BtnRed onClick={()=>setDone(true)}
            style={{ marginTop:20, width:"100%", justifyContent:"center", padding:"13px 0", fontSize:13 }}>
            Submit order request
          </BtnRed>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  📄  FABRIC GUIDE PAGE
// =============================================================================
function FabricPage({ setPage }) {
  return (
    <div style={{ background:LG, minHeight:"100vh" }}>
      <PageHdr eyebrow="Materials" title="Fabric guide"
        sub="We source top-tier materials — all undergo rigorous testing for colour fastness, shrinkage control, and long-lasting comfort."/>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
          {FABRICS.map(f=>(
            <div key={f.name} style={{ background:W, borderRadius:12, padding:28,
              display:"flex", gap:20, boxShadow:SH, borderLeft:`4px solid ${R}` }}>
              <div style={{ width:68, height:68, background:LG, borderRadius:8,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, fontSize:26, border:`1px solid ${BD}` }}>🧵</div>
              <div>
                <p style={{ fontWeight:700, fontSize:15, color:B, margin:"0 0 2px" }}>{f.name}</p>
                <p style={{ color:MG, fontSize:10, fontWeight:600, letterSpacing:"0.08em",
                  textTransform:"uppercase", margin:"0 0 3px" }}>{f.grade}</p>
                <p style={{ color:R, fontSize:10, fontWeight:700, letterSpacing:"0.1em",
                  textTransform:"uppercase", margin:"0 0 10px" }}>Best for: {f.use}</p>
                <p style={{ color:DG, fontSize:13, lineHeight:1.7, margin:"0 0 14px" }}>{f.desc}</p>
                <BtnRed onClick={()=>setPage("quote")} style={{ padding:"7px 14px", fontSize:11 }}>
                  Order with this fabric
                </BtnRed>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  📄  GALLERY PAGE
// =============================================================================
function GalleryPage() {
  const [tab,setTab]=useState("all");
  const tabs=[
    { id:"all",     label:"All photos" },
    { id:"factory", label:"🏭  Factory" },
    { id:"clients", label:"🤝  Client deliveries" },
  ];
  const visible=tab==="all"?GALLERY:GALLERY.filter(g=>g.category===tab);

  return (
    <div style={{ background:LG, minHeight:"100vh" }}>
      <PageHdr eyebrow="Our work" title="Gallery"
        sub="Factory sections, production process, and client order deliveries."/>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"36px 24px" }}>
        {/* Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:30 }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ background:tab===t.id?B:W, color:tab===t.id?W:DG,
                border:`1.5px solid ${tab===t.id?B:BD}`, borderRadius:20,
                padding:"8px 18px", fontSize:13, fontWeight:600,
                cursor:"pointer", transition:"all .15s" }}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {visible.map(item=>(
            <div key={item.id} style={{ borderRadius:12, overflow:"hidden",
              background:W, cursor:"pointer", boxShadow:SH,
              transition:"transform .2s, box-shadow .2s" }}
              onMouseEnter={e=>{
                e.currentTarget.style.transform="scale(1.02)";
                e.currentTarget.style.boxShadow="0 10px 32px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.transform="scale(1)";
                e.currentTarget.style.boxShadow=SH;
              }}>
              <Img src={item.src} alt={item.label} height={210} radius={0}/>
              <div style={{ padding:"12px 16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ fontSize:13, fontWeight:700, color:B, margin:0 }}>{item.label}</p>
                  <span style={{ fontSize:10, background:item.category==="clients"?R+"15":LG,
                    color:item.category==="clients"?R:MG, padding:"2px 8px",
                    borderRadius:10, fontWeight:600 }}>
                    {item.category==="factory"?"Factory":"Client"}
                  </span>
                </div>
                <p style={{ fontSize:11, color:MG, margin:"3px 0 0" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  📄  CONTACT PAGE
// =============================================================================
function ContactPage() {
  const [msg,setMsg]=useState({ name:"",contact:"",text:"" });
  const up=(k,v)=>setMsg(m=>({...m,[k]:v}));
  return (
    <div style={{ background:LG, minHeight:"100vh" }}>
      <PageHdr eyebrow="Get in touch" title="Contact us"
        sub="Our team is ready to help with your order requirements."/>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"40px 24px",
        display:"grid", gridTemplateColumns:"1fr 1.8fr", gap:28 }}>
        {/* Info panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:B, borderRadius:14, padding:28 }}>
            <h3 style={{ color:W, fontSize:16, fontWeight:700, margin:"0 0 22px" }}>
              Contact information
            </h3>
            {[
              [<Phone key="ph" size={15}/>, "Phone",    COMPANY.phone],
              [<MessageCircle key="wa" size={15}/>, "WhatsApp", COMPANY.phone],
              [<Mail key="ml" size={15}/>,  "Email",    COMPANY.email],
              [<MapPin key="ho" size={15}/>, "Head office", COMPANY.headOffice],
              [<MapPin key="fa" size={15}/>, "Factory",  COMPANY.factory],
            ].map(([icon,label,val],i)=>(
              <div key={i} style={{ display:"flex", gap:12, marginBottom:18,
                alignItems:"flex-start" }}>
                <div style={{ width:34, height:34, background:R+"25", borderRadius:7,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, color:R, marginTop:2 }}>{icon}</div>
                <div>
                  <p style={{ color:"#6b7280", fontSize:10, fontWeight:700,
                    letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 2px" }}>
                    {label}
                  </p>
                  <p style={{ color:W, fontSize:13, fontWeight:500, margin:0, lineHeight:1.5 }}>
                    {val}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:10, background:"#25d366",
              borderRadius:8, padding:"11px 16px", cursor:"pointer", marginTop:4 }}>
              <MessageCircle size={16} color={W} fill={W}/>
              <span style={{ color:W, fontWeight:700, fontSize:13 }}>Chat on WhatsApp</span>
            </div>
          </div>
          <div style={{ background:R, borderRadius:14, padding:22 }}>
            <p style={{ color:W, fontWeight:700, fontSize:14, margin:"0 0 8px" }}>
              Business hours
            </p>
            <p style={{ color:"rgba(255,255,255,0.85)", fontSize:13, lineHeight:1.85, margin:0 }}>
              Saturday – Thursday: 9:00 AM – 7:00 PM<br/>Friday: Closed
            </p>
          </div>
        </div>
        {/* Form */}
        <div style={{ background:W, borderRadius:14, padding:36, boxShadow:SH }}>
          <h3 style={{ fontSize:18, fontWeight:700, color:B, margin:"0 0 22px" }}>
            Send us a message
          </h3>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <Field label="Your name" value={msg.name} onChange={v=>up("name",v)}
              placeholder="Full name"/>
            <Field label="Email or phone" value={msg.contact} onChange={v=>up("contact",v)}
              placeholder="email@example.com or +880…"/>
            <div>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:DG, marginBottom:5 }}>
                Message
              </label>
              <textarea value={msg.text} onChange={e=>up("text",e.target.value)}
                placeholder="Tell us about your requirements…" rows={6}
                style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${BD}`,
                  borderRadius:7, fontSize:13, color:B, boxSizing:"border-box",
                  fontFamily:"inherit", resize:"vertical", outline:"none" }}
                onFocus={e=>e.target.style.borderColor=R}
                onBlur={e=>e.target.style.borderColor=BD}/>
            </div>
          </div>
          <BtnRed style={{ marginTop:20, width:"100%", justifyContent:"center",
            padding:"13px 0", fontSize:13 }}>
            Send message
          </BtnRed>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  🚀  APP
// =============================================================================
export default function App() {
  const [page,setPage]=useState("home");
  const go=(p)=>{ setPage(p); window.scrollTo?.(0,0); };

  const render=()=>{
    if(page==="home")     return <HomePage     setPage={go}/>;
    if(page==="about")    return <AboutPage    setPage={go}/>;
    if(page==="products") return <ProductsPage setPage={go}/>;
    if(page==="quote")    return <QuotePage/>;
    if(page==="fabric")   return <FabricPage   setPage={go}/>;
    if(page==="gallery")  return <GalleryPage/>;
    if(page==="contact")  return <ContactPage/>;
    return <HomePage setPage={go}/>;
  };

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", margin:0, padding:0 }}>
      <Nav page={page} setPage={go}/>
      <main>{render()}</main>
      <Footer setPage={go}/>
      <WABtn/>
    </div>
  );
}
