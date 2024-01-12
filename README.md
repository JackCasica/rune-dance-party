<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</p>
<p align="center">
    <h1 align="center">RUNE-DANCE-PARTY</h1>
</p>
<p align="center">
    <em>Unleash the Magic: Rune Dance Party!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/JackCasica/rune-dance-party?style=default&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/JackCasica/rune-dance-party?style=default&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/JackCasica/rune-dance-party?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/JackCasica/rune-dance-party?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<hr>

## Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running rune-dance-party](#-running-rune-dance-party)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

## Overview

rune-dance-party is a project that offers a fun and interactive dance experience using the Rune Games SDK. It utilizes technologies such as React, React DOM, and Howler to create a captivating dance atmosphere. Users can immerse themselves in the experience by selecting different dance moves, creating unique dance patterns, and syncing them with the rhythm of the music. The project's value proposition lies in its ability to provide an entertaining and engaging platform for users to express their creativity through dance.

---

## Features

|     | Feature           | Description                                                                                                                                                                                                                                                |
| --- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | The project follows a modular architecture where components are organized using a file structure, making it easy to understand and navigate. The architecture allows for separation of concerns and promotes code reusability.                             |
| 🔩  | **Code Quality**  | The codebase maintains a high level of code quality and adheres to coding best practices. It utilizes linting tools like ESLint and Prettier to enforce coding styles and formatting.                                                                      |
| 📄  | **Documentation** | The project has limited documentation. While there is a README file, more comprehensive documentation could be beneficial for developers to understand the codebase and its functionalities.                                                               |
| 🔌  | **Integrations**  | The project has integrations with various dependencies such as `vite-plugin-rune`, `rune-games-sdk`, and `eslint-plugin-rune`. These integrations extend the project's capabilities and provide additional functionalities.                                |
| 🧩  | **Modularity**    | The codebase demonstrates good modularity, with components separated into individual files and folders. This promotes code reusability and maintainability. However, there is room for improvement in terms of better separation of concerns.              |
| 🧪  | **Testing**       | There is no mention of specific testing frameworks or tools used in the project. The absence of testing information suggests that automated testing might not be a primary focus of the project.                                                           |
| ⚡️ | **Performance**   | There is no specific information available on performance characteristics. A thorough evaluation of efficiency, speed, and resource usage would require further analysis and profiling of the project.                                                     |
| 🛡️  | **Security**      | The project does not provide explicit information about security measures. It is advisable to review the codebase thoroughly and consider implementing security best practices to protect data and ensure access control.                                  |
| 📦  | **Dependencies**  | The project depends on various external libraries and dependencies, including `json`, `@typescript-eslint/eslint-plugin`, `autoprefixer`, `yaml`, `@vitejs/plugin-react`, and more. These libraries extend the project's functionalities and capabilities. |

---

## Repository Structure

