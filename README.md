# template-apunts

Plantilla per crear apunts de mòdul amb conversió **DOCX → Markdown** i publicació a **GitHub Pages** (MkDocs Material).

## Què inclou
- `scripts/publish_selected.py`: converteix DOCX → MD, extreu imatges, arregla camins i genera `docs/continguts.md`.
- `publish.yaml`: manifest de publicació (què, on i quan).
- `mkdocs.yml`: configuració de la web (tema, menú).
- Workflow GitHub Actions: build i deploy automàtic a Pages.
- Carpeta `source/` pels originals i `docs/` pel que es publica.

## Ús ràpid
1. Crea un nou repo amb **Use this template** (ex.: `xlo-apunts`).
2. Edita `mkdocs.yml` → `site_name` i `site_url`.
3. Afegeix els `.docx` a `source/unitats-didactiques/...`.
4. Omple `publish.yaml` (posa `publish: true/false` i `freeze: true` per protegir `index.md`).
5. (Opcional) Genera localment:
   ```bash
   sudo apt-get install -y pandoc
   python3 -m pip install -U mkdocs mkdocs-material pyyaml
   python3 scripts/publish_selected.py
   mkdocs serve  # http://127.0.0.1:8000
   ```
6. Puja-ho:
   ```bash
   git add publish.yaml docs source .publish-cache.json
   git commit -m "Primera UD"
   git push
   ```
7. GitHub Actions publicarà a `https://ELTEUUSUARI.github.io/NOM-DEL-REPO/`.

## Publicació progressiva
- `publish: false` → amagat de **Continguts** fins que el vulguis obrir.
- `freeze: true` → no sobreescriu l’`output` si ja existeix (ideal per `index.md` personalitzat).

## Menú
A `mkdocs.yml → nav:` afegeix les pàgines quan vulguis que surtin al menú.

## Llicència
- **Codi** (scripts i workflows): MIT — veu `LICENSE-CODE`.
- **Contingut** (Markdowns generats i textos): CC BY-NC-SA 4.0 — veu `LICENSE-CONTENT` i el `LICENSE.md` de resum.
