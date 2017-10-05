import { User, Venue } from "./domain"
import * as Ajv from "ajv"

const ajv = new Ajv()

const validateUsers = ajv.compile({
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      drinks: { type: "array", items: { type: "string" } },
      wont_eat: { type: "array", items: { type: "string" } },
    },
  },
})

const validateVenues = ajv.compile({
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      drinks: { type: "array", items: { type: "string" } },
      food: { type: "array", items: { type: "string" } },
    },
  },
})

/**
 * Make sure food and drink names are lower case and trimmed
 */

function canonicalizeStrings(strings: string[]): string[] {
  return strings.map(s => s.toLowerCase().trim())
}

function canonicalizeUsers(users: User[]): User[] {
  return users.map(user => ({
    ...user,
    wont_eat: canonicalizeStrings(user.wont_eat),
    drinks: canonicalizeStrings(user.drinks),
  }))
}

function canonicalizeVenues(venues: Venue[]): Venue[] {
  return venues.map(venue => ({
    ...venue,
    food: canonicalizeStrings(venue.food),
    drinks: canonicalizeStrings(venue.drinks),
  }))
}

export function processUsers(data: {}) {
  if (validateUsers(data)) {
    return canonicalizeUsers(data as User[])
  } else {
    console.error(validateUsers.errors)
    throw new Error("invalid users format")
  }
}

export function processVenues(data: {}) {
  if (validateVenues(data)) {
    return canonicalizeVenues(data as Venue[])
  } else {
    console.error(validateVenues.errors)
    throw new Error("invalid venues format")
  }
}
