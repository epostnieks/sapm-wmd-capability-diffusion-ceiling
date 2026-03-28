// WMD7aCapabilityDiffusionCeiling.jsx
// Postnieks Impossibility Program — SAPM Companion Dashboard
// Bloomberg terminal aesthetic: JetBrains Mono + Newsreader, navy/gold/crimson/green
// Drop into Next.js: pages/dashboards/WMD7aCapabilityDiffusionCeiling.jsx  (or app/dashboards/WMD7aCapabilityDiffusionCeiling/page.jsx)
// Dependencies: none (pure React + inline styles)

import { useState } from 'react';
import SAPMNav from "./SAPMNav";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

// ─── Data ─────────────────────────────────────────────────────────────────
const META = {
  title: "The Capability Diffusion Ceiling",
  subtitle: "§7a WMD SAPM — A New Impossibility Theorem",
  beta: "—",
  ci: "",
  pi: "$50.0B",
  psa: "-$250.0B/yr",
  mu: "0.2 (20.0%)",
  kappa: "0.65",
  type: "Impossibility Theorem | Capability Diffusion Ceiling | Backward-Looking | Ratchet Structure",
  companion: "",
};

const CHANNELS = [
        { id:1, name:"Nuclear: existing 12,241 warhead welfare risk", beta:"~high", value:"Catastrophic tail risk", weight:"dominant" },
        { id:2, name:"A.Q. Khan diffusion: 4+ state transfers, permanent", beta:"~high", value:"Irreversible", weight:"~40%" },
        { id:3, name:"LAWS proliferation (Kargu-2 combat deployment)", beta:"~med", value:"Accelerating", weight:"~25%" },
        { id:4, name:"Proliferation ratchet: 1→9 states, 81 years", beta:"~high", value:"Monotonic increase", weight:"~20%" },
        { id:5, name:"New START expiration (Feb 5, 2026)", beta:"~med", value:"First unconstrained period since 1972", weight:"~15%" },
];

const CROSS_DOMAIN = [
        { domain:"ERCOT (Texas Grid)", beta:"2,053", type:"Institutional", pi:"$2.3B" },
        { domain:"PFAS (Forever Chemicals)", beta:"35.2", type:"Impossibility", pi:"$4.1B" },
        { domain:"Monoculture Agriculture", beta:"8.6", type:"Impossibility", pi:"$52B" },
        { domain:"Opioid Ecosystem", beta:"10.2", type:"Institutional", pi:"~$35B" },
        { domain:"Commercial Real Estate", beta:"8.4", type:"Institutional", pi:"$12-15B" },
        { domain:"Persistent Org. Pollutants", beta:"8.4", type:"Institutional", pi:"$38B" },
        { domain:"Gene Drives", beta:"12.4", type:"Impossibility", pi:"" },
        { domain:"Big Tech / Platform", beta:"7.4", type:"Institutional", pi:"$158B" },
        { domain:"Frontier AI", beta:"7.4", type:"Impossibility", pi:"" },
        { domain:"Palm Oil", beta:"6.2", type:"Institutional", pi:"$67B" },
        { domain:"Oil & Gas Extraction", beta:"6.2", type:"Institutional", pi:"$3.5T" },
        { domain:"Gambling (Commercial)", beta:"6.3", type:"Institutional", pi:"$44.2B" },
        { domain:"PBM Rebate System", beta:"6.3", type:"Institutional", pi:"$27.6B" },
        { domain:"Coal Combustion", beta:"6.1", type:"Institutional", pi:"" },
        { domain:"Aviation Emissions", beta:"4.6", type:"Institutional", pi:"$1.007T" },
        { domain:"Algorithmic Pricing", beta:"4.2", type:"Institutional", pi:"$39.5B" },
        { domain:"Gig Economy Platforms", beta:"4.2", type:"Institutional", pi:"" },
        { domain:"Global Fisheries", beta:"4.72", type:"Institutional", pi:"" },
        { domain:"UPF / Ultra-Processed Food", beta:"6.2", type:"Institutional", pi:"" },
        { domain:"Deep-Sea Mining", beta:"4.7", type:"Impossibility", pi:"" },
        { domain:"Arms Exports", beta:"2.4", type:"Institutional", pi:"$293B" },
        { domain:"Antimicrobial Resistance", beta:"2.1", type:"Impossibility", pi:"" },
        { domain:"Nuclear Energy", beta:"0.7", type:"Impossibility", pi:"" },
        { domain:"Orbital Debris (LEO)", beta:"2,053", type:"Impossibility", pi:"$293B" },
        { domain:"WMD Capability Diffusion", beta:"—", type:"Impossibility", pi:"" },
        { domain:"Bitcoin (PoW)", beta:"5.0", type:"Impossibility", pi:"" },
];

