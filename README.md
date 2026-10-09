# CoreFixIT — IT that moves you forward

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

## Run locally in VS Code

1. Install Node.js 22, extract this project, then open the extracted `corefixit-vscode` folder in VS Code.
2. In the VS Code terminal, run:

   ```sh
   corepack enable
   corepack prepare pnpm@10.18.0 --activate
   pnpm install --frozen-lockfile
   pnpm dev
   ```

3. Start the development server. In Windows PowerShell, use:

   ```powershell
   $env:NODE_ENV = "development"
   pnpm exec tsx watch server/_core/index.ts
   ```

   On macOS/Linux, use `pnpm dev`. Open `http://localhost:3000`. Stop the preview with `Ctrl+C`; use `pnpm check` and `pnpm test` to check the source.

The Contact page displays `mbulelo.it.support@gmail.com` and `0659823401`; its direct email and phone links work without any mail setup.

## Configure contact-form email

The form sends each validated inquiry to `mbulelo.it.support@gmail.com` with the visitor's address set as Reply-To. Delivery uses [Resend](https://resend.com/), and the API key stays on the server.

1. Register and verify a domain you own before production mail setup (for example, `corefixit.co.za`).
2. Create a Resend account, open **Domains**, and add a sending subdomain such as `mail.corefixit.co.za`.
3. In your domain registrar's DNS settings, add the records Resend shows for that sending subdomain. Copy their values exactly and keep unrelated website or email records unchanged.
4. Wait for Resend to mark the domain as verified, then [create a Resend API key](https://resend.com/docs/create-an-api-key) with permission to send email.
5. In the Render Dashboard, open the CoreFixIT service → **Environment** and add:
   - `RESEND_API_KEY` — the private API key from Resend.
   - `CONTACT_FROM_EMAIL` — an address on the verified domain, e.g. `CoreFixIT <website@mail.corefixit.co.za>`.
6. Save and redeploy the service. Submit a test inquiry on `/contact`; the success message appears only if Resend accepts it. Reply to the resulting email to respond to the person who submitted the form.

For local testing, copy `.env.example` to `.env`, replace the placeholders with your own Resend key and verified sender, then run the local server. Never add a real `.env` file or API key to GitHub. You can copy `.env.example` as a template; it contains placeholders only.

The archive intentionally excludes `node_modules`, populated `.env` files, and credentials. The contact-form email feature will return a service-unavailable message until the server has both required Resend environment variables and the sender domain is verified.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.
