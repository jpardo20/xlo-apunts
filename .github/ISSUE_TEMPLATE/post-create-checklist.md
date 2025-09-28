---
name: ✅ Post-create checklist
about: Tasques a fer just després de crear un repo des del template
title: 'Checklist post-creació'
labels: enhancement
assignees: ''
---

- [ ] Editar `mkdocs.yml` → `site_name` i `site_url`
- [ ] Afegir primera UD (.docx) a `source/unitats-didactiques/...`
- [ ] Omplir `publish.yaml` amb l'ítem inicial (posar `publish: true/false` i `freeze: true` si cal)
- [ ] (Opcional) Provar localment `python3 scripts/publish_selected.py && mkdocs serve`
- [ ] Fer `git add/commit/push` perquè s'activi GitHub Actions
- [ ] Verificar **Settings → Pages** (Source: GitHub Actions)
- [ ] Afegir pàgines al menú `mkdocs.yml → nav:`
