## Adreça IP i màscara de subxarxa
- Entendre què és una **adreça IP** i el seu format.
- Distingir part de **xarxa** vs part de **host**.
- Conèixer classes d’IP i màscares per defecte.
- Calcular adreça de **xarxa**, **broadcast** i rang d’**hosts** en casos simples.

Note:
- Durada orientativa: 20–30 min d’explicació + 20–30 min d’exercicis.
- Missatge d’entrada: “Avui aprendrem a llegir i ‘partir’ una IP. Això ens permetrà saber quins dispositius poden parlar dins la mateixa **xarxa** i com es reparteixen les adreces”.
- Recorda el nivell: 1r SMX. Prioritza la intuïció i els casos pràctics /8, /16 i /24. Els bits ja vindran després.
---

## Què és una **adreça IP**?
- És un identificador únic per a un dispositiu dins d’una **xarxa**.
- **IPv4**: quatre números separats per punts → **``x.x.x.x``** (de **`0`** a **`255`**).
- Exemple: **`192.168.0.5`**
- Serveix perquè els paquets arribin al destí correcte (com una adreça postal digital).
Note:
- Analogia: “carrer, número, porta” ↔ part de **xarxa** i part de host.
- Aclareix que avui parlarem només d’IPv4 per simplicitat.
- Evita entrar en IPv6, NAT o rutes; ja vindran més endavant.
---

## Format decimal i “octets”
- Cada número (***octet***)
   - va de de **`0`** a **`255`** (**`8 bits`**).
- IP completa
   - **`32 bits`** = **`4 octets`**.

--

- Exemples vàlids:
   - **`10.0.0.1`**,
   - **`172.16.40.25`**,
   - **`194.168.1.101`**.
- Exemple NO vàlid
   - **`300.1.2.3`** (**`300` no existeix**).
Note:
- Si ho veus útil, escriu a la pissarra una IP i separa els 4 octets amb barres verticals.
- Menciona que “bits” = zeros i uns; avui n’ús mínim només per intuïció.
---

## Màscara de subxarxa
#### la línia que separa **xarxa** i host
- La **màscara** marca quants bits pertanyen a la **xarxa** i quants al **host**.
- Es pot escriure com:
  - **Prefix**: **`/8`**, **`/16`**, **`/24`** ...
  - **Dotted decimal**: **`255.0.0.0`**, **`255.255.0.0`**, **`255.255.255.0`** ...
- **Idea clau**:
  - la màscara defineix on <u>**trenquem**</u> la IP.
Note:
- Analogia: una màscara és com una plantilla que diu “fins aquí la **xarxa**, la resta és host”.
- No entris encara en subxarxes /25–/30; ens quedem amb /8, /16 i /24 per l’activitat.
---

## Classes d’IP

### **Classe A**: **`1.0.0.0`** – **`126.255.255.255`** → màscara per defecte **`/8`**.

-- 

### - **Classe B**: **`128.0.0.0`** – **`191.255.255.255`** → màscara per defecte **`/16`**.

--
### 
- **Classe C**: **`192.0.0.0`** – **`223.255.255.255`** → màscara per defecte **`/24`**.

Avui fem servir **CIDR** (prefixos **`/x`**), però la classificació ajuda a reconèixer màscares per defecte.
Note:
- Aclara que 127.x.x.x és loopback (reserva especial); per simplicitat, no la fem servir com a classe A en exemples.
- Resumeix: A=/8, B=/16, C=/24. Memoritzar aquests tres.
---

## Rangs privats més comuns

* **`10.0.0.0/8`**
- **`172.16.0.0/12`**
  - de `172.16.0.0`
  - fins a `172.31.255.255`
- **`192.168.0.0/16`**

Són adreces **no públiques** a Internet; s’usen dins LANs.
Note:
- Només com a context (moltes LANs d’aula usen 192.168.x.x). No és necessari per fer l’activitat, però ajuda a reconèixer IPs “domèstiques”.
---

## Xarxa, hosts i **broadcast**
- En una subxarxa hi ha:
  - **Adreça de *xarxa*** la primera
     - tots els bits d'**`host`** a **`0`**
  - **Adreça de **broadcast**** l’última
     - tots els bits d'**`host`** a **`1`**
  - **Rang d’hosts** 
     - el que hi ha al mig.
