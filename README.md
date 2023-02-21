# OnlyCalves

Your one stop shop for all calves related content. Setting up a static React app to highlight our Ragnar teams' calves and determine whose calf has the best moo-ves.

The website is live at [beta.onlycalv.es](beta.onlycalv.es)

## Development

This project is set up to work with VSCode, you'll see the list of suggested extensions, such as the tailwind autocomplete, which is super handy! To debug code in VSCode

- launch the local web server in the terminal: `yarn start`
- press the "play" button in VSCode which will launch and attach to the instance of the React app

You should now be able to set breakpoints and hit them!

## Tech Stack

### Typescript

Typescript? You Microsoft shill! Yes, but also, it's just so much nicer, it's Javascript without the chaos of Javascript, where your linter can now anticipate you making dumb mistakes because we have types and interfaces! It's just like JS, but better!

### Tailwind

Tailwind is a handy way to add CSS to specific elements without having to author a completely separate CSS file and go back and forth between the sources of truth. You might look at it and say "wow this is just like adding a `styles` object in React", and you would be mostly right, except Tailwind is much easier (just add a class name instead of all the styles), and it comes with a bunch of presets that make your life much much easier. [Here are all the docs and classes you can use](https://tailwindcss.com/docs/installation), and if you want to add some custom ones, you can edit the `tailwind.config.js` file to add your own definitions!

### Azure Static Websites

You can see in the Github Actions portion of this repo, the website is set up to auto publish to the Azure Static Website resource that hosts this site. Answers in order

- Why Azure?
  - I've stood this up before and there is a handy VSCode plugin that literally let me publish this + auto created the github action with one click
- Why Static Web App?
  - Super lightweight, you're essentially just throwing the React JS bundle into Blob Storage and serving it to anyone who needs it, not active server costs!
- What about storage?
  - We'll use Azure Blob Storage for that as well, so we got everything we need!
