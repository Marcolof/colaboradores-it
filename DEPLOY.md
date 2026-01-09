# 🚀 Guía de Deploy

## URL de Preview
https://colaboradores-ittest.vercel.app/

## Variables de Entorno Necesarias en Vercel

```
VITE_SUPABASE_URL=https://iitbfhkykyxhcuwbgtea.supabase.co
VITE_SUPABASE_ANON_KEY=[token en Vercel]
```

## Flujo de Trabajo

1. Hacer cambios localmente
2. `git add .`
3. `git commit -m "mensaje"`
4. `git push`
5. Vercel detecta y hace deploy automático
6. Ver cambios en: https://colaboradores-ittest.vercel.app/

## Deploy Manual

Si necesitas redeploy sin cambios:
- Ve a: https://vercel.com/marcos-projects-c934fa75/colaboradores-it.test/deployments
- Click en último deployment → ⋯ → Redeploy
