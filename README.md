# FitClub — App de academia com formulário dinâmico (JSON)

Checkpoint 3 — React Native

## Descrição
FitClub é um app de academia com tela inicial, barra de abas (Início, Matrícula, Minha matrícula) e uma
**matrícula gerada dinamicamente** a partir de uma configuração (`src/config/formConfig.ts`).
Rótulos, tipos, opções e obrigatoriedade vêm do array `fields`; o componente de entrada é escolhido por `type`
em um único ponto (`FieldRenderer`). O app valida as respostas, exibe o resultado e persiste com AsyncStorage
(salvar, recuperar ao reabrir e limpar).

Telas: **Início** (boas-vindas e resumo da matrícula), **Matrícula** (formulário dinâmico) e
**Minha matrícula** (dados salvos, com opção de limpar). Após o envio válido o app abre "Minha matrícula".

Extras: barra de progresso dos campos obrigatórios, destaque de foco/erro nos campos, mostrar/ocultar senha,
contador de caracteres, confirmação antes de apagar e tema claro/escuro automático.

## Tecnologias
React Native, Expo SDK 55, TypeScript (sem `any`), AsyncStorage, react-native-web.

## Como executar
```bash
npm install
npx expo start              # Android / iOS (Expo Go ou emulador)
npx expo start --web        # Web
npm run type-check          # valida a tipagem
```

## Tipos de campo (10)
`text`, `email`, `password`, `number`, `multiline`, `select`, `radio`, `checkbox`, `switch`, `date`.
As opções de `select` e `radio` vêm de `options` na configuração.

## Regras de validação
- `required: true` vazio: mostra erro no campo e bloqueia o envio.
- `switch`: `false` é uma resposta válida e nunca bloqueia.
- `checkbox` obrigatório: precisa estar marcado.
- `email`, `password` (mín. 6), `number` e `date` (DD/MM/AAAA) têm o formato validado.
- `select` / `radio`: o valor precisa existir em `options`.
- `date`: `TextInput` com máscara e `select`: Modal + FlatList, para funcionar igual em Android, iOS e Web.

## Como verificar os requisitos
1. Na aba **Matrícula**, toque em **Enviar** com o formulário vazio: os obrigatórios mostram erro.
2. Preencha tudo e envie: a aba "Minha matrícula" mostra cada valor com o rótulo do campo.
3. Feche e reabra o app (ou recarregue a página na Web): os dados continuam salvos.
4. Em "Minha matrícula", toque em **Limpar dados salvos** e confirme: os dados somem e a Início volta ao estado inicial.
5. Edite `fields` em `formConfig.ts`: a tela muda sozinha.

## Estrutura de pastas
```
App.tsx
index.ts
src/
  components/
    fields/        FieldRenderer + um componente por tipo (BaseInput, FieldWrapper...)
    DynamicForm, ProgressBar, ResultCard, ConfirmModal, ScreenHeader, StatusBanner, TabBar
  config/          formConfig.ts (configuração do formulário)
  hooks/           useDynamicForm, usePersistedSubmission, useTheme
  screens/         HomeScreen, FormScreen, RecordScreen
  services/        storage.ts (AsyncStorage)
  theme/           theme.ts (paletas clara/escura)
  types/           form.ts
  utils/           validation.ts, format.ts
```

## Prints
<img width="337" height="716" alt="android_home" src="https://github.com/user-attachments/assets/3eb6ec6c-3ff9-404c-816d-1b11ae67f95f" />
<img width="367" height="765" alt="ios_matricula" src="https://github.com/user-attachments/assets/df4c3e68-b81f-4d27-963c-bd4b1854c9b6" />
<img width="1592" height="856" alt="web_home" src="https://github.com/user-attachments/assets/39fdefe8-954f-45b3-ac6b-35afab6137a1" />
<img width="1527" height="861" alt="web_matricula" src="https://github.com/user-attachments/assets/b9e5c86d-5338-42a4-a57d-7a7dd97e47f5" />
<img width="1562" height="852" alt="web_minha_matricula" src="https://github.com/user-attachments/assets/ecaae12a-dcbf-45c9-8903-4a4c2e4adc60" />


## Integrantes
- Gabrielly Candido RM: 560916
- João Victor Ferreira RM: 560439
- Jonathan Henrique da Silva RM: 561139 
- Luiza Ribeiro RM: 560200

