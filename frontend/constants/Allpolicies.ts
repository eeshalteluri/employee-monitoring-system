export const POLICIES = {
  "view_employee": {
    "any": [
      { "user.status": { "eq": "active" } },
      { "user.role": { "in": ["admin", "employee"] } }
    ]
  },

  "edit_employee": {
    "all": [
      { "user.role": { "eq": "admin" } },
      { "user.status": { "eq": "active" } }
    ]
  }
} as const;

export type Action = keyof typeof POLICIES
