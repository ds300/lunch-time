export interface User {
  name: string
  wont_eat: string[]
  drinks: string[]
}

export interface Venue {
  name: string
  food: string[]
  drinks: string[]
}

export interface UserVenueReport {
  name: string
  canEat: boolean
  canDrink: boolean
}

function userCanEatAtVenue(user: User, venue: Venue): boolean {
  for (const foodType of venue.food) {
    if (!user.wont_eat.includes(foodType)) {
      return true
    }
  }
  return false
}

function userCanDrinkAtVenue(user: User, venue: Venue): boolean {
  for (const drinkType of user.drinks) {
    if (venue.drinks.includes(drinkType)) {
      return true
    }
  }
  return false
}

function venueReportForUser(user: User, venue: Venue): UserVenueReport {
  return {
    name: user.name,
    canEat: userCanEatAtVenue(user, venue),
    canDrink: userCanDrinkAtVenue(user, venue),
  }
}

export interface VenueReport {
  venueName: string
  unhappyUserReports: UserVenueReport[]
}

export function getVenueReports(users: User[], venues: Venue[]): VenueReport[] {
  return venues.map(venue => ({
    venueName: venue.name,
    unhappyUserReports: users
      .map(user => venueReportForUser(user, venue))
      .filter(({ canEat, canDrink }) => !canEat || !canDrink),
  }))
}
