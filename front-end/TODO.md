# Fix TanStack Table Type Error: ColumnDef<TCodigosProps> mismatch

## Steps:
- [x] 1. Update colunas.tsx: Retype columns to TCodigos, update fn signatures, fix actions cell.
- [x] 2. Update tabela.tsx: Add optional onDelete/atualizar props to DataTableProps, forward via meta.
- [x] 3. Update page.tsx: Fix columns call, AtualizarCodigo logic/toast/filter, pass props to Tabela.
- [x] 4. Verify: Run dev server, check TS errors gone, test table/actions.


