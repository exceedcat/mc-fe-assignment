# MC FE Assignment

## Build and Run

Install dependencies:

```
npm i
```

Start dev:

```
npm run dev
```

Build:

```
npm run build
```

## Improvement Considerations

### API

- Add expiration to access token. Option to add refresh token
- Do not pass user password (and do not store passwords in a raw form)
- Change update user to Put/Patch method and adjust api accordingly
- Implement rate limiting
- Add pagination to /acquisitions endpoint and, potentially, /users. Also filtering by date
- Add availability for new user registration

### Front-end

- Code-split the application
- Decide upon styling approach and implement
- Improve test coverage
- Decide upon error-handling and feedback approach and implement
- Update plot to be resizable for better UX on mobile devices
- Remove some duplications, preferably by using third-party library (authorization token, etc)
