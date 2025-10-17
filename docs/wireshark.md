# Wireshark (apunts SMX)

> **Nivell:** SMX – Mòdul 0225 Xarxes locals  
> **Objectiu:** Entendre què és Wireshark, instal·lar-lo amb seguretat i utilitzar-lo per capturar i analitzar trànsit de xarxa.

---

## 1) Què és el Wireshark?

Wireshark és un **analitzador de protocols de xarxa** (sniffer) que permet **capturar i inspeccionar paquets** que circulen per una interfície (Ethernet, Wi‑Fi, loopback, etc.). És essencial per a:

- Diagnòstic de problemes de xarxa (latència, talls, errors de configuració).
- Aprenentatge de protocols (ARP, IP, ICMP, TCP/UDP, DNS, HTTP, TLS…).
- Verificació de seguretat i compliment.

> ⚠️ **Ètica i legalitat:** Capturar trànsit **sense permís** pot ser il·legal. Utilitza Wireshark **només** en xarxes pròpies, d’aula o amb autorització explícita.

---

## 2) Objectius d’aprenentatge

Al final d’aquestes notes seràs capaç de:

- Instal·lar Wireshark (Windows, macOS i GNU/Linux) i configurar els **permisos de captura**.
- Iniciar i aturar captures, **guardar** i **carregar** arxius `.pcapng`.
- Aplicar **filtres de visualització** i **filtres de captura** amb criteris bàsics i combinats.
- Seguir fluxos (TCP/UDP), interpretar **handshakes** i respostes DNS/HTTP.
- Fer servir **estadístiques** (Conversations, Endpoints, Protocol Hierarchy, IO Graphs).

---

## 3) Instal·lació Windows

1. Descarrega l’instal·lador oficial de Wireshark.  
2. Marca **Npcap** quan ho demani (necessari per capturar).  
3. Opcional: habilita **“Install Npcap in WinPcap API-compatible Mode”** si alguna eina antiga ho requereix.  
4. Finalitza i obre Wireshark. 

> Si no veus interfícies o no captura, obre Wireshark com a **Administrador** (prova) o reinstal·la **Npcap**.

> 🧪 **Prova ràpida:** Obre Wireshark → comprova que veus **interfícies** (Ethernet/Wi‑Fi/lo) i que el comptador de paquets **augmenta** en iniciar la captura.

---

## 4) Conceptes clau

- **Interfície**: Punt de captura (ex.: `eth0`, `wlan0`, `lo`).
- **Mode promisc**: L’NIC lliura a l’host **tots** els paquets que veu al segment.
- **Mode monitor (Wi‑Fi)**: Permet veure trames 802.11 a nivell ràdio (requereix adaptador compatible i permisos).
- **pcap/pcapng**: Formats d’arxiu de captura. `pcapng` és el predeterminat (més metadades).
- **Filtres**: 
  - **Captura** (BPF): què **entra** al fitxer.
  - **Visualització**: què **mostra** Wireshark en pantalla.

---

## 5) Primeres passes (workflow bàsic)

1. **Selecciona** l’interfície amb trànsit (icona de tauró ▶️).
2. (Opcional) Afegeix **filtres de captura**.
3. **Inicia** la captura i realitza una acció de prova (ping, obre una web, etc.).
4. **Atura** (⏹), **desa** com `.pcapng` i posa un nom clar.
5. Usa un **filtre de visualització** per centrar-te (ex.: `dns` o `http`).
6. **Segueix el flux** (Click dret → *Follow* → TCP/UDP stream) si cal.
7. Obre **Statistics**: *Protocol Hierarchy*, *Conversations*, *Endpoints*, *IO Graphs*.

---

## 6) Filtres

### 6.1 Filtres de visualització (Display Filters)

| Propòsit | Filtre |
|---|---|
| IP d’origen o destí | `ip.addr == 192.168.1.50` |
| Ports | `tcp.port == 80` · `udp.port == 53` |
| Protocols | `arp` · `icmp` · `dns` · `http` · `tls` |
| HTTP mètode | `http.request.method == "GET"` |
| DNS consulta | `dns.flags.response == 0` o `dns.qry.name contains "google"` |
| TCP handshake | `tcp.flags.syn == 1 and tcp.flags.ack == 0` |
| Excloure trànsit | `not arp` · `!(tcp.port == 22)` |
| MAC concreta | `eth.addr == aa:bb:cc:dd:ee:ff` |

