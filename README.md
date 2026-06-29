# Denmark Water Association — Modern Slate concept

Standalone Next.js site + online bill-pay portal mock for Denmark Water Association.
This is the **Modern Slate** design concept (modern-slate).

## Run

```bash
npm install
npm run dev    # http://localhost:3000
```

- `/` — home page
- `/pay` — online bill-pay portal (mock)

### Try the payment flow
Demo account on `/pay`: account number **104872**, last name **Mason**.
Use any 12+ digit card (e.g. 4242 4242 4242 4242), any future expiry, any 3-digit CVC.
**No real charge — fully mocked, no card data stored.**

Content in `lib/content.ts` is representative placeholder; swap real association details before go-live.
