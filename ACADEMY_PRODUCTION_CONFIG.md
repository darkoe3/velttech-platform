# Academy Production Configuration

The Velttech Young Innovators Academy frontend should use this dedicated production domain:

```text
https://academy.velttech.org
```

Do not point Academy links to `https://app.velttech.org`; that domain belongs to VeltSmartSchoolApp.

## Frontend: Vercel

Set the following environment variable on the Academy frontend Vercel project:

```text
NEXT_PUBLIC_FRONTEND_URL=https://academy.velttech.org
NEXT_PUBLIC_API_URL=https://api.velttech.org
```

Add the production domain to the Academy frontend Vercel project:

```text
academy.velttech.org
```

Configure DNS for `academy.velttech.org` according to Vercel's domain instructions. Keep `app.velttech.org` assigned to the VeltSmartSchoolApp project.

## Backend: Render

Set the following environment variables on the Academy backend service:

```text
FRONTEND_URL=https://academy.velttech.org
CORS_ALLOWED_ORIGINS=https://academy.velttech.org
CSRF_TRUSTED_ORIGINS=https://academy.velttech.org
```

If multiple origins are needed, keep them comma-separated, for example:

```text
CORS_ALLOWED_ORIGINS=https://academy.velttech.org,http://localhost:3000
CSRF_TRUSTED_ORIGINS=https://academy.velttech.org
```

## Expected Runtime Behavior

Academy navigation should remain relative inside the frontend:

```text
/login
/dashboard
/assignments
/instructor/assignments
```

Absolute URLs generated for emails, password reset links, Paystack callbacks, certificate QR codes, and certificate sharing should resolve under:

```text
https://academy.velttech.org
```
