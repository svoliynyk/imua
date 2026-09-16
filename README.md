# Fleet Forward UA

Build a modern, high-performance B2B commercial vehicle and fleet management platform for "INTRAMOTION UKRAINE" (IMUA)[cite: 1, 2]. 

The design must be industrial, professional, trustworthy, and clean (engineering-grade B2B look: corporate navy/dark slate, subtle steel/silver accents, crisp typography)[cite: 1, 2]. Mobile-responsive and fast.

Key Sections & Pages:

1. Navbar: IMUA Logo, Links ("In Stock Vehicles", "Custom Order / Import", "Vehicle Inspection (OTK)", "B2B Solutions", "About Us"), and a CTA button: "Request Fleet Quote"[cite: 1, 2].

2. Hero Section: Direct B2B value proposition ("Verified Commercial Vans & Corporate Cars for Ukrainian SME Businesses with In-House Technical Inspection & Full VAT Support")[cite: 1, 2]. Two primary CTAs: "Browse Vehicles in Stock" and "Configure Custom Order"[cite: 1, 2]. Quick trust badges: "In-House Inspection (OTK)", "Low Verified Mileage", "Turnkey Import on Legal Entities", "B2B Invoicing & VAT"[cite: 1, 2].

3. Vehicle Catalog ("In Stock" - Core Feature):

   - Multi-parameter filter panel on the left/top:

     * Vehicle Type: Commercial Vans (featured), Passenger Cars, SUVs[cite: 1, 2]

     * Brand & Model: dynamic cascading selector (e.g. Renault -> Master; Mercedes -> Sprinter; Volkswagen -> Crafter/Transporter)

     * Price Range ($ with VAT toggle: "Price with VAT" / "Price without VAT")

     * Year of manufacture (checkbox multi-select)[cite: 2]

     * Mileage range slider (km)[cite: 2]

     * Fuel type (Diesel, Petrol, Hybrid, EV) & Gearbox (Automatic, Manual)[cite: 2]

     * Status indicator filter (In Stock, Reserved, Sold)[cite: 2]

   - Sorting: Price (low/high), Year, Mileage, Date Added[cite: 2].

   - Vehicle Card:

     * High-res image carousel / gallery thumbnail[cite: 2]

     * Status badge ("In Stock" in green, "Reserved" in amber, "Sold" in gray)[cite: 2]

     * Title: Brand, Model, Year, Body Type[cite: 2]

     * Quick specs pills: Mileage (km), Fuel, Gearbox, VIN snippet[cite: 2]

     * Price with VAT and B2B invoice badge[cite: 2]

     * Direct link/button: "View OTK Inspection Report (DEKRA style)"[cite: 1, 2]

     * Buttons: "Inquire / Book" (opens modal pre-filled with this vehicle ID/model) and "Download PDF Spec Sheet"[cite: 2]

4. "Custom Order" Configurator:

   - Interactive multistep lead form for businesses wanting custom import (USA/EU):

     * Step 1: Vehicle type (Van/Car), target brand/model, desired specs[cite: 1, 2]

     * Step 2: Budget range, target delivery timeline[cite: 2]

     * Step 3: Company details (Company name, Tax ID/EDRPOU, Contact person, Phone, Email, optional file upload for enterprise technical specifications)[cite: 1, 2]

5. "In-House OTK Inspection" Trust Section:

   - Explains the company's verified inspection bay equipment, certified check on 100+ points, official inspection protocols, and chassis/engine diagnostics before handover[cite: 1, 2].

6. Data Architecture & Mock Data:

   - Provide clean mock data for 8 realistic vehicles (prioritize commercial vans: Renault Master, Mercedes Sprinter, VW Transporter, Ford Transit, plus 2 company fleet passenger cars)[cite: 1, 2].

   - Create a clean schema or easy Supabase / state integration so that adding or editing a vehicle takes under 5 minutes with fields: Title, Brand, Model, Year, Mileage, Price, VAT status, Status, OTK Report URL, Photos array, Fuel, Transmission, VIN, Internal ID[cite: 2].

7. Lead Capture Modals & Alerts:

   - "Quick Contact / Test Drive" modal pre-populating vehicle data[cite: 2].

   - Toast notifications on submit ("Thank you! Our B2B fleet manager will contact your company within 15 minutes")[cite: 1, 2].

   - Language: Ukrainian UI texts (interface labels: "В наявності", "Під замовлення", "Техогляд ОТК", "Ціна з ПДВ", "Забронювати", "Завантажити специфікацію")[cite: 2].

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://imua.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/690a952c-ab72-47cb-8491-37e13f7e95e9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