--
- Amb **`/24`** (**`255.255.255.0`**): 
     - <u>es fixen 3 octets</u> per a la **xarxa** i
     - <u>l’últim octet</u> és per als **hosts**.
Note:
- Visualitza així: `X.X.X . H` per /24; `X.X . H.H` per /16; `X . H.H.H` per /8.
- Primer host = **xarxa** + 1; Últim host = **broadcast** − 1.
---

## Taula ràpida
| Prefix | Màscara            | Xarxa/Host<br>visió ràpida|
|-------:|--------------------|----------------------------|
| /8     | 255.0.0.0          | X . H . H . H              |
| /16    | 255.255.0.0        | X . X . H . H              |
| /24    | 255.255.255.0      | X . X . X . H              |
Note:
- Explica que “X” vol dir “queda fix (**xarxa**)” i “H” vol dir “part variable (hosts)”. Aquesta regla resol el 90% dels casos que sortiran avui.
---

## Mètode pas a pas
1. Mira el **prefix** (**`/8`**, **`/16`**, **`/24`**).  
1. Separa la IP en **X** (**xarxa**) i **H** (***hosts***)  
1. **Adreça de *xarxa***: posa **0** a tots els octets  
1. **Adreça de *broadcast***: posa **255** a tots els octets
1. **Rang d’hosts**: 
     - de **xarxa+`1`** 
     - fins a **broadcast−`1`**.
Note:
- Remarca que aquest mètode funciona perfecte per /8, /16, /24 i és suficient per l’activitat.
- Si l’alumnat pregunta per /25, /26… digues que és el següent pas del temari (subxarxes avançades).

--

## Exemple 1

### `192.168.0.5 /24`
- **`/24`** → **X.X.X.H**
- **Xarxa**: `192.168.0.0`
- **Broadcast**: `192.168.0.255`
- **Rang d’hosts**
     - `192.168.0.1` 
     - `192.168.0.254`
Note:
- Subratlla com és de mecànic: deixa fixos els tres primers octets i varia l’últim.
- Pregunta ràpida a classe: “A quina classe pertany?” → Classe C (per defecte /24).
---

## Exemple 2

### `192.168.0.5 /16`
- **`/16`** → **X.X.H.H**
- **Xarxa**: `192.168.0.0`
- **Broadcast**
     - `192.168.255.255`
- **Rang d’hosts**
     - `192.168.0.1`
     - `192.168.255.254`
Note:
- Observa que amb /16, els dos últims octets “s’obren”. La **xarxa** és més gran que amb /24.
- Bona pregunta: “Quants hosts hi caben?” (Resposta intuïtiva: moltíssims; ja comptarem amb potències de 2 més endavant).
---

## Exemple 3 — 172.16.40.25 /16
- **`/16`** → **X.X.H.H**
- **Xarxa**: `172.16.0.0`
- **Broadcast**: `172.16.255.255`
- **Rang d’hosts**: `172.16.0.1` – `172.16.255.254`
Note:
- Classe B per rang (128–191.*). Per defecte seria /16, i justament l’enunciat dona /16.
- Demana’ls que localitzin visualment què queda com a X i què com a H.
---

## Exemple 4 — 10.0.10.0 /8
- **`/8`** → **X.H.H.H**
- **Xarxa**: `10.0.0.0`
- **Broadcast**: `10.255.255.255`
- **Rang d’hosts**: `10.0.0.1` – `10.255.255.254`
Note:
- Recorda que 10.0.0.0/8 és privat. Surt sovint a LANs d’empreses o labos.
- Fixa’t que, fins i tot si l’IP “sembla xarxa”, el prefix és qui mana.
---

## Exemple 5 — 10.10.0.1 /8
- **`/8`** → **X.H.H.H**
- **Xarxa**: `10.0.0.0`
- **Broadcast**: `10.255.255.255`
- **Rang d’hosts**: `10.0.0.1` – `10.255.255.254`
Note:
- Compara amb l’exemple anterior: tot el que comenci per 10.* amb /8 pertany a la mateixa **xarxa** gran.
- Pregunta a classe: “Poden parlar directament 10.10.0.1/8 i 10.0.10.0/8?” → Sí, són a la mateixa **xarxa** amb /8.
---

