/**
 * NEVACO BUILD — Featured Projects data
 * ---------------------------------------------------------------------
 * Add a new completed project by adding one object to this array. Each
 * project renders as a card on the Projects page; clicking the card opens
 * a full gallery of its `photos` in the lightbox.
 *
 *   {
 *     id:          unique slug, no spaces (used for deep-linking/keys)
 *     title:       short project name shown on the card
 *     address:     job address shown under the description — use the
 *                  string "Address pending" if not yet confirmed
 *     description: 1–2 sentence summary of the work done
 *     cover:       path to the card's cover photo
 *     photos: [
 *       { src: "assets/projects/....jpg", alt: "...", label: "Before" | "After" | "" }
 *     ]
 *   }
 *
 * To add a placeholder card for a project that doesn't have photos yet,
 * set cover to null and photos to an empty array — the card will render
 * with the site's standard "coming soon" placeholder styling instead of
 * an image.
 */
window.NEVACO_PROJECTS = [
  {
    id: "project-01",
    title: "Full Home Renovation",
    address: "320 Atlas Ave",
    description: "A full interior renovation including a custom fireplace feature wall, an open-concept great room, a redesigned kitchen, a staircase rebuild with wrought-iron railing, and a redesigned front entry.",
    cover: "assets/hero-exterior.jpg",
    photos: [
      { src: "assets/hero-exterior.jpg", alt: "320 Atlas Ave exterior after renovation, modern black and wood-slat facade at dusk", label: "After" },
      { src: "assets/projects/atlas-deck-dusk-after.jpg", alt: "New backyard deck and patio after renovation, at dusk", label: "" },
      { src: "assets/projects/atlas-deck-day-after.jpg", alt: "New backyard deck and patio after renovation, daytime view of the rear of the home", label: "" },
      { src: "assets/projects/atlas-livingroom-after.jpg", alt: "Living room after renovation, view toward the dining area", label: "" },
      { src: "assets/projects/atlas-kitchen-island-after.jpg", alt: "Kitchen after renovation, island with soapstone counter and pendant lighting", label: "" },
      { src: "assets/projects/atlas-kitchen-stove-after.jpg", alt: "Kitchen after renovation, gas range and soapstone backsplash", label: "" },
      { src: "assets/projects/atlas-kitchen-sink-after.jpg", alt: "Kitchen after renovation, sink and stove wall with soapstone counters", label: "" },
      { src: "assets/projects/atlas-kitchen-dining-after.jpg", alt: "Kitchen island after renovation, view toward the dining nook", label: "" },
      { src: "assets/projects/atlas-kitchen-living-after.jpg", alt: "Kitchen island after renovation, view toward the living room", label: "" },
      { src: "assets/projects/atlas-kitchen-oven-after.jpg", alt: "Kitchen after renovation, built-in double wall oven", label: "" },
      { src: "assets/projects/atlas-dining-open-after.jpg", alt: "Open-concept dining and kitchen area after renovation", label: "" },
      { src: "assets/projects/atlas-stairwell-after.jpg", alt: "Stairwell after renovation, view up toward the pendant light fixture", label: "" },
      { src: "assets/projects/atlas-bedroom-after.jpg", alt: "Bedroom after renovation, upholstered bed and large window", label: "" },
      { src: "assets/projects/atlas-bathroom-after.jpg", alt: "Bathroom after renovation, glass shower and floating vanity", label: "" },
      { src: "assets/projects/atlas-laundry-after.jpg", alt: "Laundry closet after renovation, stacked washer and dryer", label: "" },
      { src: "assets/projects/atlas-basement-after.jpg", alt: "Finished basement rec room and kitchenette after renovation", label: "" }
    ]
  },
  {
    id: "project-02",
    title: "Full Home Renovation",
    address: "254 Hastings Ave",
    description: "A full home renovation featuring a custom kitchen with waterfall marble island, an open-concept living and dining layout, a rebuilt staircase, a finished basement, and renovated bathrooms.",
    cover: "assets/projects/hastings-exterior-day.jpg",
    photos: [
      { src: "assets/projects/hastings-exterior-day.jpg", alt: "254 Hastings Ave exterior after renovation, modern black brick facade in daylight", label: "" },
      { src: "assets/projects/hastings-exterior-night.jpg", alt: "254 Hastings Ave exterior after renovation, night view with landscape lighting", label: "" },
      { src: "assets/projects/hastings-aerial.jpg", alt: "Aerial view of the property after renovation", label: "" },
      { src: "assets/projects/hastings-kitchen-island.jpg", alt: "Kitchen after renovation, waterfall marble island with seating for four", label: "" },
      { src: "assets/projects/hastings-kitchen-range.jpg", alt: "Kitchen after renovation, gas range and marble backsplash", label: "" },
      { src: "assets/projects/hastings-kitchen-living.jpg", alt: "Kitchen after renovation, view toward the open-concept living room", label: "" },
      { src: "assets/projects/hastings-kitchen-wide.jpg", alt: "Kitchen after renovation, full wall of white cabinetry and marble backsplash", label: "" },
      { src: "assets/projects/hastings-kitchen-fridge.jpg", alt: "Kitchen after renovation, view toward the living room", label: "" },
      { src: "assets/projects/hastings-dining-nook.jpg", alt: "Dining nook after renovation, glass table off the kitchen island", label: "" },
      { src: "assets/projects/hastings-livingroom.jpg", alt: "Living room after renovation, custom seating and area rug", label: "" },
      { src: "assets/projects/hastings-stairs-down.jpg", alt: "Staircase after renovation, view down toward the open-concept main floor", label: "" },
      { src: "assets/projects/hastings-stairs-basement.jpg", alt: "Basement staircase after renovation, engineered hardwood treads with glass railing", label: "" },
      { src: "assets/projects/hastings-bedroom.jpg", alt: "Bedroom after renovation, upholstered headboard and large window", label: "" },
      { src: "assets/projects/hastings-bathroom-shower.jpg", alt: "Bathroom after renovation, glass shower with rainfall showerhead", label: "" },
      { src: "assets/projects/hastings-bathroom-tub.jpg", alt: "Bathroom after renovation, soaker tub and vanity", label: "" }
    ]
  },
  {
    id: "project-03",
    title: "Full Home Renovation",
    address: "1 Banbury Crt",
    description: "A full home renovation by NEVACO BUILD featuring an open-concept main floor with a custom kitchen and fireplace feature wall, a rebuilt staircase with wrought-iron railing, a finished basement with kitchenette, and renovated bathrooms.",
    cover: "assets/projects/banbury-exterior-day.jpg",
    photos: [
      { src: "assets/projects/banbury-exterior-day.jpg", alt: "1 Banbury Crt Toronto home renovation, brick and wood exterior after renovation", label: "" },
      { src: "assets/projects/banbury-exterior-entry.jpg", alt: "Front entry after renovation, arched brick surround with modern black door", label: "" },
      { src: "assets/projects/banbury-hallway-dining.jpg", alt: "Open-concept hallway and dining area after full home renovation", label: "" },
      { src: "assets/projects/banbury-kitchen-island.jpg", alt: "Custom kitchen renovation, island with waterfall marble counter and open-concept dining", label: "" },
      { src: "assets/projects/banbury-livingroom-fireplace.jpg", alt: "Living room renovation, custom feature wall with built-in electric fireplace", label: "" },
      { src: "assets/projects/banbury-livingroom-seating.jpg", alt: "Living room after renovation, walkout to deck with custom seating area", label: "" },
      { src: "assets/projects/banbury-stairs-foyer.jpg", alt: "Front foyer and staircase after renovation, wrought-iron railing", label: "" },
      { src: "assets/projects/banbury-stairs-upper.jpg", alt: "Staircase after renovation, upper landing with wrought-iron railing", label: "" },
      { src: "assets/projects/banbury-bedroom-wide.jpg", alt: "Primary bedroom after renovation, upholstered headboard and large window", label: "" },
      { src: "assets/projects/banbury-bedroom-headboard.jpg", alt: "Primary bedroom after renovation, feature accent wall and custom lighting", label: "" },
      { src: "assets/projects/banbury-bathroom-vanity.jpg", alt: "Bathroom renovation, double vanity with matte black fixtures", label: "" },
      { src: "assets/projects/banbury-powder-room.jpg", alt: "Powder room renovation, vessel sink and custom vanity", label: "" },
      { src: "assets/projects/banbury-laundry.jpg", alt: "Laundry closet after renovation, stacked washer and dryer", label: "" },
      { src: "assets/projects/banbury-basement-recroom.jpg", alt: "Finished basement renovation, open-concept recreation room", label: "" },
      { src: "assets/projects/banbury-basement-kitchenette.jpg", alt: "Finished basement renovation, kitchenette with custom cabinetry", label: "" }
    ]
  }
];
