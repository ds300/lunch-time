import { Venue, User, getVenueReports } from "../domain"

const users: User[] = [
  {
    name: "Agatha",
    wont_eat: ["fruit"],
    drinks: ["coca cola"],
  },
  {
    name: "Beth",
    wont_eat: ["chicken", "clams"],
    drinks: ["beer"],
  },
  {
    name: "Cathy",
    wont_eat: ["lettuce"],
    drinks: ["kombucha"],
  },
]

// this is just a smoke test. I don't consider this function complicated
// enough to unit test thoroughly
describe("venue reports", () => {
  it("should be generated correctly", () => {
    const venues: Venue[] = [
      {
        name: "Apoteke",
        food: ["fruit"],
        drinks: ["kombucha", "beer"],
      },
      {
        name: "Bar",
        food: ["burgers"],
        drinks: ["beer", "kombucha", "coca cola"],
      },
    ]
    expect(getVenueReports(users, venues)).toEqual([
      {
        venueName: "Apoteke",
        unhappyUserReports: [
          {
            name: "Agatha",
            canDrink: false,
            canEat: false,
          },
        ],
      },
      {
        venueName: "Bar",
        unhappyUserReports: [],
      },
    ])
  })
})
