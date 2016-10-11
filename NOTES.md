
### Component Hiearchy goes like this

AppContext
- Router
  [whatever fits the route goes here]


### suggested runlevels via xtpoints

#### not extendable
0.) nothing
1.) load all xtpoint definitions

#### extendable
2.) anonymous user (not logged in)
basic routes are registred to this. (p.e. /login, /about, /goanonymous)

- loggedIn as dependency?



3.) user logged in - load user configuration (stored settings)
auth-flow initialized, after this, all auth routes are initialized and available

4.) all data is resolved via api/localstorage for requested view(s)
struct+dynamic deps to define which data a view/route needs to resolve for rendering (NOTE: Schema?!?)

5.) all stores are connected, all bindings are done, ready to receive user-input/interaction events


AppContext
->


- use promises for deferred xtpoints on booting
  - auth for instance


### TODO

* [ ] implement authorization service
  * [ ] super agent + oauth2 (zalando for refresh token and social login) - may be modify it, since we support email-flow also
  * [ ] email flow

* [ ] implement basic api service
  * [ ] start filling localForage database with sites, items(list + full), redesign, jobs - investigate normalizr to normalize data
        (Investigate possiblity to re-use stores/validations from v1 (if applyable))

* [ ] implement store which will sync with localForage-store (manual or batched)
  * [ ] start using it from context (make sure props vs. state is right decision)
