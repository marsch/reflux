
export const APPACL = {
  BASE_ACCESS: 1 << 1,
  LOGGED_IN: 1 << 2
}

export const SITEACL = {
  SITE_OWNER: 1 << 3,
  SITE_COLLABORATOR: 1 << 4,
  SITE_VISITOR: 1 << 5
}
