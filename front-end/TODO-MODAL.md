# Make Modal Update Appear on 'Editar'

## Steps:
- [x] 1. Update page.tsx: Add modal state, render Dialog with ModaAtualizar.
- [ ] 2. Update tabela.tsx: Add onOpenEdit prop, forward to meta.
**No change needed - already has atualizar?: (codigo: TData) => void in meta.**
- [ ] 3. Update colunas.tsx: 'Editar' call meta.onOpenEdit(codigo).
- [ ] 4. Fix modalAtualizar.tsx: Use Dialog props (open, onOpenChange), remove SidebarProvider/fullpage.
- [ ] 5. Test: Click 'Editar' → modal opens with selected code data.

