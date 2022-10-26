# AVgator touchpanel client example

Welcome to the AVgator touchpanel client example. These example is intended to help developers bring AVgator infrastructure manager (AIM) into their installations.

## Contents

- [About AIM](#about-aim)
- [Getting Started](#getting-started)
  - [Set up AIM](#set-up-aim)
  - [Directory Structure](#directory-structure)
  - [Run the example code](#run-the-example-code)
- [Resources](#more-resources)
- [Contact](#contact-us)
- [License](#license)

## About AIM
AIM is an AVgator project to enable real-time infrastructure management and processes control of audio, video, and data assests for web browsers, smart devices and native apps. 

## Getting started

### Set up AIM
You'll need to set up AIM to run the examples. For more information, see [Install and configure AVgator infrastructure manager](https://license.avgator.com/help/aim/aim-installation-manual).

### Directory structure

In the `src` folder, you'll find example of React-based touchpanel:

- `src`
    - `app` - React-redux store and hooks
    - `components` - React components for the touchpanel.
        - `categories` - JSX files for categories representation
        - `channels` - JSX files for channels representation
        - `configuration` - JSX files for configure your panel
        - `folder` - JSX files for folder representation
        - `rooms` - JSX files for rooms representation
        - `shared` - JSX files of shared React components, such as styles and constants
        - `sources` - JSX files for sources representation
    - `features` -  Redux toolkit slices
        - `api` - Redux toolkit API slices
        - `ui` - Redux toolkit UI slices 
    - `hoc` - Configuration checking HOC

### Run the example code


#### React

In the `aim-tp-example` directory, run the following command:
```bash
 $ npm start
 ```

Go to `http://localhost:3000/` to view the example panel.

## More resources

- [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [React - A JavaScript library for building user interfaces](https://reactjs.org/)
- [Redux Toolkit - The official, opinionated, batteries-included toolset for efficient Redux development](https://redux-toolkit.js.org/)

## Contact us

AVGATOR INC

AVGATOR provides developers with a platform to create smart home applications and solutions. See the [AVGATOR PORTAL](https://avgator.com/) to learn more about our solutions.

## License

This code is distributed under the [BSD 3-Clause License](LICENSE.txt).