## Classes i màscares per defecte (repàs ràpid)
- **Classe A** → **`/8`** (ex.: `10.0.0.1`)
- **Classe B** → **`/16`** (ex.: `172.16.40.25`)
- **Classe C** → **`/24`** (ex.: `194.168.1.101`, `192.168.0.5`)
Note:
- Aclareix que a l’activitat els demanaran dir “classe, màscara per defecte, i separar **xarxa**/host”.
- Encara que avui fem servir el prefix donat, saber la classe ajuda a verificar.
---

## Errors habituals (i com evitar-los)
- Posar **255** a la **xarxa** o **0** al **broadcast** (invertit).  
  - Recorda: **xarxa** ➜ 0s; **broadcast** ➜ 255s (en aquests casos /8,/16,/24).
- Confondre “classe” amb “prefix actual”.  
  - La classe dona la **màscara per defecte**; però l’exercici pot donar una **màscara diferent**.
- Obrir/fermar massa octets.
  - Usa la taula X/H per no perdre’t.
Note:
- Fes 2–3 mini-preguntes ràpides a l’atzar a l’alumnat per detectar aquests errors abans de començar l’activitat.
---

## Metodologia per a l’activitat
1. Identifica **classe** i **màscara per defecte** (context).  
2. Aplica el **prefix donat** per l’exercici (/8, /16, /24).  
3. Marca **X** i **H** segons la taula.  
4. Calcula **xarxa**, ****broadcast**** i **rang d’hosts**.  
5. Revisa amb un company/a (detecció d’errors ràpida).
Note:
- Dona 5–10 minuts per fer els dos primers ítems en parelles, després posa en comú.
- Després, que continuïn amb els càlculs individuals; tu passes taula per resoldre dubtes.
---

## Mini-test (2 minuts)
- 1) `192.168.1.100 /24` → **xarxa**? **broadcast**?
- 2) `172.16.5.20 /16` → **xarxa**? **broadcast**?
- 3) `10.200.3.7 /8` → **xarxa**? **broadcast**?
*(Respostes a la diapositiva següent)*
Note:
- Dona 60–90 segons per pensar individualment i 30–60 per comprovar amb el/la del costat.
---

## Solucions mini-test
- `192.168.1.100 /24` → **xarxa** **192.168.1.0**, **broadcast** **192.168.1.255**.
- `172.16.5.20 /16` → **xarxa** **172.16.0.0**, **broadcast** **172.16.255.255**.
- `10.200.3.7 /8` → **xarxa** **10.0.0.0**, **broadcast** **10.255.255.255**.
Note:
- Si hi ha errades, torna a la taula X/H i refés el procés lentament amb 1 exemple.
---

## Lliurament i criteris (activitat)
- Treballa els ítems **exactament** com a l’enunciat.
- Escriu clarament: **classe**, **màscara per defecte**, **xarxa**, ****broadcast**** i **rang** si cal.
- Justifica en una línia el mètode emprat (taula X/H).
Note:
- Explica com s’avaluarà: correcció de càlculs i claredat de la resposta.
- Recomana remarcar amb subratllat o color la separació X/H en cada IP.
---

## Tancament
- Saber llegir IPs i màscares és essencial per muntar i diagnosticar xarxes.
- Amb la regla X/H per /8, /16 i /24 resoldreu la majoria de casos d’avui.
- Passem a l’activitat! 💪
Note:
- Tanca amb un resum curt i dona pas a la pràctica.
- Mantén-te disponible per a dubtes puntuals; demana que primer provin la taula X/H abans de preguntar.


---
## Activitat: IPs, màscares, **xarxa** i **broadcast**
- Quan acabis la teoria, obre l'activitat i respon totes les preguntes.
- L'activitat genera un fitxer `.json` per pujar a l'aula virtual.

**Entra a l'activitat:**  
<a class="button" href="activitats/ip-mascara/activitat.html">Obrir activitat (ip-mascara)</a>

Note:
- Explica que l'activitat calcula la nota automàticament i aplica una penalització del 10% a partir del 2n intent (per alumne).
- Recorda que el desplegable d'alumnes es nodreix de `alumnes/dades_alumnes.json`. Si no apareix el seu nom, que revisin el fitxer o escullin el correu correcte.
- Indica que el fitxer JSON que es descarrega conté metadades, respostes i checksum; només cal penjar-lo a l'aula virtual.