const HIGHLIGHTS = [
        "A2 (Knowledge Transfer Identity) is inviolable: P-2 centrifuge designs distributed by A.Q. Khan are currently operational in North Korea. They cannot be deleted.",
        "A3 (Proliferation Ratchet): 1 → 9 nuclear-capable states in 81 years. Monotonically non-decreasing with one exception (South Africa, requiring complete regime change).",
        "New START expired February 5, 2026 — first time since 1972 no legally binding treaty constrains U.S. and Russian strategic nuclear forces.",
        "LAWS pre-proliferation window: 2026 described as \"the final moment in history before autonomous weapons become as common and unmanageable as small arms.\"",
        "The Capability Diffusion Ceiling is unique in the SAPM series: welfare destruction is backward-looking. Even if all future transfers halted today, existing diffusion state generates irreducible welfare risk.",
        "Iran within weeks of weapons-grade breakout; Saudi Arabia publicly stated counter-proliferation trigger. A1 not weakening.",
];

const PSF_PARAMS = {pi_c:0.38,pi_p:38.0,w_c:190.0,kappa:0.96};
const PSF_DATA = [{pi:0.04,w:189.99},{pi:2.01,w:189.66},{pi:3.99,w:188.32},{pi:5.96,w:185.99},{pi:7.94,w:182.63},{pi:9.91,w:178.29},{pi:11.88,w:172.96},{pi:13.86,w:166.58},{pi:15.83,w:159.24},{pi:17.81,w:150.85},{pi:19.78,w:141.49},{pi:21.76,w:131.09},{pi:23.73,w:119.73},{pi:25.71,w:107.31},{pi:27.68,w:93.95},{pi:29.66,w:79.51},{pi:31.63,w:64.14},{pi:33.6,w:47.77},{pi:35.58,w:30.31},{pi:37.55,w:11.94},{pi:39.53,w:-7.54},{pi:41.5,w:-27.92},{pi:43.48,w:-49.41},{pi:45.45,w:-71.8},{pi:47.43,w:-95.3},{pi:49.4,w:-119.69}];

const MC_PARAMS = {n_draws:10000,mean:100.0,ci_lo:58.0,ci_hi:168.0,pct_hw:100.0,channels:[{name:"Nuclear weapons use probability × consequence",dist:"log-normal",lo:35.0,hi:72.0},{name:"Chemical/biological weapons proliferation",dist:"log-normal",lo:12.0,hi:32.0},{name:"Dual-use technology diffusion (AI, bio)",dist:"triangular",lo:8.0,hi:28.0},{name:"Non-state actor acquisition risk",dist:"triangular",lo:4.0,hi:18.0},{name:"Deterrence stability erosion",dist:"uniform",lo:2.0,hi:14.0}]};
const MC_DATA = [{bin:"5.4",count:22},{bin:"16.2",count:53},{bin:"27.1",count:114},{bin:"37.9",count:220},{bin:"48.8",count:383},{bin:"59.6",count:599},{bin:"70.4",count:843},{bin:"81.2",count:1067},{bin:"92.1",count:1215},{bin:"102.9",count:1245},{bin:"113.8",count:1148},{bin:"124.6",count:952},{bin:"135.4",count:710},{bin:"146.2",count:477},{bin:"157.1",count:288},{bin:"167.9",count:156},{bin:"178.8",count:76},{bin:"189.6",count:33},{bin:"200.4",count:13},{bin:"211.2",count:4}];