> Pista: el camp **Expression…** (botó al costat del quadre de filtres) ajuda a descobrir camps.

### 6.2 Filtres de captura (BPF)

| Propòsit | Filtre |
|---|---|
| Host concret | `host 192.168.1.50` |
| Xarxa | `net 10.0.0.0/8` |
| Port | `port 443` |
| Protocol | `tcp` · `udp` · `icmp` |
| Combinar | `tcp and not port 22` |
| MAC concreta | `ether host aa:bb:cc:dd:ee:ff` |

> Recorda: els **filtres de captura** redueixen el que **s’emmagatzema**. Si dubtes, captura-ho tot i filtra després.

---

## 7) Anàlisi pràctica de protocols

### 7.1 ARP
- **Filtre**: `arp`
- **Claus**: *Who has* (petició) / *is at* (resposta).  
- **Útil per**: resolució d’IP ↔ MAC, detecció de conflictes d’IP.

### 7.2 ICMP (Ping)
- **Filtre**: `icmp`
- **Claus**: *Echo request/echo reply*, `Identifier`, `Sequence number`, `TTL`.

### 7.3 TCP
- **Handshakes**: SYN → SYN/ACK → ACK (`tcp.flags`)
- **Retransmissions/dups**: marcat com *[TCP Retransmission]*, *[TCP Dup ACK]*.
- **Seguiment**: *Follow TCP Stream* per veure el flux en text.

### 7.4 DNS
- **Filtres**: `dns`, `dns.flags.response == 0` (consulta), `dns.flags.response == 1` (resposta)
- **Camps**: `dns.qry.name`, `A/AAAA/CNAME`, `rcode`.

### 7.5 HTTP
- **Filtres**: `http`, `http.request`, `http.response`
- **Camps**: mètode, URL, codi d’estat.  
- **Exportar objectes**: *File → Export Objects → HTTP* (HTTP/1.1; amb HTTP/2 pot ser limitat).

### 7.6 TLS
- **Filtre**: `tls`
- **Claus**: *ClientHello* (SNI a `tls.handshake.extensions_server_name`), *ServerHello*, certificats.  
- **Descodificació**: si el client genera **SSLKEYLOGFILE**, a *Preferences → Protocols → TLS → (Pre)-Master-Secret log filename* pots carregar el fitxer i desencriptar (quan sigui viable).

---

## 8) Estadístiques i eines

- **Protocol Hierarchy**: percentatge per protocol.
- **Conversations / Endpoints**: parelles IP/port i volum de dades.
- **IO Graphs**: gràfica de paquets/bytes al temps (pots aplicar un **Display Filter** a la sèrie).
- **Expert Info**: avisos d’anomalies (retransmissions, malformes…).
- **Coloring Rules**: paletes de colors per destacar protocols i estats.
- **Decode As…**: força la interpretació d’un port com un protocol concret.

---

## 9) Bones pràctiques

- **Etiqueta i permisos**: Avís previ, només en entorns autoritzats.
- **Redueix soroll**: desactiva *Name Resolution* (botons `Resolve…`) si afegeix latència.
- **Guarda sovint** i documenta (nom de fitxer + data + cas d’ús).
- **Perfil d’usuari**: crea **profiles** amb columnes/filtres i regles de color.
- **Evita captures massives**: usa límits (*Capture Options → Output → Use multiple files / Ring buffer*).

---

## 10) Exercicis guiats (aula)

> **Preparació**: dues màquines o una sola amb navegador; connexió a Internet; permís per capturar.

1. **Ping bàsic**  
   - *Acció*: `ping 1.1.1.1` mentre captures.  
   - *Filtre (display)*: `icmp`  
   - *Qüestions*: temps de resposta? TTL? Quin és el patró request/reply?

2. **Consulta DNS**  
   - *Acció*: `nslookup example.com` o obrir una web.  
   - *Filtre*: `dns`  
   - *Qüestions*: quina IP retorna? hi ha CNAME? temps de resolució?

3. **TCP 3-way handshake**  
   - *Acció*: obre una web HTTP (si disponible) o qualsevol servei TCP.  
   - *Filtre*: `tcp.flags.syn == 1`  
   - *Qüestions*: identifica SYN, SYN/ACK, ACK; ports origen/destí.

