# Guia operativa (resum de 1 pàgina)

## 1) Primer ús (un repo nou des del template)
- Edita `mkdocs.yml` → `site_name` i `site_url`.
- Afegeix DOCX a `source/unitats-didactiques/...`.
- Afegeix entrades a `publish.yaml` (amb `publish: true/false` i, si cal, `freeze: true`).
- (Opcional) Prova localment: `python3 scripts/publish_selected.py && mkdocs serve`.
- `git add ... && git commit ... && git push`.

## 2) Afegir una unitat nova
1) Copia el `.docx` a `source/...`.
2) Afegeix l'ítem al `publish.yaml`.
3) Executa `python3 scripts/publish_selected.py`.
4) Si és un `index.md` personalitzat, posa `freeze: true`.
5) Puja canvis.

## 3) Actualitzar una pàgina
- Sense `freeze`: edita DOCX → executa script → push.
- Amb `freeze`: posa `freeze: false` → executa → retoca → `freeze: true` → push.

## 4) Menú (mkdocs.yml)
Exemple de bloc:
```yaml
nav:
  - Inici: index.md
  - Continguts: continguts.md
  - UD01:
      - Introducció: unitats-didactiques/ud01-.../index.md
      - Activitats 01: unitats-didactiques/ud01-.../ud01-activitats-01.md
```

## 5) Errors típics
- **Imatges no visibles**: assegura que els enllaços són `![](media/...)`. L'script ja ho força.
- **Avisos d'ancores**: provenen d'un índex manual del DOCX; es poden ignorar o eliminar el bloc manual al `.md`.
- **Actions no s'executen**: cal fer **el primer push** teu perquè s'activin els workflows al repo nou.

## 6) Sincronitzar millores del template
```bash
git remote add upstream git@github.com:ELTEUUSUARI/template-apunts.git
git fetch upstream
git merge upstream/main   # o: git rebase upstream/main
```