const THRESHOLDS = [{domain:"NPT erosion and withdrawal threshold",year:2024,status:"DPRK withdrew from NPT (2003); Iran enriching to 60% (IAEA 2024); 9 nuclear-armed states hold 12,121 warheads (SIPRI 2024); NPT RevCon 2020/2026 failed to produce consensus document",confidence:"High",crossed:true},{domain:"Bioweapons synthesis accessibility",year:2025,status:"Benchtop DNA synthesis costs fell from $10/bp (2000) to $0.07/bp (2024); AI protein structure prediction (AlphaFold) and de novo protein design lower barriers to gain-of-function research; WHO Global Health Security Index shows 75% of countries unprepared for bioweapon event",confidence:"Medium",crossed:false},{domain:"Autonomous weapons proliferation",year:2028,status:"CCW GGE on LAWS: no binding instrument after 10+ years; autonomous drones deployed in Libya (2020), Nagorno-Karabakh (2020), Ukraine (2022–); commercial drone-to-weapon conversion demonstrated",confidence:"Medium",crossed:false},{domain:"Nuclear arsenal modernization completion",year:2035,status:"All 9 nuclear states modernizing arsenals simultaneously; US $1.7T modernization program (2017–2046); Russia deploying Sarmat, Poseidon; China expanding to estimated 1,000 warheads by 2030 (DoD 2023)",confidence:"High",crossed:false}];

const AXIOMS = {type:"impossibility",items:[{id:"A1",name:"Knowledge Diffusion Irreversibility",description:"Nuclear weapons physics has been publicly available since Smyth Report (1945) and declassified Teller–Ulam design principles. Centrifuge enrichment technology spread via A.Q. Khan network to Libya, Iran, DPRK. Once knowledge diffuses, it cannot be un-diffused—this is an information-theoretic impossibility (entropy of knowledge only increases)."},{id:"A2",name:"Dual-Use Technology Indistinguishability",description:"Uranium enrichment, biocontainment labs, chemical feedstocks, and missile technology are inherently dual-use; there is no physical way to distinguish peaceful nuclear fuel enrichment from weapons-grade enrichment until >20% U-235 concentration. CWC’s Schedule 1/2/3 chemical lists cannot cover all possible nerve agent precursors (organophosphorus chemistry is vast)."},{id:"A3",name:"Deterrence Instability Under Multipolarity",description:"Schelling (1960) showed bilateral deterrence is conditionally stable; extending to N>2 nuclear actors creates combinatorial instability—credible second-strike assurance becomes mathematically impossible with >5 nuclear actors with diverse delivery systems, doctrines, and C3I vulnerabilities. Current 9-actor system exceeds this threshold."}]};

const METHODS_DATA = {
  welfare_function: "W = −P(use) × Consequence(use). Nuclear exchange welfare cost: Toon et al. (2019, Science Advances) estimate India-Pakistan nuclear war (100 Hiroshima-sized weapons) = 27–47M immediate deaths + nuclear winter causing 2B+ famine deaths. P(nuclear use this century) estimated at 10–40% (Ord 2020; Hellman 2008).",
  cooperative_baseline: "Universal NPT compliance + CTBT entry into force + TPNW adherence by nuclear states + BWC verification protocol + CWC universal membership + LAWS ban; cooperative Π_C = $0.38B reflects legitimate dual-use research under strict safeguards only.",
  falsification: ["If nuclear disarmament reduces global warheads to <1,000 and delivery systems are verifiably dismantled, multipolarity instability decreases.","If DNA synthesis screening achieves 100% coverage of all commercial providers and prevents misuse, bioweapons accessibility ceiling rises.","If Monte Carlo robustness for β_W > 1 falls below 80%, point estimate is unreliable.","If autonomous weapons ban achieves universal compliance (analogous to Blinding Lasers Protocol), LAWS channel closes."],
  key_sources: ["SIPRI (2024). SIPRI Yearbook 2024: Armaments, Disarmament and International Security.","Toon, O.B. et al. (2019). Rapidly expanding nuclear arsenals in Pakistan and India. Science Advances 5(10).","Ord, T. (2020). The Precipice: Existential Risk and the Future of Humanity. Bloomsbury.","Schelling, T.C. (1960). The Strategy of Conflict. Harvard University Press.","IAEA (2024). Iran NPT Safeguards Agreement: Director General Report. GOV/2024/15."]
};


// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  bg:      '#0D0D0D',
  panel:   '#1A1A1A',
  border:  'rgba(255,255,255,0.08)',
  navy:    '#1A1A1A',
  gold:    '#F59E0B',
  crimson: '#EF4444',
  green:   '#22C55E',
  text:    '#F5F0E8',
  muted:   'rgba(255,255,255,0.4)',
  thead:   '#141414',
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
  serif:   "'Newsreader', 'Georgia', serif",
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function Metric({ label, value, sub, color }) {
  return (
    <div style={{flex:1,minWidth:140,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
      <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{fontFamily:C.mono,fontSize:28,fontWeight:700,color:color||C.gold,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,letterSpacing:2,borderBottom:`1px solid ${C.border}`,paddingBottom:6,marginBottom:12,marginTop:20,textTransform:'uppercase'}}>
      {children}
    </div>
  );
}

function BetaBar({ beta, max }) {
  const pct = Math.min(100, (parseFloat(beta)||0) / (max||15) * 100);
  const color = pct > 80 ? C.crimson : pct > 50 ? '#D97706' : C.gold;
  return (
    <div style={{background:'rgba(255,255,255,0.04)',borderRadius:2,height:8,flex:1,margin:'0 8px'}}>
      <div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:2,transition:'width 0.4s'}} />
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily:C.mono, fontSize:12, letterSpacing:1,
      padding:'6px 14px', border:'none', cursor:'pointer',
      background: active ? C.gold : 'transparent',
      color: active ? '#000' : C.muted,
      borderBottom: active ? `2px solid ${C.gold}` : '2px solid transparent',
      textTransform:'uppercase',
    }}>{label}</button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function WMD7aCapabilityDiffusionCeilingDashboard() {
  const [tab, setTab] = useState('overview');
  const maxBeta = Math.max(...CROSS_DOMAIN.map(d => parseFloat(d.beta)||0), parseFloat(META.beta)||0, 10);

  return (
    <div style={{background:C.bg,minHeight:'100vh',padding:'0',fontFamily:C.mono,color:C.text}}>

      {/* Header */}
      <div style={{background:C.panel,borderBottom:`2px solid ${C.gold}`,padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:2,marginBottom:4}}>POSTNIEKS IMPOSSIBILITY PROGRAM · SAPM</div>
          <div style={{fontFamily:C.serif,fontSize:24,fontWeight:700,color:C.text}}>{META.title}</div>
          {META.subtitle && <div style={{fontFamily:C.serif,fontSize:15,color:C.muted,marginTop:2,fontStyle:'italic'}}>{META.subtitle}</div>}
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1}}>SYSTEM BETA</div>
          <div style={{fontFamily:C.mono,fontSize:36,fontWeight:700,color:C.gold,lineHeight:1}}>β_W = {META.beta}</div>
          {META.ci && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>90% CI [{META.ci}]</div>}
        </div>
      </div>

      {/* PST badge + type */}
      <div style={{background:'rgba(245,158,11,0.06)',padding:'8px 24px',display:'flex',gap:10,alignItems:'center',borderBottom:`1px solid ${C.border}`}}>
        <span style={{background:'#7b1a1a',color:'#ffdddd',fontSize:12,padding:'4px 10px',borderRadius:2,fontFamily:'JetBrains Mono,monospace',letterSpacing:0.5}}>IMPOSSIBILITY THEOREM</span>
        <span style={{fontFamily:C.mono,fontSize:12,color:C.muted}}>{META.type}</span>
        {META.companion && <a href={META.companion} target="_blank" rel="noreferrer" style={{marginLeft:'auto',fontFamily:C.mono,fontSize:11,color:C.gold,textDecoration:'none'}}>↗ Companion Dashboard</a>}
      </div>

      {/* Tab bar */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:'0 24px',display:'flex',gap:4}}>
        {['overview','channels','psf','monte-carlo','thresholds','cross-domain','methods','highlights'].map(t => (
          <Tab key={t} label={t} active={tab===t} onClick={()=>setTab(t)} />
        ))}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1100}}>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            {/* Key metrics row */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label="β_W  (System Beta)" value={META.beta} sub={META.ci ? `90% CI [${META.ci}]` : 'Headline estimate'} color={C.gold} />
              {META.pi && <Metric label="Private Payoff Π" value={META.pi+'/yr'} sub="Private sector capture" color={C.text} />}
              {META.psa && <Metric label="System-Adj. Payoff Π_SA" value={META.psa} sub="β_W · Π − W" color={C.crimson} />}
              {META.mu && <Metric label="Break-Even μ*" value={META.mu} sub="Welfare neutrality threshold" color={'#22C55E'} />}
              {META.kappa && <Metric label="PSF Curvature κ" value={META.kappa} sub="Pareto shortfall index" color={C.muted} />}
            </div>

            
      {/* Theorem Statement */}
      <div style={{background:'#1A1A1A',border:'2px solid #F59E0B',borderRadius:4,padding:'16px 20px',marginBottom:16}}>
        <div style={{fontFamily:'Newsreader,serif',fontSize:11,color:'#aabbcc',marginBottom:6,letterSpacing:1}}>THEOREM STATEMENT</div>
        <div style={{fontFamily:'Newsreader,serif',fontSize:14,color:'#e8e8e8',fontStyle:'italic',lineHeight:1.6}}>It is impossible to transfer WMD manufacturing knowledge and subsequently prevent the recipient from independently deploying that capability. The transfer and the permanent capability enablement are the same transactional event. Knowledge, once transferred, cannot be recalled. (Postnieks, 2026)</div>
      </div>

            {/* Channel waterfall */}
            {CHANNELS.length > 0 && (
              <div>
                <SectionTitle>Channel Decomposition — Welfare Cost Waterfall</SectionTitle>
                {CHANNELS.map((ch,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',marginBottom:8,gap:8}}>
                    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,width:22,textAlign:'right'}}>{ch.id}</div>
                    <div style={{fontFamily:C.serif,fontSize:15,color:C.text,width:300,flexShrink:0}}>{ch.name}</div>
                    <BetaBar beta={ch.beta} max={parseFloat(META.beta)||15} />
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.gold,width:55,textAlign:'right'}}>{ch.beta}</div>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text,width:110,textAlign:'right'}}>{ch.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHANNELS TAB */}
        {tab === 'channels' && (
          <div>
            <SectionTitle>Channel-by-Channel Breakdown</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>#</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Channel</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β_W(i)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>δ_i ($/yr)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {CHANNELS.map((ch,i) => (
                  <tr key={i} style={{background: i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{ch.id}</td>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.beta}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.value}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.weight}</td>
                  </tr>
                ))}
                <tr style={{background:C.thead}}>
                  <td colSpan={2} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:14}}>AGGREGATE β_W</td>
                  <td colSpan={3} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:16,textAlign:'right'}}>{META.beta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* CROSS-DOMAIN TAB */}
        {tab === 'cross-domain' && (
          <div>
            <SectionTitle>Cross-Domain SAPM Registry</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.min(500, CROSS_DOMAIN.filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).length * 28 + 60)}>
                <BarChart data={[...CROSS_DOMAIN].filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).sort((a,b) => parseFloat(a.beta) - parseFloat(b.beta)).map(d => ({...d, betaNum: parseFloat(d.beta)}))} layout="vertical" margin={{top:10,right:30,left:200,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={190} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={1} stroke={C.crimson} strokeDasharray="3 3" label={{value:"β=1",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="betaNum" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Domain</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β_W</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>PST Type</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Π ($/yr)</th>
                </tr>
              </thead>
              <tbody>
                {[...CROSS_DOMAIN].sort((a,b) => (parseFloat(b.beta)||0) - (parseFloat(a.beta)||0)).map((d,i) => (
                  <tr key={i} style={{background: d.domain===META.title ? 'rgba(34,197,94,0.08)' : i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color: d.domain===META.title ? '#22C55E' : C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>
                      {d.domain===META.title ? '▶ ' : ''}{d.domain}
                    </td>
                    <td style={{padding:'8px 12px',color: parseFloat(d.beta)>10 ? C.crimson : C.gold,textAlign:'right',fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{d.beta}</td>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{d.type}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{d.pi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* PSF TAB */}
        {tab === 'psf' && (
          <div>
            <SectionTitle>Private-Systemic Frontier</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={PSF_DATA} margin={{top:10,right:30,left:20,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="pi" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Π (Private Payoff)",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"W (System Welfare)",angle:-90,position:"insideLeft",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <Area type="monotone" dataKey="w" stroke={C.gold} fill="rgba(245,158,11,0.15)" strokeWidth={2} />
                  <ReferenceLine x={PSF_PARAMS.pi_c} stroke={C.green} strokeDasharray="5 5" label={{value:"Π_C",fill:C.green,fontFamily:C.mono,fontSize:11}} />
                  <ReferenceLine x={PSF_PARAMS.pi_p} stroke={C.crimson} strokeDasharray="5 5" label={{value:"Current",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Metric label="COOPERATIVE PAYOFF Π_C" value={'$'+PSF_PARAMS.pi_c+'B'} sub="Welfare-maximizing extraction" color={C.green} />
              <Metric label="CURRENT PAYOFF Π_P" value={'$'+PSF_PARAMS.pi_p+'B'} sub="Actual private extraction" color={C.crimson} />
              <Metric label="OVER-EXTRACTION" value={'$'+(PSF_PARAMS.pi_p - PSF_PARAMS.pi_c)+'B'} sub="Gap driving welfare loss" color={C.gold} />
            </div>
            <div style={{marginTop:16,padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>SAPM ↔ CAPM CORRESPONDENCE</div>
              <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>SAPM CONSTRUCT</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CAPM ANALOGUE</th>
                </tr></thead>
                <tbody>
                  {[['β_W (System Beta)','β (Market Beta)'],['PSF (Private-Systemic Frontier)','SML (Security Market Line)'],['μ* (Shadow Price)','r_f (Risk-Free Rate)'],['Πˢᵃ (System-Adjusted Payoff)','α (Jensen\'s Alpha)'],['W (System Welfare)','No equivalent — structurally invisible'],['𝒮_W (Welfare Efficiency)','Sharpe Ratio']].map(([s,c],i) => (
                    <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                      <td style={{padding:'8px 12px',color:C.text}}>{s}</td>
                      <td style={{padding:'8px 12px',color:C.muted,fontFamily:C.serif}}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MONTE CARLO TAB */}
        {tab === 'monte-carlo' && (
          <div>
            <SectionTitle>Monte Carlo Robustness — {MC_PARAMS.n_draws.toLocaleString()} Draws</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={MC_DATA} margin={{top:10,right:30,left:20,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="bin" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:10}} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <Bar dataKey="count" fill={C.gold} />
                  <ReferenceLine x={MC_PARAMS.mean.toFixed(1)} stroke={C.crimson} strokeDasharray="5 5" label={{value:'β̄='+MC_PARAMS.mean,fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label="MEAN β_W" value={MC_PARAMS.mean} color={C.gold} />
              <Metric label="90% CI" value={'['+MC_PARAMS.ci_lo+', '+MC_PARAMS.ci_hi+']'} color={C.muted} />
              <Metric label="% HOLLOW WIN" value={MC_PARAMS.pct_hw+'%'} color={MC_PARAMS.pct_hw > 90 ? C.crimson : C.gold} />
            </div>
            {MC_PARAMS.channels && MC_PARAMS.channels.length > 0 && (
              <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4}}>
                <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>DISTRIBUTION PARAMETERS</div>
                <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
                  <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                    <th style={{padding:'6px 10px',textAlign:'left',color:C.gold}}>CHANNEL</th>
                    <th style={{padding:'6px 10px',textAlign:'left',color:C.gold}}>DISTRIBUTION</th>
                    <th style={{padding:'6px 10px',textAlign:'right',color:C.gold}}>LOW</th>
                    <th style={{padding:'6px 10px',textAlign:'right',color:C.gold}}>HIGH</th>
                  </tr></thead>
                  <tbody>
                    {MC_PARAMS.channels.map((ch,i) => (
                      <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                        <td style={{padding:'6px 10px',color:C.text}}>{ch.name}</td>
                        <td style={{padding:'6px 10px',color:C.muted}}>{ch.dist}</td>
                        <td style={{padding:'6px 10px',color:C.muted,textAlign:'right'}}>{ch.lo}</td>
                        <td style={{padding:'6px 10px',color:C.muted,textAlign:'right'}}>{ch.hi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* THRESHOLDS TAB */}
        {tab === 'thresholds' && (
          <div>
            <SectionTitle>Critical Thresholds & Predicted Crossover</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.max(200, THRESHOLDS.length * 44)}>
                <BarChart data={THRESHOLDS.map(t=>({...t,yearsFromNow:t.year-2026}))} layout="vertical" margin={{top:10,right:30,left:180,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Years from 2026",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={170} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={0} stroke={C.crimson} strokeDasharray="3 3" label={{value:"NOW",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="yearsFromNow" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'grid',gap:12}}>
              {THRESHOLDS.map((t,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,borderLeft:`3px solid ${t.crossed ? C.crimson : C.gold}`}}>
                  <div style={{fontFamily:C.mono,fontSize:14,color:t.crossed ? C.crimson : C.gold,fontWeight:700,minWidth:50}}>{t.year}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text}}>{t.domain}</div>
                    <div style={{fontFamily:C.serif,fontSize:13,color:C.muted,marginTop:2}}>{t.status}</div>
                  </div>
                  <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,padding:'2px 8px',border:`1px solid ${C.border}`,borderRadius:2}}>{t.confidence}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METHODS TAB */}
        {tab === 'methods' && (
          <div>
            <SectionTitle>{AXIOMS.type === 'impossibility' ? 'Impossibility Axioms' : 'Institutional Failure Mechanisms'}</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12,marginBottom:20}}>
              {AXIOMS.items.map((a,i) => (
                <div key={i} style={{padding:16,background:C.panel,border:`1px solid ${AXIOMS.type === 'impossibility' ? 'rgba(239,68,68,0.2)' : C.border}`,borderRadius:4}}>
                  <div style={{fontFamily:C.mono,fontSize:12,color:AXIOMS.type === 'impossibility' ? C.crimson : C.gold,letterSpacing:1,marginBottom:6}}>{a.id}</div>
                  <div style={{fontFamily:C.serif,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{a.name}</div>
                  <div style={{fontFamily:C.serif,fontSize:14,color:C.muted,lineHeight:1.6}}>{a.description}</div>
                </div>
              ))}
            </div>

            <SectionTitle>System Welfare Function</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.welfare_function}</div>
            </div>

            <SectionTitle>Cooperative Baseline</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.cooperative_baseline}</div>
            </div>

            <SectionTitle>Falsification Criteria</SectionTitle>
            <div style={{display:'grid',gap:8,marginBottom:20}}>
              {METHODS_DATA.falsification.map((f,i) => (
                <div key={i} style={{padding:'10px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>{f}</div>
              ))}
            </div>

            <SectionTitle>Key Sources</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              {METHODS_DATA.key_sources.map((s,i) => (
                <div key={i} style={{fontFamily:C.mono,fontSize:12,color:C.muted,padding:'4px 0',borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{s}</div>
              ))}
            </div>

            <div style={{padding:16,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>CITATION</div>
              <div style={{fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>
                Postnieks, E. (2026). System Asset Pricing Model: {META.title}. SAPM Working Paper. Wooster LLC.
              </div>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {tab === 'highlights' && (
          <div>
            <SectionTitle>Key Findings</SectionTitle>
            {HIGHLIGHTS.map((h,i) => (
              <div key={i} style={{display:'flex',gap:12,marginBottom:12,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
                <div style={{fontFamily:C.mono,fontSize:16,color:C.gold,flexShrink:0}}>▸</div>
                <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{h}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      
      {/* 𝒮_W WELFARE EFFICIENCY RATIO */}
      <div style={{padding:"24px",background:C.panel,border:"2px solid #F59E0B40",borderRadius:4,margin:"24px 0"}}>
        <div style={{fontFamily:C.mono,fontSize:12,color:"#F59E0B",letterSpacing:2,marginBottom:16}}>WELFARE EFFICIENCY RATIO</div>
        <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:12}}>
          <span style={{fontFamily:C.mono,fontSize:42,fontWeight:700,color:"#F59E0B"}}>𝒮_W = 0.33</span>
        </div>
        <div style={{fontFamily:C.mono,fontSize:13,color:C.muted,marginBottom:16}}>
          S&P 500 long-run Sharpe ≈ 0.40 &nbsp;|&nbsp; Acceptable ≥ 0.30 &nbsp;|&nbsp; Poor &lt; 0.10
        </div>
        <div style={{fontFamily:C.serif,fontSize:16,color:"#F59E0B",lineHeight:1.7,fontStyle:"italic"}}>
          This sector generates meaningful private value relative to welfare cost — but remains in Hollow Win territory.
        </div>
      </div>

      {/* GREEK SYMBOL GLOSSARY */}
      <details style={{margin:"24px 0"}}>
        <summary style={{fontFamily:C.mono,fontSize:13,color:C.gold,cursor:"pointer",padding:"12px 16px",background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderRadius:4,letterSpacing:1,listStyle:"none",display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:C.gold,fontSize:14}}>▸</span> WHAT THESE SYMBOLS MEAN — AND WHY THEY MATTER
        </summary>
        <div style={{background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderTop:"none",borderRadius:"0 0 4px 4px",padding:"16px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.mono,fontSize:13}}>
            <thead>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>SYMBOL</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>PRONOUNCED</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHAT IT MEASURES</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>CAPM EQUIVALENT</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHY IT MATTERS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>β_W</td>
                <td style={{padding:"10px",color:C.text}}>beta-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How much social welfare this sector destroys per dollar of private gain. β_W = 5.0 means $5 of welfare destroyed per $1 earned.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β (market beta) — measures how much an asset moves with the market</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>In CAPM, high beta means high financial risk. In SAPM, high β_W means high welfare destruction per dollar of revenue.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>𝒮_W</td>
                <td style={{padding:"10px",color:C.text}}>S-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Private gain per dollar of system welfare cost. Higher is better — but in PST domains it is always low.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Sharpe Ratio — return per unit of risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>S&P 500 long-run Sharpe ≈ 0.40. A Sharpe of 0.10 is poor. VW Dieselgate: 𝒮_W = 0.12. LIBOR: 𝒮_W ≈ 0. ERCOT: 𝒮_W = 0.0005. These are welfare efficiency ratios of industries that GDP calls productive.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>T*</td>
                <td style={{padding:"10px",color:C.text}}>T-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The predicted time until a Hollow Win collapses into outright failure.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to duration or time-to-default in credit analysis</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: T* = 6.1 years predicted, ~6 years observed. LIBOR: T* ≤ 0 — the system was failing from day one. Seven years of concealment, not surplus.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>μ*</td>
                <td style={{padding:"10px",color:C.text}}>mu-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The efficient price of system welfare — what it would cost to make the deal system-preserving. μ* = 1/β_W. Derived from frontier geometry, not assigned by an analyst.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to the risk-free rate as a floor price for risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β_W = 7.4 → μ* ≈ 0.135. β_W = 35.2 → μ* ≈ 0.028. Lower μ* means cheaper welfare preservation in theory — PST means it never happens without intervention.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>Πˢᵃ</td>
                <td style={{padding:"10px",color:C.text}}>pi-SA</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The deal's true value after subtracting welfare cost. Πˢᵃ = Π − μ* · ΔW. If negative, the deal destroys more welfare than it creates.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Jensen's alpha — return above what risk justifies</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>A deal that looks like +$2.3M joint gain may be −$2.4M system-adjusted. Every GDSS deployed today shows only the first number.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>W</td>
                <td style={{padding:"10px",color:C.text}}>W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The health of the shared system both parties are embedded in. Not A's welfare. Not B's welfare. The system's.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No CAPM equivalent — this is the variable CAPM cannot see</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The Private Pareto Theorem proves W cannot be computed from bilateral payoffs. It is structurally outside the payoff space. This is the impossibility.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>δ</td>
                <td style={{padding:"10px",color:C.text}}>delta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Total accumulated welfare cost at crossover — the damage done before the Hollow Win collapses.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: δ ≈ $3.7 billion in accumulated emissions damage before EPA notice of violation.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>η</td>
                <td style={{padding:"10px",color:C.text}}>eta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How quickly system damage feeds back into private costs. Low η means the Hollow Win persists longer before collapsing.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to mean reversion speed in financial models</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: η ≈ 0.3. ERCOT: η ≈ 0 — no feedback until catastrophic failure.</td>
              </tr>
              <tr>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>λ</td>
                <td style={{padding:"10px",color:C.text}}>lambda</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Rate of welfare cost accumulation per unit of private gain. Combined with η and δ determines T*.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Higher λ means faster damage accumulation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* Footer */}
      <div style={{background:C.panel,borderTop:`1px solid ${C.border}`,padding:'10px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:40}}>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Erik Postnieks · Wooster LLC · Postnieks Impossibility Program</div>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>SAPM Working Paper · 2026</div>
      </div>
    <SAPMNav />
      </div>
  );
}