```sh
└── rune-dance-party/
    ├── .eslintrc.cjs
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── prettier.config.js
    ├── public
    ├── src
    │   ├── App.tsx
    │   ├── components
    │   │   ├── Body.tsx
    │   │   ├── Card.tsx
    │   │   ├── Character.tsx
    │   │   ├── Controls.tsx
    │   │   ├── DanceFloor.tsx
    │   │   ├── Deck.tsx
    │   │   ├── Limb.tsx
    │   │   ├── LimbButton.tsx
    │   │   ├── LimbControls.tsx
    │   │   ├── PlayerDetails.tsx
    │   │   ├── PowerUpButton.tsx
    │   │   ├── Powerups.tsx
    │   │   ├── StageCardBack.tsx
    │   │   ├── StageCardFront.tsx
    │   │   └── Timer.tsx
    │   ├── hooks
    │   │   ├── useBackgroundMusic.ts
    │   │   ├── useGame.ts
    │   │   └── useSound.ts
    │   ├── index.css
    │   ├── logic.ts
    │   ├── main.tsx
    │   ├── types
    │   │   └── types.ts
    │   ├── util
    │   │   ├── generateCardStack.ts
    │   │   ├── getPlayerState.ts
    │   │   └── getWinner.ts
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

## Modules

<details closed><summary>.</summary>

| File                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [pnpm-lock.yaml](https://github.com/JackCasica/rune-dance-party/blob/master/pnpm-lock.yaml)         | The code snippet in the rune-dance-party repository is responsible for enforcing code quality and formatting standards through ESLint and Prettier. It ensures that the code follows the prescribed rules and maintains consistency.                                                                                                                                                                |
| [tsconfig.node.json](https://github.com/JackCasica/rune-dance-party/blob/master/tsconfig.node.json) | This code snippet, located in the `tsconfig.node.json` file, configures the TypeScript compiler options for the Node.js environment. It sets the module to ESNext and includes the `vite.config.ts` file for compilation.                                                                                                                                                                           |
| [index.html](https://github.com/JackCasica/rune-dance-party/blob/master/index.html)                 | This code snippet, located in the `index.html` file, sets up the basic structure of the HTML document for the Rune Dance Party repository. It includes the necessary script tags to import the `logic.ts` and `main.tsx` files, which are crucial for running the application.                                                                                                                      |
| [tailwind.config.js](https://github.com/JackCasica/rune-dance-party/blob/master/tailwind.config.js) | The code snippet in tailwind.config.js defines the custom colors used in the Rune Dance Party repository's UI. It extends the theme configuration to include colors like ronchi, willpower-orange, vivid-raspberry, blue-purple, and brilliant-azure.                                                                                                                                               |
| [.eslintrc.cjs](https://github.com/JackCasica/rune-dance-party/blob/master/.eslintrc.cjs)           | This code snippet contains the ESLint configuration file (.eslintrc.cjs) for the Rune Dance Party repository. It sets up linting rules for TypeScript, React, and the Rune plugin. It also enables the use of React Hooks and the React Refresh plugin.                                                                                                                                             |
| [prettier.config.js](https://github.com/JackCasica/rune-dance-party/blob/master/prettier.config.js) | The `prettier.config.js` file in the `rune-dance-party` repository defines the formatting configuration for the project. It specifies the print width, tab width, and plugins used by Prettier.                                                                                                                                                                                                     |
| [.gitignore](https://github.com/JackCasica/rune-dance-party/blob/master/.gitignore)                 | The code snippet in this repository serves as a Gitignore file, specifically excluding the node_modules directory from version control.                                                                                                                                                                                                                                                             |
| [package-lock.json](https://github.com/JackCasica/rune-dance-party/blob/master/package-lock.json)   | This code snippet is a part of the rune-dance-party repository. It includes components for the body, card, and character in the application. Its main role is to provide the necessary UI elements for the dance party application.                                                                                                                                                                 |
| [package.json](https://github.com/JackCasica/rune-dance-party/blob/master/package.json)             | This code snippet is part of the rune-dance-party repository. It includes various components, hooks, and utility functions that contribute to the logic and UI of the dance party game. The codebase utilizes React, Tailwind CSS, and the Rune Games SDK. The code accomplishes tasks like generating card stacks, managing game state, handling sounds, and rendering UI components for the game. |
| [tsconfig.json](https://github.com/JackCasica/rune-dance-party/blob/master/tsconfig.json)           | The code snippet in the `tsconfig.json` file configures the TypeScript compiler options for the parent repository. It specifies the target platform, modules, linting rules, and includes relevant source files for compilation.                                                                                                                                                                    |
| [vite.config.ts](https://github.com/JackCasica/rune-dance-party/blob/master/vite.config.ts)         | This code snippet configures the Vite build tool for the Rune Dance Party repository. It sets the base path, plugins for React and Rune, and the server host and port.                                                                                                                                                                                                                              |
| [postcss.config.js](https://github.com/JackCasica/rune-dance-party/blob/master/postcss.config.js)   | This code snippet, located in the `postcss.config.js` file, configures the PostCSS plugin for the parent repository. It sets up Tailwind CSS and Autoprefixer, enabling them to process the CSS files in the project.                                                                                                                                                                               |

</details>

<details closed><summary>src</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [App.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/App.tsx)             | The code snippet is the main component (`App`) of the `rune-dance-party` repository. It imports and renders various components such as `Character`, `Controls`, `DanceFloor`, `Deck`, and `Timer`. It also utilizes hooks for game logic and sound effects.                                                                               |
| [main.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/main.tsx)           | The code snippet in the `main.tsx` file is responsible for rendering the `App` component into the HTML document. It sets up React's Strict Mode for enhanced debugging and performance optimization. The rendered component is enclosed in the root element with the ID root. The code also imports and applies the index.css stylesheet. |
| [index.css](https://github.com/JackCasica/rune-dance-party/blob/master/src/index.css)         | The code snippet located at `src/index.css` is responsible for defining the styling and layout of the web application. It sets the font family, colors, button styles, and various animations used throughout the application. It also includes CSS classes for card flipping and positioning elements on the page.                       |
| [logic.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/logic.ts)           | The code snippet in `src/logic.ts` is responsible for managing the game logic and actions in the rune-dance-party repository. It initializes the game state, defines actions like shuffling controls and toggling limbs, and updates the game state based on player actions and time constraints.                                         |
| [vite-env.d.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/vite-env.d.ts) | The `vite-env.d.ts` file in the `src` directory references the `vite/client` types for the parent repository's Vite configuration. It ensures that the necessary types are available for the Vite development server to work properly.                                                                                                    |

</details>

<details closed><summary>src.types</summary>

| File                                                                                      | Summary                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [types.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/types/types.ts) | The code snippet defines various types and props used in the parent repository's architecture, including limb and pose enums, player details, game state, and component props. These definitions enhance type safety and clarity in the codebase. |

</details>

<details closed><summary>src.util</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [getPlayerState.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/util/getPlayerState.ts)       | The code snippet in `getPlayerState.ts` retrieves the state of a player in a game by searching for their ID in the game's player list. It returns the player object if found. This function is essential for managing player data within the game architecture.                                              |
| [getWinner.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/util/getWinner.ts)                 | The `getWinner.ts` file in the `rune-dance-party` repository is responsible for determining the winners of a game based on the players' total scores. It finds the highest score and filters the players with that score as the winners.                                                                     |
| [generateCardStack.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/util/generateCardStack.ts) | The code snippet in `generateCardStack.ts` generates an array of card objects with a color and limbs array. It uses a random number generator to assign colors and limb values to each card. The function `generateCardStack` takes the total number of cards as input and returns the generated card stack. |

</details>

<details closed><summary>src.components</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [StageCardBack.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/StageCardBack.tsx)   | The `StageCardBack` component in the `src/components` directory is responsible for rendering the back side of a stage card in a dance party game. It takes a color and a shown flag as props, and conditionally hides the back side based on the shown flag. The component also displays a card pattern image in the background.                                                                                                                                                        |
| [Card.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Card.tsx)                     | This code snippet is a React component called Card. It renders a card with a front and back side based on the provided props. The component manages the position and appearance of the card based on various conditions.                                                                                                                                                                                                                                                                |
| [Limb.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Limb.tsx)                     | The code in `Limb.tsx` is a React component that renders a limb image based on the limb type and player state. It dynamically applies CSS classes to position and style the limb image on the dance floor. The component supports different limb types, such as left arm, right arm, left leg, and right leg, and handles the rendering logic for each limb based on the player's limb state.                                                                                           |
| [PowerUpButton.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/PowerUpButton.tsx)   | The `PowerUpButton` component is responsible for rendering a button that represents a power-up in the Rune Dance Party game. It receives various props such as the power-up name, image source, sound effect, correct streak, cost, and onClickHandler. The component dynamically applies different styles and opacity levels to the button based on the correct streak and cost values. When clicked, it triggers the onClickHandler function with the power-up and cost as arguments. |
| [LimbButton.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/LimbButton.tsx)         | This code snippet is a React functional component called LimbButton. It renders a button with an image that represents a limb control. When the button is clicked, it triggers an action to update the limb pose for the activating player. The component also handles conditional rendering based on the control type and the autoLimbActive flag.                                                                                                                                     |
| [StageCardFront.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/StageCardFront.tsx) | This code snippet defines the `StageCardFront` component, which renders the front side of a stage card with different limb images based on the `limbs` prop. It uses images imported from the `../assets/limbs` directory to display the limbs. The component also has conditional rendering based on the `shown` prop to toggle the visibility of the card.                                                                                                                            |
| [Body.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Body.tsx)                     | The `Body` component in the `src/components/Body.tsx` file is responsible for rendering the body of a player in the Rune Dance Party game. It dynamically selects the torso image based on the player's color and renders additional elements such as a crown and confusion icon. It also renders any child components passed to it.                                                                                                                                                    |
| [Powerups.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Powerups.tsx)             | This code snippet, located in the `src/components/Powerups.tsx` file, is responsible for rendering and handling power-up buttons in the Rune Dance Party game. It allows players to use power-ups such as shuffle, attract, and auto-limb by checking the correct streak and playing corresponding sound effects. The code also handles the logic for running the power-ups and updating the game state accordingly.                                                                    |
| [Deck.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Deck.tsx)                     | The `Deck` component in the `src/components/Deck.tsx` file renders a stack of cards for a dance party game. It receives props `game` and `activeCardIndex`, and maps through the card stack to render individual `Card` components with specific properties.                                                                                                                                                                                                                            |
| [Timer.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Timer.tsx)                   | The Timer component in the src/components/Timer.tsx file is responsible for rendering and updating a visual timer in the rune-dance-party repository. It receives the game state as a prop and calculates the progress of the current round to determine how much of the timer should be filled. The Timer component is a critical feature in the repository's architecture as it provides a visual representation of time during gameplay.                                             |
| [PlayerDetails.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/PlayerDetails.tsx)   | This code snippet is a React component called PlayerDetails that displays the player's name and score for a round. It takes props such as displayName, scoreForRound, and showScore to conditionally render the score. It is part of the rune-dance-party repository's components directory.                                                                                                                                                                                            |
| [Character.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Character.tsx)           | The `Character.tsx` code snippet is a React component that renders a character in the Rune Dance Party game. It plays sound effects based on the player's score for the round and displays the player's details. The component also manages the visibility of the player's score.                                                                                                                                                                                                       |
| [LimbControls.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/LimbControls.tsx)     | The code snippet `LimbControls.tsx` is part of the `rune-dance-party` repository's architecture. It is a React component that renders the limb controls for a player in the dance party game. It takes in props such as the player's controls order, auto limb status, and player color to render the controls accordingly.                                                                                                                                                             |
| [DanceFloor.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/DanceFloor.tsx)         | This code snippet, located in the DanceFloor.tsx file, is a React component that renders the dance floor of a game. It dynamically adjusts its layout based on the number of players in the game.                                                                                                                                                                                                                                                                                       |
| [Controls.tsx](https://github.com/JackCasica/rune-dance-party/blob/master/src/components/Controls.tsx)             | This code snippet represents the `Controls` component in the `rune-dance-party` repository. It renders the bottom controls of the game, including power-ups and limb controls. It uses React and receives props related to the game state.                                                                                                                                                                                                                                              |

</details>

<details closed><summary>src.hooks</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [useSound.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/hooks/useSound.ts)                     | The code in `src/hooks/useSound.ts` creates and manages sound effects for the Rune Dance Party application. It uses the `Howl` library to initialize and control the sound file specified as an input. The hook also handles muting the sound when the document becomes hidden and unmutes it when the document becomes visible again. |
| [useGame.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/hooks/useGame.ts)                       | The code snippet in useGame.ts is a custom React hook that subscribes to changes in the game state on the server. It uses the Rune client to update the game data when the state changes, and returns the current game state.                                                                                                          |
| [useBackgroundMusic.ts](https://github.com/JackCasica/rune-dance-party/blob/master/src/hooks/useBackgroundMusic.ts) | The code snippet in useBackgroundMusic.ts handles the functionality of playing and pausing background music in the rune-dance-party repository. It utilizes the howler library to create an audio instance and adds event listeners to control music playback based on user interactions and document visibility changes.              |

</details>

---

## Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **TypeScript**: `version x.y.z`

### Installation

1. Clone the rune-dance-party repository:

```sh
git clone https://github.com/JackCasica/rune-dance-party
```

2. Change to the project directory:

```sh
cd rune-dance-party
```

3. Install the dependencies:

```sh
npm install
```

### Running rune-dance-party

Use the following command to run rune-dance-party:

```sh
npm run build && node dist/main.js
```

### Tests

To execute tests, run:

```sh
npm test
```

---

## Project Roadmap

- [x] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github/JackCasica/rune-dance-party/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github/JackCasica/rune-dance-party/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github/JackCasica/rune-dance-party/issues)**: Submit bugs found or log feature requests for Rune-dance-party.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/JackCasica/rune-dance-party
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
