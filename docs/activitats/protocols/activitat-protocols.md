
# Activitat: Presentacions de Protocols (SMX)

**Objectiu de l’activitat**: cada alumne prepararà i exposarà **un protocol de xarxa** seguint una **plantilla comuna** i una **rúbrica única**. L’enfoc és pràctic, amb **demo breu** i **captures de paquets**.

> **Durada de l’exposició:** 8–10 minuts + 2 minuts de preguntes  
> **Format recomanat:** plantilla Reveal.js (proporcionada al Classroom)

---

## 1) Assignacions (7 protocols)

| Alumne | Protocol (focus) | Objectiu clau | Idea de demo breu (≤10’) | Eines suggerides |
|---|---|---|---|---|
| Kristina | **DHCP** (DORA, lloguers, relay) | Adreçament automàtic i opcions | `ipconfig /renew` o `dhclient`, aixecar un DHCP (p.ex. dnsmasq) i veure el cicle DORA amb Wireshark (`bootp`) | Wireshark, dnsmasq/ISC-DHCP, CLI |
| Lorena | **DNS** (A/AAAA, CNAME, MX, TTL, recurse/caching) | Resoldre noms i interpretar registres | Fer `dig/nslookup` a diversos dominis, canviar TTL i observar caché | `dig`, `nslookup`, Pi-hole o bind, Wireshark (`dns`) |
| Merouan | **HTTP/HTTPS + TLS** (mètodes, codis, capçaleres, handshake TLS) | Funcionament web i seguretat bàsica | `curl -I http://` vs `https://`, DevTools, `openssl s_client`, paquets TLS | curl, navegador, OpenSSL, Wireshark (`http`,`tls`) |
| Pau | **SMTP/IMAP/POP3** (flux correu, ports, STARTTLS) | Entrega i lectura de correu | Enviar correu entre dos comptes; `telnet` a SMTP; llegir via IMAP; captures | Client correu, telnet/netcat, Wireshark (`smtp`,`imap`) |
| Joao | **FTP/FTPS/SFTP** (actiu/passiu, seguretat) | Diferenciar protocols i modes | Servidor FTP, pujar fitxer amb FileZilla en actiu/passiu; comparar amb SFTP | vsftpd/FileZilla, SSH, Wireshark (`ftp`) |
| Clemente | **VLAN 802.1Q** (etiquetatge, access/trunk, PVID) | Segmentació L2 i etiquetatge **802.1Q** | Configurar **VLANs** en switch (o Linux subinterfaces), provar connectivitat i capturar el **tag 802.1Q** | Packet Tracer/GNS3 o switch gestionable, Linux `ip link`, Wireshark (`vlan`) |
| Marc | **SNMP & NTP** (monitoratge i temps) | Monitorització i sincronització horària | `snmpwalk` sobre `snmpd`; comprovar NTP amb `timedatectl`; perquè el temps coherent importa | snmpd/snmpwalk, `timedatectl`/`w32tm`, Wireshark (`snmp`,`ntp`) |

### Assignació:

|Grup|Tema|Alumne|
|----|----|----|
|A|DHCP|Kristina|
|B|DNS|Lorena|
|C|HTTP/HTTPS + TLS|Merouan|
|D|SMTP/IMAP/POP3|Pau|
|E|FTP/FTPS/SFTP|Joao|
|F|VLAN 802.1Q|Clemente|
|G|SNMP & NTP|Marc|

---

## 2) Què ha de contenir **cada presentació** (8–10 diapositives)

1. **Títol + alumne + data**  
2. **Problema que resol** el protocol + **casos d’ús**  
3. **Capa OSI** / Model TCP-IP i **ports/ethertypes** habituals  
4. **Funcionament pas a pas** (diagrama simple o seqüència)  
5. **Configuració bàsica** i comandes/eines clau  
6. **Demo**: què es veurà, com es prova (en viu o vídeo ≤ 60 s)  
7. **Captures Wireshark (3–5 paquets)** amb **anotació** (número i significat)  
8. **Bones pràctiques / seguretat / errors comuns**  
9. **Mini-activitat (5–10’)** per als companys  
10. **Conclusions i bibliografia** (mín. 3 fonts)

