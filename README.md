# Todo App

This is a Todo app project built with [Expo](https://expo.dev/) and [React Native Reusables](https://reactnativereusables.com).

## Introduction

This is my first react-native-expo project build with expo, uniwind, reusable and fastapi. It demonstrate my skills in react-native, expo-router, uniwind(allow us to use tailwind in react-native), reusabale(component library) and fatsapi as backend. I preffer project based learning that is why i start with the basic project to get confidence and get basic knowledge of the framework and tools around it.

## Project Features

- Built with [Expo Router](https://expo.dev/router)
- Styled with [Tailwind CSS](https://tailwindcss.com/) via [Uniwind](https://uniwind.dev/)
- UI powered by [React Native Reusables](https://github.com/founded-labs/react-native-reusables)
- Runs on iOS, Android, and Web
- Fastapi backend

## Start with this repo
### 1. Clone repo:
```bash
git clone https://github.com/baseergroot/Todo-App.git
```

### Enter into project directory:
```bash
cd Todo-App
```

### Create .env file and paste this:
```bash
EXPO_PUBLIC_API_URL=https://fast-api-todo-app-one.vercel.app/
```

### Install packages:
```bash
pnpm i
```

### Run development server:
```bash
pnpm dev
```

### See development server:
```text
Download an expo go app on android and scan the QR code
```

## Learn More

To dive deeper into the technologies used:

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Uniwind Docs](https://docs.uniwind.dev/)
- [React Native Reusables](https://reactnativereusables.com)

## Deploy with EAS

The easiest way to deploy your app is with [Expo Application Services (EAS)](https://expo.dev/eas).

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Updates](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)


# To start with same templte from scratch

It was initialized using the following command:

```bash
npx @react-native-reusables/cli@latest init -t app
```

## Adding components

You can add more reusable components using the CLI:

```bash
npx react-native-reusables/cli@latest add [...components]
```

> e.g. `npx react-native-reusables/cli@latest add input textarea`

If you don't specify any component names, you'll be prompted to select which components to add interactively. Use the `--all` flag to install all available components at once.