4. **Petició HTTP**  
   - *Acció*: navega a una pàgina HTTP (no HTTPS) o usa un servei local.  
   - *Filtre*: `http.request`  
   - *Qüestions*: mètode, Host, Path i codi d’estat de la resposta.

5. **ARP a la LAN**  
   - *Acció*: reinicia la interfície o fes `arp -d` i accedeix a una IP de la LAN.  
   - *Filtre*: `arp`  
   - *Qüestions*: qui fa *who has*? quina MAC respon?

6. **TLS i SNI**  
   - *Acció*: obre `https://…`  
   - *Filtre*: `tls`  
   - *Qüestions*: quin **SNI** s’envia? versió de TLS? suites?

7. **DHCP (opc.)**  
   - *Acció*: desconnecta/torna a connectar la xarxa.  
   - *Filtre*: `udp.port == 67 or udp.port == 68`  
   - *Qüestions*: observa DISCOVER/OFFER/REQUEST/ACK.

> **Entrega**: un `.pcapng` per exercici + un breu informe (1 pàgina) amb filtres usats i captures de pantalla clau.

---

## 11) Errors comuns i solucions

- **No veig interfícies**: revisa permisos (grup `wireshark`), reinstal·la Npcap (Windows) o comprova `dumpcap` (Linux).
- **Captura buida**: interfície equivocada, filtre de captura massa restrictiu, Wi‑Fi sense mode adequat.
- **Pèrdua de paquets**: disc lent; activa *ring buffer* o baixa la velocitat de línia de captura.
- **HTTP xifrat**: amb HTTPS no veuràs contingut. Revisa SNI/certificats o usa **SSLKEYLOGFILE** per a labs.

---

## 12) Annex A: TLS – SSLKEYLOGFILE (laboratori)

1. Exporta la variable abans d’obrir el navegador:  
   **Linux/macOS**
   ```bash
   export SSLKEYLOGFILE="$HOME/sslkeys.log"
   open -a "Google Chrome"
   ```
   **Windows (PowerShell)**
   ```powershell
   setx SSLKEYLOGFILE "$env:USERPROFILE\sslkeys.log"
   Start-Process "chrome.exe"
   ```
2. En Wireshark: *Preferences → Protocols → TLS → (Pre)-Master-Secret log filename* i selecciona `sslkeys.log`.
3. Fes una navegació HTTPS i comprova si es descodifica (només en condicions que ho permetin i per a **fins docents**).

---

## 13) Annex B: Tshark (mode consola)

- **Llistar interfícies**: `tshark -D`
- **Capturar a una interfície**: `tshark -i 1 -w sortida.pcapng`
- **Aplicar filtre de visualització**: `tshark -r sortida.pcapng -Y "dns and ip.addr==192.168.1.50"`
- **Comptar per protocol**: `tshark -r sortida.pcapng -q -z io,phs`

---

## 14) Glossari ràpid

- **PDU**: Unitats de dades d’un protocol.  
- **SNI**: *Server Name Indication*, nom del host al *ClientHello* de TLS.  
- **Handshake**: intercanvi inicial per establir una connexió (ex.: TCP).

---

## 15) Rúbrica (opcional, per a les pràctiques)

| Criteri | Excel·lent (10) | Bé (7) | Suficient (5) | Millorable (<5) |
|---|---|---|---|---|
| Instal·lació i permisos | Configuració completa i documentada | Configuració correcta | Configuració bàsica | Errors o manca de permisos |
| Filtres | Ús variat i correcte (display i captura) | Ús adequat | Alguns errors | No sap aplicar filtres |
| Anàlisi de protocols | Identificació precisa i conclusions clares | Bona interpretació | Interpretació parcial | Confusió general |
| Informe i `.pcapng` | Neteja, nom correcte i evidències clares | Adequat | Incomplet | Poca cura / desordenat |

---

### Check-list final
- [ ] Veig interfícies i puc capturar.
- [ ] Sé aplicar com a mínim **5** filtres de visualització i **2** de captura.
- [ ] Sé seguir un **TCP Stream** i identificar un **handshake**.
- [ ] Sé generar i guardar un `.pcapng` i extreure estadístiques bàsiques.

> **Consell:** crea’t un **Profile Wireshark-SMX** amb columnes personalitzades (*Time*, *Source*, *Destination*, *Protocol*, *Length*, *Info*, *tcp.stream*, *dns.qry.name*…) i regles de color per accelerar l’anàlisi.