---

## 3) Guia específica per protocol (punts a cobrir)

### DHCP
- **Fases DORA** (Discover–Offer–Request–ACK), **lloguer**, **renovació**, **opcions** (p. ex. gateway, DNS).  
- **Demo**: aixecar servidor (dnsmasq/ISC), capturar `bootp`, executar `ipconfig /renew` o `dhclient -v`.  
- **Ports**: 67/68 UDP. **Filtre Wireshark**: `bootp`.  
- **Mini-activitat**: canvia la durada del lloguer i comprova la renovació en una VM.

### DNS
- **Registres** (A/AAAA, CNAME, MX, TXT), **TTL**, **caché** i **recursió**.  
- **Demo**: `dig` a diversos registres; modifica un TTL al teu servidor i observa la caché.  
- **Ports**: 53 UDP/TCP. **Filtre Wireshark**: `dns`.  
- **Mini-activitat**: compara temps de resposta amb i sense caché local.

### HTTP/HTTPS + TLS
- **Mètodes** (GET/POST/HEAD), **codis** (2xx/3xx/4xx/5xx), **capçaleres**. **TLS**: SNI, certificats, handshake.  
- **Demo**: `curl -I http://…` vs `https://…`; `openssl s_client -connect host:443`; DevTools.  
- **Ports**: 80/443 TCP. **Filtres**: `http`, `tls.handshake`.  
- **Mini-activitat**: forçar un error de certificat i identificar-lo.

### SMTP/IMAP/POP3
- **Flux**: subministrament (SMTP) → bústia (IMAP/POP3). **STARTTLS**/TLS, autenticació.  
- **Demo**: `telnet host 25` i conversa SMTP bàsica; llegir correu via IMAP.  
- **Ports**: 25/587/465 (SMTP), 143/993 (IMAP), 110/995 (POP3). **Filtres**: `smtp`, `imap`.  
- **Mini-activitat**: enviar un missatge amb capçaleres personalitzades i llegir-les.

### FTP/FTPS/SFTP
- **Modes**: **actiu** vs **passiu**; **FTPS** (TLS) vs **SFTP** (sobre SSH).  
- **Demo**: servidor FTP (vsftpd), pujar/descarregar fitxer en actiu/passiu; comparar amb SFTP.  
- **Ports**: 21 TCP (+ dinàmics), **SFTP**: 22 TCP. **Filtre**: `ftp`.  
- **Mini-activitat**: bloqueja ports dinàmics i explica perquè falla mode actiu.

### VLAN 802.1Q
- **Concepte**: segmentació **L2**, **tag 802.1Q** (TPID `0x8100`), **VID**, **PCP**, **DEI**.  
- **Ports de switch**: **access** (untagged, PVID) i **trunk** (tagged, VLANs permeses).  
- **Demo** (dues opcions):  
  1) **Switch real / Packet Tracer**: crear VLAN 10/20, assignar ports access, crear un **trunk** i provar connectivitat intra-VLAN.  
  2) **Linux**: subinterfícies VLAN i captura del **tag**:
     ```bash
     # Crear subinterfície VLAN 10 sobre eth0
     sudo ip link add link eth0 name eth0.10 type vlan id 10
     sudo ip addr add 192.168.10.2/24 dev eth0.10
     sudo ip link set eth0.10 up
     # (Repetir amb VLAN 20 en un altre host o en un namespace)
     ```
     - Comprova la connectivitat **només** entre hosts de la mateixa VLAN.  
     - Captura **802.1Q** en un enllaç **trunk** amb Wireshark o tcpdump:
       ```bash
       sudo tcpdump -i eth0 -en vlan
       ```
- **Ethertype**: 0x8100. **Filtre Wireshark**: `vlan`.  
- **Mini-activitat**: configura un **trunk** i mostra un paquet amb **tag VLAN**; explica **PVID** en un port access.

### SNMP & NTP
- **SNMP**: versions (v1/v2c/v3), **OIDs**, **get/walk**, seguretat bàsica.  
- **NTP**: servidors, estrats, offset, drift, importància del temps coherent.  
- **Demo**: `snmpd` + `snmpwalk`; `timedatectl status` i sincronització NTP.  
- **Ports**: SNMP 161/162 UDP, NTP 123 UDP. **Filtres**: `snmp`, `ntp`.  
- **Mini-activitat**: consulta CPU/IF-MIB amb `snmpwalk` i interpreta el resultat.

---

## 4) Lliurables per alumne

- **Diapositives** (Reveal o PDF) seguint l’estructura del punt 2.  
- **Fitxa pràctica curta (5–10’)** amb 3–5 passos i **resultat esperat**.  
- **PCAP** amb **3–5 paquets anotats** (número i significat).  
- **Full de comandes** utilitzades (1 pàgina).  
- **Bibliografia** (mínim **3** fonts).

**Nomenclatura de fitxers**: `<PrimerCognomAlmne>-xlo-ud01-ae01.pdf` i `<PrimerCognomAlmne>-xlo-ud01-ae01.zip`

><hr>
>
> ###### On **`<PrimerCognomAlmne>`** és només el primer cognom de l'alumne, sense el nom.
>
> ###### Per exemple en el caso de l'alumne <b><u>Albert Einstein</u></b>, el nom de la carpeta seria <kbd><u><b>**`einstein--xlo-ud01-ae01`**</b></u></kbd>.
>
><hr>

---

## 5) Rúbrica d’avaluació (10 punts)

| Criteri | Descripció | Pes |
|---|---|---|
| **Rigor tècnic** | Protocol, ports/ethertypes, fases i ús explicats sense errades | **30%** |
| **Claredat i estructura** | Diapositives netes, fil lògic, temps ben gestionat | **20%** |
| **Demo funcional** | Demo real i visible (o vídeo curt) + interpretació de paquets | **25%** |
| **Materials de suport** | Fitxa pràctica útil + full de comandes + pcap anotat | **15%** |
| **Comunicació i Q&A** | Vocabulari i respostes clares; seguretat i bones pràctiques | **10%** |

---

## 6) Recursos i “snippets” útils

**Filtres Wireshark**:  
`dns` · `bootp` · `http` · `tls.handshake` · `smtp` · `imap` · `ftp` · `snmp` · `ntp` · `vlan`

**Comandes útils**:  
- **Windows**: `ipconfig /all`, `ipconfig /renew`, `arp -a`, `tracert`, `w32tm /query /status`  
- **Linux**: `ip addr`, `dhclient -v`, `ip link add ... type vlan id N`, `arp -n`, `ping`, `traceroute`, `timedatectl`, `dig`, `curl -I`, `openssl s_client`  
- **TCPDump**: `tcpdump -i <if> -en vlan`, `tcpdump -i <if> port 53`, `tcpdump -i <if> port 67 or port 68`

**Eines lleugeres de lab**: dnsmasq (DHCP/DNS), bind, vsftpd, snmpd, OpenSSL, FileZilla, Packet Tracer/GNS3.

---

## 7) Planificació en 2 hores

- **1a hora**: A–D (4 exposicions ≈ 48’ + transicions)  
- **2a hora**: E–G (3 exposicions ≈ 36’) + 15’ per fer 1 activitat ràpida de la fitxa de cada expositor

---

## 8) Ús de la plantilla (resum)

1. Descarrega el **ZIP de la plantilla** del Classroom.  
2. Edita **`slides.md`** i afegeix imatges a `assets/img/`.  
3. Obre **`index.html`** per comprovar la presentació.  
4. Exporta a **PDF** (Imprimeix → Desa com a PDF, horitzontal, fons activats).

---

### Dubtes?
Consulta el professor. Bona feina!
